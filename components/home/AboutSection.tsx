"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Star, Flame } from "lucide-react";

const ease = [0.22, 1, 0.36, 1] as const;

const FACTS = [
  { num: "2018", label: "Founded" },
  { num: "3", label: "Michelin stars" },
  { num: "40+", label: "Menu items" },
  { num: "Daily", label: "Fresh sourced" },
];

export default function AboutSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.08, 1]);

  return (
    <section id="about" ref={ref} className="border-t border-white/5 overflow-hidden">
      <div className="grid lg:grid-cols-2 min-h-[85vh]">

        {/* Left — full-bleed image */}
        <div className="relative overflow-hidden min-h-[50vh] lg:min-h-full">
          <motion.div style={{ scale: imgScale }} className="absolute inset-0">
            <Image
              src="https://images.unsplash.com/photo-1600891964599-f61ba0e24092?w=1000&q=85"
              alt="Chef at Ember Kitchen"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#080808]/60" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#080808]/40 to-transparent" />
          </motion.div>

          {/* Floating badge */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3, ease }}
            className="absolute bottom-6 left-6 glass-dark px-5 py-4 max-w-[220px]"
          >
            <div className="flex items-center gap-2 mb-2">
              {[1,2,3,4,5].map(i => (
                <Star key={i} className="w-3 h-3 text-ember-400 fill-ember-400" />
              ))}
            </div>
            <p className="text-xs text-white/60 leading-relaxed italic">
              &ldquo;The best restaurant-quality delivery experience I&apos;ve ever had.&rdquo;
            </p>
            <p className="text-xs text-white/30 mt-2">— Food & Wine Magazine</p>
          </motion.div>
        </div>

        {/* Right — text */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, delay: 0.1, ease }}
          className="flex flex-col justify-center px-10 lg:px-16 py-20"
        >
          <div className="flex items-center gap-3 mb-8">
            <Flame className="w-4 h-4 text-ember-500/60" />
            <p className="section-label">Our Story</p>
          </div>

          <h2 className="font-display text-[clamp(2.4rem,4.5vw,3.8rem)] font-light leading-[1.1] mb-8">
            Cooking with fire,<br />
            <span className="italic text-ember-400">serving with heart</span>
          </h2>

          <p className="text-white/50 leading-relaxed mb-5 text-sm">
            Ember Kitchen was born from a simple belief: that restaurant-quality food shouldn&apos;t be reserved for special occasions. Every dish is crafted using seasonal ingredients, cooked over open flame by chefs who&apos;ve trained in Michelin-starred kitchens.
          </p>

          <p className="text-white/50 leading-relaxed mb-12 text-sm">
            From our signature ember-grilled ribeye to our delicate panna cotta — everything is prepared fresh. Never frozen, never compromised.
          </p>

          {/* Facts grid */}
          <div className="grid grid-cols-2 gap-0 border-t border-white/6">
            {FACTS.map((f, i) => (
              <motion.div
                key={f.label}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 + i * 0.08, ease }}
                className={`py-6 ${i % 2 === 0 ? "pr-6 border-r border-white/6" : "pl-6"} ${i < 2 ? "border-b border-white/6" : ""}`}
              >
                <div className="font-display text-3xl font-light text-ember-400 mb-1">{f.num}</div>
                <div className="text-white/35 text-xs tracking-widest uppercase">{f.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
