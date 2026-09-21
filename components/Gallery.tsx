"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { useState } from "react";
import { galleryImages } from "@/lib/images";
import { Reveal, SplitLines, luxe } from "./motion";
import { PlusIcon } from "./Icons";
import Lightbox from "./Lightbox";

// bento-elrendezés: [oszlop-span, sor-span] md+ felett
const spans = ["md:col-span-2 md:row-span-2", "", "", "md:row-span-2", "", "", "", ""];

export default function Gallery() {
  const [lb, setLb] = useState<number | null>(null);
  const items = galleryImages.map((g) => ({ src: `/img/gallery/${g.name}.webp`, alt: g.alt, w: g.w, h: g.h }));

  return (
    <section id="galeria" className="relative bg-white py-24 lg:py-32">
      <div className="container-x">
        <div className="grid items-end gap-6 lg:grid-cols-[1fr_auto]">
          <div>
            <Reveal>
              <p className="eyebrow mb-5">Galéria</p>
            </Reveal>
            <SplitLines
              className="display text-[clamp(2.2rem,5vw,3.8rem)] text-navy"
              lines={[
                <span key="a">Színvonalas</span>,
                <span key="b">
                  <span className="text-green">környezet.</span>
                </span>,
              ]}
            />
          </div>
          <Reveal delay={0.2}>
            <p className="max-w-md text-lg leading-relaxed text-ink-soft lg:text-right">
              Tornaterem bordásfallal és futópaddal, kezelőhelyiség, kényelmes váró – Kecskemét szívében, az Ady Endre utca 10. alatt.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid auto-rows-[200px] grid-cols-2 gap-3 md:auto-rows-[220px] md:grid-flow-dense md:grid-cols-4 md:gap-4">
          {galleryImages.map((g, i) => (
            <motion.button
              key={g.name}
              type="button"
              onClick={() => setLb(i)}
              className={`group relative overflow-hidden rounded-[1.4rem] bg-ice ${spans[i] ?? ""}`}
              initial={{ opacity: 0, y: 24, scale: 0.97 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-8% 0px" }}
              transition={{ delay: (i % 4) * 0.08, duration: 0.8, ease: luxe }}
              aria-label={`${g.alt} – nagyítás`}
            >
              <Image
                src={`/img/gallery/${g.name}-thumb.webp`}
                alt={g.alt}
                fill
                sizes="(min-width: 768px) 25vw, 50vw"
                className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110"
              />
              <span className="absolute inset-0 bg-gradient-to-t from-navy-900/70 via-navy-900/0 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <span className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-3 translate-y-3 text-left text-white opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                <span className="font-display text-[0.78rem] font-bold leading-tight">{g.alt}</span>
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green">
                  <PlusIcon className="h-4 w-4" />
                </span>
              </span>
            </motion.button>
          ))}
        </div>
      </div>
      <Lightbox items={items} index={lb} onClose={() => setLb(null)} onIndex={setLb} />
    </section>
  );
}
