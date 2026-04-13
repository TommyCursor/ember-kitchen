"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { MENU_ITEMS } from "@/lib/menu-data";

const FEATURED = MENU_ITEMS.filter((i) => i.popular).slice(0, 5);

const ease = [0.22, 1, 0.36, 1] as const;

export default function FeaturedSection() {
  return (
    <section className="py-28">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease }}
          className="flex items-end justify-between mb-14"
        >
          <div>
            <p className="section-label mb-3">Signature Dishes</p>
            <h2 className="font-display text-[clamp(2.2rem,5vw,4rem)] font-light leading-tight">
              Most loved<br /><span className="italic text-ember-400">this week</span>
            </h2>
          </div>
          <Link
            href="/menu"
            className="hidden md:flex items-center gap-2 text-white/40 hover:text-white text-xs tracking-widest uppercase transition-colors group"
          >
            Full menu
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        {/* Horizontal scroll strip */}
        <div className="scroll-x -mx-6 px-6 lg:-mx-12 lg:px-12">
          <div className="flex gap-4 pb-4" style={{ width: "max-content" }}>
            {FEATURED.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.65, delay: i * 0.08, ease }}
                className="group relative flex-shrink-0 cursor-pointer"
                style={{ width: i === 0 ? "420px" : "300px" }}
              >
                <Link href="/menu">
                  {/* Image */}
                  <div
                    className="relative overflow-hidden"
                    style={{ height: i === 0 ? "500px" : "380px" }}
                  >
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/20 to-transparent" />

                    {/* Hover overlay */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      className="absolute inset-0 bg-ember-600/10 flex items-center justify-center"
                    >
                      <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center">
                        <ArrowUpRight className="w-5 h-5" />
                      </div>
                    </motion.div>

                    {/* Price tag */}
                    <div className="absolute top-4 right-4 bg-[#080808]/80 backdrop-blur-sm border border-white/10 px-3 py-1.5 text-xs font-semibold tracking-wider">
                      ${item.price.toFixed(2)}
                    </div>
                  </div>

                  {/* Info */}
                  <div className="pt-4 pb-2">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="font-display text-lg font-light leading-snug">{item.name}</h3>
                        <p className="text-white/35 text-xs mt-1 line-clamp-1">{item.description}</p>
                      </div>
                      <ArrowUpRight className="w-4 h-4 text-white/20 group-hover:text-ember-400 transition-colors flex-shrink-0 mt-1" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mobile CTA */}
        <div className="text-center mt-8 md:hidden">
          <Link href="/menu" className="btn-ember inline-flex items-center gap-2">
            See Full Menu <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
