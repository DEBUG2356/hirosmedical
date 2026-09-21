"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { useEffect } from "react";
import { CloseIcon, ChevronIcon } from "./Icons";
import { luxe } from "./motion";

export type LightboxItem = { src: string; alt: string; w: number; h: number; caption?: string };

export default function Lightbox({
  items,
  index,
  onClose,
  onIndex,
}: {
  items: readonly LightboxItem[];
  index: number | null;
  onClose: () => void;
  onIndex: (i: number) => void;
}) {
  const open = index !== null;
  const i = index ?? 0;
  const item = open ? items[i] : null;

  useEffect(() => {
    if (!open) return;
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onIndex((i + 1) % items.length);
      if (e.key === "ArrowLeft") onIndex((i - 1 + items.length) % items.length);
    };
    window.addEventListener("keydown", key);
    document.documentElement.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", key);
      document.documentElement.style.overflow = "";
    };
  }, [open, i, items.length, onClose, onIndex]);

  return (
    <AnimatePresence>
      {item && (
        <motion.div
          key="lb"
          className="fixed inset-0 z-[80] flex items-center justify-center bg-navy-900/90 p-4 backdrop-blur-md sm:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          role="dialog"
          aria-modal
          aria-label={item.alt}
        >
          <button
            type="button"
            onClick={onClose}
            className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition hover:bg-white/20"
            aria-label="Bezárás"
          >
            <CloseIcon className="h-5 w-5" />
          </button>
          {items.length > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onIndex((i - 1 + items.length) % items.length);
                }}
                className="absolute left-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition hover:bg-white/20 sm:left-6"
                aria-label="Előző"
              >
                <ChevronIcon className="h-5 w-5 rotate-180" />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onIndex((i + 1) % items.length);
                }}
                className="absolute right-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition hover:bg-white/20 sm:right-6"
                aria-label="Következő"
              >
                <ChevronIcon className="h-5 w-5" />
              </button>
            </>
          )}
          <motion.figure
            key={item.src}
            className="relative flex max-h-full max-w-5xl flex-col items-center"
            initial={{ opacity: 0, scale: 0.94, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.5, ease: luxe }}
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={item.src}
              alt={item.alt}
              width={item.w}
              height={item.h}
              sizes="100vw"
              className="max-h-[82vh] w-auto rounded-2xl object-contain shadow-lift"
              priority
            />
            <figcaption className="mt-4 text-center text-sm text-white/70">{item.caption ?? item.alt}</figcaption>
          </motion.figure>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
