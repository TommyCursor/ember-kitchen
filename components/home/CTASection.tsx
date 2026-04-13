"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const ease = [0.22, 1, 0.36, 1] as const;

export default function CTASection() {
  return (
    <section className="relative min-h-[70vh] flex items-center overflow-hidden border-t border-white/5">
      {/* Background */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1600&q=80"
          alt=""
          fill
          className="object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#080808] via-[#080808]/85 to-[#080808]/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080808] to-transparent" />
        {/* Ember glow */}
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[600px] h-[400px] bg-ember-600/12 rounded-full blur-[120px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-12 w-full">
        <div className="max-w-2xl">
          {/* Label */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease }}
            className="section-label mb-6"
          >
            Ready to order?
          </motion.p>

          {/* Headline */}
          <div className="overflow-hidden mb-2">
            <motion.h2
              initial={{ y: "100%" }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.85, delay: 0.1, ease }}
              className="font-display text-[clamp(3rem,7vw,6.5rem)] font-light leading-[0.9]"
            >
              Your next great
            </motion.h2>
          </div>
          <div className="overflow-hidden mb-10">
            <motion.h2
              initial={{ y: "100%" }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.85, delay: 0.22, ease }}
              className="font-display text-[clamp(3rem,7vw,6.5rem)] font-light leading-[0.9] italic text-ember-400"
            >
              meal awaits.
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3, ease }}
            className="text-white/40 text-sm mb-10 max-w-sm leading-relaxed"
          >
            30 minutes from our kitchen to your door. Same quality, same care — just without the reservation.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.42, ease }}
            className="flex gap-4"
          >
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link href="/menu" className="btn-ember inline-flex items-center gap-2">
                Browse Menu <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link href="/cart" className="btn-outline inline-flex items-center gap-2">
                View Cart
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
