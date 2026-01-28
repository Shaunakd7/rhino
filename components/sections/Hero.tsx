"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { gsap } from "gsap";
import Image from "next/image";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    setIsMobile(window.innerWidth < 768);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const backgroundScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  useEffect(() => {
    if (isMobile) return;

    const tl = gsap.timeline({ delay: 0.3 });

    tl.to(".panel-left", {
      x: "-100%",
      duration: 1.2,
      ease: "power4.inOut",
    })
      .to(
        ".panel-right",
        {
          x: "100%",
          duration: 1.2,
          ease: "power4.inOut",
        },
        "<"
      )
      .fromTo(
        ".hero-logo",
        { opacity: 0, scale: 0.96, filter: "blur(10px)" },
        {
          opacity: 1,
          scale: 1,
          filter: "blur(0px)",
          duration: 1.1,
          ease: "power3.out",
        },
        "-=0.9"
      )
      .to(
        ".hero-bg-image",
        {
          opacity: 1,
          duration: 1.4,
          ease: "power2.out",
        },
        "-=1.0"
      )
      .fromTo(
        ".hero-sub",
        { opacity: 0, y: 18 },
        {
          opacity: 1,
          y: 0,
          clearProps: "opacity,transform",
          duration: 0.7,
          ease: "power2.out",
        },
        "-=0.6"
      );
  }, [isMobile]);

  return (
    <section
      ref={containerRef}
      className="
        relative h-screen w-full overflow-hidden bg-black
        flex items-start md:items-center justify-center
        pt-24 md:pt-0
      "
    >
      {/* ================= BASE AMBIENT BACKGROUND ================= */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#05070d] via-[#0a0f1f] to-black" />

        {isMobile ? (
          <>
            {/* softened mobile ambient blobs */}
            <div
              className="absolute -left-1/2 top-1/3 w-[500px] h-[500px] rounded-full blur-[120px]"
              style={{ background: "rgba(20,40,90,0.25)" }}
            />
            <div
              className="absolute -right-1/2 top-1/3 w-[500px] h-[500px] rounded-full blur-[130px]"
              style={{ background: "rgba(90,100,120,0.2)" }}
            />
          </>
        ) : (
          <>
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
          </>
        )}

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(0,0,0,0.85)_75%)]" />
      </div>

      {/* ================= BACKGROUND IMAGE ================= */}
      <motion.div
        className="hero-bg-image absolute inset-0 z-[5] opacity-0"
        style={{
          y: isMobile ? 0 : backgroundY,
          scale: isMobile ? 1 : backgroundScale,
        }}
      >
        <Image
          src="/images/products/hero-bg-desktop.jpg"
          alt="Hero Background"
          fill
          priority
          className="object-cover"
          quality={90}
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.6)_100%)]" />
      </motion.div>

      {/* ================= DOOR PANELS ================= */}
      {!isMobile && (
        <div className="absolute inset-0 z-20 flex">
          <div className="panel-left w-1/2 h-full bg-black" />
          <div className="panel-right w-1/2 h-full bg-black" />
        </div>
      )}

      {/* ================= CONTENT ================= */}
      <div className="relative z-10 text-center px-6">
        {/* LOGO WRAPPER */}
        <div className="relative hero-logo mx-auto mb-6 inline-block">
          {/* MOBILE-ONLY LOGO GLOW */}
          {isMobile && (
            <div
              className="
                absolute inset-0 -z-10
                rounded-full
                blur-[60px]
                scale-110
              "
              style={{
                background:
                  "radial-gradient(circle, rgba(180,210,255,0.45) 0%, rgba(120,160,255,0.25) 35%, rgba(0,0,0,0) 70%)",
              }}
            />
          )}

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

        <motion.p
          className="hero-sub text-xl md:text-2xl tracking-wide mb-2"
          style={{
            color: "#ffffff",
            textShadow: `
              0 0 6px rgba(2, 0, 0, 0.45),
              0 0 18px rgba(200,220,255,0.25)
            `,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: isMobile ? 0.3 : 1.2, duration: 0.8 }}
        >
          Crafted for Cars That Deserve More
        </motion.p>

        <motion.p
          className="hero-sub text-sm md:text-base tracking-wide"
          style={{
            color: "#ffffff",
            textShadow: `
              0 0 4px rgba(255,255,255,0.4),
              0 0 14px rgba(180,210,255,0.2)
            `,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: isMobile ? 0.5 : 1.4, duration: 0.8 }}
        >
          A New Class of Paint Defense
        </motion.p>
      </div>
    </section>
  );
}
