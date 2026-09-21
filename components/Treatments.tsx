"use client";

import Image from "next/image";
import { AnimatePresence, motion, useInView } from "motion/react";
import { useRef, useState, useEffect } from "react";
import { treatments, site, type Treatment } from "@/lib/site";
import { Reveal, SplitLines, luxe } from "./motion";
import { CheckIcon, PhoneIcon } from "./Icons";

const alts: Record<Treatment["image"], string> = {
  "shock-photo": "Lökéshullám-kezelés a sarkon BTL készülékkel",
  "tr-photo": "TR Therapy rádiófrekvenciás kezelés a lábszáron",
  device: "BTL fizikoterápiás készülékek a kezelőben",
};

function Block({ t, index, onActive }: { t: Treatment; index: number; onActive: (i: number) => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-45% 0px -45% 0px" });
  useEffect(() => {
    if (inView) onActive(index);
  }, [inView, index, onActive]);

  return (
    <div ref={ref} className="py-10 lg:min-h-[85vh] lg:py-16">
      {/* mobilon a kép a blokk fölött */}
      <Reveal className="relative mb-8 aspect-[4/3] overflow-hidden rounded-[2rem] lg:hidden">
        <Image src={`/img/site/${t.image}.webp`} alt={alts[t.image]} fill sizes="90vw" className="object-cover" />
      </Reveal>

      <Reveal>
        <p className="eyebrow eyebrow-light mb-5">{t.kicker}</p>
      </Reveal>
      <SplitLines
        as="h3"
        className="display text-[clamp(2rem,4.4vw,3.4rem)] text-white"
        lines={[<span key="a">{t.title}</span>]}
      />
      <Reveal delay={0.1}>
        <p className="font-script mt-3 text-[1.9rem] font-semibold leading-none text-green-light">{t.question}</p>
      </Reveal>
      <div className="mt-7 space-y-4 text-[1.02rem] leading-relaxed text-white/75">
        {t.text.map((p, i) => (
          <Reveal key={i} as="p" delay={0.15 + i * 0.08}>
            {p}
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.25} className="mt-8">
        <p className="font-display text-[0.68rem] font-bold uppercase tracking-[0.2em] text-green-light">Mikor segíthet?</p>
        <ul className="mt-4 grid gap-x-6 gap-y-2.5 sm:grid-cols-2">
          {t.helps.map((h, i) => (
            <motion.li
              key={h}
              className="flex items-start gap-2.5 text-[0.93rem] text-white/85"
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + i * 0.05, duration: 0.5, ease: luxe }}
            >
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-green/20 text-green-light">
                <CheckIcon className="h-3 w-3" />
              </span>
              {h}
            </motion.li>
          ))}
        </ul>
      </Reveal>

      {t.note && (
        <Reveal delay={0.35} className="mt-8 rounded-2xl border border-green/30 bg-green/10 px-5 py-4 text-[0.95rem] text-white/90">
          {t.note}
        </Reveal>
      )}
    </div>
  );
}

export default function Treatments() {
  const [active, setActive] = useState(0);

  return (
    <section id="kezelesek" className="relative overflow-clip bg-navy py-20 text-white lg:py-28">
      <div aria-hidden className="absolute -left-40 top-1/3 h-[600px] w-[600px] rounded-full bg-green/10 blur-3xl" />
      <div aria-hidden className="absolute -right-40 bottom-0 h-[500px] w-[500px] rounded-full bg-sky/10 blur-3xl" />
      <div aria-hidden className="noise pointer-events-none absolute inset-0" />

      <div className="container-x relative">
        <div className="max-w-3xl">
          <Reveal>
            <p className="eyebrow eyebrow-light mb-5">Kiemelt kezeléseink</p>
          </Reveal>
          <SplitLines
            className="display text-[clamp(1.8rem,5vw,3.8rem)] text-white"
            lines={[
              <span key="a">Gyógyszermentes,</span>,
              <span key="b">
                <span className="text-green-light">célzott</span> kezelések.
              </span>,
            ]}
          />
          <Reveal delay={0.2}>
            <p className="mt-6 text-lg leading-relaxed text-white/70">
              A legmodernebb BTL készülékekkel dolgozunk. A cél nem a tünet átmeneti enyhítése, hanem a mozgás és a funkció helyreállításának támogatása.
            </p>
          </Reveal>
        </div>

        <div className="mt-8 grid gap-10 lg:mt-16 lg:grid-cols-[1fr_1fr] lg:gap-20">
          {/* sticky kép – csak desktopon */}
          <div className="hidden lg:block">
            <div className="sticky top-28">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[2.5rem] border border-white/10 shadow-lift">
                <AnimatePresence mode="sync">
                  {treatments.map((t, i) =>
                    i === active ? (
                      <motion.div
                        key={t.id}
                        className="absolute inset-0"
                        initial={{ opacity: 0, scale: 1.08, clipPath: "inset(0 0 100% 0)" }}
                        animate={{ opacity: 1, scale: 1, clipPath: "inset(0 0 0% 0)" }}
                        exit={{ opacity: 0, scale: 1.02 }}
                        transition={{ duration: 0.9, ease: luxe }}
                      >
                        <Image src={`/img/site/${t.image}.webp`} alt={alts[t.image]} fill sizes="45vw" className="object-cover" />
                      </motion.div>
                    ) : null
                  )}
                </AnimatePresence>
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy-900/70 via-transparent to-transparent" />
                <div className="absolute bottom-7 left-7 right-7 flex items-end justify-between">
                  <div>
                    <p className="font-display text-[0.62rem] font-bold uppercase tracking-[0.25em] text-green-light">
                      {String(active + 1).padStart(2, "0")} / {String(treatments.length).padStart(2, "0")}
                    </p>
                    <p className="mt-1 font-display text-xl font-extrabold">{treatments[active].title}</p>
                  </div>
                  <div className="flex gap-1.5">
                    {treatments.map((t, i) => (
                      <span key={t.id} className={`h-1.5 rounded-full transition-all duration-500 ${i === active ? "w-8 bg-green" : "w-3 bg-white/40"}`} />
                    ))}
                  </div>
                </div>
              </div>

              <a href={site.phoneHref} className="btn btn-green mt-6 w-full">
                <PhoneIcon className="h-4 w-4" />
                Időpontkérés: {site.phone}
              </a>
            </div>
          </div>

          <div className="divide-y divide-white/10">
            {treatments.map((t, i) => (
              <Block key={t.id} t={t} index={i} onActive={setActive} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
