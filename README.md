# Estilo Vida - Planejamento Pessoal

O projeto **Estilo Vida** é um sistema completo de dashboard para gerenciamento de vida, planejado por domínios, arquitetura robusta e escalável, com uma interface Premium inspirada no framework visual **Tabler**.

## 🛠️ Stack Tecnológica

Esta aplicação foi rigorosamente construída com as versões exigidas:
- **Next.js 16 (App Router)**
- **React 19.2**
- **TypeScript 5.9**
- **Tailwind CSS 4.1**
- **Prisma ORM** (para persistência de dados Server-side)

## 📁 Estrutura da Aplicação

```
app-estilo-vida/
├── app/                  # Rotas do Next.js App Router
│   ├── api/              # Endpoints da aplicação divididos por domínios.
│   ├── finance/
│   ├── habits/
│   ├── priority/
│   ├── energy/
│   ├── layout.tsx
│   └── page.tsx          # Dashboard Principal
├── components/           # UI Compartilhável (Baseada no Tabler)
│   ├── layout/           # Sidebar e Topbar
│   └── shared/           # Cards e Componentes atômicos.
├── lib/                  # Inicializações como o Cliente Prisma
├── prisma/               # Definição do Banco e arquivo de SEED
├── providers/            # React Contexts: Tema Light/Dark e Dialeto i18n
├── services/             # Lógica de Negócios e consultas ao banco (Encapsuladas)
├── types/                # Types Globais e DTOs de Requests HTTP
└── utils/                # Funções helpers como data e Dicionários
```

## 🚀 Como Instalar

1. Certifique-se de estar usando uma versão atualizada do **Node.js** e tenha acesso ao NPM ou similar.
2. Na raiz do projeto, instale as dependências:
   ```bash
   npm install
   ```

## 💾 Como Configurar o Prisma (Banco de Dados) e Seed

Este projeto utiliza SQLite como banco de dados de desenvolvimento. As informações ficarão armazenadas em um arquivo local em `prisma/dev.db`.

1. Realize o Push das tabelas do Prisma para o arquivo de banco:
   ```bash
   npx prisma db push
   ```
2. Após sincronizar, popule os dados iniciais com as frases, versículos em PT/EN/ES e crie o Mock User de visualização executando o seed:
   ```bash
   npx prisma db seed
   ```

*(Certifique-se de que o `DATABASE_URL` no `.env` esteja apontando para `file:./dev.db`)*

## 🏃 Como Iniciar o Ambiente

Excute o ambiente de desenvolvimento local no Next:

```bash
npm run dev
```

Acesso: `http://localhost:3000`

## 🧠 Arquitetura e Decisões
- **Design Embasado em Tabler**: Componentes clean, grid spacing, cartões minimalistas em UI/UX corporativa.
- **Domínios Separados**: Energia, Prioridades, Hábitos e Finanças não dividem lógica na UI, tudo é concentrado nos `Services`.
- **Modos e Internacionalização**: Custom Providers interceptando Client e Server requests.
