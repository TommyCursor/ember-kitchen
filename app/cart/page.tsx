"use client";

import Navbar from "@/components/Navbar";
import { useCart } from "@/lib/cart-context";
import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight, Flame } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import FadeInUp from "@/components/motion/FadeInUp";

const DELIVERY_FEE = 2.99;

export default function CartPage() {
  const { items, removeItem, updateQty, total, count } = useCart();

  if (count === 0) {
    return (
      <>
        <Navbar />
        <main className="pt-32 pb-24 max-w-2xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="w-8 h-8 text-white/30" />
            </div>
            <h1 className="text-2xl font-bold mb-3">Your cart is empty</h1>
            <p className="text-white/50 mb-8">Looks like you haven&apos;t added anything yet.</p>
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Link href="/menu" className="btn-ember inline-flex items-center gap-2">
                Browse the Menu <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </motion.div>
        </main>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="pt-24 pb-24 max-w-4xl mx-auto px-6">
        <FadeInUp>
          <h1 className="text-3xl font-bold mb-8">Your Order</h1>
        </FadeInUp>

        <div className="grid md:grid-cols-[1fr_360px] gap-8">
          {/* Items */}
          <div className="space-y-4">
            <AnimatePresence initial={false}>
              {items.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 24, height: 0, marginBottom: 0, paddingTop: 0, paddingBottom: 0, overflow: "hidden" }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="glass rounded-2xl p-4 flex gap-4"
                >
                  {/* Image */}
                  <div className="relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
                    <Image src={item.image} alt={item.name} fill className="object-cover" />
                  </div>
                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-semibold text-sm leading-snug">{item.name}</h3>
                      <motion.button
                        onClick={() => removeItem(item.id)}
                        whileHover={{ scale: 1.15 }}
                        whileTap={{ scale: 0.9 }}
                        className="text-white/30 hover:text-red-400 transition-colors flex-shrink-0"
                      >
                        <Trash2 className="w-4 h-4" />
                      </motion.button>
                    </div>
                    <p className="text-white/40 text-xs mt-0.5 truncate">{item.category}</p>
                    <div className="flex items-center justify-between mt-3">
                      {/* Qty controls */}
                      <div className="flex items-center gap-2">
                        <motion.button
                          onClick={() => updateQty(item.id, item.quantity - 1)}
                          whileTap={{ scale: 0.85 }}
                          className="w-7 h-7 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </motion.button>
                        <motion.span
                          key={item.quantity}
                          initial={{ scale: 1.3, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ duration: 0.2 }}
                          className="w-6 text-center text-sm font-semibold"
                        >
                          {item.quantity}
                        </motion.span>
                        <motion.button
                          onClick={() => updateQty(item.id, item.quantity + 1)}
                          whileTap={{ scale: 0.85 }}
                          className="w-7 h-7 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </motion.button>
                      </div>
                      <motion.span
                        key={item.price * item.quantity}
                        initial={{ opacity: 0.5, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="font-bold text-ember-400"
                      >
                        ${(item.price * item.quantity).toFixed(2)}
                      </motion.span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            <Link href="/menu" className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white transition-colors mt-2">
              <Flame className="w-4 h-4 text-ember-500" />
              Add more items
            </Link>
          </div>

          {/* Summary */}
          <FadeInUp delay={0.1} className="space-y-4">
            <div className="glass rounded-2xl p-6">
              <h2 className="font-semibold mb-5">Order Summary</h2>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-white/60">
                  <span>Subtotal ({count} item{count !== 1 ? "s" : ""})</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-white/60">
                  <span>Delivery fee</span>
                  <span>${DELIVERY_FEE.toFixed(2)}</span>
                </div>
                <div className="border-t border-white/5 pt-3 flex justify-between font-bold text-base">
                  <span>Total</span>
                  <span className="text-ember-400">${(total + DELIVERY_FEE).toFixed(2)}</span>
                </div>
              </div>

              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Link href="/checkout" className="btn-ember w-full mt-6 flex items-center justify-center gap-2">
                  Proceed to Checkout <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            </div>

            <div className="glass rounded-xl px-4 py-3 flex items-center gap-2 text-xs text-white/40">
              <span>🔒</span>
              Secure checkout. Your details are never shared.
            </div>
          </FadeInUp>
        </div>
      </main>
    </>
  );
}
