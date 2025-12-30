"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function InstallationPhilosophy() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="relative min-h-screen w-full flex items-center justify-center py-32 px-4 md:px-8"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black" />

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl font-bold tracking-tight mb-16"
        >
          INSTALLATION STANDARD
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-8 text-lg md:text-xl font-light text-gray-300 leading-relaxed"
        >
          <p>
            Precision installation defines the difference between protection and
            perfection. Every RHINO application follows factory-accurate cuts,
            controlled curing environments, and meticulous attention to detail.
          </p>
          <p>
            Our installation philosophy ensures longevity, performance, and the
            flawless finish your vehicle deserves. This is craftsmanship, not
            just application.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 pt-8 border-t border-white/10"
        >
          <p className="text-sm text-gray-500">Rhino Installation Standard Rev. 01</p>
          <p className="text-sm text-gray-500 mt-2">RHINO.COM/K-SERIES</p>
        </motion.div>
      </div>
    </section>
  );
}

