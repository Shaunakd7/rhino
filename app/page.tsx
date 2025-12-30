"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import Hero from "@/components/sections/Hero";
import BrandPhilosophy from "@/components/sections/BrandPhilosophy";
import KSeriesIntro from "@/components/sections/KSeriesIntro";
import FinishesShowcase from "@/components/sections/FinishesShowcase";
import TechnologyFeatures from "@/components/sections/TechnologyFeatures";
import InstallationPhilosophy from "@/components/sections/InstallationPhilosophy";
import AboutUs from "@/components/sections/AboutUs";
import Contact from "@/components/sections/Contact";
import ClosingStatement from "@/components/sections/ClosingStatement";

export default function Home() {
  useEffect(() => {
    // Initialize smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <main className="relative">
      <div className="grain-overlay" />
      <Hero />
      <BrandPhilosophy />
      <KSeriesIntro />
      <FinishesShowcase />
      <TechnologyFeatures />
      <InstallationPhilosophy />
      <AboutUs />
      <Contact />
      <ClosingStatement />
    </main>
  );
}

