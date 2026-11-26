"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import type { AdminService, ServicePayload } from "@/types/admin";

function normalizeService(raw: Record<string, unknown>): AdminService {
  const features = Array.isArray(raw.features)
    ? raw.features.filter((x): x is string => typeof x === "string")
    : [];
  return {
    id: String(raw.id ?? ""),
    slug: String(raw.slug ?? ""),
    title: String(raw.title ?? ""),
    shortDescription: String(raw.shortDescription ?? ""),
    description: String(raw.description ?? ""),
    features,
    bestFor: String(raw.bestFor ?? ""),
    icon: String(raw.icon ?? "target"),
    sortOrder: Number(raw.sortOrder ?? 0),
    isPublished: Boolean(raw.isPublished ?? true),
    seoTitle: String(raw.seoTitle ?? ""),
    seoDescription: String(raw.seoDescription ?? ""),
    createdAt: raw.createdAt ? String(raw.createdAt) : undefined,
    updatedAt: raw.updatedAt ? String(raw.updatedAt) : undefined,
  };
}

export function useServicesCrud(initialServices: AdminService[] = []) {
  const [services, setServices] = useState<AdminService[]>(initialServices);
  const [loading, setLoading] = useState(initialServices.length === 0);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"ALL" | "PUBLISHED" | "HIDDEN">("ALL");

  const fetchServices = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/services", { cache: "no-store" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Unable to load services");
      const list = Array.isArray(data.services)
        ? data.services.map((s: Record<string, unknown>) => normalizeService(s))
        : [];
      setServices(list);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to load services");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (initialServices.length === 0) {
      void fetchServices();
    }
  }, [fetchServices, initialServices.length]);

  const createService = useCallback(async (payload: ServicePayload) => {
    setSaving(true);
    try {
      const res = await fetch("/api/admin/services", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Unable to create service");
      const created = normalizeService(data.service);
      setServices((prev) =>
        [...prev, created].sort((a, b) => a.sortOrder - b.sortOrder),
      );
      toast.success("Service created successfully");
      return created;
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Create failed");
      return null;
    } finally {
      setSaving(false);
    }
  }, []);

  const updateService = useCallback(
    async (id: string, payload: Partial<ServicePayload>) => {
      setSaving(true);
      try {
        const res = await fetch(`/api/admin/services/${id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error ?? "Unable to update service");
        const updated = normalizeService(data.service);
        setServices((prev) =>
          prev
            .map((item) => (item.id === id ? updated : item))
            .sort((a, b) => a.sortOrder - b.sortOrder),
        );
        toast.success("Service updated");
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
    async (service: AdminService) => {
      return updateService(service.id, { isPublished: !service.isPublished });
    },
    [updateService],
  );

  const deleteService = useCallback(async (id: string) => {
    setDeletingId(id);
    try {
      const res = await fetch(`/api/admin/services/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Unable to delete service");
      setServices((prev) => prev.filter((item) => item.id !== id));
      toast.success("Service deleted");
      return true;
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Delete failed");
      return false;
    } finally {
      setDeletingId(null);
    }
  }, []);

  const filteredServices = useMemo(() => {
    const q = search.trim().toLowerCase();
    return services.filter((s) => {
      if (statusFilter === "PUBLISHED" && !s.isPublished) return false;
      if (statusFilter === "HIDDEN" && s.isPublished) return false;
      if (!q) return true;
      return (
        s.title.toLowerCase().includes(q) ||
        s.slug.toLowerCase().includes(q) ||
        s.shortDescription.toLowerCase().includes(q)
      );
    });
  }, [services, search, statusFilter]);

  const stats = useMemo(
    () => ({
      total: services.length,
      published: services.filter((s) => s.isPublished).length,
      hidden: services.filter((s) => !s.isPublished).length,
    }),
    [services],
  );

  return {
    services: filteredServices,
    allServices: services,
    stats,
    loading,
    saving,
    deletingId,
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
    refresh: fetchServices,
    createService,
    updateService,
    togglePublish,
    deleteService,
  };
}
