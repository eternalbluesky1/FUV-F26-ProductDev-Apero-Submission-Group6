"use client";

import Image from "next/image";
import { useState } from "react";
import type { BrandAsset } from "@/lib/brand-assets";

export function BrandMark({
  brand,
  compact = false
}: {
  brand: BrandAsset;
  compact?: boolean;
}) {
  const [failed, setFailed] = useState(false);
  const logo = brand.logoSrc;
  const showLogo = Boolean(logo) && !failed;

  return (
    <div
      className={`relative isolate w-full overflow-hidden ${compact ? "h-20" : "h-28 sm:h-32"}`}
      style={{
        background: `linear-gradient(150deg, ${brand.accent.from} 0%, ${brand.accent.to} 58%, #ffffff 100%)`
      }}
    >
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background: `radial-gradient(120% 130% at 8% -20%, ${brand.accent.glow} 0%, transparent 58%)`
        }}
      />
      <div
        aria-hidden
        className="absolute -top-10 right-4 h-24 w-40 rotate-12 rounded-full bg-white/40 blur-2xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-16 top-1 h-28 w-24 rotate-[24deg] bg-linear-to-r from-white/0 via-white/55 to-white/0 blur-md"
      />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-16 bg-linear-to-b from-transparent via-white/45 to-white/85"
      />
      <span
        aria-hidden
        className={`pointer-events-none absolute right-2 bottom-1 font-display leading-none font-extrabold text-ink/[0.07] ${
          compact ? "text-7xl" : "text-8xl"
        }`}
      >
        {brand.initials}
      </span>

      <div className="relative flex h-full items-center justify-center px-4 pb-1">
        {showLogo && logo ? (
          <div className={`relative ${compact ? "h-16 w-44" : "h-20 w-52"}`}>
            <Image
              src={logo}
              alt={brand.alt}
              fill
              sizes="220px"
              className="object-contain drop-shadow-[0_8px_18px_rgba(16,24,40,0.2)]"
              onError={() => setFailed(true)}
            />
          </div>
        ) : (
          <div
            aria-hidden
            className={`flex items-center justify-center rounded-2xl border border-white/70 shadow-[0_14px_30px_-16px_rgba(16,24,40,0.65)] ${
              compact ? "h-12 w-12" : "h-14 w-14"
            }`}
            style={{
              background: `linear-gradient(135deg, ${brand.accent.monogram} 0%, ${brand.accent.from} 140%)`,
              color: brand.accent.ink
            }}
          >
            <span className="font-display text-sm font-bold tracking-wide">
              {brand.initials}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
