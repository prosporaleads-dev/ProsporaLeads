import { SettingsForm } from "@/components/admin/admin-data";
export default function AdminSettingsPage() {
  return (
    <div>
      <div className="mb-7">
        <h1 className="text-2xl font-bold text-[#102A4C]">Site settings</h1>
        <p className="mt-2 text-sm text-slate-500">
          Customise your business identity, contact details and default SEO.
        </p>
      </div>
      <SettingsForm />
    </div>
  );
}
