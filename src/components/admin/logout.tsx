"use client";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
export function AdminLogout() { const router=useRouter(); async function logout() { await fetch("/api/auth/logout",{method:"POST"}); router.replace("/admin/login"); router.refresh(); } return <button onClick={logout} className="mt-5 flex items-center gap-2 text-xs text-slate-400 hover:text-white"><LogOut size={14}/> Sign out</button>; }
