import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/sections/Hero";
import { Features } from "@/components/sections/Features";
import { Showcase } from "@/components/sections/Showcase";
import { Comparison } from "@/components/sections/Comparison";
import { FAQ } from "@/components/sections/FAQ";
import { CTA } from "@/components/sections/CTA";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Showcase />
        <Comparison />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
