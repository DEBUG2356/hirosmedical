"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { complaints, site } from "@/lib/site";
import { Reveal, SplitLines, luxe } from "./motion";
import { PhoneIcon, ArrowIcon } from "./Icons";

type Id = (typeof complaints)[number]["id"];

// A hotspotok helye a 100×200-as piktogram-alakon.
const spots: Record<Id, { x: number; y: number }> = {
  vall: { x: 35, y: 37 },
  izom: { x: 62, y: 31 },
  derek: { x: 50, y: 74 },
  konyok: { x: 30, y: 70 },
  kez: { x: 72, y: 101 },
  csipo: { x: 58, y: 128 },
  sarok: { x: 41, y: 181 },
};

export default function BodyMap() {
  const [active, setActive] = useState<Id>("derek");
  const [hover, setHover] = useState(false);

  // amíg nem érinti a felhasználó, körbejár a kiemelés
  useEffect(() => {
    if (hover) return;
    const t = setInterval(() => {
      setActive((a) => {
        const i = complaints.findIndex((c) => c.id === a);
        return complaints[(i + 1) % complaints.length].id;
      });
    }, 2600);
    return () => clearInterval(t);
  }, [hover]);

  const current = complaints.find((c) => c.id === active)!;

  return (
    <section id="panaszok" className="relative overflow-hidden bg-white py-24 lg:py-32">
      <div aria-hidden className="absolute right-0 top-0 -z-0 h-[600px] w-[600px] translate-x-1/3 -translate-y-1/3 rounded-full bg-ice" />
      <div className="container-x relative grid items-center gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        {/* alak */}
        <Reveal className="relative mx-auto w-full max-w-[400px]" y={40}>
          <div className="card relative overflow-hidden rounded-[2rem] bg-gradient-to-b from-white to-ice p-6 sm:p-8">
            <div aria-hidden className="grid-dots absolute inset-0 opacity-60 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
            <svg
              viewBox="0 0 100 200"
              className="relative mx-auto h-auto w-full max-w-[280px]"
              onPointerEnter={() => setHover(true)}
              onPointerLeave={() => setHover(false)}
            >
              <defs>
                <linearGradient id="bodyg" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#274b7a" />
                  <stop offset="1" stopColor="#1b3a63" />
                </linearGradient>
              </defs>
              {/* piktogram: vastag, lekerekített vonalakból */}
              <g stroke="url(#bodyg)" strokeLinecap="round" strokeLinejoin="round" fill="none">
                <motion.circle cx="50" cy="14" r="9" fill="url(#bodyg)" stroke="none" initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, ease: luxe }} style={{ transformOrigin: "50px 14px" }} />
                <motion.path d="M50 26 V32" strokeWidth="8" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: 0.2 }} />
                <motion.path d="M38 36 H62 L58 84 H42 Z" strokeWidth="10" fill="url(#bodyg)" initial={{ pathLength: 0, fillOpacity: 0 }} whileInView={{ pathLength: 1, fillOpacity: 1 }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.25, ease: luxe }} />
                <motion.path d="M38 38 L31 70 L28 100" strokeWidth="9" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.5, ease: luxe }} />
                <motion.path d="M62 38 L69 70 L72 100" strokeWidth="9" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.5, ease: luxe }} />
                <motion.path d="M44 86 L42 128 L41 178" strokeWidth="11" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 0.9, delay: 0.7, ease: luxe }} />
                <motion.path d="M56 86 L58 128 L59 178" strokeWidth="11" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 0.9, delay: 0.7, ease: luxe }} />
                <motion.path d="M41 180 L34 182" strokeWidth="7" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: 1.3 }} />
                <motion.path d="M59 180 L66 182" strokeWidth="7" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: 1.3 }} />
                {/* gerinc pöttyök a logóból */}
                {[44, 52, 60, 68, 76].map((y, i) => (
                  <motion.circle key={y} cx="50" cy={y} r="1.6" fill="#a9dcb2" stroke="none" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 1.1 + i * 0.08 }} />
                ))}
              </g>

              {/* hotspotok */}
              {complaints.map((c, i) => {
                const s = spots[c.id];
                const on = c.id === active;
                return (
                  <motion.g
                    key={c.id}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 1.2 + i * 0.1, duration: 0.5, ease: luxe }}
                    style={{ transformOrigin: `${s.x}px ${s.y}px`, cursor: "pointer" }}
                    onPointerEnter={() => setActive(c.id)}
                    onClick={() => setActive(c.id)}
                  >
                    <circle cx={s.x} cy={s.y} r="7" fill={on ? "#5fae6b" : "#5fae6b"} opacity={on ? 0.25 : 0.12}>
                      <animate attributeName="r" values="4;9;4" dur={`${2.2 + i * 0.2}s`} repeatCount="indefinite" />
                    </circle>
                    <motion.circle
                      cx={s.x}
                      cy={s.y}
                      r="3.2"
                      fill={on ? "#5fae6b" : "#fff"}
                      stroke={on ? "#3f8f4d" : "#5fae6b"}
                      strokeWidth="1.4"
                      animate={{ scale: on ? 1.35 : 1 }}
                      transition={{ duration: 0.35, ease: luxe }}
                      style={{ transformOrigin: `${s.x}px ${s.y}px` }}
                    />
                  </motion.g>
                );
              })}
            </svg>

            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                className="relative mt-4 rounded-2xl border border-green/25 bg-white/80 px-4 py-3 text-center backdrop-blur"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35 }}
              >
                <p className="font-display text-sm font-bold text-navy">{current.label}</p>
                <p className="text-xs text-ink-soft">{current.detail}</p>
              </motion.div>
            </AnimatePresence>
          </div>
        </Reveal>

        {/* szöveg + lista */}
        <div>
          <Reveal>
            <p className="eyebrow mb-5">Régóta fennálló ízületi panaszok?</p>
          </Reveal>
          <SplitLines
            className="display text-[clamp(2.2rem,5vw,3.8rem)] text-navy"
            lines={[
              <span key="a">Van megoldás</span>,
              <span key="b" className="text-green">
                a gyógyszereken
              </span>,
              <span key="c">túl is.</span>,
            ]}
          />
          <Reveal delay={0.2}>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-soft">
              Cégünk különféle akut és krónikus mozgásszervi panaszra kínál széleskörű megoldásokat. Ha a pihentetés vagy a krémek már nem segítenek, érdemes a probléma gyökerét megcélozni – mi ebben segítünk.
            </p>
          </Reveal>

          <ul className="mt-8 grid gap-2 sm:grid-cols-2" onPointerEnter={() => setHover(true)} onPointerLeave={() => setHover(false)}>
            {complaints.map((c, i) => {
              const on = c.id === active;
              return (
                <Reveal as="li" key={c.id} delay={0.1 + i * 0.05} y={14}>
                  <button
                    type="button"
                    onPointerEnter={() => setActive(c.id)}
                    onFocus={() => setActive(c.id)}
                    onClick={() => setActive(c.id)}
                    className={`group flex w-full items-center gap-3 rounded-2xl border px-4 py-3 text-left transition-all duration-300 ${
                      on ? "border-green/40 bg-mint/70 shadow-glow" : "border-line bg-white hover:border-green/30 hover:bg-ice"
                    }`}
                  >
                    <span className={`relative flex h-2.5 w-2.5 shrink-0 rounded-full transition-colors ${on ? "bg-green" : "bg-line group-hover:bg-green/60"}`}>
                      {on && <span className="absolute inset-0 animate-[pulse-ring_1.6s_ease-out_infinite] rounded-full bg-green" />}
                    </span>
                    <span className="font-display text-[0.82rem] font-bold text-navy">{c.label}</span>
                    <ArrowIcon className={`ml-auto h-4 w-4 shrink-0 text-green transition-all duration-300 ${on ? "translate-x-0 opacity-100" : "-translate-x-1 opacity-0"}`} />
                  </button>
                </Reveal>
              );
            })}
          </ul>

          <Reveal delay={0.3} className="mt-8 flex flex-wrap items-center gap-4">
            <a href={site.phoneHref} className="btn btn-navy">
              <PhoneIcon className="h-4 w-4" />
              Bejelentkezés
            </a>
            <a href="#szolgaltatasok" className="group inline-flex items-center gap-2 font-display text-sm font-bold text-navy">
              Szolgáltatásaink
              <ArrowIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
