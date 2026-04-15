export type Locale = "pt-BR" | "en" | "es";
export type Theme = "light" | "dark";
export type DayKey =
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday"
  | "sunday";

export type PriorityStatus = "pending" | "in_progress" | "done";
export type TransactionType = "income" | "expense";

export interface EnergyEntry {
  score: number;
  reason: string;
  notes: string;
  date: string;
}

export interface PriorityItem {
  title: string;
  status: PriorityStatus;
  notes: string;
  date: string;
}

export interface HabitRecord {
  date: string;
  completed: boolean;
}

export interface Habit {
  id: string;
  name: string;
  weeklyTargets: DayKey[];
  records: HabitRecord[];
}

export interface Transaction {
  id: string;
  type: TransactionType;
  description: string;
  amount: number;
  date: string;
  category: string;
}

export interface AppData {
  energy: EnergyEntry;
  priority: PriorityItem;
  habits: Habit[];
  transactions: Transaction[];
}
