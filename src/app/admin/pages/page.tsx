import { PagesEditor } from "@/components/admin/pages-editor";
export default function AdminPagesPage() {
  return (
    <div>
      <div className="mb-7">
        <h1 className="text-2xl font-bold text-[#102A4C]">Pages & SEO</h1>
        <p className="mt-2 text-sm text-slate-500">
          Edit page titles, descriptions, publication status and search
          metadata.
        </p>
      </div>
      <PagesEditor />
    </div>
  );
}
