import "server-only";
import { Octokit } from "@octokit/rest";

export type CommitFile =
  | { path: string; text: string }
  | { path: string; base64: string };

export type GithubConfig = {
  token: string;
  owner: string;
  repo: string;
  branch: string;
};

export function githubConfig(): GithubConfig | null {
  const token = process.env.GITHUB_TOKEN;
  const repoFull = process.env.GITHUB_REPO; // "owner/repo"
  const branch = process.env.GITHUB_BRANCH || "main";
  if (!token || !repoFull || !repoFull.includes("/")) return null;
  const [owner, repo] = repoFull.split("/");
  return { token, owner, repo, branch };
}

/**
 * Commit multiple files in a single commit via the Git Data API.
 * Text files are committed as UTF-8; base64 files as binary blobs.
 */
export async function commitFiles(
  files: CommitFile[],
  message: string
): Promise<{ commitUrl: string; sha: string }> {
  const cfg = githubConfig();
  if (!cfg) {
    throw new Error(
      "GitHub is not configured. Set GITHUB_TOKEN and GITHUB_REPO (owner/repo)."
    );
  }
  const octokit = new Octokit({ auth: cfg.token });
  const { owner, repo, branch } = cfg;

  // Latest commit on the branch
  const ref = await octokit.git.getRef({ owner, repo, ref: `heads/${branch}` });
  const latestCommitSha = ref.data.object.sha;
  const commit = await octokit.git.getCommit({
    owner,
    repo,
    commit_sha: latestCommitSha,
  });
  const baseTreeSha = commit.data.tree.sha;

  // Create a blob per file
  const tree = await Promise.all(
    files.map(async (f) => {
      let blobSha: string;
      if ("text" in f) {
        const blob = await octokit.git.createBlob({
          owner,
          repo,
          content: f.text,
          encoding: "utf-8",
        });
        blobSha = blob.data.sha;
      } else {
        const blob = await octokit.git.createBlob({
          owner,
          repo,
          content: f.base64,
          encoding: "base64",
        });
        blobSha = blob.data.sha;
      }
      return {
        path: f.path,
        mode: "100644" as const,
        type: "blob" as const,
        sha: blobSha,
      };
    })
  );

  const newTree = await octokit.git.createTree({
    owner,
    repo,
    base_tree: baseTreeSha,
    tree,
  });

  const newCommit = await octokit.git.createCommit({
    owner,
    repo,
    message,
    tree: newTree.data.sha,
    parents: [latestCommitSha],
  });

  await octokit.git.updateRef({
    owner,
    repo,
    ref: `heads/${branch}`,
    sha: newCommit.data.sha,
  });

  return { commitUrl: newCommit.data.html_url, sha: newCommit.data.sha };
}
