"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CursorGlow() {
  const cursorX = useMotionValue(-200);
  const cursorY = useMotionValue(-200);
  const springConfig = { damping: 28, stiffness: 180, mass: 0.5 };
  const x = useSpring(cursorX, springConfig);
  const y = useSpring(cursorY, springConfig);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      cursorX.set(e.clientX - 192);
      cursorY.set(e.clientY - 192);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [cursorX, cursorY]);

  return (
    <motion.div
      style={{ x, y }}
      className="fixed top-0 left-0 w-96 h-96 rounded-full pointer-events-none z-0 mix-blend-screen"
      animate={{ opacity: [0.04, 0.07, 0.04] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
    >
      <div className="w-full h-full rounded-full bg-ember-400 blur-[80px]" />
    </motion.div>
  );
}
