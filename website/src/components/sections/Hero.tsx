"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Download, ArrowRight, Zap, Shield, Gauge } from "lucide-react";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background effects */}
      <div className="absolute inset-0 bg-grid-pattern bg-[size:40px_40px] opacity-30" />
      <div className="absolute inset-0 bg-radial-fade" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-drift-bg" />

      <div className="container-max relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-drift-surface border border-drift-border mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-sm text-drift-text-secondary">v0.1.0 in development</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl md:text-7xl font-bold tracking-tight"
        >
          Everything you need.
          <br />
          <span className="text-gradient">Nothing you don&apos;t.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 text-lg md:text-xl text-drift-text-secondary max-w-2xl mx-auto"
        >
          Drift Client is a fast, customizable Minecraft client with built-in
          performance mods, HUD overlays, and quality-of-life features — all in
          one lightweight package.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link href="/download" className="btn-primary text-base px-8 py-3">
            <Download size={20} />
            Download for Free
          </Link>
          <Link href="/#features" className="btn-secondary text-base px-8 py-3">
            Explore Features
            <ArrowRight size={18} />
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 flex flex-wrap items-center justify-center gap-8 text-sm text-drift-muted"
        >
          <div className="flex items-center gap-2">
            <Zap size={16} className="text-drift-accent" />
            Sodium + Lithium built in
          </div>
          <div className="flex items-center gap-2">
            <Shield size={16} className="text-drift-accent" />
            Fair-play, no cheats
          </div>
          <div className="flex items-center gap-2">
            <Gauge size={16} className="text-drift-accent" />
            1.21+ & 1.8.9 support
          </div>
        </motion.div>
      </div>
    </section>
  );
}
