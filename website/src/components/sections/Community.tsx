"use client";

import { Github, MessageCircle, Users, Star } from "lucide-react";

const communityLinks = [
  {
    icon: Github,
    title: "GitHub",
    description: "Browse the source code, report bugs, and contribute features.",
    action: "View on GitHub",
    href: "https://github.com/xxxxpeterxxxxxx-cloud/Drfit-client",
  },
  {
    icon: Star,
    title: "Star the Project",
    description: "Show your support by starring the repo. It helps others discover Drift.",
    action: "Star on GitHub",
    href: "https://github.com/xxxxpeterxxxxxx-cloud/Drfit-client",
  },
  {
    icon: MessageCircle,
    title: "Feature Requests",
    description: "Suggest new features and vote on what we should build next.",
    action: "Submit Request",
    href: "https://github.com/xxxxpeterxxxxxx-cloud/Drfit-client/issues",
  },
  {
    icon: Users,
    title: "Contributors",
    description: "Drift Client is built by the community. Become a contributor.",
    action: "Read Contributing Guide",
    href: "/docs",
  },
];

export function Community() {
  return (
    <section id="community" className="py-24 border-t-2 border-drift-border relative">
      <div className="container-max">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold animate-fade-in-up">
            Join the <span className="text-gradient">community</span>
          </h1>
          <p className="mt-4 text-lg text-drift-text-secondary max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
            Drift Client is built by the community, for the community.
            Get involved, share ideas, and help shape the future of the client.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-4xl mx-auto">
          {communityLinks.map((link, i) => (
            <a
              key={link.title}
              href={link.href}
              className="card p-6 hover:border-drift-mc-green/50 transition-all duration-300 group flex items-start gap-4 animate-fade-in-up"
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              <div className="w-12 h-12 bg-drift-mc-green/10 flex items-center justify-center flex-shrink-0 group-hover:bg-drift-mc-green/20 group-hover:scale-110 transition-all duration-300" style={{ borderRadius: '4px' }}>
                <link.icon size={24} className="text-drift-mc-green" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg mb-1">{link.title}</h3>
                <p className="text-sm text-drift-text-secondary mb-3">{link.description}</p>
                <span className="link-arrow">{link.action} →</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
