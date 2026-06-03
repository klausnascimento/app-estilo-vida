# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
npm run dev       # start dev server at http://localhost:3000
npm run build     # production build
npm run lint      # ESLint check

# Database
npx prisma generate  # regenerate client after schema changes
npx prisma db push   # sync schema → SQLite file (prisma/dev.db)
npx prisma db seed   # populate mock user, verses, and motivational quotes
npx prisma studio    # GUI to browse/edit data
```

No test suite is configured yet.

## Architecture

**Stack**: Next.js 16 App Router · React 19 · TypeScript · Tailwind CSS 4 · Prisma + SQLite

**Single-user**: No real auth. All services default to `MOCK_USER_ID` (defined in `types/index.ts`). The seed creates one user at `admin@estilovida.local`.

### Active request flow (API-backed)

All domain pages in `app/` are `"use client"` components that fetch the REST API directly — they are **not** server components and do **not** delegate to `features/`:

```
app/<domain>/page.tsx        ← "use client" component, calls REST API
app/api/<domain>/route.ts    ← Next.js Route Handler (thin, no business logic)
services/<domain>.service.ts ← all DB logic via Prisma
```

API routes wrap results in `BaseResponse<T>` from `types/index.ts` and never contain business logic.

### Domain modules

| Domain | Routes | Service |
|---|---|---|
| Finance | `/financas`, `/finance` | `FinanceService` — CRUD for `FinancialEntry` (INCOME/EXPENSE) |
| Habits | `/habitos`, `/habits` | `HabitService` — `Habit` + `HabitLog` with weekday tracking |
| Priority | `/prioridade`, `/priority` | `PriorityService` — one `DailyPriority` per user per day |
| Energy | `/energia`, `/energy` | `EnergyService` — one `EnergyCheckIn` per user per day (score 0–10) |
| Quotes | `/api/quotes/today` | `QuoteService` — random `DailyBibleVerse` + `DailyMotivation` filtered by language |

Each domain has a Portuguese and an English route (`/financas` re-exports `/finance`, etc.).

### Types

`types/index.ts` — DTOs, `BaseResponse<T>`, `MOCK_USER_ID`, and enums used by the active API layer. Enum values are **uppercase strings** (`INCOME`, `EXPENSE`, `PT_BR`, `EN`, `ES`, `PENDING`, `IN_PROGRESS`, `DONE`).

### Providers (active)

- `providers/ThemeProvider.tsx` — light/dark/system via CSS class, persisted via `/api/preferences`
- `providers/LanguageProvider.tsx` — PT_BR / EN / ES, loads from `/api/preferences` on mount, exposes `useTranslation()` returning the active dictionary
- Dictionaries live in `utils/dictionaries/{pt,en,es}.ts`

Both providers are mounted in `app/layout.tsx`.

### UI conventions

`components/layout/Shell.tsx` provides the sidebar + topbar shell used by all domain pages.  
`components/shared/Card.tsx` is the shared card/stat primitive used in domain pages.  
`components/ui/` (`card.tsx`, `metric-card.tsx`, `section-heading.tsx`) are used only by the `features/` layer (see below).

### Unused: localStorage-based alternative layer

The `features/`, `lib/`, and `components/providers/` directories contain an **incomplete, unrouted** alternative implementation that stores all data in `localStorage` instead of the API. It is not used by any current route.

Key differences from the active layer:
- `lib/types.ts` uses lowercase locale/enum strings (`"pt-BR"`, `"income"`, `"pending"`)
- `components/providers/life-planner-provider.tsx` — global state via `useLifePlanner()`, persists to `localStorage`
- `components/providers/i18n-provider.tsx` — locale persisted to `localStorage`
- `features/<domain>/<domain>-page.tsx` — UI components consuming the above providers

Do not wire new routes to this layer without first deciding which data strategy to commit to.

### API response shape

```ts
{ success: boolean; data?: T; error?: string; message?: string }
```
