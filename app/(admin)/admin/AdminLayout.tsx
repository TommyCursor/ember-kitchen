"use client";

import { Flame, LogOut } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AdminLayout({ children, userEmail }: { children: React.ReactNode; userEmail: string }) {
  const router = useRouter();

  async function signOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/sign-in");
    router.refresh();
  }

  return (
    <div className="min-h-screen">
      {/* Top bar */}
      <header className="border-b border-white/5 glass-dark sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold text-sm">
            <Flame className="w-4 h-4 text-ember-400" />
            <span>Ember Kitchen</span>
            <span className="text-white/20 mx-1">·</span>
            <span className="text-white/40 font-normal">Admin</span>
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-white/40 text-xs hidden sm:block">{userEmail}</span>
            <button
              onClick={signOut}
              className="flex items-center gap-1.5 text-xs text-white/40 hover:text-white transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              Sign out
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8">{children}</main>
    </div>
  );
}
