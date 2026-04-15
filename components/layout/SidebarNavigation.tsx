'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslation } from '../../providers/LanguageProvider';

export function SidebarNavigation() {
  const pathname = usePathname();
  const { t } = useTranslation();

  const navItems = [
    { label: t.dashboard, href: '/' },
    { label: t.energy, href: '/energy' },
    { label: t.priority, href: '/priority' },
    { label: t.habits, href: '/habits' },
    { label: t.finance, href: '/finance' },
  ];

  return (
    <aside className="w-64 flex-shrink-0 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hidden md:block">
      <div className="h-16 flex items-center px-6 border-b border-slate-200 dark:border-slate-800">
        <div className="font-bold text-xl tracking-tight text-blue-600 dark:text-blue-400">
          Estilo<span className="text-slate-800 dark:text-slate-200">Vida</span>
        </div>
      </div>
      <nav className="p-4 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link 
              key={item.href} 
              href={item.href}
              className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive 
                  ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' 
                  : 'text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
