import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "../providers/ThemeProvider";
import { LanguageProvider } from "../providers/LanguageProvider";

export const metadata: Metadata = {
  title: "Estilo Vida - Dashboard",
  description: "Planejamento de Vida Pessoal",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className="min-h-screen bg-slate-50 text-slate-800 antialiased dark:bg-slate-900 dark:text-slate-200">
        <ThemeProvider>
          <LanguageProvider>
            {children}
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
