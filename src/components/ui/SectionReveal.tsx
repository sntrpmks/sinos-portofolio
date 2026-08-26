"use client";

import { motion, useReducedMotion, type TargetAndTransition, type Transition } from "framer-motion";

export type RevealVariant =
  | "reveal-up"
  | "editorial-text-reveal"
  | "image-reveal"
  | "stagger"
  | "slide-horizontal"
  | "subtle-scale"
  | "mask-reveal";

interface SectionRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  yOffset?: number;
  asSection?: boolean;
  variant?: RevealVariant;
}

export function SectionReveal({
  children,
  className = "",
  delay = 0,
  duration = 0.5,
  yOffset = 20,
  asSection = false,
  variant = "reveal-up",
}: SectionRevealProps) {
  const shouldReduceMotion = useReducedMotion();
  const MotionComponent = asSection ? motion.section : motion.div;

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  // Variant configurations matching editorial motion specifications
  const getVariantAnimation = (): { initial: TargetAndTransition; whileInView: TargetAndTransition; transition: Transition } => {
    switch (variant) {
      case "editorial-text-reveal":
        return {
          initial: { opacity: 0, y: 30, clipPath: "inset(0 0 100% 0)" },
          whileInView: { opacity: 1, y: 0, clipPath: "inset(0 0 0% 0)" },
          transition: {
            duration: duration || 0.7,
            delay,
            ease: [0.16, 1, 0.3, 1],
          },
        };

      case "image-reveal":
        return {
          initial: { opacity: 0, scale: 1.04, y: 15 },
          whileInView: { opacity: 1, scale: 1, y: 0 },
          transition: {
            duration: duration || 0.8,
            delay,
            ease: [0.16, 1, 0.3, 1],
          },
        };

      case "slide-horizontal":
        return {
          initial: { opacity: 0, x: -24 },
          whileInView: { opacity: 1, x: 0 },
          transition: {
            duration: duration || 0.6,
            delay,
            ease: [0.16, 1, 0.3, 1],
          },
        };

      case "subtle-scale":
        return {
          initial: { opacity: 0, scale: 0.97 },
          whileInView: { opacity: 1, scale: 1 },
          transition: {
            duration: duration || 0.5,
            delay,
            ease: [0.16, 1, 0.3, 1],
          },
        };

      case "mask-reveal":
        return {
          initial: { opacity: 0, clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)" },
          whileInView: { opacity: 1, clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" },
          transition: {
            duration: duration || 0.8,
            delay,
            ease: [0.16, 1, 0.3, 1],
          },
        };

      case "stagger":
        return {
          initial: { opacity: 0, y: yOffset },
          whileInView: { opacity: 1, y: 0 },
          transition: {
            duration: duration || 0.5,
            delay,
            ease: [0.16, 1, 0.3, 1],
          },
        };

      case "reveal-up":
      default:
        return {
          initial: { opacity: 0, y: yOffset },
          whileInView: { opacity: 1, y: 0 },
          transition: {
            duration: duration || 0.5,
            delay,
            ease: [0.16, 1, 0.3, 1],
          },
        };
    }
  };

  const anim = getVariantAnimation();

  return (
    <MotionComponent
      initial={anim.initial}
      whileInView={anim.whileInView}
      viewport={{ once: true, margin: "-40px" }}
      transition={anim.transition}
      className={className}
    >
      {children}
    </MotionComponent>
  );
}


