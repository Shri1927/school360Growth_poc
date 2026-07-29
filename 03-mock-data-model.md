# Mock Data Model

Define TypeScript types in `src/types/` and seed data in `src/data/` (JSON or .ts
files exporting typed arrays). Keep the dataset small but realistic:
**~2 classes, ~15–20 students, 4–5 teachers, 1 counsellor, 1 principal, 3–4 parents
linked to specific students.**

## Core entities

### User
```ts
interface User {
  id: string;
  name: string;
  role: "student" | "parent" | "teacher" | "counsellor" | "principal" | "admin";
  avatarUrl?: string;
  email: string;
}
```

### Student (extends User context)
```ts
interface Student {
  id: string;
  name: string;
  grade: string;         // e.g. "Grade 10 - B"
  rollNo: string;
  guardianIds: string[]; // links to Parent
  photoUrl?: string;
  admissionYear: number;
}
```

### Attendance
```ts
interface AttendanceRecord {
  studentId: string;
  month: string;         // "2026-06"
  presentDays: number;
  totalDays: number;
}
```

### Academic
```ts
interface Subject { id: string; name: string; }

interface Assessment {
  id: string;
  studentId: string;
  subjectId: string;
  term: string;          // "Term 1", "Mid-term"
  score: number;
  maxScore: number;
  date: string;
}

interface LearningGap {
  studentId: string;
  subjectId: string;
  topic: string;
  severity: "low" | "medium" | "high";
  identifiedOn: string;
}
```

### Skills & Personality
```ts
interface SkillRating {
  studentId: string;
  category: "academic" | "cognitive" | "communication" | "social" |
            "digital" | "career" | "leadership" | "self-management";
  level: 1 | 2 | 3 | 4 | 5;
  lastUpdated: string;
  source: "self" | "teacher";
}

interface Observation {
  id: string;
  studentId: string;
  teacherId: string;
  trait: string;         // "Confidence", "Teamwork", "Adaptability"
  note: string;
  date: string;
}
```

### Goals
```ts
interface Goal {
  id: string;
  studentId: string;
  title: string;
  category: "academic" | "attendance" | "skill" | "career" | "habit";
  targetDate: string;
  status: "not-started" | "in-progress" | "achieved";
  milestones: { title: string; done: boolean }[];
  mentorId?: string;
}
```

### Portfolio
```ts
interface PortfolioItem {
  id: string;
  studentId: string;
  type: "certificate" | "project" | "sport" | "art" | "competition" |
        "volunteering" | "internship";
  title: string;
  description: string;
  date: string;
  verified: boolean;
  evidenceLabel?: string; // placeholder, e.g. "certificate.pdf"
}
```

### Career
```ts
interface CareerInterest {
  studentId: string;
  cluster: string;       // "Engineering & Technology", "Design", "Commerce"
  score: number;         // 0-100 affinity from mock quiz
}

interface CareerSuggestion {
  studentId: string;
  pathway: string;
  rationale: string;     // templated "AI" text
  confidence: "low" | "medium" | "high";
}
```

### Counselling
```ts
interface CounsellingCase {
  id: string;
  studentId: string;
  counsellorId: string;
  concern: string;
  status: "open" | "in-progress" | "closed";
  priority: "low" | "medium" | "high";
  restrictedNotes: { date: string; note: string }[]; // visible to counsellor only
  supportPlan?: string;
  followUps: { date: string; action: string; done: boolean }[];
}

interface Appointment {
  id: string;
  studentId: string;
  counsellorId: string;
  dateTime: string;
  status: "requested" | "confirmed" | "completed" | "cancelled";
}
```

### Communication
```ts
interface Message {
  id: string;
  fromId: string;
  toId: string;
  subject: string;
  body: string;
  date: string;
  read: boolean;
}

interface Announcement {
  id: string;
  title: string;
  body: string;
  audience: "all" | "students" | "parents" | "teachers";
  date: string;
}
```

### Institutional analytics (aggregate, can be precomputed mock numbers)
```ts
interface ClassAnalytics {
  classId: string;
  averageScore: number;
  attendanceRate: number;
  atRiskCount: number;
  engagementIndex: number; // 0-100
}
```

## Growth Index (for report cards) — implement as a computed helper
Use the weights from the concept doc to compute a 0–100 index per student from
mock scores (do not display it as a ranking — frame as "progress index"):

| Dimension | Weight |
|---|---|
| Academic progress | 30% |
| Attendance & consistency | 10% |
| Skills development | 15% |
| Communication & participation | 10% |
| Projects & practical learning | 10% |
| Behaviour & responsibility | 10% |
| Goals & self-development | 10% |
| Extracurricular participation | 5% |

Implement `computeGrowthIndex(studentId): number` in `lib/growthIndex.ts` using
the mock data above. Never render this as a letter grade or label like
"weak"/"good" — show it as a neutral progress gauge with a short caption.

## Seeding
Put all seed arrays in `src/data/mockDb.ts` exporting one object:
```ts
export const mockDb = { users, students, parents, teachers, ...,
  attendance, assessments, learningGaps, skillRatings, observations,
  goals, portfolioItems, careerInterests, careerSuggestions,
  counsellingCases, appointments, messages, announcements, classAnalytics };
```
`AppDataContext` loads this once and exposes it + setters for local mutation.
