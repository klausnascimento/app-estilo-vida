import { DayKey, Locale, PriorityStatus, TransactionType } from "@/lib/types";

export const APP_NAME = "Estilo de Vida";
export const STORAGE_KEYS = {
  locale: "estilo-vida:locale",
  theme: "estilo-vida:theme",
  data: "estilo-vida:data",
} as const;

export const LOCALES: Array<{ code: Locale; label: string; flag: string }> = [
  { code: "pt-BR", label: "PT-BR", flag: "🇧🇷" },
  { code: "en", label: "EN", flag: "🇺🇸" },
  { code: "es", label: "ES", flag: "🇪🇸" },
];

export const NAV_ITEMS = [
  { href: "/", key: "dashboard" },
  { href: "/energia", key: "energy" },
  { href: "/prioridade", key: "priority" },
  { href: "/habitos", key: "habits" },
  { href: "/financas", key: "finance" },
] as const;

export const DAY_KEYS: DayKey[] = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
];

export const PRIORITY_STATUSES: PriorityStatus[] = [
  "pending",
  "in_progress",
  "done",
];

export const TRANSACTION_TYPES: TransactionType[] = ["income", "expense"];
