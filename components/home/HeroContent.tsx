"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { Flame, ArrowRight } from "lucide-react";
import { useRef, useEffect, useState } from "react";

const ease = [0.22, 1, 0.36, 1] as const;

const WORDS_LINE1 = ["Fine", "dining,"];
const WORDS_LINE2 = ["delivered."];

const STATS = [
  { value: 4.9, unit: "★", label: "Rating", decimals: 1 },
  { value: 30, unit: "min", label: "Delivery", decimals: 0 },
  { value: 12, unit: "K+", label: "Orders", decimals: 0 },
  { value: 100, unit: "%", label: "Fresh", decimals: 0 },
];

function AnimatedNumber({ value, decimals, inView }: { value: number; decimals: number; inView: boolean }) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const end = value;
    const duration = 1800;
    const step = 16;
    const increment = (end / (duration / step));
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setDisplay(end);
        clearInterval(timer);
      } else {
        setDisplay(start);
      }
    }, step);
    return () => clearInterval(timer);
  }, [inView, value]);

  return <>{display.toFixed(decimals)}</>;
}

export default function HeroContent() {
  const ref = useRef<HTMLElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const statsInView = useInView(statsRef, { once: true });

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "14%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-screen flex flex-col overflow-hidden bg-[#080808]">
      {/* Parallax background */}
      <motion.div style={{ y: imgY }} className="absolute inset-0 scale-[1.15]">
        <Image
          src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1920&q=90"
          alt="Ember Kitchen"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#080808] via-[#080808]/75 to-[#080808]/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-[#080808]/50" />
        {/* Warm ember glow */}
        <motion.div
          animate={{ opacity: [0.6, 1, 0.6], scale: [1, 1.05, 1] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-0 left-0 w-[700px] h-[500px] bg-ember-600/10 rounded-full blur-[140px]"
        />
        <motion.div
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-amber-500/6 rounded-full blur-[120px]"
        />
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ y: textY, opacity }}
        className="relative flex-1 flex flex-col justify-center max-w-7xl mx-auto px-6 lg:px-12 pt-32 pb-20 w-full"
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease }}
          className="flex items-center gap-3 mb-10"
        >
          <motion.div
            animate={{ rotate: [0, 10, 0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <Flame className="w-4 h-4 text-ember-500" />
          </motion.div>
          <span className="section-label">Open for delivery · 11am – 11pm daily</span>
          <div className="flex-1 h-px bg-gradient-to-r from-ember-500/30 to-transparent max-w-[120px]" />
        </motion.div>

        {/* Word-by-word headline */}
        <div className="mb-3">
          <div className="flex flex-wrap gap-x-4 gap-y-1">
            {WORDS_LINE1.map((word, i) => (
              <div key={i} className="overflow-hidden">
                <motion.span
                  initial={{ y: "110%", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 1, delay: 0.25 + i * 0.12, ease }}
                  className="block font-display text-[clamp(3.8rem,10.5vw,9rem)] font-light leading-[0.9] tracking-tight"
                >
                  {word}
                </motion.span>
              </div>
            ))}
          </div>
        </div>
        <div className="overflow-hidden mb-2">
          <motion.div
            initial={{ y: "110%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.55, ease }}
            className="font-display text-[clamp(3.8rem,10.5vw,9rem)] font-light leading-[0.9] tracking-tight italic text-ember-400"
          >
            {WORDS_LINE2[0]}
          </motion.div>
        </div>

        {/* Underline accent */}
        <motion.div
          initial={{ scaleX: 0, originX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.2, delay: 0.8, ease }}
          className="h-px w-64 bg-gradient-to-r from-ember-500/60 to-transparent mb-12 mt-4"
        />

        {/* Subtext + CTA */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9, ease }}
          className="flex flex-col sm:flex-row items-start sm:items-center gap-8 max-w-2xl"
        >
          <p className="text-white/45 text-sm leading-relaxed max-w-xs">
            Restaurant-quality dishes by award-winning chefs. The full Ember Kitchen experience, wherever you are.
          </p>
          <div className="flex gap-3 flex-shrink-0">
            <motion.div
              whileHover={{ scale: 1.03, x: 2 }}
              whileTap={{ scale: 0.97 }}
            >
              <Link href="/menu" className="btn-ember inline-flex items-center gap-2.5 group">
                Order Now
                <motion.span
                  animate={{ x: [0, 3, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  <ArrowRight className="w-3.5 h-3.5" />
                </motion.span>
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Link href="#about" className="btn-outline inline-flex items-center gap-2">
                Our Story
              </Link>
            </motion.div>
          </div>
        </motion.div>

        {/* Animated stats */}
        <div ref={statsRef} className="mt-20 pt-8 border-t border-white/6 grid grid-cols-4 max-w-md gap-0">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: statsInView ? 1 : 0, y: statsInView ? 0 : 16 }}
              transition={{ duration: 0.6, delay: 1.0 + i * 0.1, ease }}
              className={`pr-4 ${i > 0 ? "pl-4 border-l border-white/6" : ""}`}
            >
              <div className="font-display text-2xl md:text-3xl font-light text-ember-400 leading-none">
                <AnimatedNumber value={s.value} decimals={s.decimals} inView={statsInView} />
                <span className="text-base md:text-lg">{s.unit}</span>
              </div>
              <div className="text-white/30 text-[10px] tracking-[0.2em] uppercase mt-1.5">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.8 }}
        className="absolute bottom-8 right-8 md:right-14 flex flex-col items-center gap-2"
      >
        <span
          className="section-label text-[9px]"
          style={{ writingMode: "vertical-rl", letterSpacing: "0.3em" }}
        >
          Scroll
        </span>
        <motion.div
          animate={{ scaleY: [1, 0.4, 1], opacity: [1, 0.4, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-12 bg-gradient-to-b from-ember-400/50 to-transparent origin-top"
        />
      </motion.div>
    </section>
  );
}
