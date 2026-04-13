"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

const ease = [0.22, 1, 0.36, 1] as const;

const TESTIMONIALS = [
  {
    quote: "The best restaurant-quality delivery I've ever experienced. Every dish arrived perfectly presented — like having a Michelin-star chef cook in my kitchen.",
    author: "Sarah Mitchell",
    role: "Food critic, The Daily Plate",
    stars: 5,
    img: "https://images.unsplash.com/photo-1499952127939-9bbf5af6c51c?w=100&q=80",
  },
  {
    quote: "I've ordered from hundreds of restaurants. Nothing comes close to Ember Kitchen. The truffle risotto alone is worth every penny — absolutely transcendent.",
    author: "James Okafor",
    role: "Executive Chef, Lagos Hilton",
    stars: 5,
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80",
  },
  {
    quote: "We hosted a dinner party for 12 and ordered from Ember. Our guests thought we'd hired a private chef. The presentation, the taste, the timing — flawless.",
    author: "Elena Voss",
    role: "Interior designer & food enthusiast",
    stars: 5,
    img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80",
  },
];

export default function TestimonialsSection() {
  const [active, setActive] = useState(0);
  const [dir, setDir] = useState(1);

  useEffect(() => {
    const t = setInterval(() => {
      setDir(1);
      setActive((a) => (a + 1) % TESTIMONIALS.length);
    }, 5500);
    return () => clearInterval(t);
  }, []);

  const go = (next: number) => {
    setDir(next > active ? 1 : -1);
    setActive(next);
  };

  const t = TESTIMONIALS[active];

  return (
    <section className="py-32 border-t border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-[1fr_2fr] gap-16 items-center">

          {/* Left label + nav */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease }}
              className="section-label mb-6"
            >
              Testimonials
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1, ease }}
              className="font-display text-[clamp(2rem,4vw,3.2rem)] font-light leading-tight mb-12"
            >
              What our guests <span className="italic text-ember-400">say</span>
            </motion.h2>

            {/* Dots */}
            <div className="flex items-center gap-3 mb-8">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => go(i)}
                  className="h-px transition-all duration-500 rounded-full"
                  style={{
                    width: i === active ? 40 : 16,
                    background: i === active ? "rgba(251,191,36,0.8)" : "rgba(255,255,255,0.15)",
                  }}
                />
              ))}
            </div>

            {/* Arrow nav */}
            <div className="flex gap-3">
              {[
                { icon: ChevronLeft, action: () => go((active - 1 + TESTIMONIALS.length) % TESTIMONIALS.length) },
                { icon: ChevronRight, action: () => go((active + 1) % TESTIMONIALS.length) },
              ].map(({ icon: Icon, action }, i) => (
                <motion.button
                  key={i}
                  onClick={action}
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.94 }}
                  className="w-11 h-11 border border-white/10 hover:border-ember-500/40 hover:bg-ember-500/5 flex items-center justify-center text-white/40 hover:text-ember-400 transition-all duration-300"
                >
                  <Icon className="w-4 h-4" />
                </motion.button>
              ))}
            </div>
          </div>

          {/* Right — quote */}
          <AnimatePresence mode="wait" custom={dir}>
            <motion.div
              key={active}
              custom={dir}
              initial={{ opacity: 0, x: dir * 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: dir * -40 }}
              transition={{ duration: 0.65, ease }}
              className="relative"
            >
              {/* Giant quote mark */}
              <div className="font-display text-[10rem] leading-none text-ember-500/10 absolute -top-8 -left-4 select-none pointer-events-none">
                "
              </div>

              <div className="relative pt-8">
                {/* Stars */}
                <div className="flex gap-1 mb-6">
                  {Array.from({ length: t.stars }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-ember-400 text-ember-400" />
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="font-display text-[clamp(1.4rem,3vw,2.2rem)] font-light leading-[1.4] text-white/85 mb-10 italic">
                  {t.quote}
                </blockquote>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden border border-white/10 flex-shrink-0">
                    <Image src={t.img} alt={t.author} width={48} height={48} className="object-cover" />
                  </div>
                  <div>
                    <p className="font-medium text-sm text-white">{t.author}</p>
                    <p className="text-white/35 text-xs mt-0.5">{t.role}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
