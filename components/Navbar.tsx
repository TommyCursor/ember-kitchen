"use client";

import Link from "next/link";
import { ShoppingCart, Flame, Menu, X } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const { count } = useCart();
  const [open, setOpen] = useState(false);

  return (
    <motion.header
      initial={{ y: -72, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 glass-dark"
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-bold text-lg tracking-tight">
          <motion.div whileHover={{ rotate: 15 }} transition={{ type: "spring", stiffness: 300 }}>
            <Flame className="w-5 h-5 text-ember-500" />
          </motion.div>
          <span>Ember Kitchen</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 text-sm text-white/60">
          {["Menu", "About"].map((item) => (
            <Link
              key={item}
              href={item === "Menu" ? "/menu" : `/#${item.toLowerCase()}`}
              className="hover:text-white transition-colors relative group"
            >
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-ember-400 group-hover:w-full transition-all duration-300" />
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <Link href="/cart" className="relative p-2 hover:bg-white/5 rounded-xl transition-colors">
            <ShoppingCart className="w-5 h-5" />
            <AnimatePresence>
              {count > 0 && (
                <motion.span
                  key="badge"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 500, damping: 25 }}
                  className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-ember-500 text-black text-[10px] font-bold rounded-full flex items-center justify-center"
                >
                  {count > 9 ? "9+" : count}
                </motion.span>
              )}
            </AnimatePresence>
          </Link>

          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            <Link href="/menu" className="hidden md:block btn-ember text-sm py-2 px-4">
              Order Now
            </Link>
          </motion.div>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 hover:bg-white/5 rounded-xl transition-colors"
          >
            <AnimatePresence mode="wait">
              {open ? (
                <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                  <X className="w-5 h-5" />
                </motion.div>
              ) : (
                <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                  <Menu className="w-5 h-5" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden border-t border-white/5 overflow-hidden bg-[#0a0a0a]"
          >
            <div className="px-6 py-4 space-y-3">
              {["Menu", "About"].map((item, i) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.25, delay: i * 0.05 }}
                >
                  <Link
                    href={item === "Menu" ? "/menu" : `/#${item.toLowerCase()}`}
                    onClick={() => setOpen(false)}
                    className="block text-sm text-white/60 hover:text-white py-2 transition-colors"
                  >
                    {item}
                  </Link>
                </motion.div>
              ))}
              <Link href="/menu" onClick={() => setOpen(false)} className="btn-ember block text-center mt-2">
                Order Now
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
