"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Github } from "lucide-react";

const navLinks = [
  { href: "/#features", label: "Features" },
  { href: "/docs", label: "Docs" },
  { href: "/changelog", label: "Changelog" },
  { href: "/download", label: "Download" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-drift-border bg-drift-bg/95">
      <nav className="container-max flex items-center justify-between h-14">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-drift-accent flex items-center justify-center">
            <span className="text-white font-bold text-xs">D</span>
          </div>
          <span className="font-semibold text-sm">Drift Client</span>
        </Link>

        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-drift-text-secondary hover:text-drift-text transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="https://github.com/xxxxpeterxxxxxx-cloud/Drfit-client"
            target="_blank"
            className="text-drift-muted hover:text-drift-text transition-colors"
          >
            <Github size={18} />
          </Link>
        </div>

        <button
          className="md:hidden text-drift-text"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {open && (
        <div className="md:hidden border-t border-drift-border bg-drift-bg">
          <div className="container-max py-4 flex flex-col gap-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-drift-text-secondary hover:text-drift-text"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="https://github.com/xxxxpeterxxxxxx-cloud/Drfit-client"
              target="_blank"
              className="text-sm text-drift-text-secondary hover:text-drift-text"
              onClick={() => setOpen(false)}
            >
              GitHub
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
