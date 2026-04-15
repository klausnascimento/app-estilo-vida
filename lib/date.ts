import { DAY_KEYS } from "@/lib/constants";

export function getDayOfYear(date: Date) {
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = date.getTime() - start.getTime();
  const oneDay = 1000 * 60 * 60 * 24;
  return Math.floor(diff / oneDay);
}

export function startOfWeek(date = new Date()) {
  const cloned = new Date(date);
  const day = cloned.getDay();
  const diff = cloned.getDate() - day + (day === 0 ? -6 : 1);
  cloned.setDate(diff);
  cloned.setHours(0, 0, 0, 0);
  return cloned;
}

export function addDays(date: Date, amount: number) {
  const cloned = new Date(date);
  cloned.setDate(cloned.getDate() + amount);
  return cloned;
}

export function getWeekDates(date = new Date()) {
  const weekStart = startOfWeek(date);
  return DAY_KEYS.map((day, index) => {
    const current = addDays(weekStart, index);
    return {
      day,
      date: current.toISOString().slice(0, 10),
    };
  });
}
