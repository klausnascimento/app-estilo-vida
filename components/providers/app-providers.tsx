"use client";

import { useEffect, useState } from "react";
import { I18nProvider } from "@/components/providers/i18n-provider";
import { LifePlannerProvider } from "@/components/providers/life-planner-provider";
import { ThemeProvider } from "@/components/providers/theme-provider";

export function AppProviders({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => setMounted(true));
    return () => window.cancelAnimationFrame(frame);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <ThemeProvider>
      <I18nProvider>
        <LifePlannerProvider>{children}</LifePlannerProvider>
      </I18nProvider>
    </ThemeProvider>
  );
}
