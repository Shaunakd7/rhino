"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.3 });

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

      // SVG logo reveal
      .fromTo(
        ".hero-logo",
        { opacity: 0, scale: 0.96, filter: "blur(10px)" },
        {
          opacity: 1,
          scale: 1,
          filter: "blur(0px)",
          duration: 1.3,
          ease: "power3.out",
        },
        "-=1.1"
      )

      // Background image fade
      .to(
        ".hero-bg-image",
        {
          opacity: 1,
          duration: 1.8,
          ease: "power2.out",
        },
        "-=1.3"
      )

      // Subtext reveal (IMPORTANT: clearProps enables glow)
      .fromTo(
        ".hero-sub",
        { opacity: 0, y: 18 },
        {
          opacity: 1,
          y: 0,
          clearProps: "opacity,transform",
          duration: 0.9,
          ease: "power2.out",
        },
        "-=0.7"
      );
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-black"
    >
      {/* ================= BASE AMBIENT BACKGROUND ================= */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#05070d] via-[#0a0f1f] to-black" />

        <motion.div
          className="absolute -left-1/3 top-1/4 w-[900px] h-[900px] rounded-full blur-[140px]"
          style={{ background: "rgba(20,40,90,0.35)" }}
          animate={{ x: [0, 120, 0], y: [0, -60, 0] }}
          transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
        />

        <motion.div
          className="absolute -right-1/3 top-1/3 w-[800px] h-[800px] rounded-full blur-[160px]"
          style={{ background: "rgba(90,100,120,0.25)" }}
          animate={{ x: [0, -100, 0], y: [0, 80, 0] }}
          transition={{ duration: 32, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(0,0,0,0.85)_75%)]" />
      </div>

      {/* ================= BACKGROUND IMAGE ================= */}
      <div className="hero-bg-image absolute inset-0 z-[5] opacity-0">
        <img
          src="/images/products/hero-bg-desktop.png"
          alt="Hero Background"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/55" />
      </div>

      {/* ================= DOOR PANELS ================= */}
      <div className="absolute inset-0 z-20 flex">
        <div className="panel-left w-1/2 h-full bg-black" />
        <div className="panel-right w-1/2 h-full bg-black" />
      </div>

      {/* ================= CONTENT ================= */}
      <div className="relative z-10 text-center px-6">
        {/* LOGO */}
        <div className="hero-logo mx-auto mb-6">
          <img
            src="/images/products/logo.svg"
            alt="RHINO Logo"
            className="
              mx-auto
              w-[350px]
              sm:w-[500px]
              md:w-[520px]
              lg:w-[620px]
              xl:w-[700px]
            "
          />
        </div>

        {/* SUBTEXT WITH PERMANENT, VISIBLE GLOW */}
        <p
          className="hero-sub text-xl md:text-2xl tracking-wide mb-2"
          style={{
            color: "#ffffff",
            textShadow: `
              0 0 6px rgba(255,255,255,0.45),
              0 0 18px rgba(200,220,255,0.25)
            `,
          }}
        >
          Crafted for Cars That Deserve More
        </p>

        <p
          className="hero-sub text-sm md:text-base tracking-wide"
          style={{
            color: "#ffffff",
            textShadow: `
              0 0 4px rgba(255,255,255,0.4),
              0 0 14px rgba(180,210,255,0.2)
            `,
          }}
        >
          A New Class of Paint Defense
        </p>
      </div>
    </section>
  );
}
