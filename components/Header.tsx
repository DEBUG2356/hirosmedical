"use client";

import Link from "next/link";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { useEffect, useState } from "react";
import { nav, site } from "@/lib/site";
import { LogoLockup } from "./Logo";
import { PhoneIcon, CloseIcon } from "./Icons";
import { luxe } from "./motion";

export default function Header() {
  const { scrollY } = useScroll();
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (v) => setSolid(v > 40));

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <motion.header
        initial={{ y: -90, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: luxe, delay: 0.2 }}
        className="fixed inset-x-0 top-0 z-[60]"
      >
        <div
          className={`transition-[background-color,box-shadow,backdrop-filter] duration-500 ${
            solid ? "bg-white/85 shadow-[0_1px_0_rgb(216_226_238),0_12px_32px_-20px_rgb(20_34_56/0.35)] backdrop-blur-xl" : "bg-transparent"
          }`}
        >
          <div className="container-x flex h-[76px] items-center justify-between lg:h-[84px]">
            <Link href="/" className="shrink-0" onClick={() => setOpen(false)}>
              <LogoLockup />
            </Link>

            <nav className="hidden items-center gap-1 lg:flex" aria-label="Fő navigáció">
              {nav.map((n) => (
                <a
                  key={n.href}
                  href={n.href}
                  className="group relative px-3.5 py-2 font-display text-[0.78rem] font-semibold tracking-wide text-navy"
                >
                  {n.label}
                  <span className="absolute inset-x-3.5 -bottom-0.5 h-[2px] origin-left scale-x-0 rounded-full bg-green transition-transform duration-300 ease-out group-hover:scale-x-100" />
                </a>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <a href={site.phoneHref} className="btn btn-green hidden md:inline-flex">
                <PhoneIcon className="h-4 w-4" />
                {site.phone}
              </a>
              <button
                type="button"
                onClick={() => setOpen((o) => !o)}
                className="relative flex h-11 w-11 items-center justify-center rounded-full border border-line bg-white/70 text-navy backdrop-blur lg:hidden"
                aria-label={open ? "Menü bezárása" : "Menü megnyitása"}
                aria-expanded={open}
              >
                <span className="flex w-5 flex-col gap-[5px]">
                  <span className={`h-[2px] rounded bg-current transition-transform duration-300 ${open ? "translate-y-[7px] rotate-45" : ""}`} />
                  <span className={`h-[2px] rounded bg-current transition-opacity duration-300 ${open ? "opacity-0" : ""}`} />
                  <span className={`h-[2px] rounded bg-current transition-transform duration-300 ${open ? "-translate-y-[7px] -rotate-45" : ""}`} />
                </span>
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            key="menu"
            className="fixed inset-0 z-[55] flex flex-col bg-navy text-white lg:hidden"
            initial={{ clipPath: "circle(0% at calc(100% - 44px) 40px)" }}
            animate={{ clipPath: "circle(150% at calc(100% - 44px) 40px)" }}
            exit={{ clipPath: "circle(0% at calc(100% - 44px) 40px)" }}
            transition={{ duration: 0.7, ease: luxe }}
          >
            <div className="absolute -left-24 -top-24 h-80 w-80 rounded-full bg-green/20 blur-3xl" />
            <div className="absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-sky/15 blur-3xl" />
            <button
              type="button"
              className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full border border-white/20"
              onClick={() => setOpen(false)}
              aria-label="Menü bezárása"
            >
              <CloseIcon className="h-5 w-5" />
            </button>
            <nav className="container-x relative flex flex-1 flex-col justify-center gap-1 pt-16" aria-label="Mobil navigáció">
              {nav.map((n, i) => (
                <motion.a
                  key={n.href}
                  href={n.href}
                  onClick={() => setOpen(false)}
                  className="display flex items-baseline gap-4 py-2 text-[2rem] text-white sm:text-[2.6rem]"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.25 + i * 0.06, duration: 0.6, ease: luxe }}
                >
                  <span className="font-display text-xs font-semibold tracking-[0.25em] text-green-light">0{i + 1}</span>
                  {n.label}
                </motion.a>
              ))}
              <motion.div
                className="mt-8 flex flex-col gap-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.75, duration: 0.6 }}
              >
                <a href={site.phoneHref} className="btn btn-green w-full">
                  <PhoneIcon className="h-4 w-4" /> {site.phone}
                </a>
                <p className="text-sm text-white/60">
                  {site.address.zip} {site.address.city}, {site.address.street}
                </p>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
