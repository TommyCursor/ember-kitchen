"use client";

import { Flame } from "lucide-react";

const ITEMS = [
  "Ember-grilled Ribeye",
  "Truffle Risotto",
  "Pan-seared Salmon",
  "Wagyu Burger",
  "Lobster Bisque",
  "Panna Cotta",
  "Seasonal Tasting Menu",
  "Wood-fired Pizza",
];

export default function MarqueeBand() {
  const repeated = [...ITEMS, ...ITEMS];

  return (
    <div className="border-y border-white/6 py-4 overflow-hidden bg-[#0c0c0c]">
      <div className="marquee-track">
        {repeated.map((item, i) => (
          <div key={i} className="flex items-center gap-4 px-6 flex-shrink-0">
            <Flame className="w-3 h-3 text-ember-500/60 flex-shrink-0" />
            <span className="text-white/40 text-xs tracking-[0.2em] uppercase font-medium whitespace-nowrap">
              {item}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
