import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { AdminLoginForm } from "@/components/admin/login-form";
export const metadata: Metadata = {
  title: "Admin sign in",
  robots: { index: false, follow: false },
};
export default async function AdminLoginPage() {
  if (await getSession()) redirect("/admin");
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#F4F7FA] px-5 py-12">
      <div className="grid w-full max-w-5xl overflow-hidden rounded-3xl bg-white shadow-2xl shadow-slate-900/10 md:grid-cols-2">
        <div className="hidden flex-col justify-between bg-[#102A4C] p-12 text-white md:flex">
          <div>
            <div className="text-xs font-bold uppercase tracking-[.25em] text-teal-300">
              PROSPORA LEADS
            </div>
            <h1 className="mt-12 text-4xl font-bold leading-tight">
              Your growth engine, under your control.
            </h1>
            <p className="mt-5 leading-7 text-slate-300">
              Manage website content, services, enquiries and search appearance
              from one place.
            </p>
          </div>
          <p className="text-xs text-slate-400">Secure administrator access</p>
        </div>
        <div className="p-8 sm:p-12">
          <p className="text-xs font-bold uppercase tracking-[.2em] text-teal-700">
            Admin portal
          </p>
          <h2 className="mt-3 text-3xl font-bold text-[#102A4C]">
            Welcome back
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            Sign in to manage your website.
          </p>
          <AdminLoginForm />
        </div>
      </div>
    </main>
  );
}
