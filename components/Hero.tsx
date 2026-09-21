"use client";

import Image from "next/image";
import { motion, useMotionValue, useScroll, useSpring, useTransform } from "motion/react";
import { site, classPerks } from "@/lib/site";
import { Arc } from "./Logo";
import { SplitLines, SplitWords, Magnetic, luxe } from "./motion";
import { PhoneIcon, ArrowIcon, ClockIcon, GroupIcon, PhysioIcon, SparkIcon } from "./Icons";

const perkIcons = { clock: ClockIcon, group: GroupIcon, physio: PhysioIcon };

const floats = [
  { label: "Lökéshullám-terápia", sub: "meszesedésre, sarkantyúra", x: "-8%", y: "14%", delay: 0 },
  { label: "TR Therapy · Tecar", sub: "feszes, túlterhelt izmokra", x: "62%", y: "48%", delay: 0.7 },
  { label: "Kiscsoportos órák", sub: "legfeljebb 8 fő", x: "-4%", y: "76%", delay: 1.4 },
];

export default function Hero() {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 40, damping: 18 });
  const sy = useSpring(my, { stiffness: 40, damping: 18 });
  const imgX = useTransform(sx, [-1, 1], [-14, 14]);
  const imgY = useTransform(sy, [-1, 1], [-10, 10]);
  const cardX = useTransform(sx, [-1, 1], [22, -22]);
  const cardY = useTransform(sy, [-1, 1], [16, -16]);

  const { scrollY } = useScroll();
  const photoY = useTransform(scrollY, [0, 800], [0, 90]);
  const bgY = useTransform(scrollY, [0, 800], [0, 120]);
  const textY = useTransform(scrollY, [0, 800], [0, -40]);
  const fade = useTransform(scrollY, [0, 500], [1, 0]);

  return (
    <section
      className="relative isolate overflow-hidden bg-ice pt-[76px] lg:pt-[84px]"
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse") return;
        const r = e.currentTarget.getBoundingClientRect();
        mx.set(((e.clientX - r.left) / r.width) * 2 - 1);
        my.set(((e.clientY - r.top) / r.height) * 2 - 1);
      }}
    >
      {/* háttér: halvány, parallaxos fotó + fehér átmenet a szöveg alatt */}
      <motion.div aria-hidden style={{ y: bgY }} className="absolute -inset-y-16 inset-x-0 -z-20">
        <Image
          src="/img/site/gym-balls.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          className="scale-[1.04] object-cover object-center opacity-[0.3] blur-[2px] saturate-[0.8]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ice via-ice/55 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-ice/50 via-transparent to-ice" />
      </motion.div>
      <div aria-hidden className="grid-dots absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_30%_20%,black,transparent_70%)]" />
      <div aria-hidden className="absolute -left-40 top-40 -z-10 h-[520px] w-[520px] rounded-full bg-green/15 blur-3xl" />
      <div aria-hidden className="absolute -right-24 -top-24 -z-10 h-[480px] w-[480px] rounded-full bg-sky/10 blur-3xl" />

      <div className="container-x relative grid min-h-[calc(100svh-76px)] items-center gap-12 py-14 lg:min-h-[calc(100svh-84px)] lg:grid-cols-[1.05fr_0.95fr] lg:gap-8 lg:py-10">
        {/* szöveg */}
        <motion.div style={{ y: textY, opacity: fade }} className="relative z-10">
          <motion.p
            className="eyebrow mb-6"
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.35, duration: 0.7, ease: luxe }}
          >
            Gyógytorna · Masszázs · Modern fizikoterápia
          </motion.p>

          <SplitLines
            as="h1"
            immediate
            delay={0.45}
            className="display text-[clamp(2.7rem,7.8vw,5.6rem)] text-navy"
            lines={[
              <span key="a">A mozgás</span>,
              <span key="b">a legjobb</span>,
              <span key="c" className="text-green">
                orvosság.
              </span>,
            ]}
          />

          <motion.p
            className="font-script mt-4 text-[clamp(1.9rem,4.2vw,3rem)] font-semibold leading-none text-green-deep"
            initial={{ opacity: 0, y: 14, rotate: -2 }}
            animate={{ opacity: 1, y: 0, rotate: -1.5 }}
            transition={{ delay: 1.05, duration: 0.8, ease: luxe }}
          >
            {site.script}
          </motion.p>

          <SplitWords
            immediate
            delay={1.2}
            className="mt-7 max-w-xl text-[1.05rem] leading-relaxed text-ink-soft sm:text-lg"
            text="Több mint 10 éves szakmai tapasztalattal, a legmodernebb fizikoterápiás készülékekkel és egyénre szabott mozgásterápiával segítünk, hogy a fájdalom ne szabja meg a mindennapjait – Kecskemét szívében."
          />

          <motion.div
            className="mt-9 flex flex-wrap items-center gap-3"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.7, ease: luxe }}
          >
            <Magnetic>
              <a href={site.phoneHref} className="btn btn-green text-[0.9rem]">
                <PhoneIcon className="h-4 w-4" />
                Bejelentkezés
              </a>
            </Magnetic>
            <Magnetic strength={0.2}>
              <a href="#orak" className="btn btn-outline">
                Csoportos órák
                <ArrowIcon className="h-4 w-4" />
              </a>
            </Magnetic>
          </motion.div>

          <motion.ul
            className="mt-12 grid max-w-xl grid-cols-3 divide-x divide-line border-t border-line pt-6"
            initial="hidden"
            animate="show"
            transition={{ delayChildren: 1.7, staggerChildren: 0.12 }}
          >
            {classPerks.map((p) => {
              const Icon = perkIcons[p.icon];
              return (
                <motion.li
                  key={p.label}
                  className="flex flex-col items-center gap-2 px-2 text-center first:items-start first:pl-0 first:text-left last:items-end last:pr-0 last:text-right sm:flex-row sm:items-center sm:gap-3 sm:text-left"
                  variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: luxe } } }}
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-green/30 bg-white text-navy shadow-soft">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="font-display text-[0.62rem] font-bold uppercase leading-tight tracking-[0.12em] text-navy sm:text-[0.66rem]">
                    {p.label}
                  </span>
                </motion.li>
              );
            })}
          </motion.ul>
        </motion.div>

        {/* kép + ív + lebegő kártyák */}
        <motion.div style={{ y: photoY }} className="relative mx-auto w-full max-w-[560px] lg:max-w-none">
          <div className="relative aspect-[0.92] w-full">
            {/* forgó zöld ív */}
            <motion.div
              className="absolute -inset-[7%]"
              initial={{ opacity: 0, scale: 0.8, rotate: -40 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ delay: 0.5, duration: 1.4, ease: luxe }}
            >
              <div className="h-full w-full animate-[spin-slow_60s_linear_infinite] opacity-90">
                <Arc id="hero-arc" className="h-full w-full" />
              </div>
            </motion.div>

            {/* fotó blob-maszkban */}
            <motion.div
              style={{ x: imgX, y: imgY }}
              className="absolute inset-[6%]"
              initial={{ opacity: 0, scale: 0.86, clipPath: "circle(20% at 50% 50%)" }}
              animate={{ opacity: 1, scale: 1, clipPath: "circle(75% at 50% 50%)" }}
              transition={{ delay: 0.7, duration: 1.4, ease: luxe }}
            >
              <div className="relative h-full w-full overflow-hidden rounded-[46%_54%_52%_48%/48%_44%_56%_52%] shadow-lift">
                <Image
                  src="/img/site/gym-treadmill.webp"
                  alt="A Hírös Medical Center tornaterme futópaddal és tükörfallal"
                  fill
                  priority
                  sizes="(min-width: 1024px) 45vw, 90vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/50 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 items-center gap-3 whitespace-nowrap text-white">
                  <div>
                    <p className="font-display text-[0.62rem] font-bold uppercase tracking-[0.2em] text-green-light">Kecskemét</p>
                    <p className="font-display text-sm font-bold">{site.address.street}</p>
                  </div>
                  <SparkIcon className="h-5 w-5 text-green-light" />
                </div>
              </div>
            </motion.div>

            {/* lebegő címkék */}
            <motion.div style={{ x: cardX, y: cardY }} className="absolute inset-0 hidden sm:block">
              {floats.map((f, i) => (
                <motion.div
                  key={f.label}
                  className="absolute"
                  style={{ left: f.x, top: f.y }}
                  initial={{ opacity: 0, y: 24, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: 1.4 + i * 0.18, duration: 0.8, ease: luxe }}
                >
                  <div
                    className="card flex items-center gap-3 rounded-2xl px-4 py-3 shadow-lift"
                    style={{ animation: `float-y ${5.5 + i}s ease-in-out ${f.delay}s infinite` }}
                  >
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-mint text-green-deep">
                      <SparkIcon className="h-4 w-4" />
                    </span>
                    <span>
                      <span className="block whitespace-nowrap font-display text-[0.72rem] font-bold text-navy">{f.label}</span>
                      <span className="block whitespace-nowrap text-[0.7rem] text-ink-soft">{f.sub}</span>
                    </span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>

    </section>
  );
}
