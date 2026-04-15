import { AppData } from "@/lib/types";
import { getTodayISO } from "@/lib/utils";

const today = getTodayISO();

export const initialAppData: AppData = {
  energy: {
    score: 8,
    reason: "Boa qualidade de sono, treino concluido e agenda controlada.",
    notes: "Manter pausas curtas no periodo da tarde.",
    date: today,
  },
  priority: {
    title: "Concluir a entrega principal do dia antes das 14h.",
    status: "in_progress",
    notes: "Evitar trocar de contexto ate finalizar a entrega.",
    date: today,
  },
  habits: [
    {
      id: "habit-prayer",
      name: "Devocional matinal",
      weeklyTargets: ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"],
      records: [
        { date: "2026-04-09", completed: true },
        { date: "2026-04-10", completed: true },
        { date: "2026-04-11", completed: true },
        { date: "2026-04-12", completed: true },
        { date: "2026-04-13", completed: true },
        { date: "2026-04-14", completed: true },
        { date: today, completed: true },
      ],
    },
    {
      id: "habit-reading",
      name: "Leitura de 20 minutos",
      weeklyTargets: ["monday", "tuesday", "wednesday", "thursday", "friday"],
      records: [
        { date: "2026-04-10", completed: true },
        { date: "2026-04-11", completed: false },
        { date: "2026-04-12", completed: true },
        { date: "2026-04-13", completed: true },
        { date: "2026-04-14", completed: true },
      ],
    },
    {
      id: "habit-budget",
      name: "Registrar gastos do dia",
      weeklyTargets: ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"],
      records: [
        { date: "2026-04-11", completed: true },
        { date: "2026-04-12", completed: true },
        { date: "2026-04-13", completed: true },
        { date: "2026-04-14", completed: true },
      ],
    },
  ],
  transactions: [
    {
      id: "txn-1",
      type: "income",
      description: "Salario principal",
      amount: 5200,
      date: "2026-04-05",
      category: "Trabalho",
    },
    {
      id: "txn-2",
      type: "expense",
      description: "Mercado",
      amount: 420.55,
      date: "2026-04-08",
      category: "Casa",
    },
    {
      id: "txn-3",
      type: "expense",
      description: "Internet",
      amount: 99.9,
      date: "2026-04-09",
      category: "Servicos",
    },
    {
      id: "txn-4",
      type: "income",
      description: "Freelance",
      amount: 850,
      date: "2026-04-13",
      category: "Projetos",
    },
    {
      id: "txn-5",
      type: "expense",
      description: "Oferta e doacao",
      amount: 180,
      date: today,
      category: "Espiritualidade",
    },
  ],
};
