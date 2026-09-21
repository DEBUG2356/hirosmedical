"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { site, stats, values } from "@/lib/site";
import { Reveal, SplitLines, Counter, luxe } from "./motion";
import { CheckIcon } from "./Icons";

export default function About() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y1 = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const y2 = useTransform(scrollYProgress, [0, 1], [80, -60]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -90]);

  return (
    <section id="rolunk" ref={ref} className="relative overflow-hidden bg-ice py-24 lg:py-32">
      <div className="container-x grid items-center gap-16 lg:grid-cols-[1fr_1fr] lg:gap-20">
        {/* kollázs */}
        <div className="relative mx-auto aspect-[0.82] w-full max-w-[560px] sm:aspect-[0.95]">
          <motion.div style={{ y: y1 }} className="absolute left-0 top-0 h-[72%] w-[70%]">
            <Reveal className="h-full" y={40}>
              <div className="relative h-full overflow-hidden rounded-[2rem] shadow-lift">
                <Image src="/img/site/treatment.webp" alt="Kezelőhelyiség a Hírös Medical Centerben" fill sizes="(min-width:1024px) 35vw, 70vw" className="object-cover" />
              </div>
            </Reveal>
          </motion.div>
          <motion.div style={{ y: y2 }} className="absolute bottom-[6%] right-0 h-[52%] w-[56%]">
            <Reveal className="h-full" y={50} delay={0.15}>
              <div className="relative h-full overflow-hidden rounded-[2rem] border-[6px] border-ice shadow-lift">
                <Image src="/img/site/gym-balls.webp" alt="Bordásfal és fitneszlabdák a tornateremben" fill sizes="(min-width:1024px) 28vw, 56vw" className="object-cover" />
              </div>
            </Reveal>
          </motion.div>
          <motion.div style={{ y: y3 }} className="absolute bottom-0 left-[2%] w-[82%] sm:left-[4%] sm:w-[54%]">
            <Reveal delay={0.3} y={30}>
              <div className="card flex items-center gap-4 rounded-[1.5rem] p-4 shadow-lift">
                <span className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full border-2 border-green/40">
                  <Image src="/img/site/andrea.webp" alt={site.founder.name} fill sizes="64px" className="object-cover object-top" />
                </span>
                <span>
                  <span className="block font-display text-[0.92rem] font-extrabold leading-tight text-navy">{site.founder.name}</span>
                  <span className="mt-1 block text-[0.72rem] leading-snug text-ink-soft">
                    {site.founder.titles.join(", ")}, {site.founder.role}
                  </span>
                </span>
              </div>
            </Reveal>
          </motion.div>
          <motion.span
            aria-hidden
            className="absolute -right-4 top-[8%] flex h-24 w-24 items-center justify-center rounded-full bg-green text-center font-display text-[0.62rem] font-extrabold uppercase leading-tight tracking-[0.12em] text-white shadow-glow sm:h-28 sm:w-28"
            initial={{ scale: 0, rotate: -20 }}
            whileInView={{ scale: 1, rotate: -8 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.8, ease: luxe }}
          >
            10+ év
            <br />
            tapasztalat
          </motion.span>
        </div>

        {/* szöveg */}
        <div>
          <Reveal>
            <p className="eyebrow mb-5">Rólunk</p>
          </Reveal>
          <SplitLines
            className="display text-[clamp(2.2rem,5vw,3.8rem)] text-navy"
            lines={[
              <span key="a">Szakértelem,</span>,
              <span key="b">
                <span className="text-green">odafigyelés</span>,
              </span>,
              <span key="c">modern eszközök.</span>,
            ]}
          />
          <Reveal delay={0.15}>
            <p className="mt-6 text-lg leading-relaxed text-ink-soft">
              Több mint 10 éves szakmai tapasztalattal, színvonalas környezetben, a legmodernebb fizioterápiás készülékek és eszközök használatával igyekszünk megoldást nyújtani betegeink szimptómáira, fájdalmára.
            </p>
          </Reveal>

          <ul className="mt-8 grid grid-cols-2 gap-x-6 gap-y-6 border-y border-line py-7 sm:grid-cols-4">
            {stats.map((s, i) => (
              <Reveal as="li" key={s.label} delay={0.2 + i * 0.08} y={16}>
                <span className="block font-display text-[2.2rem] font-black leading-none text-navy">
                  <Counter value={s.value} suffix={"suffix" in s ? s.suffix : ""} />
                </span>
                <span className="mt-1.5 block text-[0.78rem] leading-snug text-ink-soft">{s.label}</span>
              </Reveal>
            ))}
          </ul>

          <ul className="mt-8 space-y-4">
            {values.map((v, i) => (
              <Reveal as="li" key={v.title} delay={0.25 + i * 0.07} y={16} className="flex gap-4">
                <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-green text-white">
                  <CheckIcon className="h-3.5 w-3.5" />
                </span>
                <span>
                  <span className="block font-display text-[0.95rem] font-bold text-navy">{v.title}</span>
                  <span className="mt-0.5 block text-[0.92rem] leading-relaxed text-ink-soft">{v.text}</span>
                </span>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
