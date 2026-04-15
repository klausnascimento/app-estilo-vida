'use client';

import React from 'react';
import { useTheme } from '../../providers/ThemeProvider';
import { useTranslation } from '../../providers/LanguageProvider';
import { Theme, Language } from '../../types';

export function TopBar() {
  const { theme, setTheme } = useTheme();
  const { language, setLanguage } = useTranslation();

  return (
    <header className="h-16 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center justify-between px-6">
      <div className="flex items-center">
        {/* Mobile menu button could go here */}
      </div>

      <div className="flex items-center space-x-4">
        {/* Language Switcher */}
        <div className="flex items-center bg-slate-100 dark:bg-slate-800 rounded-md p-1">
          {(['PT_BR', 'EN', 'ES'] as Language[]).map((lang) => (
            <button
              key={lang}
              onClick={() => setLanguage(lang)}
              className={`px-2 py-1 text-xs rounded font-medium transition-colors ${
                language === lang 
                  ? 'bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-100 shadow-sm' 
                  : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'
              }`}
            >
              {lang === 'PT_BR' ? '🇧🇷' : lang === 'EN' ? '🇺🇸' : '🇪🇸'} {lang.replace('_BR', '')}
            </button>
          ))}
        </div>

        {/* Theme Switcher */}
        <div className="flex items-center bg-slate-100 dark:bg-slate-800 rounded-md p-1">
           {(['LIGHT', 'DARK', 'SYSTEM'] as Theme[]).map((t) => (
            <button
              key={t}
              onClick={() => setTheme(t)}
              className={`px-2 py-1 text-xs rounded font-medium transition-colors ${
                theme === t 
                  ? 'bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-100 shadow-sm' 
                  : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'
              }`}
            >
              {t === 'LIGHT' ? '☀️' : t === 'DARK' ? '🌙' : '💻'}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
}
