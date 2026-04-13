import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/lib/cart-context";
import CursorGlow from "@/components/CursorGlow";
import ScrollProgress from "@/components/ScrollProgress";

export const metadata: Metadata = {
  title: "Ember Kitchen — Fine Dining, Delivered",
  description: "Experience elevated cuisine from Ember Kitchen. Order online for delivery or collection.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <ScrollProgress />
          <CursorGlow />
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
