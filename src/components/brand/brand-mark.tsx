import Image from "next/image";

export function BrandMark({ compact = false }: { compact?: boolean }) {
  return (
    <Image
      src="/brand/logo.webp"
      alt="Prospora Leads"
      width={1983}
      height={793}
      priority={!compact}
      sizes={compact ? "160px" : "220px"}
      className={
        compact ? "h-auto w-40" : "h-auto w-[180px] max-h-[58px] object-contain"
      }
    />
  );
}
