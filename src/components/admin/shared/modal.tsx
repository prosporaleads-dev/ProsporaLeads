"use client";

import { useEffect, type ReactNode } from "react";
import { X } from "lucide-react";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: ReactNode;
  maxWidth?: "md" | "lg" | "2xl";
}

const widthClasses = {
  md: "max-w-md",
  lg: "max-w-xl",
  "2xl": "max-w-2xl",
};

export function Modal({
  open,
  onClose,
  title,
  description,
  children,
  maxWidth = "2xl",
}: ModalProps) {
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-[#010f33]/55 p-0 backdrop-blur-xs sm:items-center sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="admin-modal-title"
      onClick={onClose}
    >
      <div
        className={`flex max-h-[92vh] w-full ${widthClasses[maxWidth]} flex-col overflow-hidden rounded-t-3xl border border-border bg-white shadow-luxury sm:rounded-3xl`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 border-b border-border px-5 py-4 sm:px-6 sm:py-5">
          <div className="min-w-0">
            <h2
              id="admin-modal-title"
              className="font-heading text-lg font-bold text-brand-navy sm:text-xl"
            >
              {title}
            </h2>
            {description && (
              <p className="mt-1 text-xs text-slate-500 sm:text-sm">
                {description}
              </p>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="rounded-xl border border-border p-2 text-slate-500 transition hover:bg-slate-50 hover:text-brand-navy"
          >
            <X size={18} />
          </button>
        </div>
        <div className="overflow-y-auto px-5 py-5 sm:px-6 sm:py-6">
          {children}
        </div>
      </div>
    </div>
  );
}
