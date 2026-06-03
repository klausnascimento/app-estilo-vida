import React from 'react';
import { SidebarNavigation } from './SidebarNavigation';
import { TopBar } from './TopBar';

export function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="flex h-screen overflow-hidden"
      style={{ background: 'var(--bg)', color: 'var(--ink)' }}
    >
      <SidebarNavigation />

      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <TopBar />
        <main className="flex-1 overflow-y-auto p-7">
          <div className="max-w-5xl mx-auto space-y-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
