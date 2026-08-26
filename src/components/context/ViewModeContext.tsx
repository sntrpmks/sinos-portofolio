"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { Locale, translations } from "@/lib/i18n";

interface ViewModeContextType {
  commandPaletteOpen: boolean;
  setCommandPaletteOpen: (open: boolean) => void;
  terminalOpen: boolean;
  setTerminalOpen: (open: boolean) => void;
  aiModalOpen: boolean;
  setAiModalOpen: (open: boolean) => void;
  lightboxOpen: boolean;
  setLightboxOpen: (open: boolean) => void;
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: typeof translations["en"];
}

const ViewModeContext = createContext<ViewModeContextType | undefined>(undefined);

export function ViewModeProvider({ children }: { children: React.ReactNode }) {
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [aiModalOpen, setAiModalOpen] = useState(false);
  const [lightboxOpen, setLightboxOpenState] = useState(false);
  const [locale, setLocaleState] = useState<Locale>("en");

  const setLightboxOpen = useCallback((open: boolean) => {
    setLightboxOpenState(open);
    if (open) {
      // Dismiss any open modals when lightbox opens
      setCommandPaletteOpen(false);
      setAiModalOpen(false);
      setTerminalOpen(false);
    }
  }, []);

  // Initialize locale from localStorage or document cookie
  useEffect(() => {
    const savedLocale = localStorage.getItem("sinos_locale") as Locale | null;
    if (savedLocale === "en" || savedLocale === "id") {
      setLocaleState(savedLocale);
    } else {
      const browserLang = navigator.language.toLowerCase();
      if (browserLang.startsWith("id")) {
        setLocaleState("id");
      }
    }
  }, []);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    try {
      localStorage.setItem("sinos_locale", newLocale);
      document.cookie = `sinos_locale=${newLocale}; path=/; max-age=31536000`;
      document.documentElement.lang = newLocale;
    } catch {
      // ignore
    }
  };

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  // Keyboard shortcut listener for Cmd+K / Ctrl+K and Terminal hotkey
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // If lightbox is open, do not trigger command palette or terminal shortcuts
      if (lightboxOpen) return;

      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setCommandPaletteOpen((prev) => !prev);
      }
      if ((e.metaKey || e.ctrlKey) && (e.key === "`" || e.key === "j")) {
        e.preventDefault();
        setTerminalOpen((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxOpen]);

  const t = translations[locale];

  return (
    <ViewModeContext.Provider
      value={{
        commandPaletteOpen,
        setCommandPaletteOpen,
        terminalOpen,
        setTerminalOpen,
        aiModalOpen,
        setAiModalOpen,
        lightboxOpen,
        setLightboxOpen,
        locale,
        setLocale,
        t,
      }}
    >
      {children}
    </ViewModeContext.Provider>
  );
}

export function useViewMode() {
  const context = useContext(ViewModeContext);
  if (!context) {
    throw new Error("useViewMode must be used within a ViewModeProvider");
  }
  return context;
}
