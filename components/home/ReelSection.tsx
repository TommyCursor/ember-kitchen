"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const ease = [0.22, 1, 0.36, 1] as const;

const IMAGES = [
  { src: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=85", label: "Signature Mains", rotate: -3 },
  { src: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&q=85", label: "Artisan Starters", rotate: 1.5 },
  { src: "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=600&q=85", label: "Daily Specials", rotate: -1.5 },
  { src: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=600&q=85", label: "Fine Desserts", rotate: 3 },
];

export default function ReelSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x = useTransform(scrollYProgress, [0, 1], ["8%", "-8%"]);

  return (
    <section className="py-16 border-t border-white/5 overflow-hidden bg-[#060606]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 mb-12">
        <div className="flex items-end justify-between">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease }}
          >
            <p className="section-label mb-3">The Experience</p>
            <h2 className="font-display text-[clamp(2rem,4.5vw,3.5rem)] font-light leading-tight">
              A feast for the <span className="italic text-ember-400">eyes</span>
            </h2>
          </motion.div>
          <Link
            href="/menu"
            className="hidden md:flex items-center gap-2 text-white/30 hover:text-white text-xs tracking-widest uppercase transition-colors group"
          >
            Full menu <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>

      {/* Parallax reel */}
      <div ref={ref} className="overflow-hidden">
        <motion.div style={{ x }} className="flex gap-4 px-6 lg:px-12">
          {IMAGES.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.7, delay: i * 0.1, ease }}
              whileHover={{ scale: 1.02, rotate: 0, transition: { duration: 0.4 } }}
              className="relative flex-shrink-0 group cursor-pointer"
              style={{ width: i % 2 === 0 ? "320px" : "260px", rotate: img.rotate }}
            >
              <div className="relative overflow-hidden" style={{ height: i % 2 === 0 ? "420px" : "340px" }}>
                <Image
                  src={img.src}
                  alt={img.label}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#060606]/80 via-transparent to-transparent" />
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 bg-ember-600/10"
                />
              </div>
              {/* Label */}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 + 0.3 }}
                className="absolute bottom-4 left-4"
              >
                <span className="text-xs tracking-widest uppercase text-white/50">{img.label}</span>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
