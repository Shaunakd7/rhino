"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

const features = [
  {
    title: "Korean TPU Layering",
    description: "Smoother optical flow",
    icon: "⚡",
    color: "from-blue-500/20 to-cyan-500/20",
  },
  {
    title: "Micro-Impact Dispersion",
    description: "Best-in-grade protection",
    icon: "🛡️",
    color: "from-purple-500/20 to-pink-500/20",
  },
  {
    title: "Self-Healing Technology",
    description: "Heat-activated recovery",
    icon: "✨",
    color: "from-yellow-500/20 to-orange-500/20",
  },
  {
    title: "UV Resistance",
    description: "Anti-stain, anti-yellow",
    icon: "☀️",
    color: "from-amber-500/20 to-yellow-500/20",
  },
  {
    title: "Stable Adhesive",
    description: "Flawless installation",
    icon: "🔧",
    color: "from-gray-500/20 to-slate-500/20",
  },
];

export default function TechnologyFeatures() {
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

      {/* Animated background grid */}
      <motion.div
        className="absolute inset-0 opacity-10"
        style={{ y, opacity }}
      >
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: "100px 100px",
        }} />
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto">
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
            MODERN FINISHES.
          </motion.h2>
          <motion.h2
            className="text-5xl md:text-7xl font-bold tracking-tight mb-8"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.3 }}
          >
            ARMOURED SURFACES.
          </motion.h2>
          <motion.p
            className="text-2xl md:text-3xl font-light text-gray-400"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.4 }}
          >
            FEATURES
          </motion.p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {features.map((feature, index) => (
            <FeatureCard key={feature.title} feature={feature} index={index} isInView={isInView} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureCard({
  feature,
  index,
  isInView,
}: {
  feature: (typeof features)[0];
  index: number;
  isInView: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, rotateX: -90 }}
      animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      className="relative group perspective-1000"
      whileHover={{ y: -10, scale: 1.02 }}
    >
      <div className={`relative p-8 md:p-12 bg-gradient-to-br ${feature.color} backdrop-blur-sm rounded-lg border border-white/10 hover:border-white/30 transition-all duration-300 h-full`}>
        {/* Animated icon */}
        <motion.div
          className="text-5xl mb-6 inline-block"
          animate={{
            rotate: [0, 10, -10, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: index * 0.2,
          }}
        >
          {feature.icon}
        </motion.div>

        <h3 className="text-2xl md:text-3xl font-bold mb-3">
          {feature.title}
        </h3>
        <p className="text-gray-400 text-lg">
          {feature.description}
        </p>

        {/* Hover effect glow */}
        <motion.div
          className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg blur-xl -z-10`}
        />

        {/* Animated border */}
        <motion.div
          className="absolute inset-0 border-2 border-white/0 group-hover:border-white/20 rounded-lg transition-all duration-300"
        />

        {/* Floating particles */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/30 rounded-full"
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + i * 10}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.6, 0.3],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 2 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.2,
            }}
          />
        ))}
      </div>
    </motion.div>
  );
}
