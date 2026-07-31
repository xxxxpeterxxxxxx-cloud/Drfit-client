"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Download } from "lucide-react";

export function CTA() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-radial-fade" />
      <div className="container-max relative z-10 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-5xl font-bold"
        >
          Ready for a better way
          <br />
          to play <span className="text-gradient">Minecraft</span>?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-6 text-lg text-drift-text-secondary max-w-2xl mx-auto"
        >
          Download Drift Client for free and discover features built around your playstyle.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-10"
        >
          <Link href="/download" className="btn-primary text-base px-8 py-3">
            <Download size={20} />
            Download for Free
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
