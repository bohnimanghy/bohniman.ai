import type { Metadata } from "next";
import { isAuthed } from "@/lib/auth";
import { AdminLogin } from "@/components/AdminLogin";
import { AdminEditor } from "@/components/AdminEditor";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

// Uses cookies — must render per request.
export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const authed = await isAuthed();
  if (!authed) return <AdminLogin />;

  const today = new Date().toISOString().slice(0, 10);
  return <AdminEditor today={today} />;
}
