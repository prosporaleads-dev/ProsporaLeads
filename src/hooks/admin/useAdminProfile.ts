"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import type {
  AdminProfile,
  PasswordChangePayload,
  ProfileUpdatePayload,
} from "@/types/admin";

export function useAdminProfile() {
  const router = useRouter();
  const [profile, setProfile] = useState<AdminProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [savingProfile, setSavingProfile] = useState(false);
  const [savingPassword, setSavingPassword] = useState(false);

  const fetchProfile = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/profile", { cache: "no-store" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Unable to load profile");
      setProfile(data.profile as AdminProfile);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to load profile");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchProfile();
  }, [fetchProfile]);

  const updateProfile = useCallback(
    async (payload: ProfileUpdatePayload) => {
      setSavingProfile(true);
      try {
        const res = await fetch("/api/admin/profile", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error ?? "Unable to update profile");
        setProfile(data.profile as AdminProfile);
        toast.success("Profile updated");
        router.refresh();
        return data.profile as AdminProfile;
      } catch (err) {
        toast.error(err instanceof Error ? err.message : "Profile update failed");
        return null;
      } finally {
        setSavingProfile(false);
      }
    },
    [router],
  );

  const changePassword = useCallback(async (payload: PasswordChangePayload) => {
    if (payload.newPassword.length < 14) {
      toast.error("New password must be at least 14 characters.");
      return false;
    }
    if (payload.newPassword !== payload.confirmPassword) {
      toast.error("New password and confirmation do not match.");
      return false;
    }

    setSavingPassword(true);
    try {
      const res = await fetch("/api/admin/profile/password", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentPassword: payload.currentPassword,
          newPassword: payload.newPassword,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Unable to update password");
      toast.success("Password updated successfully");
      return true;
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Password change failed");
      return false;
    } finally {
      setSavingPassword(false);
    }
  }, []);

  return {
    profile,
    loading,
    savingProfile,
    savingPassword,
    refresh: fetchProfile,
    updateProfile,
    changePassword,
  };
}
