"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.3 });

    // Opening panels
    tl.to(".panel-left", {
      x: "-100%",
      duration: 1.6,
      ease: "power4.inOut",
    })
      .to(
        ".panel-right",
        {
          x: "100%",
          duration: 1.6,
          ease: "power4.inOut",
        },
        "<"
      )
      // RHINO clarity reveal
      .fromTo(
        ".hero-title",
        { opacity: 0.4, filter: "blur(6px)" },
        {
          opacity: 1,
          filter: "blur(0px)",
          duration: 1.2,
          ease: "power3.out",
        },
        "-=1.0"
      )
      .from(
        ".hero-sub",
        {
          opacity: 0,
          y: 20,
          duration: 0.8,
          ease: "power2.out",
        },
        "-=0.6"
      );
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-black"
    >
      {/* ================= BACKGROUND ================= */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#05070d] via-[#0a0f1f] to-black" />

        {/* Left dark-blue energy */}
        <motion.div
          className="absolute -left-1/3 top-1/4 w-[900px] h-[900px] rounded-full blur-[140px]"
          style={{ background: "rgba(20,40,90,0.35)" }}
          animate={{ x: [0, 120, 0], y: [0, -60, 0] }}
          transition={{
            duration: 26,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Right graphite glow */}
        <motion.div
          className="absolute -right-1/3 top-1/3 w-[800px] h-[800px] rounded-full blur-[160px]"
          style={{ background: "rgba(90,100,120,0.25)" }}
          animate={{ x: [0, -100, 0], y: [0, 80, 0] }}
          transition={{
            duration: 32,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Subtle steel-blue center glow */}
        <motion.div
          className="absolute left-1/2 top-1/2 w-[600px] h-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[180px]"
          style={{ background: "rgba(60,90,150,0.18)" }}
          animate={{ scale: [1, 1.1, 1] }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(0,0,0,0.85)_75%)]" />
      </div>

      {/* ================= OPENING PANELS ================= */}
      <div className="absolute inset-0 z-20 flex">
        <div className="panel-left w-1/2 h-full bg-black" />
        <div className="panel-right w-1/2 h-full bg-black" />
      </div>

      {/* ================= CONTENT ================= */}
      <div className="relative z-10 text-center px-6">
        <h1 className="hero-title text-7xl md:text-9xl lg:text-[11rem] font-semibold tracking-tight text-white mb-6">
          RHINO
        </h1>

        <p className="hero-sub text-xl md:text-2xl text-neutral-300 tracking-wide mb-2">
          Crafted for Cars That Deserve More
        </p>

        <p className="hero-sub text-sm md:text-base text-neutral-400 tracking-wide">
          A New Class of Paint Defense
        </p>
      </div>
    </section>
  );
}
