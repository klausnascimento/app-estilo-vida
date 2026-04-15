import { Locale } from "@/lib/types";

type Dictionary = {
  appName: string;
  subtitle: string;
  nav: Record<string, string>;
  common: {
    today: string;
    save: string;
    update: string;
    add: string;
    edit: string;
    delete: string;
    cancel: string;
    notes: string;
    reason: string;
    date: string;
    category: string;
    value: string;
    description: string;
    type: string;
    light: string;
    dark: string;
    summary: string;
    status: string;
    score: string;
    noData: string;
    week: string;
    history: string;
    active: string;
  };
  dashboard: {
    eyebrow: string;
    title: string;
    description: string;
    bible: string;
    mindset: string;
    energy: string;
    priority: string;
    habits: string;
    finance: string;
    energyLabel: string;
    topHabit: string;
    income: string;
    expense: string;
    balance: string;
    currentStatus: string;
    streak: string;
  };
  energy: {
    title: string;
    description: string;
    formTitle: string;
    scoreLabel: string;
    scoreHelp: string;
    reasonLabel: string;
    notesLabel: string;
    panelTitle: string;
    levelHigh: string;
    levelMedium: string;
    levelLow: string;
  };
  priority: {
    title: string;
    description: string;
    formTitle: string;
    taskLabel: string;
    statusLabel: string;
    notesLabel: string;
    focusTitle: string;
    focusDescription: string;
    statuses: Record<"pending" | "in_progress" | "done", string>;
  };
  habits: {
    title: string;
    description: string;
    formTitle: string;
    habitName: string;
    targetDays: string;
    addHabit: string;
    currentHabits: string;
    streak: string;
    completed: string;
    markDone: string;
  };
  finance: {
    title: string;
    description: string;
    formTitle: string;
    transactionType: string;
    income: string;
    expense: string;
    categoryLabel: string;
    register: string;
    listTitle: string;
    consolidated: string;
  };
  days: Record<string, string>;
};

const dictionaries: Record<Locale, Dictionary> = {
  "pt-BR": {
    appName: "Estilo de Vida",
    subtitle: "Planejamento diario com clareza, disciplina e consistencia.",
    nav: {
      dashboard: "Dashboard",
      energy: "Energia",
      priority: "Prioridade do Dia",
      habits: "Habitos",
      finance: "Financas",
    },
    common: {
      today: "Hoje",
      save: "Salvar",
      update: "Atualizar",
      add: "Adicionar",
      edit: "Editar",
      delete: "Excluir",
      cancel: "Cancelar",
      notes: "Observacoes",
      reason: "Motivo",
      date: "Data",
      category: "Categoria",
      value: "Valor",
      description: "Descricao",
      type: "Tipo",
      light: "Tema claro",
      dark: "Tema escuro",
      summary: "Resumo",
      status: "Status",
      score: "Nota",
      noData: "Nenhum dado disponivel.",
      week: "Semana atual",
      history: "Historico",
      active: "Em andamento",
    },
    dashboard: {
      eyebrow: "Visao consolidada",
      title: "Planejamento de vida em um unico painel",
      description: "Acompanhe energia, foco principal, habitos e financas sem dispersao.",
      bible: "Frase biblica do dia",
      mindset: "Frase de produtividade",
      energy: "Energia do dia",
      priority: "Atividade mais importante",
      habits: "Habitos em construcao",
      finance: "Resumo financeiro",
      energyLabel: "Energia registrada",
      topHabit: "Melhor sequencia",
      income: "Entradas",
      expense: "Saidas",
      balance: "Saldo",
      currentStatus: "Status atual",
      streak: "dias seguidos",
    },
    energy: {
      title: "Check-in de energia",
      description: "Registre sua disposicao diaria para ajustar ritmo, foco e expectativas.",
      formTitle: "Atualizar energia do dia",
      scoreLabel: "Nota de energia",
      scoreHelp: "Escala de 0 a 10.",
      reasonLabel: "Motivo principal",
      notesLabel: "Observacoes adicionais",
      panelTitle: "Leitura rapida",
      levelHigh: "Alta",
      levelMedium: "Media",
      levelLow: "Baixa",
    },
    priority: {
      title: "Prioridade do dia",
      description: "Defina a entrega central do dia e reduza a disputa por atencao.",
      formTitle: "Planejar prioridade",
      taskLabel: "Atividade mais importante",
      statusLabel: "Status",
      notesLabel: "Observacao complementar",
      focusTitle: "Direcao pratica",
      focusDescription: "Uma prioridade clara organiza agenda, energia e criterio de decisao.",
      statuses: {
        pending: "Pendente",
        in_progress: "Em andamento",
        done: "Concluida",
      },
    },
    habits: {
      title: "Habitos",
      description: "Controle habitos em construcao com semana visivel, sequencia e historico simples.",
      formTitle: "Novo habito",
      habitName: "Nome do habito",
      targetDays: "Dias alvo da semana",
      addHabit: "Adicionar habito",
      currentHabits: "Habitos ativos",
      streak: "Sequencia",
      completed: "cumprido",
      markDone: "Marcar hoje",
    },
    finance: {
      title: "Financas",
      description: "Registre, edite, organize e acompanhe movimentacoes financeiras com saldo consolidado.",
      formTitle: "Nova movimentacao",
      transactionType: "Tipo de movimentacao",
      income: "Entrada",
      expense: "Saida",
      categoryLabel: "Categoria",
      register: "Registrar movimentacao",
      listTitle: "Movimentacoes",
      consolidated: "Consolidado",
    },
    days: {
      monday: "Seg",
      tuesday: "Ter",
      wednesday: "Qua",
      thursday: "Qui",
      friday: "Sex",
      saturday: "Sab",
      sunday: "Dom",
    },
  },
  en: {
    appName: "Life Planner",
    subtitle: "Daily planning with clarity, discipline, and consistency.",
    nav: {
      dashboard: "Dashboard",
      energy: "Energy",
      priority: "Priority",
      habits: "Habits",
      finance: "Finance",
    },
    common: {
      today: "Today",
      save: "Save",
      update: "Update",
      add: "Add",
      edit: "Edit",
      delete: "Delete",
      cancel: "Cancel",
      notes: "Notes",
      reason: "Reason",
      date: "Date",
      category: "Category",
      value: "Value",
      description: "Description",
      type: "Type",
      light: "Light mode",
      dark: "Dark mode",
      summary: "Summary",
      status: "Status",
      score: "Score",
      noData: "No data available.",
      week: "Current week",
      history: "History",
      active: "Active",
    },
    dashboard: {
      eyebrow: "Consolidated overview",
      title: "Life planning in a single control layer",
      description: "Track energy, main focus, habits, and finances without fragmentation.",
      bible: "Bible verse of the day",
      mindset: "Productivity quote",
      energy: "Daily energy",
      priority: "Most important task",
      habits: "Habits in progress",
      finance: "Financial summary",
      energyLabel: "Logged energy",
      topHabit: "Best streak",
      income: "Income",
      expense: "Expenses",
      balance: "Balance",
      currentStatus: "Current status",
      streak: "day streak",
    },
    energy: {
      title: "Energy check-in",
      description: "Log your daily energy to adjust pace, focus, and expectations.",
      formTitle: "Update daily energy",
      scoreLabel: "Energy score",
      scoreHelp: "Scale from 0 to 10.",
      reasonLabel: "Main reason",
      notesLabel: "Additional notes",
      panelTitle: "Quick reading",
      levelHigh: "High",
      levelMedium: "Medium",
      levelLow: "Low",
    },
    priority: {
      title: "Daily priority",
      description: "Define the central deliverable of the day and reduce attention conflicts.",
      formTitle: "Plan priority",
      taskLabel: "Most important task",
      statusLabel: "Status",
      notesLabel: "Supporting note",
      focusTitle: "Practical direction",
      focusDescription: "A clear priority organizes schedule, energy, and decision criteria.",
      statuses: {
        pending: "Pending",
        in_progress: "In progress",
        done: "Done",
      },
    },
    habits: {
      title: "Habits",
      description: "Track habits under construction with visible week, streak, and simple history.",
      formTitle: "New habit",
      habitName: "Habit name",
      targetDays: "Target days",
      addHabit: "Add habit",
      currentHabits: "Active habits",
      streak: "Streak",
      completed: "completed",
      markDone: "Mark today",
    },
    finance: {
      title: "Finance",
      description: "Register, edit, organize, and monitor financial activity with a consolidated balance.",
      formTitle: "New transaction",
      transactionType: "Transaction type",
      income: "Income",
      expense: "Expense",
      categoryLabel: "Category",
      register: "Save transaction",
      listTitle: "Transactions",
      consolidated: "Consolidated",
    },
    days: {
      monday: "Mon",
      tuesday: "Tue",
      wednesday: "Wed",
      thursday: "Thu",
      friday: "Fri",
      saturday: "Sat",
      sunday: "Sun",
    },
  },
  es: {
    appName: "Plan de Vida",
    subtitle: "Planificacion diaria con claridad, disciplina y constancia.",
    nav: {
      dashboard: "Panel",
      energy: "Energia",
      priority: "Prioridad",
      habits: "Habitos",
      finance: "Finanzas",
    },
    common: {
      today: "Hoy",
      save: "Guardar",
      update: "Actualizar",
      add: "Agregar",
      edit: "Editar",
      delete: "Eliminar",
      cancel: "Cancelar",
      notes: "Notas",
      reason: "Motivo",
      date: "Fecha",
      category: "Categoria",
      value: "Valor",
      description: "Descripcion",
      type: "Tipo",
      light: "Modo claro",
      dark: "Modo oscuro",
      summary: "Resumen",
      status: "Estado",
      score: "Puntaje",
      noData: "No hay datos disponibles.",
      week: "Semana actual",
      history: "Historial",
      active: "Activo",
    },
    dashboard: {
      eyebrow: "Vision consolidada",
      title: "Planificacion de vida en una sola capa de control",
      description: "Sigue energia, enfoque principal, habitos y finanzas sin fragmentacion.",
      bible: "Versiculo biblico del dia",
      mindset: "Frase de productividad",
      energy: "Energia del dia",
      priority: "Actividad mas importante",
      habits: "Habitos en curso",
      finance: "Resumen financiero",
      energyLabel: "Energia registrada",
      topHabit: "Mejor racha",
      income: "Ingresos",
      expense: "Salidas",
      balance: "Saldo",
      currentStatus: "Estado actual",
      streak: "dias seguidos",
    },
    energy: {
      title: "Check-in de energia",
      description: "Registra tu energia diaria para ajustar ritmo, foco y expectativas.",
      formTitle: "Actualizar energia del dia",
      scoreLabel: "Puntaje de energia",
      scoreHelp: "Escala de 0 a 10.",
      reasonLabel: "Motivo principal",
      notesLabel: "Notas adicionales",
      panelTitle: "Lectura rapida",
      levelHigh: "Alta",
      levelMedium: "Media",
      levelLow: "Baja",
    },
    priority: {
      title: "Prioridad del dia",
      description: "Define la entrega central del dia y reduce la disputa por atencion.",
      formTitle: "Planificar prioridad",
      taskLabel: "Actividad mas importante",
      statusLabel: "Estado",
      notesLabel: "Observacion complementaria",
      focusTitle: "Direccion practica",
      focusDescription: "Una prioridad clara organiza agenda, energia y criterio de decision.",
      statuses: {
        pending: "Pendiente",
        in_progress: "En progreso",
        done: "Hecha",
      },
    },
    habits: {
      title: "Habitos",
      description: "Controla habitos en construccion con semana visible, racha e historial simple.",
      formTitle: "Nuevo habito",
      habitName: "Nombre del habito",
      targetDays: "Dias objetivo",
      addHabit: "Agregar habito",
      currentHabits: "Habitos activos",
      streak: "Racha",
      completed: "cumplido",
      markDone: "Marcar hoy",
    },
    finance: {
      title: "Finanzas",
      description: "Registra, edita, organiza y acompana movimientos financieros con saldo consolidado.",
      formTitle: "Nuevo movimiento",
      transactionType: "Tipo de movimiento",
      income: "Ingreso",
      expense: "Salida",
      categoryLabel: "Categoria",
      register: "Guardar movimiento",
      listTitle: "Movimientos",
      consolidated: "Consolidado",
    },
    days: {
      monday: "Lun",
      tuesday: "Mar",
      wednesday: "Mie",
      thursday: "Jue",
      friday: "Vie",
      saturday: "Sab",
      sunday: "Dom",
    },
  },
};

export function getDictionary(locale: Locale) {
  return dictionaries[locale];
}
