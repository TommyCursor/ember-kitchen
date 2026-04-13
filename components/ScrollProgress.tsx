"use client";

import { useScroll, useSpring, motion } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-ember-600 via-ember-400 to-amber-300 origin-left z-[9999] shadow-[0_0_8px_rgba(245,158,11,0.6)]"
    />
  );
}
