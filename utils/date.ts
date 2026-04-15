/**
 * Returns a new Date object representing the start of the given day (00:00:00).
 * Useful for normalizing dates to store things like EnergyCheckIn or DailyPriority.
 */
export function getStartOfDay(date?: Date): Date {
  const d = date ? new Date(date) : new Date();
  d.setHours(0, 0, 0, 0);
  return d;
}

export function formatRelativeDate(date: Date, locale: string = 'pt-BR'): string {
  return new Intl.DateTimeFormat(locale, {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
}
