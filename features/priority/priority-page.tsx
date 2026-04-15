"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { SectionHeading } from "@/components/ui/section-heading";
import { useI18n } from "@/components/providers/i18n-provider";
import { useLifePlanner } from "@/components/providers/life-planner-provider";
import { PRIORITY_STATUSES } from "@/lib/constants";
import { getTodayISO } from "@/lib/utils";

export function PriorityPage() {
  const { dictionary } = useI18n();
  const { data, setPriority } = useLifePlanner();
  const [title, setTitle] = useState(data.priority.title);
  const [status, setStatus] = useState(data.priority.status);
  const [notes, setNotes] = useState(data.priority.notes);

  return (
    <div className="space-y-6">
      <SectionHeading
        title={dictionary.priority.title}
        description={dictionary.priority.description}
      />

      <div className="grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
        <Card>
          <form
            className="space-y-4"
            onSubmit={(event) => {
              event.preventDefault();
              setPriority({
                title,
                status,
                notes,
                date: getTodayISO(),
              });
            }}
          >
            <p className="text-lg font-semibold text-foreground">{dictionary.priority.formTitle}</p>

            <label className="block space-y-2">
              <span className="text-sm font-semibold text-foreground">
                {dictionary.priority.taskLabel}
              </span>
              <input
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                className="w-full rounded-2xl border border-line bg-surface-strong px-4 py-3 outline-none transition focus:border-brand"
              />
            </label>

            <label className="block space-y-2">
              <span className="text-sm font-semibold text-foreground">
                {dictionary.priority.statusLabel}
              </span>
              <select
                value={status}
                onChange={(event) =>
                  setStatus(event.target.value as typeof data.priority.status)
                }
                className="w-full rounded-2xl border border-line bg-surface-strong px-4 py-3 outline-none transition focus:border-brand"
              >
                {PRIORITY_STATUSES.map((item) => (
                  <option key={item} value={item}>
                    {dictionary.priority.statuses[item]}
                  </option>
                ))}
              </select>
            </label>

            <label className="block space-y-2">
              <span className="text-sm font-semibold text-foreground">
                {dictionary.priority.notesLabel}
              </span>
              <textarea
                value={notes}
                onChange={(event) => setNotes(event.target.value)}
                rows={5}
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
          <div className="rounded-[28px] bg-brand-soft p-5">
            <p className="text-sm font-semibold text-brand">{dictionary.priority.focusTitle}</p>
            <p className="mt-2 text-sm leading-7 text-muted">
              {dictionary.priority.focusDescription}
            </p>
          </div>

          <div className="rounded-[28px] border border-line bg-surface-strong p-5">
            <p className="text-sm text-muted">{dictionary.priority.statusLabel}</p>
            <p className="mt-2 text-2xl font-semibold text-foreground">
              {dictionary.priority.statuses[data.priority.status]}
            </p>
            <p className="mt-4 text-lg leading-8 text-foreground">{data.priority.title}</p>
            <p className="mt-4 text-sm leading-7 text-muted">{data.priority.notes}</p>
          </div>
        </Card>
      </div>
    </div>
  );
}
