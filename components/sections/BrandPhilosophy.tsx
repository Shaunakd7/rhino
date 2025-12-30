"use client";

import { useRef, useEffect } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { gsap } from "gsap";

const philosophyLines = [
  "Advanced automotive films",
  "Multi-layered TPU",
  "Real road conditions",
  "Engineered protection",
  "Korean surface technology",
];

export default function BrandPhilosophy() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  useEffect(() => {
    if (isInView) {
      // Create floating space particles
      const particles = Array.from({ length: 30 });
      particles.forEach((_, i) => {
        const particle = document.createElement("div");
        particle.className = "space-particle";
        particle.style.cssText = `
          position: absolute;
          width: ${Math.random() * 3 + 1}px;
          height: ${Math.random() * 3 + 1}px;
          background: rgba(147, 197, 253, ${Math.random() * 0.8 + 0.2});
          border-radius: 50%;
          pointer-events: none;
          left: ${Math.random() * 100}%;
          top: ${Math.random() * 100}%;
          box-shadow: 0 0 ${Math.random() * 4 + 2}px rgba(147, 197, 253, 0.8);
        `;
        ref.current?.appendChild(particle);

        gsap.to(particle, {
          y: `+=${Math.random() * 200 + 100}`,
          x: `+=${Math.random() * 100 - 50}`,
          opacity: 0,
          duration: Math.random() * 4 + 2,
          repeat: -1,
          ease: "none",
          delay: Math.random() * 2,
        });
      });

      const elements = ref.current?.querySelectorAll(".philosophy-line");
      elements?.forEach((el, i) => {
        gsap.from(el, {
          x: -300,
          opacity: 0,
          rotationY: -90,
          duration: 1.2,
          delay: i * 0.2,
          ease: "power4.out",
        });
      });

      return () => {
        particles.forEach(() => {
          const particle = ref.current?.querySelector(".space-particle");
          particle?.remove();
        });
      };
    }
  }, [isInView]);

  return (
    <section
      ref={ref}
      className="relative min-h-screen w-full flex items-center justify-center py-32 px-4 md:px-8 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-900/10 via-blue-900/10 to-black" />

      {/* Space nebula background */}
      <motion.div
        className="absolute inset-0"
        style={{ y, opacity }}
      >
        <motion.div
          className="absolute top-1/3 left-1/3 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[100px]"
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/3 right-1/3 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[80px]"
          animate={{
            x: [0, -40, 0],
            y: [0, -20, 0],
            scale: [1, 1.3, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.div>

      {/* Animated background elements */}
      <motion.div className="absolute inset-0" style={{ opacity }}>
        {[...Array(25)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute border border-cyan-400/10 rounded-full"
            style={{
              width: `${80 + Math.random() * 150}px`,
              height: `${80 + Math.random() * 150}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              rotate: [0, 360],
              scale: [1, 1.2, 1],
              opacity: [0.05, 0.15, 0.05],
            }}
            transition={{
              duration: 12 + Math.random() * 8,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </motion.div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
          className="space-y-8 md:space-y-12"
        >
          {philosophyLines.map((line, index) => (
            <motion.div
              key={index}
              className="philosophy-line relative group"
              initial={{ opacity: 0, x: -100 }}
              animate={
                isInView
                  ? {
                      opacity: 1,
                      x: 0,
                    }
                  : {}
              }
              transition={{
                duration: 0.8,
                delay: index * 0.2,
                ease: "easeOut",
              }}
              whileHover={{ x: 20 }}
            >
              <div className="text-4xl md:text-6xl lg:text-7xl font-light tracking-tight relative">
                <span className="relative z-10 bg-clip-text text-transparent bg-gradient-to-r from-white via-cyan-200 to-purple-300">
                  {line}
                </span>
                <motion.span
                  className="absolute left-0 top-0 text-cyan-400/20 blur-sm"
                  initial={{ x: 0 }}
                  whileHover={{ x: 5 }}
                  style={{
                    textShadow: "0 0 20px rgba(147, 197, 253, 0.5)",
                  }}
                >
                  {line}
                </motion.span>
              </div>
              
              {/* Animated underline with glow */}
              <motion.div
                className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-cyan-400 via-purple-400 to-transparent"
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: index * 0.2 + 0.5 }}
                style={{
                  boxShadow: "0 0 10px rgba(147, 197, 253, 0.5)",
                }}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Abstract visual elements */}
        <motion.div
          className="absolute top-1/2 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl -z-10"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1.5, delay: 1 }}
        />
      </div>
    </section>
  );
}
