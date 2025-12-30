"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

export default function AboutUs() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section
      ref={ref}
      className="relative min-h-screen w-full py-32 px-4 md:px-8 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black" />

      {/* Animated background elements */}
      <motion.div className="absolute inset-0" style={{ opacity }}>
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute border border-white/5 rounded-full"
            style={{
              width: `${100 + Math.random() * 200}px`,
              height: `${100 + Math.random() * 200}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              rotate: [0, 360],
              scale: [1, 1.2, 1],
              opacity: [0.05, 0.15, 0.05],
            }}
            transition={{
              duration: 15 + Math.random() * 10,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </motion.div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.h2
            className="text-5xl md:text-7xl font-bold tracking-tight mb-4"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2 }}
          >
            ABOUT US
          </motion.h2>
          <motion.div
            className="w-24 h-1 bg-white mx-auto"
            initial={{ width: 0 }}
            animate={isInView ? { width: 96 } : {}}
            transition={{ delay: 0.4, duration: 0.8 }}
          />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 md:gap-16">
          {/* RHINO Section */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.8 }}
            style={{ y }}
          >
            <h3 className="text-3xl md:text-4xl font-bold mb-4">RHINO</h3>
            <div className="space-y-4 text-gray-300 text-lg leading-relaxed">
              <p>
                RHINO represents a new class of paint defense, engineered for cars that deserve more. 
                Born from Korean surface technology and precision engineering, RHINO Paint Protection 
                Films (PPF) offer advanced multi-layered TPU protection with innovative self-healing 
                capabilities.
              </p>
              <p>
                Our K-Series lineup combines Kevlar-grade defense with cutting-edge hydrophobic 
                coatings, designed to withstand real road conditions while maintaining flawless 
                clarity and finish. Every product is backed by a 10-year limited warranty, 
                reflecting our commitment to lasting protection.
              </p>
              <p>
                RHINO isn&apos;t just protection—it&apos;s armor for your vehicle&apos;s surface, crafted with 
                the precision and care your investment deserves.
              </p>
            </div>
          </motion.div>

          {/* Car Trendz Section */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.5, duration: 0.8 }}
            style={{ y }}
          >
            <h3 className="text-3xl md:text-4xl font-bold mb-4">CAR TRENDZ</h3>
            <div className="space-y-4 text-gray-300 text-lg leading-relaxed">
              <p>
                Car Trendz is proud to bring RHINO&apos;s premium protection technology to India. 
                As the exclusive distributor, we&apos;re introducing automotive enthusiasts across 
                the country to world-class paint protection solutions.
              </p>
              <p>
                Understanding the unique challenges of Indian roads—from extreme weather conditions 
                to urban driving—we&apos;ve partnered with RHINO to deliver protection that&apos;s not just 
                premium, but purpose-built for Indian conditions.
              </p>
              <p>
                Our commitment extends beyond products. We ensure precision installation, factory-accurate 
                cuts, and controlled curing environments. Every RHINO application is a testament to 
                craftsmanship, performed by certified installers who understand the art of protection.
              </p>
              <p className="pt-4 text-xl font-light text-white">
                Bringing world-class protection to Indian roads.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Bottom accent */}
        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.7 }}
        >
          <p className="text-gray-500 text-sm tracking-wider">
            RHINO × CAR TRENDZ
          </p>
        </motion.div>
      </div>
    </section>
  );
}

