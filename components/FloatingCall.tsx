"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { site } from "@/lib/site";
import { PhoneIcon } from "./Icons";

/** Mobilon lebegő hívás-gomb, ami a hero után jelenik meg. */
export default function FloatingCall() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [300, 600], [120, 0]);
  const opacity = useTransform(scrollY, [300, 600], [0, 1]);
  return (
    <motion.a
      href={site.phoneHref}
      style={{ y, opacity }}
      className="fixed bottom-5 right-5 z-[60] flex items-center gap-3 rounded-full bg-green px-5 py-3.5 font-display text-sm font-bold text-white shadow-lift md:hidden"
      aria-label="Hívás"
    >
      <span className="relative flex h-5 w-5 items-center justify-center">
        <span className="absolute inset-0 animate-[pulse-ring_1.8s_ease-out_infinite] rounded-full bg-white/60" />
        <PhoneIcon className="relative h-4 w-4" />
      </span>
      Bejelentkezés
    </motion.a>
  );
}
