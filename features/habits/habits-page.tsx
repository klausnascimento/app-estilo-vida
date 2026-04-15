"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { SectionHeading } from "@/components/ui/section-heading";
import { useI18n } from "@/components/providers/i18n-provider";
import { useLifePlanner } from "@/components/providers/life-planner-provider";
import { DAY_KEYS } from "@/lib/constants";
import { getHabitStreak, getHabitWeekState } from "@/lib/habits";
import { DayKey } from "@/lib/types";
import { getTodayISO } from "@/lib/utils";
import { cn } from "@/lib/utils";

export function HabitsPage() {
  const { dictionary, locale } = useI18n();
  const { data, addHabit, toggleHabitRecord } = useLifePlanner();
  const [name, setName] = useState("");
  const [selectedDays, setSelectedDays] = useState<DayKey[]>([
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
  ]);

  return (
    <div className="space-y-6">
      <SectionHeading title={dictionary.habits.title} description={dictionary.habits.description} />

      <Card>
        <form
          className="grid gap-4 lg:grid-cols-[1.2fr_1fr_auto]"
          onSubmit={(event) => {
            event.preventDefault();
            if (!name.trim()) {
              return;
            }

            addHabit({
              name: name.trim(),
              weeklyTargets: selectedDays,
            });
            setName("");
          }}
        >
          <label className="space-y-2">
            <span className="text-sm font-semibold text-foreground">
              {dictionary.habits.habitName}
            </span>
            <input
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="w-full rounded-2xl border border-line bg-surface-strong px-4 py-3 outline-none transition focus:border-brand"
            />
          </label>

          <div className="space-y-2">
            <span className="text-sm font-semibold text-foreground">
              {dictionary.habits.targetDays}
            </span>
            <div className="flex flex-wrap gap-2">
              {DAY_KEYS.map((day) => {
                const active = selectedDays.includes(day);

                return (
                  <button
                    key={day}
                    type="button"
                    onClick={() =>
                      setSelectedDays((current) =>
                        current.includes(day)
                          ? current.filter((item) => item !== day)
                          : [...current, day],
                      )
                    }
                    className={cn(
                      "rounded-full border px-3 py-2 text-xs font-semibold transition",
                      active
                        ? "border-brand bg-brand text-white"
                        : "border-line bg-surface-strong text-foreground",
                    )}
                  >
                    {dictionary.days[day]}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex items-end">
            <button
              type="submit"
              className="w-full rounded-full bg-brand px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90 lg:w-auto"
            >
              {dictionary.habits.addHabit}
            </button>
          </div>
        </form>
      </Card>

      <div className="grid gap-4 xl:grid-cols-2">
        {data.habits.map((habit) => {
          const weekState = getHabitWeekState(habit);

          return (
            <Card key={habit.id} className="space-y-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-lg font-semibold text-foreground">{habit.name}</p>
                  <p className="text-sm text-muted">
                    {dictionary.habits.streak}: {getHabitStreak(habit)}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => toggleHabitRecord(habit.id, getTodayISO())}
                  className="rounded-full bg-brand-soft px-4 py-2 text-xs font-semibold text-brand transition hover:opacity-90"
                >
                  {dictionary.habits.markDone}
                </button>
              </div>

              <div>
                <p className="text-sm font-semibold text-foreground">{dictionary.common.week}</p>
                <div className="mt-3 grid grid-cols-7 gap-2">
                  {weekState.map((item) => (
                    <div
                      key={`${habit.id}-${item.date}`}
                      className={cn(
                        "rounded-2xl border px-2 py-3 text-center text-xs font-semibold",
                        item.completed
                          ? "border-success bg-[rgba(34,197,94,0.14)] text-success"
                          : item.targeted
                            ? "border-line bg-surface-strong text-foreground"
                            : "border-line bg-transparent text-muted",
                      )}
                    >
                      <div>{dictionary.days[item.day]}</div>
                      <div className="mt-2 text-[11px] opacity-70">
                        {new Intl.DateTimeFormat(locale, { day: "2-digit" }).format(
                          new Date(`${item.date}T12:00:00`),
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-sm font-semibold text-foreground">{dictionary.common.history}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {habit.records
                    .slice()
                    .sort((a, b) => b.date.localeCompare(a.date))
                    .slice(0, 8)
                    .map((record) => (
                      <span
                        key={`${habit.id}-${record.date}`}
                        className={cn(
                          "rounded-full px-3 py-2 text-xs font-semibold",
                          record.completed
                            ? "bg-brand-soft text-brand"
                            : "bg-[rgba(239,68,68,0.12)] text-danger",
                        )}
                      >
                        {record.date}
                      </span>
                    ))}
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
