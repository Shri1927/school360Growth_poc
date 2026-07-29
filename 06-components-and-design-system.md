# Components & Design System

## Visual tone
Calm, trustworthy, "edtech admin product" feel — not playful/childish, since
audiences include principals and management. Think Linear/Notion-style clean
dashboards with soft accent colors, generous whitespace, rounded-lg cards, subtle
shadows.

## Color system (Tailwind config)
- Primary: a calm blue/indigo (e.g. `#4F46E5` / indigo-600) — trust, education
- Success/positive: emerald
- Warning/at-risk medium: amber
- Danger/at-risk high: rose — use sparingly, never label a *student*, only a
  *metric or flag*, in red
- Neutral grays for backgrounds/cards (slate scale)
- Keep a consistent semantic mapping: `risk-low` (emerald), `risk-medium`
  (amber), `risk-high` (rose) used everywhere via a `RiskBadge` component —
  never invent new colors per screen

## Typography
- Sans-serif, e.g. Inter
- Clear hierarchy: page title (xl/bold), section headers (lg/semibold), body (sm/base)

## Shared components (`src/components/shared/`)
- `StatCard` — icon, label, value, optional trend delta (+/- %)
- `TrendChart` — line chart wrapper (Recharts) with consistent axis/tooltip styling
- `SkillRadar` — radar chart for skill categories
- `RiskBadge` — pill badge, color-coded per severity
- `GrowthIndexGauge` — circular/semi-circular gauge 0–100, neutral caption, never
  a letter grade
- `Timeline` — vertical timeline for development plans / follow-ups
- `AiBadge` — small "AI-assisted" pill/icon, tooltip: "Generated from student
  data. Reviewed content may differ."
- `StudentProfileDrawer` — slide-over panel showing a condensed 360° view of any
  student, usable from tables across Teacher/Counsellor/Principal views
- `EmptyState`, `LoadingState` (even though data is static, keep for polish/demo realism)

## Layout components (`src/components/layout/`)
- `AppShell` — sidebar + topbar wrapper used by all authenticated routes
- `Sidebar` — role-aware nav items (define nav config per role in one file,
  `lib/navConfig.ts`, so it's easy to extend)
- `TopBar` — current persona name/avatar, "Switch role" control, mock
  notification bell with a dropdown of 2–3 mock notifications
- `RoleSwitcher` — dropdown/modal to jump between the 6 demo personas instantly

## Forms/dialogs
Use shadcn `Dialog` + `react-hook-form` for: New Goal, New Observation, Book
Appointment, Log Intervention, New Portfolio Item, New Counselling Case/Referral,
Add Marks/Attendance entry. Keep validation minimal (required fields only) — this
is a demo, not a production form suite.

## Accessibility & polish baseline
- All interactive elements keyboard-reachable (shadcn/Radix gives this by default)
- Color is never the only signal (pair `RiskBadge` colors with text labels)
- Use skeleton loaders briefly on route change for a more "real product" feel
  (optional, low priority)
