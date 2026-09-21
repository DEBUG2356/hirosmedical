import Image from "next/image";
import { site } from "@/lib/site";

/** Logó: világos háttéren az eredeti színes PNG, sötéten maszkolt fehér változat. */
export function LogoMark({ light = false, className = "h-11 w-11" }: { light?: boolean; className?: string }) {
  if (light) {
    return <span aria-hidden className={`logo-mask block bg-white ${className}`} />;
  }
  return (
    <Image
      src="/img/logo-256.png"
      alt=""
      width={256}
      height={277}
      className={`${className} object-contain`}
      priority
    />
  );
}

export function Wordmark({ light = false, className = "" }: { light?: boolean; className?: string }) {
  return (
    <span className={`font-display leading-none ${className}`}>
      <span className={`block text-[1.05rem] font-extrabold tracking-tight ${light ? "text-white" : "text-navy"}`}>
        Hírös
      </span>
      <span className={`mt-0.5 block text-[0.62rem] font-semibold uppercase tracking-[0.2em] ${light ? "text-green-light" : "text-green-deep"}`}>
        Medical Center
      </span>
    </span>
  );
}

export function LogoLockup({ light = false }: { light?: boolean }) {
  return (
    <span className="flex items-center gap-3" aria-label={site.name}>
      <LogoMark light={light} />
      <Wordmark light={light} />
    </span>
  );
}

/** A logó zöld íve önálló díszítőelemként (a plakát „arc” motívuma). */
export function Arc({ className = "", id = "arc" }: { className?: string; id?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden>
      <defs>
        <linearGradient id={`${id}-g`} x1="0" y1="1" x2="1" y2="0">
          <stop offset="0" stopColor="#3f8f4d" />
          <stop offset="0.5" stopColor="#5fae6b" />
          <stop offset="1" stopColor="#a9dcb2" />
        </linearGradient>
      </defs>
      <path d="M16.7 84.5 A48 48 0 1 1 84.5 16.7 A50 50 0 0 0 16.7 84.5 Z" fill={`url(#${id}-g)`} />
    </svg>
  );
}
