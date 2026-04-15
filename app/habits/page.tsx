'use client';

import { useEffect, useState } from 'react';
import { Shell } from '../../components/layout/Shell';
import { Card } from '../../components/shared/Card';
import { useTranslation } from '../../providers/LanguageProvider';

type HabitLog = {
  id: string;
  completedAt: string;
};

type Habit = {
  id: string;
  name: string;
  description: string | null;
  active: boolean;
  logs: HabitLog[];
};

type HabitForm = {
  name: string;
  description: string;
};

const emptyForm: HabitForm = {
  name: '',
  description: '',
};

export default function HabitsPage() {
  const { t } = useTranslation();
  const [habits, setHabits] = useState<Habit[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingHabitId, setEditingHabitId] = useState<string | null>(null);
  const [form, setForm] = useState<HabitForm>(emptyForm);
  const [message, setMessage] = useState<string | null>(null);

  const fetchHabits = async () => {
    try {
      const res = await fetch('/api/habits', { cache: 'no-store' });
      const json = await res.json();

      if (json.success) {
        setHabits(json.data as Habit[]);
      } else {
        setMessage(json.error ?? 'Erro ao carregar hábitos.');
      }
    } catch {
      setMessage('Erro ao carregar hábitos.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHabits();
  }, []);

  const resetForm = () => {
    setForm(emptyForm);
    setEditingHabitId(null);
    setShowForm(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) {
      setMessage('Informe o nome do hábito.');
      return;
    }

    setSaving(true);
    setMessage(null);

    const payload = {
      name: form.name.trim(),
      description: form.description.trim(),
      active: true,
    };

    try {
      const res = await fetch(
        editingHabitId ? `/api/habits/${editingHabitId}` : '/api/habits',
        {
          method: editingHabitId ? 'PUT' : 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        },
      );
      const json = await res.json();

      if (!json.success) {
        throw new Error(json.error ?? 'Erro ao salvar hábito.');
      }

      setMessage(editingHabitId ? 'Hábito atualizado.' : 'Hábito criado.');
      resetForm();
      await fetchHabits();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Erro ao salvar hábito.');
    } finally {
      setSaving(false);
    }
  };

  const handleToggleLog = async (id: string) => {
    setMessage(null);

    try {
      const res = await fetch(`/api/habits/${id}/logs`, { method: 'POST' });
      const json = await res.json();

      if (!json.success) {
        throw new Error(json.error ?? 'Erro ao registrar hábito.');
      }

      await fetchHabits();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Erro ao registrar hábito.');
    }
  };

  const handleEdit = (habit: Habit) => {
    setEditingHabitId(habit.id);
    setForm({
      name: habit.name,
      description: habit.description ?? '',
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    setSaving(true);
    setMessage(null);

    try {
      const res = await fetch(`/api/habits/${id}`, { method: 'DELETE' });
      const json = await res.json();

      if (!json.success) {
        throw new Error(json.error ?? 'Erro ao apagar hábito.');
      }

      if (editingHabitId === id) {
        resetForm();
      }

      setMessage('Hábito removido.');
      await fetchHabits();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Erro ao apagar hábito.');
    } finally {
      setSaving(false);
    }
  };

  const isCompletedToday = (logs: HabitLog[]) => {
    const today = new Date().toDateString();
    return logs.some((log) => new Date(log.completedAt).toDateString() === today);
  };

  const getLast7Days = () =>
    Array.from({ length: 7 }).map((_, index) => {
      const date = new Date();
      date.setDate(date.getDate() - (6 - index));
      return date;
    });

  return (
    <Shell>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100">{t.habits}</h1>
        <button
          onClick={() => {
            if (showForm && !editingHabitId) {
              setShowForm(false);
            } else {
              setEditingHabitId(null);
              setForm(emptyForm);
              setShowForm(true);
            }
          }}
          className="rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white"
        >
          {showForm && !editingHabitId ? 'Cancelar' : `+ ${t.add_habit}`}
        </button>
      </div>

      {showForm ? (
        <Card className="mb-6" title={editingHabitId ? 'Editar hábito' : 'Novo hábito'}>
          <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium">Nome do hábito</label>
              <input
                autoFocus
                type="text"
                value={form.name}
                onChange={(e) => setForm((current) => ({ ...current, name: e.target.value }))}
                className="w-full rounded border border-slate-300 bg-transparent px-3 py-2 dark:border-slate-700"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium">Descrição</label>
              <input
                type="text"
                value={form.description}
                onChange={(e) =>
                  setForm((current) => ({ ...current, description: e.target.value }))
                }
                className="w-full rounded border border-slate-300 bg-transparent px-3 py-2 dark:border-slate-700"
              />
            </div>

            <div className="md:col-span-2 flex gap-3">
              <button
                disabled={saving}
                className="rounded bg-blue-600 px-4 py-2 text-white disabled:opacity-50"
              >
                {saving ? 'Salvando...' : editingHabitId ? 'Atualizar' : 'Salvar'}
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

      {loading ? (
        <div className="text-slate-500">Carregando hábitos...</div>
      ) : habits.length === 0 ? (
        <div className="text-slate-500">Nenhum hábito cadastrado.</div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {habits.map((habit) => {
            const doneToday = isCompletedToday(habit.logs);
            const last7Days = getLast7Days();

            return (
              <Card key={habit.id}>
                <div className="mb-4 flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">{habit.name}</h3>
                    {habit.description ? (
                      <p className="text-sm text-slate-500">{habit.description}</p>
                    ) : null}
                    <p className="mt-1 text-sm text-slate-500">
                      Check-ins:{' '}
                      <span className="font-bold text-orange-500">{habit.logs.length} 🔥</span>
                    </p>
                  </div>
                  <button
                    onClick={() => handleToggleLog(habit.id)}
                    className={`flex h-8 w-8 items-center justify-center rounded-full border-2 transition-colors ${
                      doneToday
                        ? 'border-green-500 bg-green-500 text-white'
                        : 'border-slate-300 text-transparent hover:border-green-500 hover:text-green-200'
                    }`}
                  >
                    ✓
                  </button>
                </div>

                <div className="mt-4 flex justify-between border-t border-slate-100 pt-3 dark:border-slate-800">
                  {last7Days.map((date, index) => {
                    const isDone = habit.logs.some(
                      (log) =>
                        new Date(log.completedAt).toDateString() === date.toDateString(),
                    );
                    const label = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'][date.getDay()];

                    return (
                      <div
                        key={`${habit.id}-${index}`}
                        title={date.toLocaleDateString('pt-BR')}
                        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded text-xs font-medium ${
                          isDone
                            ? 'bg-green-500 text-white'
                            : 'bg-slate-100 text-slate-500 dark:bg-slate-800'
                        }`}
                      >
                        {label}
                      </div>
                    );
                  })}
                </div>

                <div className="mt-4 flex gap-2 border-t border-slate-100 pt-4 dark:border-slate-800">
                  <button
                    type="button"
                    onClick={() => handleEdit(habit)}
                    className="rounded border border-slate-300 px-3 py-2 text-xs font-medium dark:border-slate-700"
                  >
                    Editar
                  </button>
                  <button
                    type="button"
                    disabled={saving}
                    onClick={() => handleDelete(habit.id)}
                    className="rounded border border-red-300 px-3 py-2 text-xs font-medium text-red-500 disabled:opacity-50 dark:border-red-900/60"
                  >
                    Apagar
                  </button>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </Shell>
  );
}
