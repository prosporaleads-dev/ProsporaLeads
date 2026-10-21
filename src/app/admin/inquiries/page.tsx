import { InquiriesTable } from "@/components/admin/admin-data";
export default function AdminInquiriesPage() {
  return (
    <div>
      <div className="mb-7">
        <h1 className="text-2xl font-bold text-[#102A4C]">Contact enquiries</h1>
        <p className="mt-2 text-sm text-slate-500">
          New leads submitted through the website contact form.
        </p>
      </div>
      <InquiriesTable />
    </div>
  );
}
