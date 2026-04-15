'use client';

import { useEffect, useState } from 'react';
import { Shell } from '../components/layout/Shell';
import { Card, CardStat } from '../components/shared/Card';
import { useTranslation } from '../providers/LanguageProvider';

type PriorityItem = {
  id: string;
  title: string;
  status: 'PENDING' | 'IN_PROGRESS' | 'DONE';
};

type HabitLog = {
  completedAt: string;
};

type HabitItem = {
  id: string;
  name: string;
  logs: HabitLog[];
};

type QuoteItem = {
  text: string;
  reference?: string;
};

export default function Home() {
  const { t } = useTranslation();
  
  const [energyScore, setEnergyScore] = useState<number | null>(null);
  const [priority, setPriority] = useState<PriorityItem | null>(null);
  const [habits, setHabits] = useState<HabitItem[]>([]);
  const [finance, setFinance] = useState({ income: 0, expense: 0, balance: 0 });
  const [quotes, setQuotes] = useState<{ verse: QuoteItem | null; motivation: QuoteItem | null }>({
    verse: null,
    motivation: null,
  });

  useEffect(() => {
    let active = true;

    const fetchData = async () => {
      try {
        const [enRes, pRes, hRes, fRes, qRes] = await Promise.all([
          fetch('/api/energy').then((r) => r.json()),
          fetch('/api/priority').then((r) => r.json()),
          fetch('/api/habits').then((r) => r.json()),
          fetch('/api/finance').then((r) => r.json()),
          fetch('/api/quotes/today').then((r) => r.json()),
        ]);

        if (!active) {
          return;
        }

        setEnergyScore(enRes.data?.todayLog?.score ?? null);
        setPriority((pRes.data as PriorityItem | null) ?? null);
        setHabits((hRes.data as HabitItem[]) ?? []);
        setFinance(fRes.data?.summary ?? { income: 0, expense: 0, balance: 0 });
        setQuotes(qRes.data ?? { verse: null, motivation: null });
      } catch (error) {
        console.error(error);
      }
    };

    void fetchData();

    return () => {
      active = false;
    };
  }, []);

  const handlePriorityToggle = async () => {
    if (!priority) return;
    const newStatus = priority.status === 'DONE' ? 'PENDING' : 'DONE';
    await fetch(`/api/priority/${priority.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus })
    });
    setPriority({...priority, status: newStatus});
  };

  const isCompletedToday = (logs: HabitLog[]) => {
    if(!logs || logs.length === 0) return false;
    const last = new Date(logs[0].completedAt);
    const today = new Date();
    return last.toDateString() === today.toDateString();
  };

  const activeHabitsCount = habits.length;
  const habitsDoneToday = habits.filter(h => isCompletedToday(h.logs)).length;

  const formatMoney = (val: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);
  };

  return (
    <Shell>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100">
          {t.dashboard}
        </h1>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <CardStat 
          title={t.energy} 
          value={energyScore !== null ? <span className="text-amber-500">{energyScore}/10</span> : '-'} 
          subtitle={energyScore !== null && energyScore > 7 ? 'Alta e focada' : 'Registre no menu energia'} 
        />
        <CardStat 
          title="Prioridade" 
          value={<span className="text-base font-normal">{priority ? priority.title : 'Nenhuma definida'}</span>} 
          subtitle={priority?.status === 'DONE' ? <span className="text-green-500">Concluída</span> : 'Em progresso'} 
        />
        <CardStat 
          title={t.habits} 
          value={`${habitsDoneToday}/${activeHabitsCount}`} 
          subtitle="Hábitos concluídos hoje" 
        />
        <CardStat 
          title={t.balance} 
          value={formatMoney(finance.balance)} 
          subtitle="Saldo consolidado" 
        />
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (Habits & Priority) */}
        <div className="lg:col-span-2 space-y-6">
          <Card title={t.daily_priority}>
             <div className="flex items-center space-x-3">
               <input 
                 type="checkbox" 
                 className="w-5 h-5 rounded border-gray-300 cursor-pointer" 
                 checked={priority?.status === 'DONE'}
                 onChange={handlePriorityToggle}
                 disabled={!priority}
               />
               <span className={`text-lg ${priority?.status === 'DONE' ? 'line-through text-slate-400' : ''}`}>
                 {priority ? priority.title : 'Vá para Prioridade e defina sua única coisa hoje.'}
               </span>
             </div>
          </Card>
          
          <Card title={t.habits} action={<a href="/habits" className="text-sm text-blue-600 hover:underline">Ver todos</a>}>
             <div className="space-y-3">
                {habits.length === 0 ? (
                  <p className="text-slate-500 text-sm">Nenhum hábito rastreado. Crie novos hábitos no menu Hábitos.</p>
                ) : habits.map(habit => {
                  const doneToday = isCompletedToday(habit.logs);
                  return (
                    <div key={habit.id} className="flex justify-between items-center p-3 bg-slate-50 dark:bg-slate-900 rounded border border-slate-100 dark:border-slate-800">
                      <div className={`font-medium ${doneToday ? 'text-green-600' : ''}`}>
                        {doneToday && '✓ '} {habit.name}
                      </div>
                      <div className="text-xs text-slate-500 font-medium">
                        🔥 Sequência atual: ({habit.logs.length})
                      </div>
                    </div>
                  );
                })}
             </div>
          </Card>
        </div>

        {/* Right Column (Quotes & Finance mini) */}
        <div className="space-y-6">
          <Card title={t.bible_verse} className="bg-blue-50/50 dark:bg-blue-900/10 border-blue-100 dark:border-blue-900/50">
            <blockquote className="italic text-slate-700 dark:text-slate-300">
              &ldquo;{quotes.verse ? quotes.verse.text : 'Configurando base de dados...'}&rdquo;
            </blockquote>
            {quotes.verse && <p className="text-right text-sm mt-2 font-semibold text-blue-700 dark:text-blue-400">- {quotes.verse.reference}</p>}
          </Card>
          
          <Card title={t.quote_daily}>
             <p className="text-slate-700 dark:text-slate-300 italic">
               &ldquo;{quotes.motivation ? quotes.motivation.text : 'Aguarde, carregando...'}&rdquo;
             </p>
          </Card>
        </div>
      </div>
    </Shell>
  );
}
