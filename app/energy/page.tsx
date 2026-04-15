'use client';

import { useEffect, useMemo, useState } from 'react';
import { Shell } from '../../components/layout/Shell';
import { Card } from '../../components/shared/Card';
import { useTranslation } from '../../providers/LanguageProvider';

type EnergyLog = {
  id: string;
  score: number;
  reason: string | null;
  notes: string | null;
  checkInDate: string;
};

type EnergyResponse = {
  todayLog: EnergyLog | null;
  history: EnergyLog[];
};

export default function EnergyPage() {
  const { t } = useTranslation();
  const [score, setScore] = useState(5);
  const [reason, setReason] = useState('');
  const [notes, setNotes] = useState('');
  const [history, setHistory] = useState<EnergyLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const loadEnergy = async () => {
    try {
      const res = await fetch('/api/energy', { cache: 'no-store' });
      const json = await res.json();

      if (json.success) {
        const data = json.data as EnergyResponse;
        const today = data.todayLog;
        setHistory(data.history ?? []);
        setScore(today?.score ?? 5);
        setReason(today?.reason ?? '');
        setNotes(today?.notes ?? '');
        setMessage(null);
      } else {
        setMessage(json.error ?? 'Erro ao carregar energia.');
      }
    } catch {
      setMessage('Erro ao carregar energia.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEnergy();
  }, []);

  const level = useMemo(() => {
    if (score >= 8) return 'Alta e focada';
    if (score >= 5) return 'Equilibrada';
    return 'Baixa';
  }, [score]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);

    try {
      const res = await fetch('/api/energy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ score, reason, notes }),
      });
      const json = await res.json();

      if (!json.success) {
        throw new Error(json.error ?? 'Erro ao salvar check-in.');
      }

      setMessage('Check-in salvo com sucesso.');
      await loadEnergy();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Erro ao salvar check-in.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    setSaving(true);
    setMessage(null);

    try {
      const res = await fetch('/api/energy', { method: 'DELETE' });
      const json = await res.json();

      if (!json.success) {
        throw new Error(json.error ?? 'Erro ao remover check-in.');
      }

      setScore(5);
      setReason('');
      setNotes('');
      setMessage('Check-in removido.');
      await loadEnergy();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Erro ao remover check-in.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <Shell>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100">{t.energy}</h1>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <Card title={t.energy_checkin}>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">
                {t.score}: {score}/10
              </label>
              <input
                type="range"
                min="0"
                max="10"
                className="w-full"
                value={score}
                onChange={(e) => setScore(Number(e.target.value))}
              />
              <div className="flex justify-between text-xs text-slate-500">
                <span>0 (Exausto)</span>
                <span>10 (Energizado)</span>
              </div>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">
                {t.reason}
              </label>
              <textarea
                className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900"
                rows={3}
                value={reason}
                onChange={(e) => setReason(e.target.value)}
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">
                Observações
              </label>
              <textarea
                className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900"
                rows={4}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
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
                disabled={saving}
                onClick={handleDelete}
                className="rounded border border-red-300 px-4 py-2 text-sm font-medium text-red-500 transition-colors hover:bg-red-50 disabled:opacity-50 dark:border-red-900/60 dark:hover:bg-red-950/20"
              >
                Apagar
              </button>
            </div>
          </form>
        </Card>

        <Card title="Resumo">
          <div className="space-y-4">
            <div className="rounded-lg bg-slate-50 p-4 dark:bg-slate-900">
              <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">Nível</div>
              <div className="mt-2 text-3xl font-bold text-amber-500">{score}/10</div>
              <div className="mt-1 text-sm text-slate-500">{level}</div>
            </div>

            <div className="rounded-lg border border-slate-200 p-4 dark:border-slate-700">
              <div className="text-sm font-medium text-slate-700 dark:text-slate-200">Motivo</div>
              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                {reason || 'Nenhum motivo informado.'}
              </p>
            </div>

            <div className="rounded-lg border border-slate-200 p-4 dark:border-slate-700">
              <div className="text-sm font-medium text-slate-700 dark:text-slate-200">
                Observações
              </div>
              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                {notes || 'Nenhuma observação registrada.'}
              </p>
            </div>
          </div>
        </Card>
      </div>

      <div className="mt-6">
        <Card title="Histórico da Semana">
          {loading ? (
            <div className="py-6 text-sm text-slate-500">Carregando histórico...</div>
          ) : history.length > 0 ? (
            <div className="space-y-3">
              {history.map((log) => (
                <div
                  key={log.id}
                  className="rounded border border-slate-100 bg-slate-50 p-3 text-sm dark:border-slate-800 dark:bg-slate-900"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <span className="font-semibold text-blue-600">{log.score}/10</span>
                      <span className="ml-2 text-slate-500">
                        {new Date(log.checkInDate).toLocaleDateString('pt-BR')}
                      </span>
                    </div>
                  </div>
                  {log.reason ? (
                    <p className="mt-2 text-xs text-slate-600 dark:text-slate-400">{log.reason}</p>
                  ) : null}
                </div>
              ))}
            </div>
          ) : (
            <div className="py-6 text-sm text-slate-500">Nenhum histórico recente.</div>
          )}
        </Card>
      </div>
    </Shell>
  );
}
