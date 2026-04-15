"use client";

import {
  createContext,
  startTransition,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { initialAppData } from "@/lib/mock-data";
import { STORAGE_KEYS } from "@/lib/constants";
import { AppData, DayKey, EnergyEntry, Habit, PriorityItem, Transaction } from "@/lib/types";
import { createId } from "@/lib/utils";

type LifePlannerContextValue = {
  data: AppData;
  setEnergy: (entry: EnergyEntry) => void;
  setPriority: (item: PriorityItem) => void;
  addHabit: (payload: { name: string; weeklyTargets: DayKey[] }) => void;
  toggleHabitRecord: (habitId: string, date: string) => void;
  addTransaction: (transaction: Omit<Transaction, "id">) => void;
  updateTransaction: (transaction: Transaction) => void;
  deleteTransaction: (id: string) => void;
};

const LifePlannerContext = createContext<LifePlannerContextValue | null>(null);

export function LifePlannerProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<AppData>(() => {
    if (typeof window === "undefined") {
      return initialAppData;
    }

    const stored = window.localStorage.getItem(STORAGE_KEYS.data);
    if (!stored) {
      return initialAppData;
    }

    try {
      return JSON.parse(stored) as AppData;
    } catch {
      window.localStorage.removeItem(STORAGE_KEYS.data);
      return initialAppData;
    }
  });

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEYS.data, JSON.stringify(data));
  }, [data]);

  const value = useMemo<LifePlannerContextValue>(
    () => ({
      data,
      setEnergy: (entry) => {
        startTransition(() => {
          setData((current) => ({ ...current, energy: entry }));
        });
      },
      setPriority: (item) => {
        startTransition(() => {
          setData((current) => ({ ...current, priority: item }));
        });
      },
      addHabit: ({ name, weeklyTargets }) => {
        const nextHabit: Habit = {
          id: createId("habit"),
          name,
          weeklyTargets,
          records: [],
        };

        startTransition(() => {
          setData((current) => ({
            ...current,
            habits: [nextHabit, ...current.habits],
          }));
        });
      },
      toggleHabitRecord: (habitId, date) => {
        startTransition(() => {
          setData((current) => ({
            ...current,
            habits: current.habits.map((habit) => {
              if (habit.id !== habitId) {
                return habit;
              }

              const currentRecord = habit.records.find((record) => record.date === date);

              if (currentRecord) {
                return {
                  ...habit,
                  records: habit.records.map((record) =>
                    record.date === date
                      ? { ...record, completed: !record.completed }
                      : record,
                  ),
                };
              }

              return {
                ...habit,
                records: [...habit.records, { date, completed: true }],
              };
            }),
          }));
        });
      },
      addTransaction: (transaction) => {
        startTransition(() => {
          setData((current) => ({
            ...current,
            transactions: [{ ...transaction, id: createId("txn") }, ...current.transactions],
          }));
        });
      },
      updateTransaction: (transaction) => {
        startTransition(() => {
          setData((current) => ({
            ...current,
            transactions: current.transactions.map((item) =>
              item.id === transaction.id ? transaction : item,
            ),
          }));
        });
      },
      deleteTransaction: (id) => {
        startTransition(() => {
          setData((current) => ({
            ...current,
            transactions: current.transactions.filter((item) => item.id !== id),
          }));
        });
      },
    }),
    [data],
  );

  return (
    <LifePlannerContext.Provider value={value}>{children}</LifePlannerContext.Provider>
  );
}

export function useLifePlanner() {
  const context = useContext(LifePlannerContext);

  if (!context) {
    throw new Error("useLifePlanner must be used within LifePlannerProvider");
  }

  return context;
}
