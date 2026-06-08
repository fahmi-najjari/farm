"use client";

import { useActionState } from "react";

import { loginAdmin } from "./actions";

export function LoginForm() {
  const [state, action, pending] = useActionState(loginAdmin, {});

  return (
    <form action={action} className="mt-8 space-y-5">
      <div>
        <label
          className="block font-sans text-sm font-medium text-foreground"
          htmlFor="username"
        >
          Username
        </label>
        <input
          autoComplete="username"
          className="mt-2 h-12 w-full rounded-md border border-input bg-background px-4 font-sans text-sm text-foreground outline-none transition placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-ring/20"
          id="username"
          name="username"
          placeholder="admin"
          required
          type="text"
        />
      </div>

      <div>
        <label
          className="block font-sans text-sm font-medium text-foreground"
          htmlFor="password"
        >
          Password
        </label>
        <input
          autoComplete="current-password"
          className="mt-2 h-12 w-full rounded-md border border-input bg-background px-4 font-sans text-sm text-foreground outline-none transition placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-ring/20"
          id="password"
          name="password"
          placeholder="Enter password"
          required
          type="password"
        />
      </div>

      {state.error ? (
        <p className="rounded-md bg-destructive/10 px-4 py-3 font-sans text-sm text-destructive">
          {state.error}
        </p>
      ) : null}

      <button
        className="inline-flex h-12 w-full items-center justify-center rounded-md bg-primary px-5 font-sans text-sm font-semibold text-primary-foreground transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60"
        disabled={pending}
        type="submit"
      >
        {pending ? "Signing in..." : "Sign in"}
      </button>
    </form>
  );
}
