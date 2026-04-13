"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import { useCart } from "@/lib/cart-context";
import { placeOrder } from "./actions";
import { Loader2, MapPin, User, MessageSquare, ArrowLeft, CheckCircle2 } from "lucide-react";
import Link from "next/link";

const DELIVERY_FEE = 2.99;

export default function CheckoutPage() {
  const { items, total, clearCart, count } = useCart();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [form, setForm] = useState({
    customerName: "",
    customerEmail: "",
    customerPhone: "",
    address: "",
    notes: "",
  });

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((prev) => ({ ...prev, [k]: e.target.value }));

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (count === 0) return;
    setLoading(true);
    setError(null);

    const result = await placeOrder({
      ...form,
      items: items.map((i) => ({
        id: i.id,
        name: i.name,
        price: i.price,
        quantity: i.quantity,
        category: i.category,
      })),
      subtotal: total,
      deliveryFee: DELIVERY_FEE,
      total: total + DELIVERY_FEE,
    });

    setLoading(false);
    if (result.success && result.orderId) {
      clearCart();
      router.push(`/order/${result.orderId}`);
    } else {
      setError(result.error || "Failed to place order. Please try again.");
    }
  }

  if (count === 0) {
    return (
      <>
        <Navbar />
        <main className="pt-32 pb-24 max-w-2xl mx-auto px-6 text-center">
          <p className="text-white/50 mb-6">Your cart is empty.</p>
          <Link href="/menu" className="btn-ember inline-flex">Browse Menu</Link>
        </main>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="pt-24 pb-24 max-w-4xl mx-auto px-6">
        <Link href="/cart" className="inline-flex items-center gap-2 text-white/40 hover:text-white text-sm mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to cart
        </Link>

        <h1 className="text-3xl font-bold mb-8">Checkout</h1>

        <div className="grid md:grid-cols-[1fr_360px] gap-8">
          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="glass rounded-2xl p-6 space-y-5">
              <h2 className="font-semibold flex items-center gap-2">
                <User className="w-4 h-4 text-ember-400" /> Your Details
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-white/50 block mb-2">Full Name *</label>
                  <input
                    required
                    value={form.customerName}
                    onChange={set("customerName")}
                    placeholder="John Smith"
                    className="input"
                  />
                </div>
                <div>
                  <label className="text-xs text-white/50 block mb-2">Phone *</label>
                  <input
                    required
                    type="tel"
                    value={form.customerPhone}
                    onChange={set("customerPhone")}
                    placeholder="+1 555 000 1234"
                    className="input"
                  />
                </div>
              </div>
              <div>
                <label className="text-xs text-white/50 block mb-2">Email *</label>
                <input
                  required
                  type="email"
                  value={form.customerEmail}
                  onChange={set("customerEmail")}
                  placeholder="you@email.com"
                  className="input"
                />
              </div>
            </div>

            <div className="glass rounded-2xl p-6 space-y-4">
              <h2 className="font-semibold flex items-center gap-2">
                <MapPin className="w-4 h-4 text-ember-400" /> Delivery Address
              </h2>
              <input
                required
                value={form.address}
                onChange={set("address")}
                placeholder="123 Main Street, Apt 4B, New York, NY 10001"
                className="input"
              />
            </div>

            <div className="glass rounded-2xl p-6 space-y-4">
              <h2 className="font-semibold flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-ember-400" /> Special Instructions
                <span className="text-white/30 text-xs font-normal ml-1">(optional)</span>
              </h2>
              <textarea
                value={form.notes}
                onChange={set("notes")}
                placeholder="Allergies, cooking preferences, delivery notes..."
                rows={3}
                className="input resize-none"
              />
            </div>

            {error && (
              <div className="rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn-ember w-full flex items-center justify-center gap-2 text-base py-4 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <><Loader2 className="w-4 h-4 animate-spin" /> Placing Order...</>
              ) : (
                <><CheckCircle2 className="w-4 h-4" /> Place Order · ${(total + DELIVERY_FEE).toFixed(2)}</>
              )}
            </button>
          </form>

          {/* Order summary */}
          <div className="glass rounded-2xl p-6 h-fit">
            <h2 className="font-semibold mb-4">Order Summary</h2>
            <div className="space-y-3 mb-5">
              {items.map((item) => (
                <div key={item.id} className="flex items-center justify-between text-sm">
                  <span className="text-white/70 truncate pr-2">
                    {item.name}
                    <span className="text-white/30 ml-1">×{item.quantity}</span>
                  </span>
                  <span className="font-medium flex-shrink-0">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-white/5 pt-4 space-y-2 text-sm">
              <div className="flex justify-between text-white/50">
                <span>Subtotal</span><span>${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-white/50">
                <span>Delivery</span><span>${DELIVERY_FEE.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold text-base pt-1">
                <span>Total</span><span className="text-ember-400">${(total + DELIVERY_FEE).toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
