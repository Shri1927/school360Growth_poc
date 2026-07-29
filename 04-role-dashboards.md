# Role-Based Dashboards — Detailed Specs

For each dashboard: build the widgets listed, using mock data from
`03-mock-data-model.md`. Use `StatCard`, `TrendChart`, `SkillRadar`, `RiskBadge`,
`Timeline` shared components (see `06-components-and-design-system.md`).

## 1. Student Dashboard (`/student`)
- Header: name, grade, photo, growth index gauge
- Row of `StatCard`s: Attendance %, Pending assignments, Active goals, Portfolio items
- "Today's schedule and tasks" — simple mock list with checkboxes
- Subject trend mini-chart (line chart, last 4 assessments per subject, subject selector)
- "Learning recommendation" card — mock AI text: *"Focus suggestion for this
  week: Algebra — recent scores show a dip vs last term."*
- Goals snapshot — 2–3 active goals with progress bars, link to `/student/goals`
- Recent achievements strip (portfolio thumbnails)
- Career exploration teaser card — top 2 career clusters by interest score
- Messages/announcements preview list

## 2. Parent Dashboard (`/parent`)
- Child selector (if >1 linked child)
- Overall progress summary card (growth index + one-line plain-language summary,
  mock AI-generated: *"Aarav is doing well overall. Attendance and academics are
  steady. Recommended focus: Science lab participation."*)
- Attendance & result alert list (e.g., "Attendance dropped below 85% this month")
- Teacher feedback log (chronological list, filter by subject)
- Pending actions: consent requests, meeting requests — each with
  Approve/Decline buttons (local state only)
- "Book a meeting" button → opens mock scheduling dialog
- Link to full Student 360° Report

## 3. Teacher Dashboard (`/teacher`)
- Classes list (cards): class name, subject, student count, avg score, attendance %
- "Students requiring support" table — pulled from `learningGaps` +
  `attendance` thresholds + counselling flags; each row has a `RiskBadge`
  (low/medium/high) and a "View" action opening `StudentProfileDrawer`
- Quick actions: "Enter attendance", "Enter marks", "Add observation" (each opens
  a simple form dialog that updates mock state)
- Intervention plans list with status chips
- Mini class analytics chart (average score trend across terms)

## 4. Counsellor Dashboard (`/counsellor`)
- Today's appointments list
- Case priority list (table: student, concern, priority, status, last follow-up)
- "New referral" button → dialog to create a `CounsellingCase`
- Outcome tracking summary: open vs closed cases, avg resolution time (mock
  computed stat)
- Clear visual/UI separation (e.g. a lock icon + note) indicating "Restricted —
  Counsellor only" on notes sections, to reflect confidentiality design intent

## 5. Principal / Management Dashboard (`/principal`)
- Institution KPI row: total students, avg attendance, avg growth index, active
  counselling cases, at-risk student count
- Department/class comparison bar chart (avg score, attendance by class)
- Risk trend line chart (at-risk count over last 6 months — mock time series)
- Student & parent engagement gauges (e.g., % parents who viewed reports this month)
- "Areas requiring attention" list — auto-generated mock insights, e.g.
  *"Grade 9 Science shows declining assessment trend over 2 terms."*
- Counselling & intervention outcomes summary card

## 6. Platform Admin (`/admin`) — lowest priority, build last if time permits
- Institutions table (static, 1–2 rows)
- Users table with role filter
- Simple "role permissions" reference table (read-only, mirrors the concept doc's
  access control table)

## Cross-cutting UI rules
- Every dashboard opens with a **greeting + role context line** so viewers in a
  demo immediately understand whose view they're in
  (e.g., "Teacher view — Mrs. Iyer, Grade 10-B Mathematics").
- Never show raw "AI" disclaimers as an afterthought — label AI-generated content
  with a small badge/icon ("AI-assisted") next to it, consistent everywhere, since
  the source doc emphasizes explainable/reviewable AI.
- Counselling data must never appear in Teacher or Parent views except where the
  concept doc explicitly allows (e.g., a teacher may see "referred for
  counselling" flag, not the case notes).
