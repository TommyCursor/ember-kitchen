"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import MenuCard from "@/components/MenuCard";
import { MENU_ITEMS, CATEGORIES, type MenuCategory } from "@/lib/menu-data";
import { ShoppingCart, ArrowRight, Flame } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

export default function MenuPage() {
  const [active, setActive] = useState<MenuCategory | "All">("All");
  const { count, total } = useCart();

  const filtered = active === "All"
    ? MENU_ITEMS
    : MENU_ITEMS.filter((i) => i.category === active);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#080808]">
        {/* Cinematic header */}
        <div className="relative pt-36 pb-20 px-6 lg:px-12 max-w-7xl mx-auto overflow-hidden">
          {/* Background glow */}
          <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[300px] bg-ember-600/6 rounded-full blur-[120px] pointer-events-none" />

          <div className="relative">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease }}
              className="flex items-center gap-3 mb-8"
            >
              <Flame className="w-3.5 h-3.5 text-ember-500/60" />
              <span className="section-label">Crafted fresh daily</span>
            </motion.div>

            <div className="overflow-hidden mb-2">
              <motion.h1
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.9, delay: 0.1, ease }}
                className="font-display text-[clamp(3.5rem,9vw,8rem)] font-light leading-[0.9] tracking-tight"
              >
                Our
              </motion.h1>
            </div>
            <div className="overflow-hidden">
              <motion.h1
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.9, delay: 0.22, ease }}
                className="font-display text-[clamp(3.5rem,9vw,8rem)] font-light leading-[0.9] tracking-tight italic text-ember-400"
              >
                Menu
              </motion.h1>
            </div>

            <motion.div
              initial={{ scaleX: 0, originX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 0.5, ease }}
              className="h-px w-40 bg-gradient-to-r from-ember-500/50 to-transparent mt-6 mb-12"
            />
          </div>

          {/* Category filters — editorial pill-less style */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35, ease }}
            className="flex gap-0 divide-x divide-white/8 border border-white/8 w-fit overflow-hidden"
          >
            {(["All", ...CATEGORIES] as (MenuCategory | "All")[]).map((cat) => (
              <motion.button
                key={cat}
                onClick={() => setActive(cat)}
                whileTap={{ scale: 0.97 }}
                className={`relative px-6 py-3 text-xs tracking-widest uppercase transition-all duration-300 font-medium ${
                  active === cat
                    ? "bg-ember-500 text-black"
                    : "text-white/40 hover:text-white hover:bg-white/4"
                }`}
              >
                {cat}
                <span className={`ml-2 text-[10px] ${active === cat ? "text-black/50" : "text-white/20"}`}>
                  {cat === "All" ? MENU_ITEMS.length : MENU_ITEMS.filter((i) => i.category === cat).length}
                </span>
              </motion.button>
            ))}
          </motion.div>
        </div>

        {/* Menu grid */}
        <div className="max-w-7xl mx-auto px-6 lg:px-12 pb-40">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-px bg-white/5"
            >
              {filtered.map((item, index) => (
                <div key={item.id} className="bg-[#080808]">
                  <MenuCard item={item} index={index} />
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* Floating Cart Bar */}
      <AnimatePresence>
        {count > 0 && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: "spring", stiffness: 380, damping: 30 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-sm px-4"
          >
            <motion.div
              animate={{ boxShadow: ["0 0 30px rgba(245,158,11,0.2)", "0 0 50px rgba(245,158,11,0.35)", "0 0 30px rgba(245,158,11,0.2)"] }}
              transition={{ duration: 2.5, repeat: Infinity }}
            >
              <Link href="/cart" className="flex items-center justify-between bg-ember-500 text-black px-5 py-4 hover:bg-ember-400 transition-colors">
                <div className="flex items-center gap-3">
                  <ShoppingCart className="w-4 h-4" />
                  <span className="font-semibold text-sm tracking-wide">{count} item{count !== 1 ? "s" : ""}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-bold">${total.toFixed(2)}</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
