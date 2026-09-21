"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { luxe } from "./motion";

const KEY = "hmc-preloaded";

/** Nyitó függöny: a logó zöld íve rajzolódik ki, aztán a navy lap felhúzódik. Session-önként egyszer. */
export default function Preloader() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem(KEY) === "1";
    } catch {}
    if (seen) return;
    const t0 = setTimeout(() => setShow(true), 0);
    const t1 = setTimeout(() => {
      setShow(false);
      try {
        sessionStorage.setItem(KEY, "1");
      } catch {}
    }, 1900);
    return () => {
      clearTimeout(t0);
      clearTimeout(t1);
    };
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="curtain"
          className="fixed inset-0 z-[90] flex items-center justify-center bg-navy text-white"
          initial={{ y: 0 }}
          exit={{ y: "-100%", transition: { duration: 0.9, ease: luxe } }}
        >
          <div className="relative flex flex-col items-center gap-6">
            <svg viewBox="0 0 100 100" className="h-28 w-28" aria-hidden>
              <motion.path
                d="M20 82 A44 44 0 1 1 82 20"
                fill="none"
                stroke="#5fae6b"
                strokeWidth="8"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1.1, ease: luxe, delay: 0.1 }}
              />
              {[0, 1, 2, 3, 4].map((i) => (
                <motion.circle
                  key={i}
                  cx="50"
                  cy={30 + i * 10}
                  r={i === 0 || i === 4 ? 3.4 : 2.6}
                  fill={i === 0 || i === 4 ? "#a9dcb2" : "#5fae6b"}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.5 + i * 0.09, duration: 0.4, ease: luxe }}
                  style={{ transformOrigin: "50px 50px" }}
                />
              ))}
            </svg>
            <motion.p
              className="font-display text-[0.7rem] font-bold uppercase tracking-[0.35em] text-green-light"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              Hírös Medical Center
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
