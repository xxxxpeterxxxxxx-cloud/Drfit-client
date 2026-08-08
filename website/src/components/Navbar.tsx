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
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled
        ? "glass shadow-xl shadow-black/20 border-b-2 border-drift-border"
        : "bg-transparent border-b-2 border-transparent"
    }`}>
      <nav className="container-max flex items-center justify-between h-16">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="relative w-9 h-9 bg-gradient-to-br from-drift-accent to-drift-mc-green flex items-center justify-center pixel-shadow group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-transform duration-150" style={{ borderRadius: '4px' }}>
            <span className="text-white font-pixel text-[10px]">D</span>
          </div>
          <span className="font-pixel text-[11px] tracking-tight">Drift Client</span>
        </Link>

        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-3.5 py-2 text-sm text-drift-text-secondary hover:text-drift-accent transition-all duration-150 hover:bg-drift-surface/60"
              style={{ borderRadius: '4px' }}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="https://github.com/xxxxpeterxxxxxx-cloud/Drfit-client"
            target="_blank"
            className="ml-2 text-drift-muted hover:text-drift-text transition-colors p-2 hover:bg-drift-surface/60"
            style={{ borderRadius: '4px' }}
          >
            <Github size={18} />
          </Link>
          <Link
            href="/download"
            className="btn-mc-green text-sm ml-1 pixel-shadow-sm"
          >
            <Download size={14} />
            Get Started
          </Link>
        </div>

        <button
          className="md:hidden text-drift-text p-2 hover:bg-drift-surface/60 transition-colors"
          style={{ borderRadius: '4px' }}
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      <div className={`md:hidden overflow-hidden transition-all duration-300 ${
        open ? "max-h-96 glass border-t-2 border-drift-border" : "max-h-0"
      }`}>
        <div className="container-max py-4 flex flex-col gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-3.5 py-2.5 text-sm text-drift-text-secondary hover:text-drift-accent hover:bg-drift-surface/60 transition-colors"
              style={{ borderRadius: '4px' }}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="https://github.com/xxxxpeterxxxxxx-cloud/Drfit-client"
            target="_blank"
            className="px-3.5 py-2.5 text-sm text-drift-text-secondary hover:text-drift-accent hover:bg-drift-surface/60 transition-colors"
            style={{ borderRadius: '4px' }}
            onClick={() => setOpen(false)}
          >
            GitHub
          </Link>
        </div>
      </div>
    </header>
  );
}
