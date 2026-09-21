"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { serviceGroups } from "@/lib/site";
import { Reveal, SplitLines, luxe } from "./motion";
import { PhysioIcon, DeviceIcon, HandsIcon, PlusIcon } from "./Icons";

const icons = { physio: PhysioIcon, device: DeviceIcon, hands: HandsIcon };

function GroupCard({ g, index }: { g: (typeof serviceGroups)[number]; index: number }) {
  const [open, setOpen] = useState<number | null>(0);
  const Icon = icons[g.icon];
  return (
    <Reveal delay={index * 0.12} y={36} className="h-full">
      <article className="card group relative flex h-full flex-col overflow-hidden rounded-[2rem] p-7 transition-[box-shadow,transform] duration-500 hover:-translate-y-1.5 hover:shadow-lift sm:p-8">
        <div aria-hidden className="absolute -right-16 -top-16 h-44 w-44 rounded-full bg-mint opacity-0 blur-2xl transition-opacity duration-700 group-hover:opacity-100" />
        <div className="relative flex items-start justify-between">
          <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-navy text-white shadow-soft transition-colors duration-500 group-hover:bg-green">
            <Icon className="h-7 w-7" />
          </span>
          <span className="font-display text-[0.7rem] font-bold tracking-[0.25em] text-mist">0{index + 1}</span>
        </div>
        <h3 className="relative mt-6 font-display text-[1.45rem] font-extrabold leading-tight text-navy">{g.title}</h3>
        <p className="relative mt-3 text-[0.95rem] leading-relaxed text-ink-soft">{g.lead}</p>

        <ul className="relative mt-6 divide-y divide-line border-t border-line">
          {g.items.map((it, i) => {
            const on = open === i;
            return (
              <li key={it.name}>
                <button
                  type="button"
                  onClick={() => setOpen(on ? null : i)}
                  aria-expanded={on}
                  className="flex w-full items-center justify-between gap-3 py-3.5 text-left"
                >
                  <span className={`font-display text-[0.86rem] font-bold transition-colors ${on ? "text-green-deep" : "text-navy"}`}>{it.name}</span>
                  <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${on ? "rotate-45 border-green bg-green text-white" : "border-line text-navy"}`}>
                    <PlusIcon className="h-3.5 w-3.5" />
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {on && (
                    <motion.div
                      key="body"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.45, ease: luxe }}
                      className="overflow-hidden"
                    >
                      <p className="pb-4 text-[0.9rem] leading-relaxed text-ink-soft">{it.text}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>
      </article>
    </Reveal>
  );
}

export default function Services() {
  return (
    <section id="szolgaltatasok" className="relative bg-ice py-24 lg:py-32">
      <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-line to-transparent" />
      <div className="container-x">
        <div className="grid items-end gap-8 lg:grid-cols-[1fr_auto]">
          <div>
            <Reveal>
              <p className="eyebrow mb-5">Szolgáltatásaink</p>
            </Reveal>
            <SplitLines
              className="display text-[clamp(2.2rem,5vw,3.8rem)] text-navy"
              lines={[
                <span key="a">Komplex terápia,</span>,
                <span key="b">
                  <span className="text-green">egy helyen.</span>
                </span>,
              ]}
            />
          </div>
          <Reveal delay={0.2}>
            <p className="max-w-md text-lg leading-relaxed text-ink-soft lg:text-right">
              Kezeléseinket külön-külön, de akár többet együttesen is felveheti – így egy valóban komplex, egyénre szabott terápiát állítunk össze.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {serviceGroups.map((g, i) => (
            <GroupCard key={g.id} g={g} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
