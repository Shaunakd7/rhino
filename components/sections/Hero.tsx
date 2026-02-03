"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { gsap } from "gsap";
import Image from "next/image";

export default function HeroInner({ isMobile }: { isMobile: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [textReady, setTextReady] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const backgroundScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  useEffect(() => {
    if (isMobile) {
      // Mobile: background + logo already visible, text comes after
      setTimeout(() => setTextReady(true), 300);
      return;
    }

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
      // LOGO COMES IN
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
      // BACKGROUND COMES IN WITH LOGO (AS BEFORE)
      .to(
        ".hero-bg-image",
        { opacity: 1, duration: 1.4, ease: "power2.out" },
        "-=1.0"
      )
      // ONLY NOW TEXT IS ALLOWED
      .add(() => {
        setTextReady(true);
      });
  }, [isMobile]);

  const textHidden = { opacity: 0, scale: 0.985 };
  const textVisible = { opacity: 1, scale: 1 };

  const textTransition = {
    duration: 0.75,
    ease: [0.25, 1, 0.35, 1],
  };

  return (
    <section
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden bg-black flex items-start md:items-center justify-center pt-24 md:pt-0"
    >
      {/* ================= BACKGROUND ================= */}
      <motion.div
        className="hero-bg-image absolute inset-0 z-[5]"
        style={{
          opacity: isMobile ? 1 : 0,
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
        />
      </motion.div>

      {/* ================= CONTENT ================= */}
      <div className="relative z-10 text-center px-6">
        {/* LOGO FIRST */}
        <div className="hero-logo mx-auto mb-6">
          <img
            src="/images/products/logo.svg"
            alt="RHINO Logo"
            className="mx-auto w-[350px] sm:w-[500px]"
          />
        </div>

        {/* TEXT AFTER LOGO + BG */}
        <div
          style={{
            contain: "layout paint",
            transform: "translateZ(0)",
          }}
        >
          <motion.p
            className="hero-sub text-xl mb-2"
            initial={false}
            animate={textReady ? textVisible : textHidden}
            transition={textTransition}
          >
            Crafted for Cars That Deserve More
          </motion.p>

          <motion.p
            className="hero-sub text-sm"
            initial={false}
            animate={textReady ? textVisible : textHidden}
            transition={{ ...textTransition, delay: 0.12 }}
          >
            A New Class of Paint Defense
          </motion.p>
        </div>
      </div>
    </section>
  );
}
