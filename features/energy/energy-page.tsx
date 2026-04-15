"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { SectionHeading } from "@/components/ui/section-heading";
import { useI18n } from "@/components/providers/i18n-provider";
import { useLifePlanner } from "@/components/providers/life-planner-provider";
import { getTodayISO } from "@/lib/utils";

export function EnergyPage() {
  const { dictionary } = useI18n();
  const { data, setEnergy } = useLifePlanner();
  const [score, setScore] = useState(String(data.energy.score));
  const [reason, setReason] = useState(data.energy.reason);
  const [notes, setNotes] = useState(data.energy.notes);

  const level =
    Number(score) >= 8
      ? dictionary.energy.levelHigh
      : Number(score) >= 5
        ? dictionary.energy.levelMedium
        : dictionary.energy.levelLow;

  return (
    <div className="space-y-6">
      <SectionHeading title={dictionary.energy.title} description={dictionary.energy.description} />

      <div className="grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
        <Card>
          <form
            className="space-y-4"
            onSubmit={(event) => {
              event.preventDefault();
              setEnergy({
                score: Number(score),
                reason,
                notes,
                date: getTodayISO(),
              });
            }}
          >
            <div>
              <p className="text-lg font-semibold text-foreground">{dictionary.energy.formTitle}</p>
              <p className="mt-1 text-sm text-muted">{dictionary.energy.scoreHelp}</p>
            </div>

            <label className="block space-y-2">
              <span className="text-sm font-semibold text-foreground">
                {dictionary.energy.scoreLabel}
              </span>
              <input
                type="number"
                min="0"
                max="10"
                value={score}
                onChange={(event) => setScore(event.target.value)}
                className="w-full rounded-2xl border border-line bg-surface-strong px-4 py-3 outline-none transition focus:border-brand"
              />
            </label>

            <label className="block space-y-2">
              <span className="text-sm font-semibold text-foreground">
                {dictionary.energy.reasonLabel}
              </span>
              <textarea
                value={reason}
                onChange={(event) => setReason(event.target.value)}
                rows={4}
                className="w-full rounded-2xl border border-line bg-surface-strong px-4 py-3 outline-none transition focus:border-brand"
              />
            </label>

            <label className="block space-y-2">
              <span className="text-sm font-semibold text-foreground">
                {dictionary.energy.notesLabel}
              </span>
              <textarea
                value={notes}
                onChange={(event) => setNotes(event.target.value)}
                rows={4}
                className="w-full rounded-2xl border border-line bg-surface-strong px-4 py-3 outline-none transition focus:border-brand"
              />
            </label>

            <button
              type="submit"
              className="rounded-full bg-brand px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90"
            >
              {dictionary.common.save}
            </button>
          </form>
        </Card>

        <Card className="space-y-4">
          <div>
            <p className="text-lg font-semibold text-foreground">{dictionary.energy.panelTitle}</p>
            <p className="mt-1 text-sm text-muted">{data.energy.reason}</p>
          </div>

          <div className="rounded-[28px] bg-brand px-5 py-6 text-white">
            <p className="text-sm font-medium text-white/70">{dictionary.common.score}</p>
            <p className="mt-2 text-5xl font-semibold">{data.energy.score}</p>
            <p className="mt-4 text-sm font-semibold uppercase tracking-[0.22em]">{level}</p>
          </div>

          <div className="rounded-[28px] border border-line bg-surface-strong p-5">
            <p className="text-sm font-semibold text-foreground">{dictionary.common.notes}</p>
            <p className="mt-2 text-sm leading-7 text-muted">{data.energy.notes}</p>
          </div>
        </Card>
      </div>
    </div>
  );
}
