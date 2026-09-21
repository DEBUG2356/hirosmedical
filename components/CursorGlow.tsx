"use client";

import { motion, useMotionValue, useSpring } from "motion/react";
import { useEffect, useSyncExternalStore } from "react";

const query = "(hover: hover) and (pointer: fine)";
const subscribe = (cb: () => void) => {
  const m = window.matchMedia(query);
  m.addEventListener("change", cb);
  return () => m.removeEventListener("change", cb);
};

/** Halvány zöld fényfolt, ami az egeret követi – csak egérrel rendelkező eszközön. */
export default function CursorGlow() {
  const fine = useSyncExternalStore(subscribe, () => window.matchMedia(query).matches, () => false);
  const x = useMotionValue(-600);
  const y = useMotionValue(-600);
  const sx = useSpring(x, { stiffness: 60, damping: 20, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 60, damping: 20, mass: 0.6 });

  useEffect(() => {
    if (!fine) return;
    const move = (e: PointerEvent) => {
      x.set(e.clientX - 300);
      y.set(e.clientY - 300);
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, [fine, x, y]);

  if (!fine) return null;
  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[1] h-[600px] w-[600px] rounded-full"
      style={{
        x: sx,
        y: sy,
        background: "radial-gradient(circle, rgb(95 174 107 / 0.16) 0%, rgb(95 174 107 / 0.05) 35%, transparent 65%)",
      }}
    />
  );
}
