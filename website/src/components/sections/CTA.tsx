"use client";

import Link from "next/link";
import { Download } from "lucide-react";

export function CTA() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-radial-fade" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] rounded-full bg-drift-accent/8 blur-[80px] pointer-events-none animate-aurora" />
      <div className="container-max relative z-10 text-center">
        <h2 className="text-4xl md:text-5xl font-bold animate-fade-in-up">
          Ready for a better way
          <br />
          to play <span className="text-gradient">Minecraft</span>?
        </h2>
        <p className="mt-6 text-lg text-drift-text-secondary max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
          Download Drift Client for free and discover features built around your playstyle.
        </p>
        <div className="mt-10 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
          <Link href="/download" className="btn-mc-green text-base px-8 py-3 pixel-shadow">
            <Download size={20} />
            Download for Free
          </Link>
        </div>
      </div>
    </section>
  );
}
