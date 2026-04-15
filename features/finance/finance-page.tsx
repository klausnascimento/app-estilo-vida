"use client";

import { useDeferredValue, useState } from "react";
import { Card } from "@/components/ui/card";
import { MetricCard } from "@/components/ui/metric-card";
import { SectionHeading } from "@/components/ui/section-heading";
import { useI18n } from "@/components/providers/i18n-provider";
import { useLifePlanner } from "@/components/providers/life-planner-provider";
import { TRANSACTION_TYPES } from "@/lib/constants";
import { getFinanceSummary } from "@/lib/finance";
import { Transaction } from "@/lib/types";
import { formatCurrency, formatDate, getTodayISO } from "@/lib/utils";

type TransactionFormState = Omit<Transaction, "id">;

const emptyForm: TransactionFormState = {
  type: "expense",
  description: "",
  amount: 0,
  date: getTodayISO(),
  category: "",
};

export function FinancePage() {
  const { dictionary, locale } = useI18n();
  const { data, addTransaction, updateTransaction, deleteTransaction } = useLifePlanner();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<TransactionFormState>(emptyForm);
  const deferredTransactions = useDeferredValue(data.transactions);
  const summary = getFinanceSummary(deferredTransactions);

  return (
    <div className="space-y-6">
      <SectionHeading title={dictionary.finance.title} description={dictionary.finance.description} />

      <div className="grid gap-4 md:grid-cols-3">
        <MetricCard
          label={dictionary.dashboard.income}
          value={formatCurrency(summary.income, locale)}
          tone="success"
        />
        <MetricCard
          label={dictionary.dashboard.expense}
          value={formatCurrency(summary.expense, locale)}
          tone="danger"
        />
        <MetricCard
          label={dictionary.dashboard.balance}
          value={formatCurrency(summary.balance, locale)}
          tone={summary.balance >= 0 ? "success" : "danger"}
        />
      </div>

      <div className="grid gap-4 xl:grid-cols-[0.95fr_1.05fr]">
        <Card>
          <form
            className="space-y-4"
            onSubmit={(event) => {
              event.preventDefault();
              if (!form.description.trim() || !form.category.trim()) {
                return;
              }

              if (editingId) {
                updateTransaction({ id: editingId, ...form });
                setEditingId(null);
              } else {
                addTransaction(form);
              }

              setForm({ ...emptyForm, date: getTodayISO() });
            }}
          >
            <div className="flex items-center justify-between gap-3">
              <p className="text-lg font-semibold text-foreground">{dictionary.finance.formTitle}</p>
              {editingId ? (
                <button
                  type="button"
                  onClick={() => {
                    setEditingId(null);
                    setForm({ ...emptyForm, date: getTodayISO() });
                  }}
                  className="text-xs font-semibold text-muted"
                >
                  {dictionary.common.cancel}
                </button>
              ) : null}
            </div>

            <label className="block space-y-2">
              <span className="text-sm font-semibold text-foreground">
                {dictionary.finance.transactionType}
              </span>
              <select
                value={form.type}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    type: event.target.value as Transaction["type"],
                  }))
                }
                className="w-full rounded-2xl border border-line bg-surface-strong px-4 py-3 outline-none transition focus:border-brand"
              >
                {TRANSACTION_TYPES.map((item) => (
                  <option key={item} value={item}>
                    {item === "income" ? dictionary.finance.income : dictionary.finance.expense}
                  </option>
                ))}
              </select>
            </label>

            <label className="block space-y-2">
              <span className="text-sm font-semibold text-foreground">
                {dictionary.common.description}
              </span>
              <input
                value={form.description}
                onChange={(event) =>
                  setForm((current) => ({ ...current, description: event.target.value }))
                }
                className="w-full rounded-2xl border border-line bg-surface-strong px-4 py-3 outline-none transition focus:border-brand"
              />
            </label>

            <div className="grid gap-4 md:grid-cols-2">
              <label className="block space-y-2">
                <span className="text-sm font-semibold text-foreground">{dictionary.common.value}</span>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={form.amount}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      amount: Number(event.target.value),
                    }))
                  }
                  className="w-full rounded-2xl border border-line bg-surface-strong px-4 py-3 outline-none transition focus:border-brand"
                />
              </label>

              <label className="block space-y-2">
                <span className="text-sm font-semibold text-foreground">{dictionary.common.date}</span>
                <input
                  type="date"
                  value={form.date}
                  onChange={(event) =>
                    setForm((current) => ({ ...current, date: event.target.value }))
                  }
                  className="w-full rounded-2xl border border-line bg-surface-strong px-4 py-3 outline-none transition focus:border-brand"
                />
              </label>
            </div>

            <label className="block space-y-2">
              <span className="text-sm font-semibold text-foreground">
                {dictionary.finance.categoryLabel}
              </span>
              <input
                value={form.category}
                onChange={(event) =>
                  setForm((current) => ({ ...current, category: event.target.value }))
                }
                className="w-full rounded-2xl border border-line bg-surface-strong px-4 py-3 outline-none transition focus:border-brand"
              />
            </label>

            <button
              type="submit"
              className="rounded-full bg-brand px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90"
            >
              {editingId ? dictionary.common.update : dictionary.finance.register}
            </button>
          </form>
        </Card>

        <Card className="space-y-4">
          <div>
            <p className="text-lg font-semibold text-foreground">{dictionary.finance.listTitle}</p>
            <p className="mt-1 text-sm text-muted">{dictionary.finance.consolidated}</p>
          </div>

          <div className="space-y-3">
            {deferredTransactions
              .slice()
              .sort((a, b) => b.date.localeCompare(a.date))
              .map((transaction) => (
                <div
                  key={transaction.id}
                  className="rounded-3xl border border-line bg-surface-strong px-4 py-4"
                >
                  <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${
                            transaction.type === "income"
                              ? "bg-[rgba(34,197,94,0.14)] text-success"
                              : "bg-[rgba(239,68,68,0.12)] text-danger"
                          }`}
                        >
                          {transaction.type === "income"
                            ? dictionary.finance.income
                            : dictionary.finance.expense}
                        </span>
                        <span className="text-xs text-muted">{transaction.category}</span>
                      </div>
                      <p className="text-lg font-semibold text-foreground">
                        {transaction.description}
                      </p>
                      <p className="text-sm text-muted">{formatDate(transaction.date, locale)}</p>
                    </div>

                    <div className="flex flex-col items-start gap-3 md:items-end">
                      <p
                        className={`text-lg font-semibold ${
                          transaction.type === "income" ? "text-success" : "text-danger"
                        }`}
                      >
                        {formatCurrency(transaction.amount, locale)}
                      </p>
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            setEditingId(transaction.id);
                            setForm({
                              type: transaction.type,
                              description: transaction.description,
                              amount: transaction.amount,
                              date: transaction.date,
                              category: transaction.category,
                            });
                          }}
                          className="rounded-full border border-line px-3 py-2 text-xs font-semibold text-foreground transition hover:border-brand/50"
                        >
                          {dictionary.common.edit}
                        </button>
                        <button
                          type="button"
                          onClick={() => deleteTransaction(transaction.id)}
                          className="rounded-full border border-danger/30 px-3 py-2 text-xs font-semibold text-danger transition hover:bg-[rgba(239,68,68,0.08)]"
                        >
                          {dictionary.common.delete}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
