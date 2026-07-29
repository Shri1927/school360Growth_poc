# Tech Stack & Setup

## Stack
- **Framework:** React + Vite (fast local dev) — Next.js is acceptable if the app
  needs file-based routing conventions, but Vite + React Router is preferred for a
  pure frontend POC (no need for SSR/API routes).
- **Language:** TypeScript
- **Routing:** React Router v6+
- **Styling:** Tailwind CSS
- **Component primitives:** shadcn/ui (Radix-based) for tables, dialogs, tabs,
  dropdowns, forms, toasts
- **Charts:** Recharts (for trend lines, bar charts, radar/skill charts, gauges)
- **Icons:** lucide-react
- **State management:** React Context + hooks is sufficient. No Redux needed.
  Use one `AppDataContext` seeded from mock JSON, mutated locally (no backend sync).
- **Forms:** react-hook-form + zod for validation (client-side only)
- **Persistence:** `localStorage` to persist any in-demo edits (e.g., a new goal
  added, a counselling note logged) across refresh — optional but nice for a demo.

## Project structure
```
src/
  data/            # static mock JSON/TS data (students, users, classes, etc.)
  context/         # AppDataContext, AuthContext (fake role-based "login")
  routes/          # route-level page components, grouped by role
    student/
    parent/
    teacher/
    counsellor/
    principal/
    admin/
  components/
    ui/            # shadcn primitives
    shared/         # StatCard, TrendChart, SkillRadar, Timeline, RiskBadge, etc.
    layout/         # AppShell, Sidebar, TopBar, RoleSwitcher
  lib/             # utils, formatters, mock "AI" text generators
  types/           # TypeScript types/interfaces for all entities
```

## Constraints for the AI agent (Cursor)
- Do **not** wire up any real backend, API route, or external service call.
- Do **not** install auth libraries (Auth0, Firebase Auth, NextAuth) — implement a
  simple mock "Login as" screen that sets a role + a selected mock user in context.
- Do **not** implement real file upload/storage — allow "uploading" a portfolio
  item by picking from a predefined list or entering metadata only (title, type,
  date); store as a data URL or just metadata, no actual file storage service.
- Every "AI" feature (risk indicators, progress summaries, study plans, career
  suggestions) must pull from **pre-written template strings** in
  `lib/mockAi.ts`, optionally interpolated with the selected student's real mock
  data (e.g., "Based on {studentName}'s recent Math scores...").
- Keep bundle/setup minimal — this should run with `npm install && npm run dev`
  with zero environment variables required.
- Responsive design: prioritize desktop/tablet layout (this is an institutional
  admin-style product), but dashboards should not break on mobile widths.

## Deliverable
A single runnable Vite React app that can be demoed end-to-end by switching between
6 role logins and clicking through each dashboard and 3–4 key workflows (see
`05-key-screens-and-workflows.md`).
