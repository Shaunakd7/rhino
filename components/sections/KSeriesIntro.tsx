"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

export default function KSeriesIntro() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const leftX = useTransform(scrollYProgress, [0, 1], [-100, 100]);
  const rightX = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 1.1]);

  return (
    <section
      ref={ref}
      className="relative min-h-screen w-full flex items-center justify-center py-32 px-4 md:px-8 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-black to-black" />

      {/* Animated background pattern */}
      <motion.div
        className="absolute inset-0 opacity-5"
        style={{ opacity }}
      >
        <div className="absolute inset-0" style={{
          backgroundImage: `
            repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.1) 10px, rgba(255,255,255,0.1) 20px)
          `,
        }} />
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto grid md:grid-cols-2 gap-12 md:gap-20 items-center">
        {/* Visual side with 3D effect and image */}
        <motion.div
          initial={{ opacity: 0, x: -100, rotateY: -90 }}
          animate={isInView ? { opacity: 1, x: 0, rotateY: 0 } : {}}
          transition={{ duration: 1, ease: "easeOut" }}
          style={{ x: leftX, scale }}
          className="relative h-[400px] md:h-[600px] perspective-1000"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-black rounded-lg overflow-hidden transform-gpu">
            {/* Background image */}
            <div className="absolute inset-0">
              <Image
                src="/images/products/k-series.jpg"
                alt="K-Series"
                fill
                className="object-cover opacity-60"
                style={{ objectFit: "cover" }}
                onError={() => {
                  // Fallback if image doesn't exist
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/60" />
            </div>

            {/* Animated gradient mesh overlay */}
            <motion.div
              className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1)_0%,transparent_50%)]"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            
            {/* Large K letter with animation */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <motion.div
                className="text-6xl md:text-8xl font-bold opacity-30"
                animate={{
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                K
              </motion.div>
            </div>

            {/* Floating particles */}
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-white/30 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -40, 0],
                  opacity: [0.2, 0.6, 0.2],
                  scale: [1, 1.5, 1],
                  x: [0, Math.random() * 20 - 10, 0],
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </div>

          {/* Enhanced glow effect */}
          <motion.div
            className="absolute -inset-1 bg-gradient-to-r from-white/30 via-transparent to-white/30 rounded-lg blur-xl"
            animate={{
              opacity: [0.3, 0.7, 0.3],
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
            }}
          />
        </motion.div>

        {/* Content side */}
        <motion.div
          initial={{ opacity: 0, x: 100, rotateY: 90 }}
          animate={isInView ? { opacity: 1, x: 0, rotateY: 0 } : {}}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          style={{ x: rightX }}
          className="space-y-6"
        >
          <motion.h2
            className="text-5xl md:text-7xl font-bold tracking-tight mb-4"
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4 }}
          >
            THE K-SERIES
          </motion.h2>
          
          <motion.p
            className="text-xl md:text-2xl font-light text-gray-300 mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5 }}
          >
            THE ULTIMATE PROTECTION SOLUTION FOR YOUR VEHICLE
          </motion.p>
          
          <motion.div
            className="space-y-4 text-gray-400"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.6 }}
          >
            <motion.p
              className="text-lg"
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.7 }}
            >
              Engineered with Korean surface technology, the K-Series represents
              the pinnacle of automotive protection.
            </motion.p>
            <motion.p
              className="text-lg"
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.8 }}
            >
              Kevlar-grade defense meets self-healing innovation, designed for
              Indian road conditions.
            </motion.p>
          </motion.div>
          
          <motion.div
            className="pt-8"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.9 }}
          >
            <p className="text-2xl font-light tracking-wider text-gray-500">
              —K시리즈
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
