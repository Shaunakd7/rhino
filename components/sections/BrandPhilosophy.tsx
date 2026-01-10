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
  const isInView = useInView(ref, { once: true, margin: "-120px" });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  useEffect(() => {
    if (!isInView || !ref.current) return;

    const lines = ref.current.querySelectorAll(".philosophy-line");
    lines.forEach((el, i) => {
      gsap.from(el, {
        x: -240,
        opacity: 0,
        duration: 1.2,
        delay: i * 0.2,
        ease: "power4.out",
      });
    });
  }, [isInView]);

  return (
    <section
      ref={ref}
      className="relative min-h-screen w-full flex items-center justify-center py-32 px-4 md:px-8 overflow-hidden bg-black"
    >
      {/* ===== CONTINUATION BACKGROUND ===== */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#060b1a] to-black" />

      {/* Ambient depth blobs */}
      <motion.div className="absolute inset-0" style={{ y, opacity }}>
        <motion.div
          className="absolute top-1/3 left-1/4 w-[600px] h-[600px] bg-[#1a2a4a]/12 rounded-full blur-[120px]"
          animate={{ x: [0, 60, 0], y: [0, 40, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] bg-[#0f3a5c]/12 rounded-full blur-[100px]"
          animate={{ x: [0, -50, 0], y: [0, -30, 0] }}
          transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>

      {/* ===== CONTENT ===== */}
      <div className="relative z-10 max-w-6xl mx-auto space-y-10 md:space-y-14">
        {philosophyLines.map((line, index) => (
          <motion.div
            key={index}
            className="philosophy-line relative"
            whileHover={{ x: 16 }}
          >
            <div className="text-4xl md:text-6xl lg:text-7xl font-light tracking-tight relative">
              <span className="relative z-10 bg-clip-text text-transparent bg-gradient-to-r from-white via-[#cfe9ff] to-[#9fd3ff]">
                {line}
              </span>
            </div>

            {/* Underline */}
            <motion.div
              className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-white/70 via-white/30 to-transparent"
              initial={{ width: 0 }}
              whileInView={{ width: "100%" }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: index * 0.15 + 0.4 }}
              style={{
                boxShadow: "0 0 12px rgba(255,255,255,0.25)",
              }}
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
