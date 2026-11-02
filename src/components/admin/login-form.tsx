"use client";
import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
export function AdminLoginForm() {
  const [busy, setBusy] = useState(false);
  const router = useRouter();
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    const form = new FormData(e.currentTarget);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: form.get("email"),
          password: form.get("password"),
        }),
      });
      const data: { error?: string } = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Sign in failed");
      toast.success("Signed in successfully");
      router.replace("/admin");
      router.refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Unable to sign in");
    } finally {
      setBusy(false);
    }
  }
  return (
    <form onSubmit={submit} className="mt-8 space-y-5">
      <label className="block text-sm font-semibold text-foreground/90">
        Email address
        <input
          className="mt-2 w-full rounded-xl border border-border px-4 py-3 outline-none focus:border-brand-teal focus:ring-1 focus:ring-brand-teal"
          type="email"
          name="email"
          autoComplete="username"
          required
        />
      </label>
      <label className="block text-sm font-semibold text-foreground/90">
        Password
        <input
          className="mt-2 w-full rounded-xl border border-border px-4 py-3 outline-none focus:border-brand-teal focus:ring-1 focus:ring-brand-teal"
          type="password"
          name="password"
          autoComplete="current-password"
          required
        />
      </label>
      <Button className="w-full" size="lg" variant="brand-teal" disabled={busy}>
        {busy ? "Signing in…" : "Sign in securely"}
      </Button>
      <p className="text-xs leading-5 text-muted">
        Create the first administrator using the documented CLI script. Public
        self-registration is disabled.
      </p>
    </form>
  );
}
