"use client";

import { useEffect, useState } from "react";

interface HomeData {
  services: Array<{
    slug: string;
    title: string;
    shortDescription: string;
    icon?: string;
  }>;
  industries: string[];
  markets: Array<{
    slug: string;
    name: string;
    description: string;
    complianceNote: string;
  }>;
  faqs: Array<{ question: string; answer: string }>;
}

export function useHomeData() {
  const [data] = useState<HomeData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Home data is server-rendered via props; this hook is for client-side
    // enhancements if needed later.
    setLoading(false);
  }, []);

  return { data, loading };
}
