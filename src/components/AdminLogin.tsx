"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { loginAction, type LoginState } from "@/app/admin/actions";

const initial: LoginState = {};

function Submit() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex w-full items-center justify-center gap-2 rounded-[10px] bg-ink px-6 py-[14px] text-[15px] font-medium text-canvas transition-colors hover:bg-[#2A2D34] disabled:opacity-60"
    >
      {pending ? "Signing in…" : "Sign in"}
    </button>
  );
}

export function AdminLogin() {
  const [state, action] = useActionState(loginAction, initial);
  return (
    <div className="mx-auto max-w-[420px] px-6 py-24">
      <div className="mb-[22px] font-mono text-[12px] uppercase tracking-[0.18em] text-accent">
        Admin
      </div>
      <h1 className="m-0 mb-8 font-display text-[34px] font-bold tracking-[-0.01em] text-ink">
        Sign in to publish.
      </h1>
      <form action={action} className="grid gap-4">
        {state.error && (
          <div className="rounded-[10px] border border-[#E6C0C0] bg-[#FBEDED] px-4 py-3 text-[14px] text-[#B42318]">
            {state.error}
          </div>
        )}
        <input
          type="password"
          name="password"
          required
          autoFocus
          placeholder="Password"
          className="w-full rounded-[10px] border border-line bg-white px-4 py-3 text-[15px] text-ink outline-none transition-colors focus:border-accent"
        />
        <Submit />
      </form>
    </div>
  );
}
