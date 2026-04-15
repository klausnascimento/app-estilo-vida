'use client';

import { useEffect, useState } from 'react';
import { Shell } from '../../components/layout/Shell';
import { Card, CardStat } from '../../components/shared/Card';
import { useTranslation } from '../../providers/LanguageProvider';

type Entry = {
  id: string;
  type: 'INCOME' | 'EXPENSE';
  title: string;
  description: string | null;
  amount: number;
  category: string;
  entryDate: string;
};

type FinanceForm = {
  type: Entry['type'];
  title: string;
  description: string;
  amount: string;
  category: string;
  entryDate: string;
};

const emptyForm: FinanceForm = {
  type: 'EXPENSE',
  title: '',
  description: '',
  amount: '',
  category: '',
  entryDate: new Date().toISOString().slice(0, 10),
};

export default function FinancePage() {
  const { t } = useTranslation();
  const [entries, setEntries] = useState<Entry[]>([]);
  const [summary, setSummary] = useState({ income: 0, expense: 0, balance: 0 });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<FinanceForm>(emptyForm);
  const [message, setMessage] = useState<string | null>(null);

  const fetchFinance = async () => {
    try {
      const res = await fetch('/api/finance', { cache: 'no-store' });
      const json = await res.json();

      if (json.success) {
        setEntries(json.data.list as Entry[]);
        setSummary(json.data.summary as typeof summary);
      } else {
        setMessage(json.error ?? 'Erro ao carregar finanças.');
      }
    } catch {
      setMessage('Erro ao carregar finanças.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFinance();
  }, []);

  const resetForm = () => {
    setEditingId(null);
    setForm({
      ...emptyForm,
      entryDate: new Date().toISOString().slice(0, 10),
    });
    setShowForm(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.title.trim() || !form.amount || !form.category.trim()) {
      setMessage('Preencha tipo, descrição, categoria e valor.');
      return;
    }

    setSaving(true);
    setMessage(null);

    try {
      const res = await fetch(editingId ? `/api/finance/${editingId}` : '/api/finance', {
        method: editingId ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: form.type,
          title: form.title.trim(),
          description: form.description.trim(),
          amount: Number(form.amount),
          category: form.category.trim(),
          entryDate: form.entryDate,
        }),
      });
      const json = await res.json();

      if (!json.success) {
        throw new Error(json.error ?? 'Erro ao salvar transação.');
      }

      setMessage(editingId ? 'Transação atualizada.' : 'Transação criada.');
      resetForm();
      await fetchFinance();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Erro ao salvar transação.');
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (entry: Entry) => {
    setEditingId(entry.id);
    setForm({
      type: entry.type,
      title: entry.title,
      description: entry.description ?? '',
      amount: String(entry.amount),
      category: entry.category,
      entryDate: new Date(entry.entryDate).toISOString().slice(0, 10),
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    setSaving(true);
    setMessage(null);

    try {
      const res = await fetch(`/api/finance/${id}`, { method: 'DELETE' });
      const json = await res.json();

      if (!json.success) {
        throw new Error(json.error ?? 'Erro ao apagar transação.');
      }

      if (editingId === id) {
        resetForm();
      }

      setMessage('Transação removida.');
      await fetchFinance();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Erro ao apagar transação.');
    } finally {
      setSaving(false);
    }
  };

  const formatMoney = (val: number) =>
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);

  return (
    <Shell>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100">{t.finance}</h1>
        <button
          onClick={() => {
            if (showForm && !editingId) {
              setShowForm(false);
            } else {
              setEditingId(null);
              setForm({
                ...emptyForm,
                entryDate: new Date().toISOString().slice(0, 10),
              });
              setShowForm(true);
            }
          }}
          className="rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white"
        >
          {showForm && !editingId ? 'Cancelar' : '+ Nova Transação'}
        </button>
      </div>

      <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-3">
        <CardStat
          title={t.income}
          value={<span className="text-green-600">{formatMoney(summary.income)}</span>}
        />
        <CardStat
          title={t.expense}
          value={<span className="text-red-500">{formatMoney(summary.expense)}</span>}
        />
        <CardStat
          title={t.balance}
          value={<span className="text-slate-800 dark:text-white">{formatMoney(summary.balance)}</span>}
        />
      </div>

      {showForm ? (
        <Card className="mb-6" title={editingId ? 'Editar Transação' : 'Adicionar Transação'}>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 md:grid-cols-5">
            <div>
              <label className="mb-1 block text-sm font-medium">Tipo</label>
              <select
                value={form.type}
                onChange={(e) =>
                  setForm((current) => ({ ...current, type: e.target.value as Entry['type'] }))
                }
                className="w-full rounded border border-slate-300 bg-transparent px-3 py-2 dark:border-slate-700"
              >
                <option value="EXPENSE">Despesa</option>
                <option value="INCOME">Receita</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="mb-1 block text-sm font-medium">Descrição</label>
              <input
                type="text"
                value={form.title}
                onChange={(e) => setForm((current) => ({ ...current, title: e.target.value }))}
                className="w-full rounded border border-slate-300 bg-transparent px-3 py-2 dark:border-slate-700"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium">Categoria</label>
              <input
                type="text"
                value={form.category}
                onChange={(e) =>
                  setForm((current) => ({ ...current, category: e.target.value }))
                }
                className="w-full rounded border border-slate-300 bg-transparent px-3 py-2 dark:border-slate-700"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium">Valor</label>
              <input
                type="number"
                step="0.01"
                value={form.amount}
                onChange={(e) => setForm((current) => ({ ...current, amount: e.target.value }))}
                className="w-full rounded border border-slate-300 bg-transparent px-3 py-2 dark:border-slate-700"
              />
            </div>

            <div className="md:col-span-2">
              <label className="mb-1 block text-sm font-medium">Data</label>
              <input
                type="date"
                value={form.entryDate}
                onChange={(e) =>
                  setForm((current) => ({ ...current, entryDate: e.target.value }))
                }
                className="w-full rounded border border-slate-300 bg-transparent px-3 py-2 dark:border-slate-700"
              />
            </div>

            <div className="md:col-span-3">
              <label className="mb-1 block text-sm font-medium">Observações</label>
              <input
                type="text"
                value={form.description}
                onChange={(e) =>
                  setForm((current) => ({ ...current, description: e.target.value }))
                }
                className="w-full rounded border border-slate-300 bg-transparent px-3 py-2 dark:border-slate-700"
              />
            </div>

            <div className="md:col-span-5 flex gap-3">
              <button
                disabled={saving}
                className="rounded bg-blue-600 px-6 py-2 text-white disabled:opacity-50"
              >
                {saving ? 'Salvando...' : editingId ? 'Atualizar' : 'Salvar'}
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="rounded border border-slate-300 px-4 py-2 text-sm dark:border-slate-700"
              >
                Cancelar
              </button>
            </div>
          </form>
        </Card>
      ) : null}

      {message ? (
        <div className="mb-6 rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300">
          {message}
        </div>
      ) : null}

      <Card title="Últimas Transações" noPadding>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-slate-200 bg-slate-50 text-slate-500 dark:border-slate-700 dark:bg-slate-800/50">
              <tr>
                <th className="px-6 py-3 font-medium">Data</th>
                <th className="px-6 py-3 font-medium">Descrição</th>
                <th className="px-6 py-3 font-medium">Categoria</th>
                <th className="px-6 py-3 font-medium text-right">Valor</th>
                <th className="px-6 py-3 font-medium text-right">Ações</th>
              </tr>
            </thead>
            <tbody>
              {!loading && entries.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-slate-500">
                    Nenhuma transação encontrada.
                  </td>
                </tr>
              ) : null}

              {entries.map((entry) => (
                <tr
                  key={entry.id}
                  className="border-b border-slate-100 hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800/50"
                >
                  <td className="px-6 py-4">
                    {new Date(entry.entryDate).toLocaleDateString('pt-BR')}
                  </td>
                  <td className="px-6 py-4 font-medium dark:text-slate-200">{entry.title}</td>
                  <td className="px-6 py-4">
                    <span className="rounded bg-slate-100 px-2 py-1 text-xs dark:bg-slate-800">
                      {entry.category}
                    </span>
                  </td>
                  <td
                    className={`px-6 py-4 text-right font-medium ${
                      entry.type === 'INCOME' ? 'text-green-600' : 'text-red-500'
                    }`}
                  >
                    {entry.type === 'INCOME' ? '+' : '-'} {formatMoney(entry.amount)}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => handleEdit(entry)}
                        className="rounded border border-slate-300 px-3 py-1 text-xs font-medium dark:border-slate-700"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleDelete(entry.id)}
                        className="rounded border border-red-300 px-3 py-1 text-xs font-medium text-red-500 dark:border-red-900/60"
                      >
                        Apagar
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </Shell>
  );
}
