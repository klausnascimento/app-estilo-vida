'use client';

import { useEffect, useState } from 'react';
import { Shell } from '../../components/layout/Shell';
import { Card } from '../../components/shared/Card';
import { useTranslation } from '../../providers/LanguageProvider';

type PriorityItem = {
  id: string;
  title: string;
  description: string | null;
  status: 'PENDING' | 'IN_PROGRESS' | 'DONE';
};

const statusOptions: Array<{ value: PriorityItem['status']; label: string }> = [
  { value: 'PENDING', label: 'Pendente' },
  { value: 'IN_PROGRESS', label: 'Em progresso' },
  { value: 'DONE', label: 'Concluída' },
];

export default function PriorityPage() {
  const { t } = useTranslation();
  const [priority, setPriority] = useState<PriorityItem | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState<PriorityItem['status']>('PENDING');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const loadPriority = async () => {
    try {
      const res = await fetch('/api/priority', { cache: 'no-store' });
      const json = await res.json();

      if (json.success && json.data) {
        const current = json.data as PriorityItem;
        setPriority(current);
        setTitle(current.title);
        setDescription(current.description ?? '');
        setStatus(current.status);
      } else {
        setPriority(null);
        setTitle('');
        setDescription('');
        setStatus('PENDING');
      }
    } catch {
      setMessage('Erro ao carregar prioridade.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPriority();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setMessage('Informe a prioridade do dia.');
      return;
    }

    setSaving(true);
    setMessage(null);

    try {
      const res = await fetch('/api/priority', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: title.trim(),
          description: description.trim(),
          status,
        }),
      });
      const json = await res.json();

      if (!json.success) {
        throw new Error(json.error ?? 'Erro ao salvar prioridade.');
      }

      setMessage('Prioridade salva com sucesso.');
      await loadPriority();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Erro ao salvar prioridade.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!priority) {
      return;
    }

    setSaving(true);
    setMessage(null);

    try {
      const res = await fetch(`/api/priority/${priority.id}`, { method: 'DELETE' });
      const json = await res.json();

      if (!json.success) {
        throw new Error(json.error ?? 'Erro ao remover prioridade.');
      }

      setPriority(null);
      setTitle('');
      setDescription('');
      setStatus('PENDING');
      setMessage('Prioridade removida.');
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Erro ao remover prioridade.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <Shell>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100">{t.priority}</h1>
      </div>

      <div className="mx-auto max-w-4xl space-y-6">
        <Card title={t.daily_priority}>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">
                Qual a sua única coisa para hoje?
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full rounded-md border border-slate-300 px-3 py-2 text-lg dark:border-slate-700 dark:bg-slate-900"
                placeholder="Ex: Fechar contrato X"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">
                Descrição
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900"
                rows={4}
                placeholder="Contexto, resultado esperado ou próximo passo."
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">
                Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as PriorityItem['status'])}
                className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900"
              >
                {statusOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {message ? (
              <div className="rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300">
                {message}
              </div>
            ) : null}

            <div className="flex gap-3">
              <button
                disabled={saving}
                className="w-full rounded bg-blue-600 py-2 px-4 font-medium text-white transition-colors hover:bg-blue-700 disabled:opacity-50"
              >
                {saving ? 'Salvando...' : t.save}
              </button>
              <button
                type="button"
                disabled={saving || !priority}
                onClick={handleDelete}
                className="rounded border border-red-300 px-4 py-2 text-sm font-medium text-red-500 transition-colors hover:bg-red-50 disabled:opacity-50 dark:border-red-900/60 dark:hover:bg-red-950/20"
              >
                Apagar
              </button>
            </div>
          </form>
        </Card>

        <Card title="Resumo atual">
          {loading ? (
            <div className="py-4 text-sm text-slate-500">Carregando prioridade...</div>
          ) : priority ? (
            <div className="space-y-3">
              <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                {statusOptions.find((item) => item.value === priority.status)?.label}
              </div>
              <div className="text-xl font-semibold text-slate-800 dark:text-slate-100">
                {priority.title}
              </div>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                {priority.description || 'Sem descrição adicional.'}
              </p>
            </div>
          ) : (
            <div className="py-4 text-sm text-slate-500">Nenhuma prioridade cadastrada hoje.</div>
          )}
        </Card>
      </div>
    </Shell>
  );
}
