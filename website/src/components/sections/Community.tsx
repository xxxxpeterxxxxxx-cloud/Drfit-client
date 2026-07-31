"use client";

import { motion } from "framer-motion";
import { Github, MessageSquare, MessageCircle, Users } from "lucide-react";

const communityLinks = [
  {
    icon: MessageSquare,
    title: "Discord Server",
    description: "Join 500+ members for support, updates, and community events.",
    action: "Join Discord",
    href: "/discord",
  },
  {
    icon: Github,
    title: "GitHub",
    description: "Browse the source code, report bugs, and contribute features.",
    action: "View on GitHub",
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
    <section id="community" className="pt-32 pb-24 min-h-screen">
      <div className="container-max">
        <div className="text-center mb-16">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-bold"
          >
            Join the <span className="text-gradient">community</span>
          </motion.h1>
          <p className="mt-4 text-lg text-drift-text-secondary max-w-2xl mx-auto">
            Drift Client is built by the community, for the community.
            Get involved, share ideas, and help shape the future of the client.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {communityLinks.map((link, i) => (
            <motion.a
              key={link.title}
              href={link.href}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="card p-6 hover:border-drift-accent/50 transition-colors group flex items-start gap-4"
            >
              <div className="w-12 h-12 rounded-xl bg-drift-accent/10 flex items-center justify-center flex-shrink-0 group-hover:bg-drift-accent/20 transition-colors">
                <link.icon size={24} className="text-drift-accent" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg mb-1">{link.title}</h3>
                <p className="text-sm text-drift-text-secondary mb-3">{link.description}</p>
                <span className="text-sm text-drift-accent group-hover:underline">{link.action} →</span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
