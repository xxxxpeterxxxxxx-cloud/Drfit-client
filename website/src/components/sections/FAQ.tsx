"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "Is Drift Client free?",
    a: "Yes, Drift Client is completely free and open source under GPL-3.0. You'll always be able to download and use it without paying.",
  },
  {
    q: "Is Drift Client safe to use on servers?",
    a: "Yes. Drift Client only includes fair-play features. No cheats, no X-ray, no cave ESP. All features comply with server rules on networks like Hypixel and GommeHD.",
  },
  {
    q: "Do I need to own Minecraft?",
    a: "Yes. Drift Client is a launcher and mod collection — it does not include Minecraft itself. You need a valid Microsoft account with a Minecraft purchase.",
  },
  {
    q: "Which Minecraft versions are supported?",
    a: "Drift Client supports Minecraft 1.21+ (latest) and 1.8.9 (for PvP). We use Fabric as the mod loader for both versions.",
  },
  {
    q: "Is Drift Client affiliated with Mojang?",
    a: "No. Drift Client is not affiliated with or endorsed by Mojang or Microsoft. Minecraft is a trademark of Mojang Synergies AB.",
  },
  {
    q: "How is Drift Client different from other clients?",
    a: "Drift Client is built to be lightweight (~10MB launcher), fully open source, and modular. Every feature can be toggled on or off. No bloatware, no ads, no tracking.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-24">
      <div className="container-max max-w-3xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold animate-fade-in-up">
            Frequently asked questions
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="card overflow-hidden animate-fade-in-up"
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between p-5 text-left hover:bg-drift-surface/30 transition-colors"
              >
                <span className="font-medium">{faq.q}</span>
                <ChevronDown
                  size={18}
                  className={`text-drift-muted transition-transform duration-300 ${
                    openIndex === i ? "rotate-180" : ""
                  }`}
                />
              </button>
              <div className={`overflow-hidden transition-all duration-300 ${
                openIndex === i ? "max-h-40" : "max-h-0"
              }`}>
                <div className="px-5 pb-5 text-sm text-drift-text-secondary leading-relaxed">
                  {faq.a}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
