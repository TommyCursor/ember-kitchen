import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import { CheckCircle2, Clock, ChefHat, Package, Truck, Flame, ArrowRight } from "lucide-react";

const STATUS_STEPS = [
  { key: "pending",    label: "Order Received",   icon: CheckCircle2, desc: "We've got your order and are confirming it." },
  { key: "confirmed",  label: "Confirmed",         icon: CheckCircle2, desc: "Your order is confirmed and sent to the kitchen." },
  { key: "preparing",  label: "Being Prepared",    icon: ChefHat,      desc: "Our chefs are crafting your meal right now." },
  { key: "ready",      label: "Ready for Pickup",  icon: Package,      desc: "Your order is packed and ready." },
  { key: "delivered",  label: "Delivered",         icon: Truck,        desc: "Enjoy your meal!" },
];

const STATUS_INDEX: Record<string, number> = {
  pending: 0,
  confirmed: 1,
  preparing: 2,
  ready: 3,
  delivered: 4,
  cancelled: -1,
};

type Order = {
  id: string;
  customer_name: string;
  customer_email: string;
  address: string;
  items: Array<{ id: string; name: string; price: number; quantity: number; category: string }>;
  subtotal: number;
  delivery_fee: number;
  total: number;
  status: string;
  notes: string | null;
  created_at: string;
};

export default async function OrderPage({ params }: { params: { id: string } }) {
  const supabase = await createClient();

  const { data: order, error } = await supabase
    .from("restaurant_orders")
    .select("*")
    .eq("id", params.id)
    .single<Order>();

  if (error || !order) notFound();

  const currentStep = STATUS_INDEX[order.status] ?? 0;
  const isDelivered = order.status === "delivered";
  const isCancelled = order.status === "cancelled";

  return (
    <>
      <Navbar />
      <main className="pt-24 pb-24 max-w-2xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-10">
          <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${isDelivered ? "bg-emerald-500/20" : "bg-ember-500/20"}`}>
            {isDelivered ? (
              <CheckCircle2 className="w-8 h-8 text-emerald-400" />
            ) : (
              <Flame className="w-8 h-8 text-ember-400 animate-pulse" />
            )}
          </div>
          <h1 className="text-2xl font-bold mb-1">
            {isCancelled ? "Order Cancelled" : isDelivered ? "Delivered — Enjoy!" : "Order Confirmed!"}
          </h1>
          <p className="text-white/50 text-sm">
            Order #{order.id.slice(0, 8).toUpperCase()} · {new Date(order.created_at).toLocaleString()}
          </p>
        </div>

        {/* Status tracker */}
        {!isCancelled && (
          <div className="glass rounded-2xl p-6 mb-6">
            <h2 className="font-semibold mb-6 flex items-center gap-2">
              <Clock className="w-4 h-4 text-ember-400" /> Order Status
            </h2>
            <div className="space-y-4">
              {STATUS_STEPS.map((step, i) => {
                const done = i <= currentStep;
                const active = i === currentStep;
                const Icon = step.icon;
                return (
                  <div key={step.key} className={`flex items-start gap-4 ${done ? "" : "opacity-30"}`}>
                    <div className={`mt-0.5 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      active ? "bg-ember-500 text-black" : done ? "bg-ember-500/20 text-ember-400" : "bg-white/5 text-white/20"
                    }`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <p className={`text-sm font-semibold ${active ? "text-ember-400" : ""}`}>{step.label}</p>
                      {active && <p className="text-xs text-white/50 mt-0.5">{step.desc}</p>}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Order details */}
        <div className="glass rounded-2xl p-6 mb-6">
          <h2 className="font-semibold mb-4">Your Items</h2>
          <div className="space-y-3 mb-5">
            {order.items.map((item, i) => (
              <div key={i} className="flex items-center justify-between text-sm">
                <span className="text-white/70">
                  {item.name}
                  <span className="text-white/30 ml-1">×{item.quantity}</span>
                </span>
                <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="border-t border-white/5 pt-4 space-y-2 text-sm">
            <div className="flex justify-between text-white/50">
              <span>Subtotal</span><span>${Number(order.subtotal).toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-white/50">
              <span>Delivery</span><span>${Number(order.delivery_fee).toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold pt-1">
              <span>Total</span><span className="text-ember-400">${Number(order.total).toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Delivery info */}
        <div className="glass rounded-2xl p-5 mb-8 text-sm space-y-2">
          <p className="text-white/40 text-xs font-semibold tracking-wide">DELIVERY TO</p>
          <p className="font-medium">{order.customer_name}</p>
          <p className="text-white/60">{order.address}</p>
          {order.notes && (
            <p className="text-white/40 italic text-xs mt-2">&ldquo;{order.notes}&rdquo;</p>
          )}
        </div>

        <Link href="/menu" className="btn-ember w-full flex items-center justify-center gap-2">
          Order Again <ArrowRight className="w-4 h-4" />
        </Link>
      </main>
    </>
  );
}
