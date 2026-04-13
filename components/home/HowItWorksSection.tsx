"use client";

import { motion } from "framer-motion";
import { Flame, Truck } from "lucide-react";

function CartIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
  );
}

const STEPS = [
  {
    icon: <Flame className="w-5 h-5" />,
    num: "01",
    title: "Browse the menu",
    desc: "Explore seasonal dishes crafted fresh daily — from starters to desserts.",
  },
  {
    icon: <CartIcon />,
    num: "02",
    title: "Build your order",
    desc: "Add items, choose preferences, and review your selection in seconds.",
  },
  {
    icon: <Truck className="w-5 h-5" />,
    num: "03",
    title: "Enjoy at home",
    desc: "Track in real-time. Delivery in 25–35 minutes, guaranteed.",
  },
];

const ease = [0.22, 1, 0.36, 1] as const;

export default function HowItWorksSection() {
  return (
    <section className="py-28 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease }}
          className="mb-20"
        >
          <p className="section-label mb-4">How it works</p>
          <h2 className="font-display text-[clamp(2.2rem,5vw,4rem)] font-light max-w-sm leading-tight">
            Three steps to <span className="italic text-ember-400">perfection</span>
          </h2>
        </motion.div>

        {/* Steps — editorial horizontal ruled layout */}
        <div className="space-y-0 divide-y divide-white/6">
          {STEPS.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.65, delay: i * 0.12, ease }}
              className="group flex items-center gap-8 py-8 cursor-default"
            >
              {/* Number */}
              <span className="font-display text-[clamp(3rem,6vw,5rem)] font-light text-white/8 group-hover:text-ember-500/20 transition-colors duration-500 w-24 flex-shrink-0 leading-none">
                {step.num}
              </span>

              {/* Icon */}
              <div className="w-10 h-10 rounded-full border border-white/10 group-hover:border-ember-500/40 flex items-center justify-center text-white/30 group-hover:text-ember-400 transition-all duration-400 flex-shrink-0">
                {step.icon}
              </div>

              {/* Title */}
              <h3 className="font-display text-2xl md:text-3xl font-light flex-1 group-hover:text-ember-50 transition-colors duration-300">
                {step.title}
              </h3>

              {/* Desc */}
              <p className="text-white/40 text-sm leading-relaxed max-w-xs text-right hidden md:block">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
