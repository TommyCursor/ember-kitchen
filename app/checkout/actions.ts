"use server";

import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export interface OrderPayload {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  address: string;
  items: Array<{
    id: string;
    name: string;
    price: number;
    quantity: number;
    category: string;
  }>;
  subtotal: number;
  deliveryFee: number;
  total: number;
  notes?: string;
}

export async function placeOrder(payload: OrderPayload): Promise<{ success: boolean; orderId?: string; error?: string }> {
  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() { return cookieStore.getAll(); },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          );
        },
      },
    }
  );

  const { data, error } = await supabase
    .from("restaurant_orders")
    .insert({
      customer_name: payload.customerName,
      customer_email: payload.customerEmail,
      customer_phone: payload.customerPhone,
      address: payload.address,
      items: payload.items,
      subtotal: payload.subtotal,
      delivery_fee: payload.deliveryFee,
      total: payload.total,
      notes: payload.notes || null,
      status: "pending",
    })
    .select("id")
    .single();

  if (error) {
    console.error("Order error:", error);
    return { success: false, error: error.message };
  }

  return { success: true, orderId: data.id };
}
