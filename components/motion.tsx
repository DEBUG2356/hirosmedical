"use client";

import { motion, useInView, useMotionValue, useSpring, useTransform, animate, type Variants } from "motion/react";
import { useEffect, useRef, type ReactNode, type ComponentProps } from "react";

export const luxe = [0.22, 1, 0.36, 1] as const;

/** Görgetésre felúszó blokk. */
export function Reveal({
  children,
  delay = 0,
  y = 28,
  once = true,
  className = "",
  as = "div",
  ...rest
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  once?: boolean;
  className?: string;
  as?: "div" | "p" | "li" | "section" | "span" | "h2" | "h3" | "figure";
} & Omit<ComponentProps<typeof motion.div>, "children">) {
  const Tag = motion[as] as typeof motion.div;
  return (
    <Tag
      initial={{ opacity: 0, y, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once, margin: "-10% 0px -10% 0px" }}
      transition={{ duration: 0.9, delay, ease: luxe }}
      className={className}
      {...rest}
    >
      {children}
    </Tag>
  );
}

const lineWrap: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };
const line: Variants = {
  hidden: { y: "110%", rotate: 1.5 },
  show: { y: "0%", rotate: 0, transition: { duration: 1, ease: luxe } },
};

/** Soronként alulról felúszó cím. A maszk belső paddingja az ékezeteknek kell. */
export function SplitLines({
  lines,
  className = "",
  lineClass = "",
  delay = 0,
  as: Tag = "h2",
  immediate = false,
}: {
  lines: ReactNode[];
  className?: string;
  lineClass?: string;
  delay?: number;
  as?: "h1" | "h2" | "h3" | "p" | "div";
  immediate?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const show = immediate || inView;
  return (
    <Tag ref={ref} className={className}>
      <motion.span
        className="block"
        variants={lineWrap}
        initial="hidden"
        animate={show ? "show" : "hidden"}
        transition={{ delayChildren: delay }}
      >
        {lines.map((l, i) => (
          <span key={i} className="-mt-[0.24em] -mb-[0.12em] block overflow-hidden pt-[0.24em] pb-[0.12em]">
            <motion.span className={`block origin-left ${lineClass}`} variants={line}>
              {l}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}

/** Szavanként beúszó bekezdés. */
export function SplitWords({
  text,
  className = "",
  delay = 0,
  immediate = false,
}: {
  text: string;
  className?: string;
  delay?: number;
  immediate?: boolean;
}) {
  const words = text.split(" ");
  const anim = immediate ? { animate: "show" as const } : { whileInView: "show" as const };
  return (
    <motion.p
      className={className}
      initial="hidden"
      {...anim}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ staggerChildren: 0.03, delayChildren: delay }}
    >
      {words.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden pb-[0.12em] -mb-[0.12em] align-baseline">
          <motion.span
            className="inline-block"
            variants={{
              hidden: { y: "100%", opacity: 0 },
              show: { y: 0, opacity: 1, transition: { duration: 0.6, ease: luxe } },
            }}
          >
            {w}
          </motion.span>
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </motion.p>
  );
}

/** Mágneses gomb-burok: a kurzor felé húzódik. */
export function Magnetic({ children, strength = 0.3, className = "" }: { children: ReactNode; strength?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 180, damping: 16, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 180, damping: 16, mass: 0.4 });
  return (
    <motion.div
      ref={ref}
      className={`inline-block ${className}`}
      style={{ x: sx, y: sy }}
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse") return;
        const r = ref.current!.getBoundingClientRect();
        x.set((e.clientX - (r.left + r.width / 2)) * strength);
        y.set((e.clientY - (r.top + r.height / 2)) * strength);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}

/** Felpörgő számláló. */
export function Counter({ value, prefix = "", suffix = "", className = "" }: { value: number; prefix?: string; suffix?: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });
  const mv = useMotionValue(0);
  const text = useTransform(mv, (v) => `${prefix}${Math.round(v)}${suffix}`);
  useEffect(() => {
    if (!inView) return;
    const c = animate(mv, value, { duration: 1.6, ease: luxe });
    return () => c.stop();
  }, [inView, mv, value]);
  return (
    <motion.span ref={ref} className={className}>
      {text}
    </motion.span>
  );
}

/** 3D-s billenő kártya (egérre). */
export function TiltCard({ children, className = "", max = 7 }: { children: ReactNode; className?: string; max?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 160, damping: 18 });
  const sry = useSpring(ry, { stiffness: 160, damping: 18 });
  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ rotateX: srx, rotateY: sry, transformStyle: "preserve-3d", perspective: 900 }}
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse") return;
        const r = ref.current!.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        ry.set(px * max * 2);
        rx.set(-py * max * 2);
      }}
      onPointerLeave={() => {
        rx.set(0);
        ry.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}
