"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { quote, site } from "@/lib/site";
import { SplitWords, Reveal } from "./motion";
import { PhoneIcon } from "./Icons";

/** Parallax idézet-sáv a tornaterem fotójával. */
export default function Quote() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.15, 1]);

  return (
    <section ref={ref} className="relative isolate flex min-h-[70vh] items-center overflow-hidden bg-navy-900 py-24 text-white">
      <motion.div style={{ y, scale }} className="absolute inset-0 -z-10">
        <Image src="/img/site/gym-wall.webp" alt="" fill sizes="100vw" className="object-cover opacity-40" />
      </motion.div>
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-b from-navy-900/70 via-navy/50 to-navy-900/90" />

      <div className="container-x relative text-center">
        <Reveal>
          <span className="font-script text-[3rem] leading-none text-green-light">&ldquo;</span>
        </Reveal>
        <SplitWords
          text={quote.text}
          className="display mx-auto -mt-4 max-w-4xl text-[clamp(1.7rem,4.6vw,3.6rem)] text-white"
        />
        <Reveal delay={0.5}>
          <p className="font-script mt-6 text-[1.7rem] font-semibold text-green-light">{site.script}</p>
        </Reveal>
        <Reveal delay={0.7} className="mt-9">
          <a href={site.phoneHref} className="btn btn-green">
            <PhoneIcon className="h-4 w-4" />
            Kezdjük el együtt
          </a>
        </Reveal>
      </div>
    </section>
  );
}
