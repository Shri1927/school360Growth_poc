# Student 360° Growth Platform — Frontend POC

## What this is
A **frontend-only proof of concept** of the Student 360° Growth Platform — a unified
student development system covering academics, skills, personality, counselling,
career guidance, portfolio and institutional analytics.

This POC has **no real backend, no database, no auth server, and no AI calls**.
All data is static/mock (JSON or TS objects), all "actions" (save, submit, approve)
just update local state, and all "AI-generated" content is pre-written mock output
displayed as if AI produced it.

## Goal of the POC
Demonstrate the *experience* of the platform to stakeholders (school leadership,
investors, pilot institutions) through clickable, realistic role-based dashboards —
not to build production logic.

## Read order for Cursor
When implementing, read these files in this order:

1. `00-project-overview.md` (this file)
2. `01-tech-stack.md` — stack, project setup, constraints
3. `02-information-architecture.md` — routes, navigation, role switching
4. `03-mock-data-model.md` — static data shapes and sample data
5. `04-role-dashboards.md` — what each of the 6 dashboards must contain
6. `05-key-screens-and-workflows.md` — detailed screen-by-screen specs for core flows
7. `06-components-and-design-system.md` — reusable components, visual style
8. `07-build-plan.md` — step-by-step implementation order/milestones

## Non-goals for this POC
- No real authentication (use a fake "Login as [Role]" selector)
- No backend, no API calls, no persistence beyond browser session (in-memory state
  or localStorage is fine)
- No real AI/ML — all AI features are **simulated** with static or templated text
- No payments, no multi-tenant/institution switching, no real notifications
  (email/SMS) — just in-app mock notifications
- No real file uploads — use placeholder file entries in mock data

## Source concept
This POC is derived from a longer concept document ("Student 360° Growth Platform —
Project Concept and Development Blueprint, v1.0"). Only the subset needed for a
believable clickable demo is included in these specs — do not attempt to implement
the full blueprint (e.g. skip white-labelling, multi-institution ecosystem, payment
gateways, real integrations).

## Core proposition to convey in the UI
> "One student, one continuous digital profile, and one coordinated support system
> for complete academic, personal, social and career growth."

Every dashboard should visually reinforce that the same student record is viewed
differently depending on who is looking at it (student, parent, teacher, counsellor,
principal).
