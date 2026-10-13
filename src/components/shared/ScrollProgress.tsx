"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/**
 * 120fps GPU-accelerated scroll indicator.
 * Uses Framer Motion's compositor-level scroll tracking
 * with scaleX transform to avoid React state re-renders during scroll.
 */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 280,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 h-[2px] z-[100] origin-left bg-gradient-to-r from-emerald-500/80 via-emerald-400 to-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)] pointer-events-none will-change-transform"
      aria-hidden="true"
    />
  );
}
