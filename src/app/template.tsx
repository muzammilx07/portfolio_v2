"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

/**
 * 120fps GPU-accelerated page transition.
 * Uses pure opacity and translateY transforms to avoid
 * expensive rasterization and layout blur overhead during route changes.
 */
export default function Template({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.3,
        ease: [0.22, 1, 0.36, 1],
      }}
      style={{ willChange: "transform, opacity" }}
      className="w-full"
    >
      {children}
    </motion.div>
  );
}
