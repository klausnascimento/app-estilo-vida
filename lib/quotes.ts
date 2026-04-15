import { getDayOfYear } from "@/lib/date";

const bibleQuotes = [
  "Tudo posso naquele que me fortalece. Filipenses 4:13",
  "Confia no Senhor de todo o teu coracao. Proverbios 3:5",
  "Entrega o teu caminho ao Senhor; confia nele. Salmos 37:5",
  "O choro pode durar uma noite, mas a alegria vem pela manha. Salmos 30:5",
  "Sejam fortes e corajosos. Josue 1:9",
  "O Senhor e o meu pastor; nada me faltara. Salmos 23:1",
  "Buscai primeiro o Reino de Deus. Mateus 6:33",
];

const mindsetQuotes = [
  "Disciplina reduz a distancia entre intencao e resultado.",
  "Foco diario vale mais que motivacao ocasional.",
  "A constancia constrói o que a pressa costuma destruir.",
  "Energia bem direcionada produz clareza e progresso.",
  "Planejamento simples executado hoje vale mais que excesso de teoria.",
  "A prioridade certa no horario certo muda o dia inteiro.",
  "Pequenos controles financeiros evitam grandes desordens futuras.",
];

export function getDailyQuotes(date = new Date()) {
  const index = getDayOfYear(date);

  return {
    bible: bibleQuotes[index % bibleQuotes.length],
    mindset: mindsetQuotes[index % mindsetQuotes.length],
  };
}
