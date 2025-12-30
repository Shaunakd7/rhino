"use client";

import { useEffect, useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { gsap } from "gsap";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 200 };
  const x = useSpring(useTransform(mouseX, [-0.5, 0.5], [-50, 50]), springConfig);
  const y = useSpring(useTransform(mouseY, [-0.5, 0.5], [-50, 50]), springConfig);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const bgOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const bgScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.3]);
  const bgParallaxY = useTransform(scrollYProgress, [0, 0.5], [0, -200]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      mouseX.set((clientX / innerWidth - 0.5) * 2);
      mouseY.set((clientY / innerHeight - 0.5) * 2);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  useEffect(() => {
    const stars = Array.from({ length: 200 });

    stars.forEach(() => {
      const star = document.createElement("div");
      const size = Math.random() * 2 + 0.5;

      star.className = "space-star";
      star.style.cssText = `
        position:absolute;
        width:${size}px;
        height:${size}px;
        background:white;
        border-radius:50%;
        left:${Math.random() * 100}%;
        top:${Math.random() * 100}%;
        pointer-events:none;
        box-shadow:0 0 ${size * 2}px white;
      `;

      containerRef.current?.appendChild(star);

      // ✅ BUILD-SAFE GSAP ANIMATION
      gsap.to(star, {
        keyframes: [
          { opacity: 0.3, scale: 0.8 },
          { opacity: 1, scale: 1.2 },
          { opacity: 0.3, scale: 0.8 },
        ],
        duration: 2 + Math.random() * 3,
        repeat: -1,
        ease: "sine.inOut",
      });
    });

    const tl = gsap.timeline({ delay: 0.6 });

    tl.from(".hero-title", {
      y: 220,
      opacity: 0,
      rotationX: -90,
      scale: 0.45,
      duration: 2.4,
      ease: "power4.out",
    })
      .from(
        ".hero-title-letter",
        {
          y: 160,
          opacity: 0,
          rotationX: -90,
          stagger: 0.12,
          duration: 1.3,
          ease: "back.out(1.8)",
        },
        "-=1.6"
      )
      .to(".hero-title", {
        opacity: 1,
        clearProps: "transform",
      });

    return () => {
      containerRef.current
        ?.querySelectorAll(".space-star")
        .forEach((el) => el.remove());
    };
  }, []);

  const letters = "RHINO".split("");

  return (
    <section
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden flex items-center justify-center"
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-black via-purple-900/20 via-blue-900/20 to-black"
        style={{ opacity: bgOpacity, scale: bgScale }}
      />

      <motion.div
        className="relative z-10 text-center px-4 md:px-8"
        style={{ rotateX: y, rotateY: x }}
      >
        <h1 className="hero-title text-7xl md:text-9xl lg:text-[12rem] font-bold tracking-tight mb-6">
          {letters.map((letter, i) => (
            <span
              key={i}
              className="hero-title-letter inline-block bg-clip-text text-transparent bg-gradient-to-b from-white via-cyan-200 to-purple-300"
              style={{
                textShadow: `
                  0 0 20px rgba(255,255,255,0.5),
                  0 0 40px rgba(147,197,253,0.5),
                  0 0 60px rgba(196,181,253,0.3)
                `,
              }}
            >
              {letter}
            </span>
          ))}
        </h1>

        <p className="hero-tagline text-xl md:text-2xl lg:text-3xl font-light tracking-wider mb-4 text-gray-200">
          Crafted for Cars That Deserve More
        </p>

        <p className="hero-description text-sm md:text-base lg:text-lg font-light tracking-wide text-gray-300 max-w-2xl mx-auto">
          A New Class of Paint Defense
        </p>
      </motion.div>
    </section>
  );
}
