"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, Github, Download } from "lucide-react";

const navLinks = [
  { href: "/#features", label: "Features" },
  { href: "/#showcase", label: "Showcase" },
  { href: "/docs", label: "Docs" },
  { href: "/changelog", label: "Changelog" },
  { href: "/licenses", label: "Licenses" },
  { href: "/download", label: "Download" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled
        ? "glass shadow-xl shadow-black/10 border-b border-drift-border/40"
        : "bg-transparent border-b border-transparent"
    }`}>
      <nav className="container-max flex items-center justify-between h-16">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="relative w-8 h-8 rounded-xl bg-gradient-to-br from-drift-accent to-drift-accent-hover flex items-center justify-center shadow-lg shadow-drift-accent/30 group-hover:shadow-drift-accent/60 transition-all duration-300 group-hover:scale-105">
            <span className="text-white font-bold text-sm">D</span>
            <div className="absolute inset-0 rounded-xl bg-drift-accent/30 blur-md -z-10 group-hover:blur-lg transition-all" />
          </div>
          <span className="font-semibold text-sm tracking-tight">Drift Client</span>
        </Link>

        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-3.5 py-2 text-sm text-drift-text-secondary hover:text-drift-text transition-all duration-200 rounded-lg hover:bg-drift-surface/60"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="https://github.com/xxxxpeterxxxxxx-cloud/Drfit-client"
            target="_blank"
            className="ml-2 text-drift-muted hover:text-drift-text transition-colors p-2 rounded-lg hover:bg-drift-surface/60"
          >
            <Github size={18} />
          </Link>
          <Link
            href="/download"
            className="btn-primary text-sm ml-1"
          >
            <Download size={14} />
            Get Started
          </Link>
        </div>

        <button
          className="md:hidden text-drift-text p-2 rounded-lg hover:bg-drift-surface/60 transition-colors"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      <div className={`md:hidden overflow-hidden transition-all duration-300 ${
        open ? "max-h-96 glass border-t border-drift-border/40" : "max-h-0"
      }`}>
        <div className="container-max py-4 flex flex-col gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-3.5 py-2.5 text-sm text-drift-text-secondary hover:text-drift-text rounded-lg hover:bg-drift-surface/60 transition-colors"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="https://github.com/xxxxpeterxxxxxx-cloud/Drfit-client"
            target="_blank"
            className="px-3.5 py-2.5 text-sm text-drift-text-secondary hover:text-drift-text rounded-lg hover:bg-drift-surface/60 transition-colors"
            onClick={() => setOpen(false)}
          >
            GitHub
          </Link>
        </div>
      </div>
    </header>
  );
}
