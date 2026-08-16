"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { useReducedMotion } from "framer-motion";
import { useViewMode } from "@/components/context/ViewModeContext";

export function SmoothScroll() {
  const pathname = usePathname();
  const { lightboxOpen, aiModalOpen, commandPaletteOpen, terminalOpen } = useViewMode();
  const shouldReduceMotion = useReducedMotion();
  const lenisRef = useRef<Lenis | null>(null);

  // Initialize Lenis Smooth Scroll
  useEffect(() => {
    if (shouldReduceMotion) {
      document.body.style.overflow = "";
      return;
    }

    const lenis = new Lenis({
      duration: 1.0,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
      autoResize: true,
    });

    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    const rafId = requestAnimationFrame(raf);

    // Dynamic Content ResizeObserver to prevent stale scroll limits
    const resizeObserver = new ResizeObserver(() => {
      lenis.resize();
    });

    if (document.body) {
      resizeObserver.observe(document.body);
    }

    return () => {
      cancelAnimationFrame(rafId);
      resizeObserver.disconnect();
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [shouldReduceMotion]);

  // Route change handler: ensure page scroll bounds are recalculated and stale body locks cleared
  useEffect(() => {
    document.body.style.overflow = "";
    if (lenisRef.current) {
      lenisRef.current.start();
      lenisRef.current.resize();
    }
  }, [pathname]);

  // Centralized Modal Scroll Locking logic
  useEffect(() => {
    const isModalOpen = lightboxOpen || aiModalOpen || commandPaletteOpen || terminalOpen;

    if (isModalOpen) {
      document.body.style.overflow = "hidden";
      if (lenisRef.current) {
        lenisRef.current.stop();
      }
    } else {
      document.body.style.overflow = "";
      if (lenisRef.current) {
        lenisRef.current.start();
        lenisRef.current.resize();
      }
    }

    return () => {
      document.body.style.overflow = "";
      if (lenisRef.current) {
        lenisRef.current.start();
      }
    };
  }, [lightboxOpen, aiModalOpen, commandPaletteOpen, terminalOpen]);

  return null;
}
