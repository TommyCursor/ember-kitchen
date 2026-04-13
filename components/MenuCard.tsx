"use client";

import Image from "next/image";
import { Plus, Flame } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import type { MenuItem } from "@/lib/menu-data";
import { motion } from "framer-motion";

interface Props {
  item: MenuItem;
  index?: number;
}

export default function MenuCard({ item, index = 0 }: Props) {
  const { addItem, items } = useCart();
  const inCart = items.find((i) => i.id === item.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -5, transition: { duration: 0.22 } }}
      className="glass rounded-2xl overflow-hidden group flex flex-col"
    >
      {/* Image */}
      <div className="relative h-44 overflow-hidden">
        <Image
          src={item.image}
          alt={item.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-2 flex-wrap">
          {item.badge && (
            <span className="badge bg-ember-500 text-black">{item.badge}</span>
          )}
          {item.popular && !item.badge && (
            <span className="badge bg-white/10 text-white backdrop-blur-sm">Popular</span>
          )}
          {item.spicy && (
            <span className="badge bg-red-500/20 text-red-400 flex items-center gap-1">
              <Flame className="w-3 h-3" /> Spicy
            </span>
          )}
        </div>

        {/* Price */}
        <div className="absolute bottom-3 right-3 text-sm font-bold text-white bg-black/50 backdrop-blur-sm px-2.5 py-1 rounded-lg">
          ${item.price.toFixed(2)}
        </div>
      </div>

      {/* Info */}
      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-semibold text-base mb-1 leading-snug">{item.name}</h3>
        <p className="text-white/50 text-xs leading-relaxed flex-1">{item.description}</p>

        <motion.button
          onClick={() => addItem(item)}
          whileTap={{ scale: 0.96 }}
          className={`mt-4 flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
            inCart
              ? "bg-ember-500/20 border border-ember-500/40 text-ember-400"
              : "bg-ember-500 hover:bg-ember-600 text-black"
          }`}
        >
          <Plus className="w-4 h-4" />
          {inCart ? `In Cart (×${inCart.quantity})` : "Add to Order"}
        </motion.button>
      </div>
    </motion.div>
  );
}
