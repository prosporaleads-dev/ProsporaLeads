"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import type {
  AdminInquiry,
  InquiryCreatePayload,
  InquiryStatus,
  InquiryUpdatePayload,
} from "@/types/admin";

export function useInquiriesCrud() {
  const [inquiries, setInquiries] = useState<AdminInquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"ALL" | InquiryStatus>("ALL");

  const fetchInquiries = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/inquiries", { cache: "no-store" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Unable to load enquiries");
      setInquiries((data.inquiries as AdminInquiry[]) ?? []);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to load enquiries");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchInquiries();
  }, [fetchInquiries]);

  const createInquiry = useCallback(async (payload: InquiryCreatePayload) => {
    setSaving(true);
    try {
      const res = await fetch("/api/admin/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Unable to create enquiry");
      const created = data.inquiry as AdminInquiry;
      setInquiries((prev) => [created, ...prev]);
      toast.success("Enquiry added");
      return created;
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Create failed");
      return null;
    } finally {
      setSaving(false);
    }
  }, []);

  const updateInquiry = useCallback(
    async (id: string, payload: Partial<InquiryUpdatePayload>) => {
      setSaving(true);
      try {
        const res = await fetch(`/api/admin/inquiries/${id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error ?? "Unable to update enquiry");
        const updated = data.inquiry as AdminInquiry;
        setInquiries((prev) =>
          prev.map((item) => (item.id === id ? updated : item)),
        );
        toast.success("Enquiry updated");
        return updated;
      } catch (err) {
        toast.error(err instanceof Error ? err.message : "Update failed");
        return null;
      } finally {
        setSaving(false);
      }
    },
    [],
  );

  const deleteInquiry = useCallback(async (id: string) => {
    setDeletingId(id);
    try {
      const res = await fetch(`/api/admin/inquiries/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Unable to delete enquiry");
      setInquiries((prev) => prev.filter((item) => item.id !== id));
      toast.success("Enquiry deleted");
      return true;
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Delete failed");
      return false;
    } finally {
      setDeletingId(null);
    }
  }, []);

  const filteredInquiries = useMemo(() => {
    const q = search.trim().toLowerCase();
    return inquiries.filter((item) => {
      if (statusFilter !== "ALL" && item.status !== statusFilter) return false;
      if (!q) return true;
      return (
        item.name.toLowerCase().includes(q) ||
        item.email.toLowerCase().includes(q) ||
        (item.company ?? "").toLowerCase().includes(q) ||
        (item.serviceInterest ?? "").toLowerCase().includes(q) ||
        item.goals.toLowerCase().includes(q)
      );
    });
  }, [inquiries, search, statusFilter]);

  const stats = useMemo(
    () => ({
      total: inquiries.length,
      newCount: inquiries.filter((i) => i.status === "NEW").length,
      contacted: inquiries.filter((i) => i.status === "CONTACTED").length,
      qualified: inquiries.filter((i) => i.status === "QUALIFIED").length,
      archived: inquiries.filter((i) => i.status === "ARCHIVED").length,
    }),
    [inquiries],
  );

  return {
    inquiries: filteredInquiries,
    allInquiries: inquiries,
    stats,
    loading,
    saving,
    deletingId,
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
    refresh: fetchInquiries,
    createInquiry,
    updateInquiry,
    deleteInquiry,
  };
}
