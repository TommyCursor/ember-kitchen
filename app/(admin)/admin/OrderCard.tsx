"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { ChevronDown, ChevronUp, MapPin, Phone, Mail } from "lucide-react";

type Order = {
  id: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  address: string;
  items: Array<{ id: string; name: string; price: number; quantity: number }>;
  subtotal: number;
  delivery_fee: number;
  total: number;
  status: string;
  notes: string | null;
  created_at: string;
};

const STATUS_OPTIONS = ["pending", "confirmed", "preparing", "ready", "delivered", "cancelled"];

const STATUS_COLORS: Record<string, string> = {
  pending:   "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  confirmed: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  preparing: "bg-ember-500/10 text-ember-400 border-ember-500/20",
  ready:     "bg-purple-500/10 text-purple-400 border-purple-500/20",
  delivered: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  cancelled: "bg-red-500/10 text-red-400 border-red-500/20",
};

export default function OrderCard({ order }: { order: Order }) {
  const [expanded, setExpanded] = useState(false);
  const [status, setStatus] = useState(order.status);
  const [updating, setUpdating] = useState(false);
  const router = useRouter();

  async function updateStatus(newStatus: string) {
    setUpdating(true);
    const supabase = createClient();
    await supabase.from("restaurant_orders").update({ status: newStatus }).eq("id", order.id);
    setStatus(newStatus);
    setUpdating(false);
    router.refresh();
  }

  return (
    <div className="glass rounded-2xl overflow-hidden">
      {/* Header row */}
      <div
        className="flex items-center justify-between p-5 cursor-pointer hover:bg-white/5 transition-colors"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-center gap-4 flex-1 min-w-0">
          <div>
            <p className="font-semibold text-sm">{order.customer_name}</p>
            <p className="text-white/40 text-xs mt-0.5">
              #{order.id.slice(0, 8).toUpperCase()} · {new Date(order.created_at).toLocaleString()}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3 flex-shrink-0">
          <span className={`badge border ${STATUS_COLORS[status] ?? "bg-white/5 text-white/40 border-white/10"}`}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </span>
          <span className="font-bold text-ember-400 text-sm">${Number(order.total).toFixed(2)}</span>
          {expanded ? <ChevronUp className="w-4 h-4 text-white/30" /> : <ChevronDown className="w-4 h-4 text-white/30" />}
        </div>
      </div>

      {/* Expanded details */}
      {expanded && (
        <div className="border-t border-white/5 p-5 space-y-5">
          {/* Customer info */}
          <div className="grid sm:grid-cols-3 gap-3 text-sm">
            <div className="flex items-center gap-2 text-white/60">
              <Mail className="w-3.5 h-3.5 text-ember-400 flex-shrink-0" />
              {order.customer_email}
            </div>
            <div className="flex items-center gap-2 text-white/60">
              <Phone className="w-3.5 h-3.5 text-ember-400 flex-shrink-0" />
              {order.customer_phone}
            </div>
            <div className="flex items-center gap-2 text-white/60">
              <MapPin className="w-3.5 h-3.5 text-ember-400 flex-shrink-0" />
              <span className="truncate">{order.address}</span>
            </div>
          </div>

          {/* Items */}
          <div>
            <p className="text-xs text-white/40 font-semibold tracking-wide mb-3">ORDER ITEMS</p>
            <div className="space-y-2">
              {order.items.map((item, i) => (
                <div key={i} className="flex justify-between text-sm">
                  <span className="text-white/70">{item.name} <span className="text-white/30">×{item.quantity}</span></span>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-white/5 mt-3 pt-3 flex justify-between text-sm font-bold">
              <span>Total</span>
              <span className="text-ember-400">${Number(order.total).toFixed(2)}</span>
            </div>
          </div>

          {order.notes && (
            <div className="bg-white/3 rounded-xl px-4 py-3 text-sm text-white/50 italic">
              &ldquo;{order.notes}&rdquo;
            </div>
          )}

          {/* Status update */}
          <div>
            <p className="text-xs text-white/40 font-semibold tracking-wide mb-3">UPDATE STATUS</p>
            <div className="flex flex-wrap gap-2">
              {STATUS_OPTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => updateStatus(s)}
                  disabled={updating || s === status}
                  className={`px-4 py-1.5 rounded-lg text-xs font-medium transition-all disabled:opacity-50 border ${
                    s === status
                      ? `${STATUS_COLORS[s]} cursor-default`
                      : "border-white/10 text-white/50 hover:border-white/20 hover:text-white"
                  }`}
                >
                  {s.charAt(0).toUpperCase() + s.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
