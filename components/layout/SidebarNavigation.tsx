'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslation } from '../../providers/LanguageProvider';
import { Language } from '../../types';

const NAV_KEYS = [
  { key: 'dashboard', href: '/' },
  { key: 'energy',    href: '/energy' },
  { key: 'priority',  href: '/priority' },
  { key: 'habits',    href: '/habits' },
  { key: 'finance',   href: '/finance' },
] as const;

function getLocale(lang: Language) {
  if (lang === 'PT_BR') return 'pt-BR';
  if (lang === 'ES') return 'es-ES';
  return 'en-US';
}

export function SidebarNavigation() {
  const pathname = usePathname();
  const { t, language } = useTranslation();
  const [dateStr, setDateStr] = useState('');

  useEffect(() => {
    const locale = getLocale(language);
    const today = new Date();
    setDateStr(
      today.toLocaleDateString(locale, {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
      })
    );
  }, [language]);

  const labels: Record<string, string> = {
    dashboard: t.dashboard,
    energy:    t.energy,
    priority:  t.priority,
    habits:    t.habits,
    finance:   t.finance,
  };

  return (
    <aside
      className="w-52 flex-shrink-0 flex flex-col h-full hidden md:flex border-r"
      style={{
        background: 'var(--bg-surface)',
        borderColor: 'var(--line)',
      }}
    >
      {/* Brand mark */}
      <div className="px-7 pt-9 pb-7">
        <p
          className="text-[11px] tracking-[0.28em] mb-1 leading-none select-none"
          style={{
            fontFamily: 'var(--font-cormorant), Georgia, serif',
            fontStyle: 'italic',
            fontWeight: 300,
            color: 'var(--ink-muted)',
          }}
        >
          estilo
        </p>
        <p
          className="text-[32px] leading-none select-none"
          style={{
            fontFamily: 'var(--font-cormorant), Georgia, serif',
            fontWeight: 600,
            color: 'var(--ink)',
            letterSpacing: '-0.01em',
          }}
        >
          Vida
        </p>
      </div>

      {/* Divider */}
      <div className="mx-7 h-px" style={{ background: 'var(--line)' }} />

      {/* Navigation */}
      <nav className="flex-1 px-4 pt-5 pb-2 flex flex-col gap-0.5">
        {NAV_KEYS.map(({ key, href }, index) => {
          const isActive =
            href === '/'
              ? pathname === '/'
              : pathname === href || pathname.startsWith(href + '/');

          return (
            <Link
              key={href}
              href={href}
              style={{
                animation: 'nav-slide-in 0.38s cubic-bezier(0.22, 0.61, 0.36, 1) both',
                animationDelay: `${index * 55 + 60}ms`,
                color: isActive ? 'var(--ink)' : 'var(--ink-muted)',
                background: isActive ? 'var(--amber-soft)' : 'transparent',
                boxShadow: isActive ? 'inset 2px 0 0 var(--amber)' : 'none',
              }}
              className="block px-4 py-2.5 rounded-md text-sm transition-all duration-150 hover:opacity-80"
            >
              <span style={{ fontWeight: isActive ? 500 : 400 }}>
                {labels[key]}
              </span>
            </Link>
          );
        })}
      </nav>

      {/* Date footer */}
      <div className="px-7 pb-7 pt-3">
        <div className="h-px mb-4" style={{ background: 'var(--line)' }} />
        <p
          className="text-[10px] tracking-[0.14em] uppercase leading-relaxed"
          style={{ color: 'var(--ink-muted)', fontFamily: 'var(--font-dm), sans-serif' }}
        >
          {dateStr}
        </p>
      </div>
    </aside>
  );
}
