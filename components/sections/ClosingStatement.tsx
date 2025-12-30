"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function ClosingStatement() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="relative min-h-screen w-full flex flex-col items-center justify-center py-32 px-4 md:px-8"
    >
      <div className="absolute inset-0 bg-black" />

      {/* Closing statement */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1 }}
        className="relative z-10 text-center mb-32"
      >
        <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-8">
          Made to Protect
        </h2>
        <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight">
          What Matters.
        </h2>
      </motion.div>

      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 1, delay: 0.3 }}
        className="relative z-10 mb-20"
      >
        <h1 className="text-6xl md:text-8xl font-bold tracking-tight">RHINO</h1>
      </motion.div>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="relative z-10 w-full max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-sm text-gray-500 border-t border-white/10 pt-8"
      >
        <p>WWW.RHINO.COM</p>
        <p className="mt-4 md:mt-0">SUPPORT@RHINO.COM</p>
      </motion.footer>
    </section>
  );
}

