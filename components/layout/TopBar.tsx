'use client';

import React from 'react';
import { useTheme } from '../../providers/ThemeProvider';
import { useTranslation } from '../../providers/LanguageProvider';
import { Theme, Language } from '../../types';

const LANGS: { code: Language; flag: string; label: string }[] = [
  { code: 'PT_BR', flag: '🇧🇷', label: 'PT' },
  { code: 'EN',    flag: '🇺🇸', label: 'EN' },
  { code: 'ES',    flag: '🇪🇸', label: 'ES' },
];

const THEMES: { code: Theme; icon: string }[] = [
  { code: 'LIGHT',  icon: '☀' },
  { code: 'DARK',   icon: '☾' },
  { code: 'SYSTEM', icon: '⊡' },
];

export function TopBar() {
  const { theme, setTheme } = useTheme();
  const { language, setLanguage } = useTranslation();

  return (
    <header
      className="h-14 flex items-center justify-end px-7 shrink-0 border-b"
      style={{ borderColor: 'var(--line)', background: 'var(--bg-surface)' }}
    >
      <div className="flex items-center gap-6">

        {/* Language switcher */}
        <div className="flex items-center gap-0.5">
          {LANGS.map(({ code, flag, label }) => {
            const active = language === code;
            return (
              <button
                key={code}
                onClick={() => setLanguage(code)}
                className="flex items-center gap-1 px-2.5 py-1 rounded text-xs transition-all duration-150"
                style={{
                  fontFamily: 'var(--font-dm), sans-serif',
                  fontWeight: active ? 500 : 400,
                  color: active ? 'var(--ink)' : 'var(--ink-muted)',
                  background: active ? 'var(--amber-soft)' : 'transparent',
                  boxShadow: active ? 'inset 0 -1.5px 0 var(--amber)' : 'none',
                }}
              >
                <span>{flag}</span>
                <span className="tracking-wide">{label}</span>
              </button>
            );
          })}
        </div>

        {/* Divider */}
        <div className="w-px h-4" style={{ background: 'var(--line)' }} />

        {/* Theme switcher */}
        <div
          className="flex items-center gap-0.5 p-1 rounded-lg"
          style={{ background: 'var(--bg)' }}
        >
          {THEMES.map(({ code, icon }) => {
            const active = theme === code;
            return (
              <button
                key={code}
                onClick={() => setTheme(code)}
                title={code}
                className="w-7 h-7 flex items-center justify-center rounded-md text-sm transition-all duration-150"
                style={{
                  color: active ? 'var(--amber)' : 'var(--ink-muted)',
                  background: active ? 'var(--bg-surface)' : 'transparent',
                  boxShadow: active ? 'var(--shadow-card)' : 'none',
                }}
              >
                {icon}
              </button>
            );
          })}
        </div>

      </div>
    </header>
  );
}
