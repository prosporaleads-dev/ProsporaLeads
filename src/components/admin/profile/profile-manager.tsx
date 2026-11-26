"use client";

import { useEffect, useState, type FormEvent } from "react";
import { ShieldCheck, UserCheck, KeyRound, Clock, Calendar } from "lucide-react";
import { useAdminProfile } from "@/hooks/admin";

const inputCls =
  "mt-1.5 w-full rounded-xl border border-border bg-white px-4 py-3 text-sm text-brand-navy outline-none transition focus:border-brand-teal focus:ring-2 focus:ring-brand-teal/15";

export function ProfileManager() {
  const {
    profile,
    loading,
    savingProfile,
    savingPassword,
    updateProfile,
    changePassword,
  } = useAdminProfile();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    if (profile) {
      setName(profile.name);
      setEmail(profile.email);
    }
  }, [profile]);

  async function handleProfileSubmit(e: FormEvent) {
    e.preventDefault();
    await updateProfile({ name: name.trim(), email: email.trim() });
  }

  async function handlePasswordSubmit(e: FormEvent) {
    e.preventDefault();
    const ok = await changePassword({
      currentPassword,
      newPassword,
      confirmPassword,
    });
    if (ok) {
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    }
  }

  if (loading || !profile) {
    return (
      <div className="space-y-4">
        <div className="h-32 animate-pulse rounded-3xl border border-border bg-white" />
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="h-72 animate-pulse rounded-3xl border border-border bg-white" />
          <div className="h-72 animate-pulse rounded-3xl border border-border bg-white" />
        </div>
      </div>
    );
  }

  const initials = profile.name
    .split(" ")
    .filter(Boolean)
    .map((p) => p[0]?.toUpperCase())
    .slice(0, 2)
    .join("");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-extrabold tracking-tight text-brand-navy">
          Admin profile
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Manage your administrator account details and security credentials.
        </p>
      </div>

      {/* Profile Banner Card */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#010f33] via-[#072244] to-[#087985] p-6 text-white shadow-soft sm:p-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#35d1c6] to-[#0797a2] font-heading text-xl font-extrabold text-[#010f33] shadow-lg">
              {initials}
            </div>
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="font-heading text-xl font-extrabold">
                  {profile.name}
                </h2>
                <span className="rounded-full border border-[#35d1c6]/40 bg-[#35d1c6]/15 px-3 py-0.5 text-[11px] font-bold uppercase tracking-wider text-[#8be9df]">
                  {profile.role.replace("_", " ")}
                </span>
              </div>
              <p className="mt-1 truncate text-sm text-white/75">
                {profile.email}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 text-xs text-white/75">
            <div className="flex items-center gap-2">
              <Clock size={14} className="text-[#5bd8ce]" />
              <span>
                Last sign-in:{" "}
                {profile.lastLoginAt
                  ? new Date(profile.lastLoginAt).toLocaleString()
                  : "Current session"}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar size={14} className="text-[#5bd8ce]" />
              <span>
                Joined: {new Date(profile.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Two-Column Forms */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Account Details */}
        <section className="rounded-3xl border border-border bg-white p-6 shadow-xs sm:p-8">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-teal/10 text-brand-teal">
              <UserCheck size={19} />
            </div>
            <div>
              <h3 className="font-heading text-lg font-bold text-brand-navy">
                Account details
              </h3>
              <p className="text-xs text-slate-500">
                Update your display name and login email address.
              </p>
            </div>
          </div>

          <form onSubmit={handleProfileSubmit} className="mt-6 space-y-4">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
              Full name
              <input
                className={inputCls}
                required
                minLength={2}
                maxLength={120}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </label>

            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
              Email address
              <input
                type="email"
                className={inputCls}
                required
                maxLength={254}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>

            <div className="rounded-xl border border-slate-100 bg-slate-50 px-4 py-3 text-xs text-slate-500">
              <span className="font-semibold text-brand-navy">Role:</span>{" "}
              {profile.role.replace("_", " ")} &middot;{" "}
              <span className="font-semibold text-emerald-700">Active</span>
            </div>

            <button
              type="submit"
              disabled={savingProfile}
              className="mt-2 inline-flex w-full items-center justify-center rounded-xl bg-brand-teal px-5 py-3 text-sm font-bold text-white transition hover:bg-brand-teal-dark disabled:opacity-50 sm:w-auto"
            >
              {savingProfile ? "Saving…" : "Save profile"}
            </button>
          </form>
        </section>

        {/* Password Security */}
        <section className="rounded-3xl border border-border bg-white p-6 shadow-xs sm:p-8">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
              <KeyRound size={19} />
            </div>
            <div>
              <h3 className="font-heading text-lg font-bold text-brand-navy">
                Change password
              </h3>
              <p className="text-xs text-slate-500">
                Use a unique password of at least 14 characters.
              </p>
            </div>
          </div>

          <form onSubmit={handlePasswordSubmit} className="mt-6 space-y-4">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
              Current password
              <input
                type="password"
                autoComplete="current-password"
                className={inputCls}
                required
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
            </label>

            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
              New password (min 14 chars)
              <input
                type="password"
                autoComplete="new-password"
                className={inputCls}
                required
                minLength={14}
                maxLength={200}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </label>

            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
              Confirm new password
              <input
                type="password"
                autoComplete="new-password"
                className={inputCls}
                required
                minLength={14}
                maxLength={200}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </label>

            <div className="flex items-center gap-2 text-xs text-slate-500">
              <ShieldCheck size={15} className="text-brand-teal" />
              <span>Passwords are hashed with bcrypt (12 salt rounds).</span>
            </div>

            <button
              type="submit"
              disabled={savingPassword}
              className="mt-2 inline-flex w-full items-center justify-center rounded-xl bg-brand-navy px-5 py-3 text-sm font-bold text-white transition hover:bg-brand-navy-dark disabled:opacity-50 sm:w-auto"
            >
              {savingPassword ? "Updating…" : "Update password"}
            </button>
          </form>
        </section>
      </div>
    </div>
  );
}
