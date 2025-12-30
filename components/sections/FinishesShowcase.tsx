"use client";

import { useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import ProductImage from "@/components/utils/ProductImage";

interface ProductSpec {
  name: string;
  description: string;
  finish: string;
  thickness: string;
  topcoat: string;
  adhesive: string;
  warranty: string;
  gradient: string;
  textColor: string;
  accentColor: string;
}

const products: ProductSpec[] = [
  {
    name: "AURA",
    description: "Deep Gloss",
    finish: "Deep Gloss",
    thickness: "10 mil",
    topcoat: "Hydrophobic Self-Healing TPU",
    adhesive: "Clear Acrylic",
    warranty: "10-Year Limited",
    gradient: "from-blue-900/20 via-purple-900/20 to-black",
    textColor: "text-blue-100",
    accentColor: "blue",
  },
  {
    name: "LUMO",
    description: "Performance Gloss",
    finish: "Performance Gloss",
    thickness: "8 mil",
    topcoat: "Hydrophobic Self-Healing TPU",
    adhesive: "Clear Acrylic",
    warranty: "10-Year Limited",
    gradient: "from-yellow-900/20 via-orange-900/20 to-black",
    textColor: "text-yellow-100",
    accentColor: "yellow",
  },
  {
    name: "PRISM",
    description: "Ultra Gloss",
    finish: "Ultra Gloss",
    thickness: "8 mil",
    topcoat: "Hydrophobic Self-Healing TPU",
    adhesive: "Clear Acrylic",
    warranty: "10-Year Limited",
    gradient: "from-cyan-900/20 via-blue-900/20 to-black",
    textColor: "text-cyan-100",
    accentColor: "cyan",
  },
  {
    name: "DUSK",
    description: "Matte Stealth",
    finish: "Matte Stealth",
    thickness: "8 mil",
    topcoat: "Hydrophobic Self-Healing TPU",
    adhesive: "Clear Acrylic",
    warranty: "10-Year Limited",
    gradient: "from-gray-800/30 via-gray-900/30 to-black",
    textColor: "text-gray-200",
    accentColor: "gray",
  },
  {
    name: "HAZE",
    description: "Satin Matte",
    finish: "Satin Matte",
    thickness: "8 mil",
    topcoat: "Hydrophobic Self-Healing TPU",
    adhesive: "Clear Acrylic",
    warranty: "10-Year Limited",
    gradient: "from-slate-800/30 via-gray-900/30 to-black",
    textColor: "text-slate-200",
    accentColor: "slate",
  },
];

export default function FinishesShowcase() {
  return (
    <section className="relative w-full">
      {products.map((product, index) => (
        <ProductSection key={product.name} product={product} index={index} />
      ))}
    </section>
  );
}

function ProductSection({ product, index }: { product: ProductSpec; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, margin: "-200px" });
  const [isHovered, setIsHovered] = useState(false);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.8, 1, 1, 1.1]);
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <motion.div
      ref={ref}
      className={`relative h-screen w-full overflow-hidden flex items-center justify-center px-4 md:px-8 bg-gradient-to-b ${product.gradient}`}
      style={{ opacity }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Animated background effects */}
      <motion.div className="absolute inset-0" style={{ scale }}>
        <motion.div
          className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.05)_0%,transparent_70%)]"
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1 }}
        />
        
        {/* Animated orbs */}
        {[...Array(3)].map((_, i) => {
          const accentColors: Record<string, string> = {
            blue: "rgba(59, 130, 246, 0.1)",
            yellow: "rgba(234, 179, 8, 0.1)",
            cyan: "rgba(6, 182, 212, 0.1)",
            gray: "rgba(107, 114, 128, 0.1)",
            slate: "rgba(100, 116, 139, 0.1)",
          };
          return (
            <motion.div
              key={i}
              className="absolute w-96 h-96 rounded-full blur-3xl"
              style={{
                left: `${30 + i * 20}%`,
                top: `${20 + i * 30}%`,
                backgroundColor: accentColors[product.accentColor] || "rgba(255, 255, 255, 0.1)",
              }}
              animate={{
                scale: isHovered ? [1, 1.5, 1] : [1, 1.2, 1],
                opacity: isHovered ? [0.3, 0.6, 0.3] : [0.2, 0.4, 0.2],
                rotate: [0, 360],
              }}
              transition={{
                duration: 8 + i * 2,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          );
        })}
      </motion.div>

      {/* Product image (if available) */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ y }}
      >
        <div className="relative w-full h-full">
          <ProductImage
            productName={product.name}
            className="object-cover opacity-50"
            priority={index === 0}
          />
          {/* Overlay to ensure text readability while keeping image visible */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/50" />
        </div>
      </motion.div>

      {/* Content */}
      <motion.div
        className="relative z-10 text-center max-w-6xl mx-auto"
        initial={{ opacity: 0, y: 100 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        {/* Product name with split animation */}
        <motion.h2
          className={`text-8xl md:text-9xl lg:text-[12rem] font-bold tracking-tight mb-6 ${product.textColor}`}
          initial={{ opacity: 0, scale: 0.8, rotateX: -90 }}
          animate={isInView ? { opacity: 1, scale: 1, rotateX: 0 } : {}}
          transition={{ duration: 1.2, delay: 0.2 }}
          style={{
            textShadow: `0 0 40px rgba(255,255,255,0.3)`,
            transformStyle: "preserve-3d",
          }}
        >
          {product.name.split("").map((letter, i) => (
            <motion.span
              key={i}
              className="inline-block"
              animate={isHovered ? { y: [0, -10, 0] } : {}}
              transition={{
                duration: 0.5,
                delay: i * 0.05,
              }}
            >
              {letter}
            </motion.span>
          ))}
        </motion.h2>

        {/* Description */}
        <motion.p
          className="text-xl md:text-2xl lg:text-3xl font-light tracking-wider text-gray-300 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {product.description}
        </motion.p>

        {/* Specifications grid */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 mt-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <SpecCard label="Finish" value={product.finish} delay={0.7} />
          <SpecCard label="Thickness" value={product.thickness} delay={0.75} />
          <SpecCard label="Topcoat" value={product.topcoat} delay={0.8} />
          <SpecCard label="Adhesive" value={product.adhesive} delay={0.85} />
          <SpecCard label="Warranty" value={product.warranty} delay={0.9} />
        </motion.div>
      </motion.div>

      {/* Light sweep effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none z-20"
        initial={{ x: "-100%" }}
        animate={isInView ? { x: "200%" } : { x: "-100%" }}
        transition={{ duration: 2, delay: 0.5 }}
      />

      {/* Texture overlay for matte finishes */}
      {(product.name === "DUSK" || product.name === "HAZE") && (
        <motion.div
          className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_0%,rgba(0,0,0,0.3)_100%)] pointer-events-none z-10"
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        />
      )}

      {/* Animated border on hover */}
      <motion.div
        className="absolute inset-0 border-2 border-white/0 pointer-events-none z-30"
        animate={isHovered ? { borderColor: "rgba(255,255,255,0.2)" } : {}}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
}

function SpecCard({ label, value, delay }: { label: string; value: string; delay: number }) {
  return (
    <motion.div
      className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-4 md:p-6"
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ scale: 1.05, borderColor: "rgba(255,255,255,0.3)" }}
    >
      <div className="text-xs md:text-sm text-gray-400 mb-2 uppercase tracking-wider">
        {label}
      </div>
      <div className="text-sm md:text-base font-light text-white">
        {value}
      </div>
    </motion.div>
  );
}
