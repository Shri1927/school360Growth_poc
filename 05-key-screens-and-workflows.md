# Key Screens & Workflows

Build these end-to-end so the POC can be demoed as a story, not just static
screens. Each workflow should be completable by clicking through 3–5 screens.

## Workflow A — Academic Intervention
1. **Teacher** opens `/teacher/classes/:classId`, sees a student flagged with a
   `RiskBadge` due to a `LearningGap`.
2. Clicks student → `/teacher/students/:studentId` → sees subject trend chart
   showing a dip.
3. Clicks "Create intervention plan" → dialog form (topic, action, target date) →
   saves to local state, appears in `/teacher/interventions`.
4. Switch role to **Parent** → dashboard shows a new "Teacher feedback" /
   "Intervention plan" alert for that child.
5. Switch role to **Student** → goals page shows the intervention reflected as a
   suggested/auto-added goal (optional stretch).

## Workflow B — Attendance Support
1. **Principal** dashboard shows attendance risk trend; clicking a class drills
   into `/principal/departments` detail.
2. **Teacher** class roster shows attendance % per student with color coding.
3. **Parent** dashboard shows an "Attendance alert" card for their child with a
   "Reason recorded" field (mock, read-only or simple textarea).

## Workflow C — Counselling Referral
1. **Teacher** or **Student** submits a "Raise a concern" mock form (simple
   dialog: concern type + note) → creates a `CounsellingCase` with status
   "open".
2. **Counsellor** dashboard shows the new case in the priority list.
3. Counsellor opens `/counsellor/cases/:caseId`, adds a restricted note, sets a
   support plan text, adds a follow-up item, changes status to "in-progress".
4. Confirm the case's restricted notes are **never** visible from Teacher,
   Parent, or Student views — only a neutral status indicator
   ("Support in progress") is visible to Parent, per the confidentiality rule
   in the concept doc.

## Workflow D — Career Planning
1. **Student** visits `/student/career`, completes a short mock "interest quiz"
   (5 multiple-choice questions, client-side only, no real scoring engine —
   just maps answers to a `CareerInterest` cluster boost).
2. Page shows updated `CareerSuggestion` cards with an "AI-assisted" badge and
   a plain-language rationale.
3. **Counsellor** can view the same student's career profile from
   `/counsellor/cases/:caseId` (or a students list) and add a note/discussion
   log entry.

## Workflow E — Portfolio Development
1. **Student** visits `/student/portfolio`, clicks "Add achievement" → form
   (title, type, description, date) → appears in list with `verified: false`.
2. **Teacher** (acting as mentor) can view a "Pending verification" list
   (simple filter on portfolio items) and mark one as verified — updates
   `verified: true` and shows a checkmark badge.
3. Student's portfolio shows verified vs pending state visually distinct.

## Workflow F — Institution Review (lightweight)
1. **Principal** dashboard → "Areas requiring attention" list item → clicking
   it deep-links to the relevant `/principal/departments` filtered view.
2. No further backend logic needed — this just proves the drill-down navigation
   pattern.

## Student 360° Report screen (`/student/report`, also reachable from Parent)
Render all report sections from the concept doc as one scrollable page with
section anchors/tabs:
1. Student overview (photo, grade, growth index gauge)
2. Academic performance & trends (chart)
3. Attendance & consistency (chart)
4. Subject strengths & learning gaps (list)
5. Skills & competency profile (`SkillRadar`)
6. Personality-development observations (from `Observation[]`)
7. Participation, behaviour & responsibility (mock summary text)
8. Activities, projects & achievements (portfolio grid)
9. Student self-reflection (mock text/quote)
10. Teacher & parent feedback (quotes list)
11. Career interests & readiness (`CareerSuggestion` cards)
12. Recommended interventions (list, AI-assisted badge)
13. Three-month development plan (timeline component)

Add a "Download PDF" button that can be a no-op or trigger the browser print
dialog (`window.print()`) — no real PDF generation service needed for the POC.
