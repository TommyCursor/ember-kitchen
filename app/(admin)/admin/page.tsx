import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import AdminLayout from "./AdminLayout";
import OrderCard from "./OrderCard";
import { ClipboardList, Clock, ChefHat, Truck, CheckCircle2 } from "lucide-react";

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

export default async function AdminPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/sign-in");

  const { data: orders } = await supabase
    .from("restaurant_orders")
    .select("*")
    .order("created_at", { ascending: false })
    .returns<Order[]>();

  const all = orders ?? [];

  const stats = [
    { label: "Total Orders", value: all.length, icon: ClipboardList, color: "text-white" },
    { label: "Pending", value: all.filter((o) => o.status === "pending").length, icon: Clock, color: "text-yellow-400" },
    { label: "Preparing", value: all.filter((o) => o.status === "preparing").length, icon: ChefHat, color: "text-ember-400" },
    { label: "Delivered", value: all.filter((o) => o.status === "delivered").length, icon: CheckCircle2, color: "text-emerald-400" },
  ];

  return (
    <AdminLayout userEmail={user.email ?? ""}>
      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="glass rounded-2xl p-5">
              <div className={`${s.color} mb-3`}><Icon className="w-5 h-5" /></div>
              <div className="text-2xl font-bold">{s.value}</div>
              <div className="text-white/40 text-sm mt-0.5">{s.label}</div>
            </div>
          );
        })}
      </div>

      {/* Orders */}
      <div>
        <h2 className="font-semibold text-lg mb-4 flex items-center gap-2">
          <Truck className="w-5 h-5 text-ember-400" />
          All Orders
        </h2>
        {all.length === 0 ? (
          <div className="glass rounded-2xl p-12 text-center text-white/30">
            No orders yet. Orders placed through the site will appear here.
          </div>
        ) : (
          <div className="space-y-4">
            {all.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
