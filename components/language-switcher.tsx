"use client";

import { LOCALES } from "@/lib/constants";
import { useI18n } from "@/components/providers/i18n-provider";
import { cn } from "@/lib/utils";

export function LanguageSwitcher() {
  const { locale, setLocale } = useI18n();

  return (
    <div className="flex flex-wrap items-center gap-2">
      {LOCALES.map((item) => (
        <button
          key={item.code}
          type="button"
          onClick={() => setLocale(item.code)}
          className={cn(
            "inline-flex items-center gap-2 rounded-full border px-3 py-2 text-xs font-semibold transition",
            locale === item.code
              ? "border-brand bg-brand text-white"
              : "border-line bg-surface-strong text-foreground hover:border-brand/50",
          )}
        >
          <span aria-hidden="true">{item.flag}</span>
          <span>{item.label}</span>
        </button>
      ))}
    </div>
  );
}
