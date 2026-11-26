"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import type { AdminFaq, FaqPayload } from "@/types/admin";

export function useFaqsCrud(initialFaqs: AdminFaq[] = []) {
  const [faqs, setFaqs] = useState<AdminFaq[]>(initialFaqs);
  const [loading, setLoading] = useState(initialFaqs.length === 0);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("ALL");

  const fetchFaqs = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/faqs", { cache: "no-store" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Unable to load FAQs");
      setFaqs((data.faqs as AdminFaq[]) ?? []);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to load FAQs");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (initialFaqs.length === 0) {
      void fetchFaqs();
    }
  }, [fetchFaqs, initialFaqs.length]);

  const createFaq = useCallback(async (payload: FaqPayload) => {
    setSaving(true);
    try {
      const res = await fetch("/api/admin/faqs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Unable to create FAQ");
      const created = data.faq as AdminFaq;
      setFaqs((prev) =>
        [...prev, created].sort((a, b) => a.sortOrder - b.sortOrder),
      );
      toast.success("FAQ created");
      return created;
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Create failed");
      return null;
    } finally {
      setSaving(false);
    }
  }, []);

  const updateFaq = useCallback(
    async (id: string, payload: Partial<FaqPayload>) => {
      setSaving(true);
      try {
        const res = await fetch(`/api/admin/faqs/${id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error ?? "Unable to update FAQ");
        const updated = data.faq as AdminFaq;
        setFaqs((prev) =>
          prev
            .map((item) => (item.id === id ? updated : item))
            .sort((a, b) => a.sortOrder - b.sortOrder),
        );
        toast.success("FAQ updated");
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

  const togglePublish = useCallback(
    async (faq: AdminFaq) => {
      return updateFaq(faq.id, { isPublished: !faq.isPublished });
    },
    [updateFaq],
  );

  const deleteFaq = useCallback(async (id: string) => {
    setDeletingId(id);
    try {
      const res = await fetch(`/api/admin/faqs/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Unable to delete FAQ");
      setFaqs((prev) => prev.filter((item) => item.id !== id));
      toast.success("FAQ deleted");
      return true;
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Delete failed");
      return false;
    } finally {
      setDeletingId(null);
    }
  }, []);

  const categories = useMemo(() => {
    const set = new Set<string>(faqs.map((f) => f.category || "General"));
    return ["ALL", ...Array.from(set).sort()];
  }, [faqs]);

  const filteredFaqs = useMemo(() => {
    const q = search.trim().toLowerCase();
    return faqs.filter((f) => {
      if (categoryFilter !== "ALL" && f.category !== categoryFilter) return false;
      if (!q) return true;
      return (
        f.question.toLowerCase().includes(q) ||
        f.answer.toLowerCase().includes(q) ||
        f.category.toLowerCase().includes(q)
      );
    });
  }, [faqs, search, categoryFilter]);

  const stats = useMemo(
    () => ({
      total: faqs.length,
      published: faqs.filter((f) => f.isPublished).length,
      hidden: faqs.filter((f) => !f.isPublished).length,
    }),
    [faqs],
  );

  return {
    faqs: filteredFaqs,
    allFaqs: faqs,
    categories,
    stats,
    loading,
    saving,
    deletingId,
    search,
    setSearch,
    categoryFilter,
    setCategoryFilter,
    refresh: fetchFaqs,
    createFaq,
    updateFaq,
    togglePublish,
    deleteFaq,
  };
}
