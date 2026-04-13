import Navbar from "@/components/Navbar";
import HeroContent from "@/components/home/HeroContent";
import MarqueeBand from "@/components/home/MarqueeBand";
import HowItWorksSection from "@/components/home/HowItWorksSection";
import FeaturedSection from "@/components/home/FeaturedSection";
import AboutSection from "@/components/home/AboutSection";
import ReelSection from "@/components/home/ReelSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import CTASection from "@/components/home/CTASection";
import { Flame } from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <HeroContent />
      <MarqueeBand />
      <FeaturedSection />
      <HowItWorksSection />
      <AboutSection />
      <ReelSection />
      <TestimonialsSection />
      <CTASection />

      {/* Footer */}
      <footer className="border-t border-white/5 py-12 bg-[#060606]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2.5 font-display text-lg font-light tracking-wider">
            <Flame className="w-4 h-4 text-ember-500" />
            Ember Kitchen
          </div>
          <p className="text-white/20 text-xs tracking-widest uppercase">
            © 2026 Ember Kitchen · Built by Tommy Cursor
          </p>
          <div className="flex gap-8 text-xs text-white/30 tracking-widest uppercase">
            <Link href="/menu" className="hover:text-white transition-colors">Menu</Link>
            <Link href="/cart" className="hover:text-white transition-colors">Cart</Link>
            <Link href="/admin" className="hover:text-white transition-colors">Admin</Link>
          </div>
        </div>
      </footer>
    </>
  );
}
