"use client";

import { useI18n } from "@/components/providers/i18n-provider";
import { useTheme } from "@/components/providers/theme-provider";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const { dictionary } = useI18n();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="inline-flex items-center gap-2 rounded-full border border-line bg-surface-strong px-4 py-2 text-xs font-semibold text-foreground transition hover:border-brand/50"
      aria-label={theme === "dark" ? dictionary.common.light : dictionary.common.dark}
    >
      <span aria-hidden="true">{theme === "dark" ? "☀" : "☾"}</span>
      <span>{theme === "dark" ? dictionary.common.light : dictionary.common.dark}</span>
    </button>
  );
}
