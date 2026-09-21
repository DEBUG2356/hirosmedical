"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { useMemo, useState } from "react";
import { groupClasses, days, classPerks, site, type Day, type GroupClass } from "@/lib/site";
import { posterImages } from "@/lib/images";
import { Reveal, SplitLines, luxe } from "./motion";
import { ClockIcon, GroupIcon, PhysioIcon, ChatIcon, PinIcon, PhoneIcon, ArrowIcon } from "./Icons";
import Lightbox from "./Lightbox";

const perkIcons = { clock: ClockIcon, group: GroupIcon, physio: PhysioIcon };

const hue: Record<GroupClass["hue"], { text: string; bg: string; ring: string; dot: string }> = {
  green: { text: "text-green", bg: "bg-mint", ring: "border-green/40", dot: "bg-green" },
  navy: { text: "text-navy-700", bg: "bg-ice-2", ring: "border-navy/30", dot: "bg-navy" },
  teal: { text: "text-teal", bg: "bg-[#e2f4f3]", ring: "border-teal/40", dot: "bg-teal" },
  lime: { text: "text-[#7a9a1e]", bg: "bg-[#f1f7dc]", ring: "border-lime/60", dot: "bg-lime" },
  sky: { text: "text-sky", bg: "bg-[#e6f1fa]", ring: "border-sky/40", dot: "bg-sky" },
  moss: { text: "text-moss", bg: "bg-[#eef3e2]", ring: "border-moss/40", dot: "bg-moss" },
};

type Slot = { time: string; cls: GroupClass };

function slotsFor(day: Day): Slot[] {
  return groupClasses
    .flatMap((cls) => cls.slots.filter((s) => s.day === day).map((s) => ({ time: s.time, cls })))
    .sort((a, b) => a.time.localeCompare(b.time));
}

export default function Classes() {
  const [day, setDay] = useState<Day>("H");
  const [lb, setLb] = useState<number | null>(null);
  const week = useMemo(() => days.map((d) => ({ ...d, slots: slotsFor(d.key) })), []);
  const posters = groupClasses.map((c) => {
    const p = posterImages[c.poster];
    return { src: `/img/posters/${c.poster}.webp`, alt: p.alt, w: p.w, h: p.h, caption: `${c.title.join(" ")} – plakát` };
  });

  return (
    <section id="orak" className="relative overflow-hidden bg-white py-24 lg:py-32">
      <div aria-hidden className="absolute -left-32 top-24 h-[420px] w-[420px] rounded-full bg-mint/70 blur-3xl" />

      <div className="container-x relative">
        {/* fejléc */}
        <div className="grid items-end gap-10 lg:grid-cols-[1.25fr_0.75fr]">
          <div>
            <Reveal>
              <p className="eyebrow mb-5">Kiscsoportos órák · Új órarend</p>
            </Reveal>
            <SplitLines
              className="display text-[clamp(2.3rem,4.6vw,3.6rem)] text-navy"
              lines={[
                <span key="a">Mozgásban maradni</span>,
                <span key="b" className="text-green">
                  minden életkorban.
                </span>,
              ]}
            />
            <Reveal delay={0.2}>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-soft">
                Gyógytornász által vezetett kiscsoportos órák az erő, az egyensúly és a magabiztos mozgás megőrzéséért. Hogy mindenkire maximális figyelem jusson, a csoportok létszámát{" "}
                <strong className="font-bold text-navy">szigorúan legfeljebb 8 főben</strong> határoztuk meg.
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.25}>
            <ul className="grid grid-cols-3 divide-x divide-line rounded-[2rem] border border-line bg-ice/60 p-2">
              {classPerks.map((p) => {
                const Icon = perkIcons[p.icon];
                return (
                  <li key={p.label} className="flex flex-col items-center gap-3 px-3 py-5 text-center">
                    <span className="flex h-12 w-12 items-center justify-center rounded-full border border-green/30 bg-white text-navy shadow-soft">
                      <Icon className="h-6 w-6" />
                    </span>
                    <span className="font-display text-[0.64rem] font-bold uppercase leading-snug tracking-[0.12em] text-navy">{p.label}</span>
                    {"sub" in p && <span className="-mt-1.5 text-[0.7rem] text-ink-soft">{p.sub}</span>}
                  </li>
                );
              })}
            </ul>
          </Reveal>
        </div>

        {/* órarend */}
        <Reveal className="mt-16" y={40}>
          <div className="card overflow-hidden rounded-[2rem]">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-line px-6 py-5 sm:px-8">
              <div>
                <p className="font-display text-[0.66rem] font-bold uppercase tracking-[0.25em] text-green-deep">Heti órarend</p>
                <p className="mt-1 font-display text-lg font-extrabold text-navy">Mikor tudsz jönni?</p>
              </div>
              {/* nap-váltó (mobil/tablet) */}
              <div className="scroll-x -mx-2 flex max-w-full gap-1 overflow-x-auto px-2 lg:hidden">
                {days.map((d) => (
                  <button
                    key={d.key}
                    type="button"
                    onClick={() => setDay(d.key)}
                    className={`relative rounded-full px-4 py-2 font-display text-[0.78rem] font-bold transition-colors ${day === d.key ? "text-white" : "text-navy hover:text-green-deep"}`}
                  >
                    {day === d.key && (
                      <motion.span layoutId="day-pill" className="absolute inset-0 rounded-full bg-navy" transition={{ type: "spring", stiffness: 380, damping: 32 }} />
                    )}
                    <span className="relative">{d.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* mobil: kiválasztott nap listája */}
            <div className="lg:hidden">
              <AnimatePresence mode="wait">
                <motion.ul
                  key={day}
                  initial="hidden"
                  animate="show"
                  exit="hidden"
                  variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06 } } }}
                  className="divide-y divide-line"
                >
                  {slotsFor(day).map((s) => {
                    const h = hue[s.cls.hue];
                    return (
                      <motion.li
                        key={s.cls.id + s.time}
                        variants={{ hidden: { opacity: 0, x: -12 }, show: { opacity: 1, x: 0, transition: { duration: 0.4, ease: luxe } } }}
                        className="flex items-center gap-4 px-6 py-4 sm:px-8"
                      >
                        <span className="w-14 shrink-0 font-display text-lg font-extrabold text-green">{s.time}</span>
                        <span className={`h-2.5 w-2.5 shrink-0 rounded-full ${h.dot}`} />
                        <span>
                          <span className="block font-display text-[0.9rem] font-bold text-navy">{s.cls.title.join(" ")}</span>
                          <span className="block text-xs text-ink-soft">{s.cls.audience} · 60 perc</span>
                        </span>
                      </motion.li>
                    );
                  })}
                </motion.ul>
              </AnimatePresence>
            </div>

            {/* desktop: teljes hét */}
            <div className="hidden grid-cols-5 divide-x divide-line lg:grid">
              {week.map((d, di) => (
                <div key={d.key} className="min-h-[300px] p-4">
                  <p className="mb-4 font-display text-[0.72rem] font-bold uppercase tracking-[0.2em] text-navy">{d.label}</p>
                  <ul className="space-y-2.5">
                    {d.slots.map((s, si) => {
                      const h = hue[s.cls.hue];
                      return (
                        <motion.li
                          key={s.cls.id + s.time}
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.1 + di * 0.06 + si * 0.05, duration: 0.5, ease: luxe }}
                          className={`group rounded-2xl border ${h.ring} ${h.bg} px-3.5 py-3 transition-transform duration-300 hover:-translate-y-0.5`}
                        >
                          <span className={`block font-display text-[1.05rem] font-extrabold ${h.text}`}>{s.time}</span>
                          <span className="mt-0.5 block font-display text-[0.78rem] font-bold leading-tight text-navy">{s.cls.title.join(" ")}</span>
                          <span className="mt-1 block text-[0.68rem] text-ink-soft">{s.cls.audience}</span>
                        </motion.li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* óra-kártyák plakát-stílusban */}
        <div className="mt-16 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {groupClasses.map((c, i) => {
            const h = hue[c.hue];
            return (
              <Reveal key={c.id} delay={(i % 3) * 0.1} y={36}>
                <article className="card group relative flex h-full flex-col overflow-hidden rounded-[2rem] transition-[transform,box-shadow] duration-500 hover:-translate-y-1.5 hover:shadow-lift">
                  <div className="relative p-7 pb-0">
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="display min-w-0 text-[1.55rem] leading-[0.95] sm:text-[1.9rem]">
                        <span className="block text-navy">{c.title[0]}</span>
                        <span className={`block ${h.text}`}>{c.title[1]}</span>
                      </h3>
                      <button
                        type="button"
                        onClick={() => setLb(i)}
                        className="relative h-20 w-16 shrink-0 overflow-hidden rounded-xl border border-line shadow-soft transition-transform duration-500 group-hover:scale-105 group-hover:rotate-2"
                        aria-label={`${c.title.join(" ")} plakát megnyitása`}
                      >
                        <Image src={`/img/posters/${c.poster}.webp`} alt="" fill sizes="64px" className="object-cover object-top" />
                      </button>
                    </div>
                    <p className="mt-4 font-display text-[0.95rem] font-bold leading-snug text-navy">{c.tagline}</p>
                    <p className="mt-3 text-[0.93rem] leading-relaxed text-ink-soft">{c.text}</p>
                  </div>

                  <div className="mt-auto p-7 pt-6">
                    <div className="flex flex-wrap gap-2">
                      {c.slots.map((s) => (
                        <span key={s.day + s.time} className={`inline-flex items-center gap-1.5 rounded-full border ${h.ring} ${h.bg} px-3 py-1.5 font-display text-[0.72rem] font-bold text-navy`}>
                          {days.find((d) => d.key === s.day)!.label}
                          <span className={h.text}>{s.time}</span>
                        </span>
                      ))}
                    </div>
                    <div className="mt-5 flex items-center justify-between border-t border-line pt-4 text-[0.72rem] text-ink-soft">
                      <span className="inline-flex items-center gap-1.5">
                        <GroupIcon className="h-4 w-4 text-navy" /> {c.audience}
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <ClockIcon className="h-4 w-4 text-navy" /> 60 perc
                      </span>
                    </div>
                  </div>

                  <span aria-hidden className={`absolute bottom-0 left-0 h-1 w-0 ${h.dot} transition-[width] duration-700 group-hover:w-full`} />
                </article>
              </Reveal>
            );
          })}
        </div>

        {/* a plakát navy sávja */}
        <Reveal className="mt-14" y={30}>
          <div className="relative overflow-hidden rounded-[2rem] bg-navy text-white">
            <div aria-hidden className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-green/20 blur-3xl" />
            <div className="relative grid gap-8 p-8 sm:p-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
              <div>
                <p className="flex items-center gap-4 font-display text-[clamp(1.1rem,2.4vw,1.6rem)] font-bold uppercase tracking-[0.06em]">
                  <span className="h-2.5 w-9 shrink-0 rounded-full bg-green" aria-hidden />
                  {site.tagline}
                </p>
                <p className="font-script mt-2 pl-[3.25rem] text-[clamp(2rem,4vw,2.8rem)] font-semibold leading-none text-green-light">{site.script}</p>
              </div>
              <div className="flex items-start gap-4 rounded-[1.5rem] bg-white p-5 text-navy sm:p-6">
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-2 border-navy">
                  <ChatIcon className="h-7 w-7" />
                </span>
                <div>
                  <p className="font-display text-[0.8rem] font-extrabold uppercase tracking-wide text-green-deep">Érdeklődés és jelentkezés</p>
                  <p className="mt-1 text-[0.95rem] font-semibold leading-snug">
                    telefonon vagy személyesen
                    <br />a Hírös Medical Centerben
                  </p>
                  <p className="mt-3 flex items-center gap-2 text-sm">
                    <PinIcon className="h-4 w-4 text-navy" /> {site.address.city}, {site.address.street}
                  </p>
                  <a href={site.phoneHref} className="mt-1.5 flex items-center gap-2 text-sm font-bold hover:text-green-deep">
                    <PhoneIcon className="h-4 w-4 text-navy" /> Telefonszám: {site.phone}
                    <ArrowIcon className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>

      <Lightbox items={posters} index={lb} onClose={() => setLb(null)} onIndex={setLb} />
    </section>
  );
}
