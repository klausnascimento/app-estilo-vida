"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useI18n } from "@/components/providers/i18n-provider";
import { LanguageSwitcher } from "@/components/language-switcher";
import { ThemeToggle } from "@/components/theme-toggle";
import { APP_NAME, NAV_ITEMS } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { dictionary } = useI18n();

  return (
    <div className="min-h-screen">
      <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-6 px-4 py-4 md:px-6 md:py-6">
        <header className="rounded-[32px] border border-line bg-surface-strong px-5 py-5 shadow-[var(--shadow)] backdrop-blur md:px-7">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand">
                {APP_NAME}
              </p>
              <div>
                <h1 className="font-serif text-2xl tracking-tight text-foreground md:text-3xl">
                  {dictionary.appName}
                </h1>
                <p className="text-sm text-muted">{dictionary.subtitle}</p>
              </div>
            </div>

            <div className="flex flex-col gap-3 lg:items-end">
              <div className="flex flex-col gap-3 md:flex-row md:items-center">
                <LanguageSwitcher />
                <ThemeToggle />
              </div>
              <nav className="flex flex-wrap gap-2">
                {NAV_ITEMS.map((item) => {
                  const active =
                    item.href === "/" ? pathname === item.href : pathname.startsWith(item.href);

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "rounded-full px-4 py-2 text-sm font-semibold transition",
                        active
                          ? "bg-brand text-white"
                          : "border border-line bg-transparent text-foreground hover:border-brand/50 hover:bg-brand-soft",
                      )}
                    >
                      {dictionary.nav[item.key]}
                    </Link>
                  );
                })}
              </nav>
            </div>
          </div>
        </header>

        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
