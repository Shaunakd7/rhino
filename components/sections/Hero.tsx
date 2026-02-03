"use client";

import { useLayoutEffect, useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { gsap } from "gsap";
import Image from "next/image";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Mobile threshold = 1024px
  const [isMobile, setIsMobile] = useState<boolean | null>(null);
  const [textReady, setTextReady] = useState(false);

  /* ================= RESOLVE DEVICE ================= */

  useLayoutEffect(() => {
    if (typeof window === "undefined") return;

    const update = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  /* ================= SCROLL EFFECTS ================= */

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const backgroundScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  /* ================= SEQUENCING ================= */

  useEffect(() => {
    if (isMobile === null) return;

    if (isMobile) {
      const t = setTimeout(() => setTextReady(true), 300);
      return () => clearTimeout(t);
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
      .to({}, { duration: 0.3 })
      .add(() => setTextReady(true));

    return () => tl.kill();
  }, [isMobile]);

  /* ================= TEXT MOTION ================= */

  const textHidden = { opacity: 0, scale: 0.985 };
  const textVisible = { opacity: 1, scale: 1 };

  const textTransition = {
    duration: 0.75,
    ease: [0.25, 1, 0.35, 1],
  };

  if (isMobile === null) {
    return <section className="h-screen w-full bg-black" />;
  }

  return (
    <section
      ref={containerRef}
      className="
        relative h-screen w-full overflow-hidden bg-black
        flex items-start md:items-center justify-center
        pt-24 md:pt-0
      "
    >
      {/* ================= BACKGROUND ================= */}
      <motion.div
        className="hero-bg-image absolute inset-0 z-[5]"
        style={{
          opacity: isMobile ? 1 : undefined,
          y: isMobile ? 0 : backgroundY,
          scale: isMobile ? 1 : backgroundScale,
        }}
      >
        <Image
          src={
            isMobile
              ? "/images/products/hero-bg-mobile.jpg"
              : "/images/products/hero-bg-desktop.jpg"
          }
          alt="Hero Background"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
      </motion.div>

      {/* ================= DOOR PANELS (DESKTOP ONLY) ================= */}
      {!isMobile && (
        <div className="absolute inset-0 z-20 flex">
          <div className="panel-left w-1/2 h-full bg-black" />
          <div className="panel-right w-1/2 h-full bg-black" />
        </div>
      )}

      {/* ================= CONTENT ================= */}
      <div
        className="
          relative z-10 text-center px-6
          md:mt-[-48px] lg:mt-[-72px]
        "
      >
        {/* LOGO */}
        <div className="hero-logo mx-auto mb-6">
          <img
            src="/images/products/logo.svg"
            alt="RHINO Logo"
            className="mx-auto w-[350px] sm:w-[500px]"
          />
        </div>

        {/* TEXT */}
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
