"use client";

import { Card } from "@/components/ui/card";
import { MetricCard } from "@/components/ui/metric-card";
import { SectionHeading } from "@/components/ui/section-heading";
import { useI18n } from "@/components/providers/i18n-provider";
import { useLifePlanner } from "@/components/providers/life-planner-provider";
import { getFinanceSummary } from "@/lib/finance";
import { getHabitStreak } from "@/lib/habits";
import { getDailyQuotes } from "@/lib/quotes";
import { formatCurrency, formatDate } from "@/lib/utils";

export function DashboardPage() {
  const { dictionary, locale } = useI18n();
  const { data } = useLifePlanner();
  const quotes = getDailyQuotes();
  const finance = getFinanceSummary(data.transactions);
  const topHabit = [...data.habits].sort((a, b) => getHabitStreak(b) - getHabitStreak(a))[0];

  return (
    <div className="space-y-6">
      <SectionHeading
        eyebrow={dictionary.dashboard.eyebrow}
        title={dictionary.dashboard.title}
        description={dictionary.dashboard.description}
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          label={dictionary.dashboard.energyLabel}
          value={`${data.energy.score}/10`}
        />
        <MetricCard
          label={dictionary.dashboard.currentStatus}
          value={dictionary.priority.statuses[data.priority.status]}
        />
        <MetricCard
          label={dictionary.dashboard.topHabit}
          value={topHabit ? `${getHabitStreak(topHabit)} ${dictionary.dashboard.streak}` : "-"}
          tone="success"
        />
        <MetricCard
          label={dictionary.dashboard.balance}
          value={formatCurrency(finance.balance, locale)}
          tone={finance.balance >= 0 ? "success" : "danger"}
        />
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.25fr_0.95fr]">
        <Card className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-3xl bg-brand px-5 py-5 text-white">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/70">
                {dictionary.dashboard.bible}
              </p>
              <p className="mt-4 font-serif text-2xl leading-9">{quotes.bible}</p>
            </div>
            <div className="rounded-3xl bg-[rgba(14,165,233,0.14)] px-5 py-5 text-foreground dark:bg-[rgba(59,130,246,0.16)]">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand">
                {dictionary.dashboard.mindset}
              </p>
              <p className="mt-4 text-xl font-semibold leading-8">{quotes.mindset}</p>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-3xl border border-line bg-surface-strong p-4">
              <p className="text-sm font-semibold text-foreground">{dictionary.dashboard.energy}</p>
              <p className="mt-3 text-3xl font-semibold text-brand">{data.energy.score}/10</p>
              <p className="mt-2 text-sm leading-6 text-muted">{data.energy.reason}</p>
            </div>
            <div className="rounded-3xl border border-line bg-surface-strong p-4">
              <p className="text-sm font-semibold text-foreground">{dictionary.dashboard.priority}</p>
              <p className="mt-3 text-lg font-semibold leading-7 text-foreground">
                {data.priority.title}
              </p>
              <p className="mt-2 text-sm text-muted">
                {dictionary.priority.statuses[data.priority.status]}
              </p>
            </div>
            <div className="rounded-3xl border border-line bg-surface-strong p-4">
              <p className="text-sm font-semibold text-foreground">{dictionary.dashboard.finance}</p>
              <div className="mt-3 space-y-2 text-sm">
                <div className="flex items-center justify-between text-muted">
                  <span>{dictionary.dashboard.income}</span>
                  <span className="font-semibold text-success">
                    {formatCurrency(finance.income, locale)}
                  </span>
                </div>
                <div className="flex items-center justify-between text-muted">
                  <span>{dictionary.dashboard.expense}</span>
                  <span className="font-semibold text-danger">
                    {formatCurrency(finance.expense, locale)}
                  </span>
                </div>
                <div className="flex items-center justify-between border-t border-line pt-2 text-foreground">
                  <span>{dictionary.dashboard.balance}</span>
                  <span className="font-semibold">{formatCurrency(finance.balance, locale)}</span>
                </div>
              </div>
            </div>
          </div>
        </Card>

        <Card className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-foreground">{dictionary.dashboard.habits}</p>
              <p className="text-sm text-muted">{formatDate(data.energy.date, locale)}</p>
            </div>
            <span className="rounded-full bg-brand-soft px-3 py-1 text-xs font-semibold text-brand">
              {data.habits.length} {dictionary.common.active.toLowerCase()}
            </span>
          </div>

          <div className="space-y-3">
            {data.habits.map((habit) => (
              <div
                key={habit.id}
                className="rounded-3xl border border-line bg-surface-strong px-4 py-4"
              >
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="font-semibold text-foreground">{habit.name}</p>
                    <p className="text-sm text-muted">
                      {getHabitStreak(habit)} {dictionary.dashboard.streak}
                    </p>
                  </div>
                  <span className="rounded-full bg-brand-soft px-3 py-1 text-xs font-semibold text-brand">
                    {habit.records.filter((record) => record.completed).length}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
