# Build Plan (Milestones for Cursor)

Work in this order. After each milestone, the app should run without errors —
commit/checkpoint mentally (or via git) at each step.

## Milestone 1 — Scaffold
- Init Vite + React + TS project, install Tailwind, shadcn/ui, react-router-dom,
  recharts, lucide-react, react-hook-form, zod
- Set up folder structure per `01-tech-stack.md`
- Configure Tailwind theme colors per `06-components-and-design-system.md`

## Milestone 2 — Data layer
- Write all TypeScript interfaces (`src/types/`) per `03-mock-data-model.md`
- Write seed data (`src/data/mockDb.ts`) — at least 15 students across 2 classes,
  with attendance, assessments, skills, goals, portfolio items, 2–3 counselling
  cases, career interests, for realistic-looking charts
- Build `AppDataContext` + `AuthContext` (fake login/role state)
- Build `lib/growthIndex.ts` and `lib/mockAi.ts` (templated text generators)

## Milestone 3 — Shell & auth
- Build landing/login screen with role+persona picker
- Build `AppShell`, `Sidebar` (role-aware nav), `TopBar`, `RoleSwitcher`
- Wire up routing per `02-information-architecture.md` with placeholder pages

## Milestone 4 — Shared components
- Build `StatCard`, `TrendChart`, `SkillRadar`, `RiskBadge`, `GrowthIndexGauge`,
  `Timeline`, `AiBadge`, `StudentProfileDrawer`, `EmptyState`

## Milestone 5 — Student & Parent views
- Implement `/student` dashboard + academics/skills/goals/portfolio/career/report pages
- Implement `/parent` dashboard + academics/attendance/feedback/meetings/report pages

## Milestone 6 — Teacher & Counsellor views
- Implement `/teacher` dashboard, class roster, student deep-dive, interventions
- Implement `/counsellor` dashboard, case list, case detail with restricted notes

## Milestone 7 — Principal & Admin views
- Implement `/principal` dashboard, department comparison, risk trends, engagement
- Implement lightweight `/admin` (institutions/users/roles tables)

## Milestone 8 — Wire up the demo workflows
- Implement Workflows A–F from `05-key-screens-and-workflows.md` end to end,
  ensuring cross-role data consistency (an action in one role's view is
  reflected in another role's view via shared `AppDataContext` state)

## Milestone 9 — Polish pass
- Consistent empty/loading states, responsive check at tablet width, print-friendly
  Student 360° Report, verify confidentiality rule (counselling notes never leak
  to Student/Parent/Teacher views), verify `AiBadge` used consistently on every
  AI-labeled feature from the concept doc (learning recommendations, risk
  indicators, progress summaries, study plans, career suggestions, institutional
  insights)

## Definition of done for the POC
- [ ] Can log in as each of the 6 personas from the landing screen
- [ ] Can switch roles instantly via `RoleSwitcher` without losing app state
- [ ] All 6 dashboards render with realistic mock data and charts
- [ ] Workflows A–E can be clicked through start to finish
- [ ] Student 360° Report renders all 13 sections and supports print/PDF via browser
- [ ] No console errors; no real network calls made