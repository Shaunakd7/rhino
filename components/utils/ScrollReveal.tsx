"use client";

import { ReactNode, useRef } from "react";
import { motion, useInView, MotionProps } from "framer-motion";

interface ScrollRevealProps extends MotionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export default function ScrollReveal({
  children,
  className = "",
  delay = 0,
  ...motionProps
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: "easeOut" }}
      className={className}
      {...motionProps}
    >
      {children}
    </motion.div>
  );
}

