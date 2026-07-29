# Information Architecture

## Entry flow
1. `/` — Landing/login screen: "Student 360° Growth Platform" branding + a
   **"Login as"** role picker (Student, Parent, Teacher, Counsellor, Principal,
   Platform Admin), each with 1–3 selectable mock personas (e.g. "Login as
   Student → Aarav Sharma, Grade 10").
2. On selecting a persona, route to that role's dashboard home and set
   `AuthContext { role, userId }`.
3. Global `AppShell` layout: left `Sidebar` (role-specific nav), `TopBar` with
   current user, notifications bell (mock), and a **"Switch role"** shortcut so
   demo presenters can jump between personas without logging out.

## Route map

### Student
- `/student` — Dashboard home (today's tasks, attendance, trends, goals snapshot)
- `/student/academics` — Subject performance, marks, learning gaps
- `/student/skills` — Skills & competency radar, self-assessment
- `/student/goals` — Goals & development plans (list + create/edit)
- `/student/portfolio` — Digital portfolio (grid of achievements/projects)
- `/student/career` — Career interest exploration, suggested pathways
- `/student/counselling` — Book appointment, view support plan (student-visible parts only)
- `/student/messages` — Announcements & messages
- `/student/report` — Full Student 360° Report (read view, see section 8)

### Parent
- `/parent` — Dashboard home (linked child(ren) progress summary)
- `/parent/academics` — Child's academic trends
- `/parent/attendance` — Attendance + alerts
- `/parent/feedback` — Teacher feedback log
- `/parent/meetings` — PTM scheduling, consent requests
- `/parent/report` — Student 360° Report (parent-facing version)

### Teacher
- `/teacher` — Dashboard home (my classes, students needing support)
- `/teacher/classes/:classId` — Class roster, attendance entry, marks entry
- `/teacher/students/:studentId` — Single student deep-dive + observation entry
- `/teacher/interventions` — Intervention plans list
- `/teacher/analytics` — Class/subject analytics

### Counsellor
- `/counsellor` — Dashboard home (appointments, case priorities)
- `/counsellor/cases` — Case list (table)
- `/counsellor/cases/:caseId` — Case detail (restricted notes, support plan, follow-ups)
- `/counsellor/appointments` — Calendar/list of appointments

### Principal / Management
- `/principal` — Institution KPI dashboard
- `/principal/departments` — Department/class comparison
- `/principal/risk` — Risk & intervention outcomes
- `/principal/engagement` — Student & parent engagement analytics

### Platform Admin (light — optional, lowest priority)
- `/admin` — Institutions list, users, role management (static tables, no real CRUD needed beyond local state)

## Role switching pattern
Keep a single mock dataset (`data/mockDb.ts`) that all role views read from, so
switching roles shows **the same underlying student data** from different
perspectives — this is the core "one profile, many views" story the demo needs to
sell.

## Shared modals/drawers (usable from multiple routes)
- `StudentProfileDrawer` — quick-view drawer showing 360° snapshot of a student,
  triggered from any table row (teacher class roster, counsellor case list,
  principal risk list)
- `NewGoalDialog`, `NewObservationDialog`, `BookAppointmentDialog`,
  `LogInterventionDialog` — simple forms that push into local mock state
