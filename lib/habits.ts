import { Habit } from "@/lib/types";
import { getWeekDates } from "@/lib/date";

export function getHabitRecord(habit: Habit, date: string) {
  return habit.records.find((record) => record.date === date);
}

export function getHabitStreak(habit: Habit) {
  const completedDates = habit.records
    .filter((record) => record.completed)
    .map((record) => record.date)
    .sort((a, b) => a.localeCompare(b));

  if (completedDates.length === 0) {
    return 0;
  }

  let streak = 1;

  for (let index = completedDates.length - 1; index > 0; index -= 1) {
    const current = new Date(`${completedDates[index]}T12:00:00`);
    const previous = new Date(`${completedDates[index - 1]}T12:00:00`);
    const diff = Math.round((current.getTime() - previous.getTime()) / (1000 * 60 * 60 * 24));

    if (diff === 1) {
      streak += 1;
      continue;
    }

    break;
  }

  return streak;
}

export function getHabitWeekState(habit: Habit) {
  return getWeekDates().map(({ day, date }) => ({
    day,
    date,
    completed: Boolean(getHabitRecord(habit, date)?.completed),
    targeted: habit.weeklyTargets.includes(day),
  }));
}
