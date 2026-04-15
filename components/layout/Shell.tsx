import React from 'react';
import { SidebarNavigation } from './SidebarNavigation';
import { TopBar } from './TopBar';

export function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen overflow-hidden bg-slate-50 dark:bg-slate-900 font-sans text-slate-800 dark:text-slate-200">
      <SidebarNavigation />
      
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <TopBar />
        
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-6xl mx-auto space-y-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
