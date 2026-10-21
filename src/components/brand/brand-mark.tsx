import Image from "next/image";

export function BrandMark({ compact = false }: { compact?: boolean }) {
  return (
    <Image
      src="/brand/logo.webp"
      alt="Propspora Leads"
      width={1983}
      height={793}
      priority={!compact}
      sizes={compact ? "160px" : "220px"}
      className={compact ? "h-auto w-40" : "h-auto w-[220px] max-h-14 object-contain"}
    />
  );
}
