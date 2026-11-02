"use client";
import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
const regions = [
  "USA",
  "Canada",
  "Middle East",
  "Australia",
  "Multiple",
] as const;
export function ContactForm() {
  const [busy, setBusy] = useState(false);
  const [regionsSelected, setRegionsSelected] = useState<string[]>([]);
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = Object.fromEntries(data.entries());
    payload.targetRegions = regionsSelected as unknown as FormDataEntryValue;
    try {
      const response = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...payload,
          targetRegions: regionsSelected,
          consent: data.get("consent") === "on",
        }),
      });
      const result: { error?: string; message?: string } =
        await response.json();
      if (!response.ok)
        throw new Error(result.error ?? "Unable to send your enquiry.");
      toast.success(
        result.message ?? "Thanks. Your enquiry has been received.",
      );
      form.reset();
      setRegionsSelected([]);
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Please try again later.",
      );
    } finally {
      setBusy(false);
    }
  }
  const field =
    "mt-2 w-full rounded-xl border border-border bg-white px-4 py-3.5 text-sm text-foreground outline-none transition placeholder:text-foreground/40 focus:border-brand-teal focus:ring-1 focus:ring-brand-teal";
  return (
    <form
      onSubmit={submit}
      className="rounded-[2rem] border border-border bg-white p-7 shadow-soft sm:p-10"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="text-sm font-semibold text-foreground/90">
          Full name *
          <input
            className={field}
            name="name"
            autoComplete="name"
            minLength={2}
            maxLength={120}
            required
            placeholder="Your name"
          />
        </label>
        <label className="text-sm font-semibold text-foreground/90">
          Work email *
          <input
            className={field}
            type="email"
            name="email"
            autoComplete="email"
            required
            maxLength={254}
            placeholder="you@company.com"
          />
        </label>
        <label className="text-sm font-semibold text-foreground/90">
          Phone / WhatsApp
          <input
            className={field}
            name="phone"
            autoComplete="tel"
            maxLength={40}
            placeholder="Optional"
          />
        </label>
        <label className="text-sm font-semibold text-foreground/90">
          Company name
          <input
            className={field}
            name="company"
            autoComplete="organization"
            maxLength={160}
            placeholder="Company"
          />
        </label>
        <label className="text-sm font-semibold text-foreground/90 sm:col-span-2">
          Website
          <input
            className={field}
            name="website"
            type="url"
            maxLength={250}
            placeholder="https://"
          />
        </label>
      </div>
      <fieldset className="mt-7">
        <legend className="text-sm font-semibold text-foreground/90">
          Target region *
        </legend>
        <div className="mt-4 flex flex-wrap gap-2">
          {regions.map((r) => (
            <button
              type="button"
              key={r}
              onClick={() =>
                setRegionsSelected((old) =>
                  old.includes(r)
                    ? old.filter((x) => x !== r)
                    : r === "Multiple"
                      ? ["Multiple"]
                      : [...old.filter((x) => x !== "Multiple"), r],
                )
              }
              className={`rounded-full border px-4 py-2 text-sm transition ${regionsSelected.includes(r) ? "border-brand-teal bg-brand-teal/10 text-brand-teal-dark" : "border-border text-foreground/70 hover:border-brand-teal hover:text-brand-teal"}`}
            >
              {r}
            </button>
          ))}
        </div>
      </fieldset>
      <label className="mt-7 block text-sm font-semibold text-foreground/90">
        Service of interest
        <select className={field} name="serviceInterest" defaultValue="">
          <option value="">Choose a service</option>
          <option>B2B Lead Generation</option>
          <option>Appointment Setting</option>
          <option>Email Outreach</option>
          <option>LinkedIn Outreach</option>
          <option>Market &amp; Account Research</option>
          <option>Data Verification &amp; Enrichment</option>
        </select>
      </label>
      <div className="mt-7 flex items-start gap-3">
        <input
          id="consent"
          name="consent"
          type="checkbox"
          className="mt-1 rounded border-border text-brand-teal focus:ring-brand-teal"
        />
        <label
          htmlFor="consent"
          className="text-sm text-foreground/60 leading-6"
        >
          I agree to Propspora Leads storing my details to respond to this
          enquiry.
        </label>
      </div>
      <Button
        type="submit"
        size="lg"
        variant="brand-teal"
        className="mt-8 w-full"
      >
        {busy ? "Sending…" : "Request a strategy call"}
      </Button>
    </form>
  );
}
