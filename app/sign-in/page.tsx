"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Flame, Loader2, Eye, EyeOff } from "lucide-react";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const supabase = createClient();
    const { error: err } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (err) {
      setError("Invalid credentials. Check your email and password.");
      return;
    }
    router.push("/admin");
    router.refresh();
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-2xl bg-ember-500/20 flex items-center justify-center mx-auto mb-4">
            <Flame className="w-6 h-6 text-ember-400" />
          </div>
          <h1 className="text-2xl font-bold">Admin Login</h1>
          <p className="text-white/40 text-sm mt-1">Ember Kitchen management portal</p>
        </div>

        <form onSubmit={handleSubmit} className="glass rounded-2xl p-6 space-y-4">
          <div>
            <label className="text-xs text-white/50 block mb-2">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@emberkitchen.com"
              className="input"
            />
          </div>
          <div>
            <label className="text-xs text-white/50 block mb-2">Password</label>
            <div className="relative">
              <input
                type={showPw ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="input pr-11"
              />
              <button
                type="button"
                onClick={() => setShowPw(!showPw)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white transition-colors"
              >
                {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {error && (
            <div className="rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="btn-ember w-full flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Signing in...</> : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
