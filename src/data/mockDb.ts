import type { MockDb } from "@/types";

const subjects = [
  { id: "sub-math", name: "Mathematics" },
  { id: "sub-sci", name: "Science" },
  { id: "sub-eng", name: "English" },
  { id: "sub-hist", name: "History" },
  { id: "sub-comp", name: "Computer Science" },
];

const users = [
  { id: "usr-stu-001", name: "Aarav Sharma", role: "student" as const, email: "aarav@demo.school" },
  { id: "usr-stu-002", name: "Priya Nair", role: "student" as const, email: "priya@demo.school" },
  { id: "usr-stu-003", name: "Rohan Mehta", role: "student" as const, email: "rohan@demo.school" },
  { id: "usr-par-001", name: "Rajesh Sharma", role: "parent" as const, email: "rajesh.sharma@email.com" },
  { id: "usr-par-002", name: "Lakshmi Nair", role: "parent" as const, email: "lakshmi.nair@email.com" },
  { id: "usr-par-003", name: "Anita Mehta", role: "parent" as const, email: "anita.mehta@email.com" },
  { id: "usr-tch-001", name: "Mrs. Iyer", role: "teacher" as const, email: "iyer@demo.school" },
  { id: "usr-tch-002", name: "Mr. Khan", role: "teacher" as const, email: "khan@demo.school" },
  { id: "usr-tch-003", name: "Ms. Patel", role: "teacher" as const, email: "patel@demo.school" },
  { id: "usr-cou-001", name: "Dr. Desai", role: "counsellor" as const, email: "desai@demo.school" },
  { id: "usr-prin-001", name: "Mr. Verma", role: "principal" as const, email: "verma@demo.school" },
  { id: "usr-adm-001", name: "Platform Admin", role: "admin" as const, email: "admin@platform.demo" },
];

const students = [
  { id: "stu-001", name: "Aarav Sharma", grade: "Grade 10 - B", classId: "cls-10b", rollNo: "10B-01", guardianIds: ["usr-par-001"], admissionYear: 2022 },
  { id: "stu-002", name: "Priya Nair", grade: "Grade 10 - B", classId: "cls-10b", rollNo: "10B-02", guardianIds: ["usr-par-002"], admissionYear: 2022 },
  { id: "stu-003", name: "Rohan Mehta", grade: "Grade 10 - B", classId: "cls-10b", rollNo: "10B-03", guardianIds: ["usr-par-003"], admissionYear: 2022 },
  { id: "stu-004", name: "Isha Gupta", grade: "Grade 10 - B", classId: "cls-10b", rollNo: "10B-04", guardianIds: [], admissionYear: 2021 },
  { id: "stu-005", name: "Vikram Singh", grade: "Grade 10 - B", classId: "cls-10b", rollNo: "10B-05", guardianIds: [], admissionYear: 2021 },
  { id: "stu-006", name: "Neha Reddy", grade: "Grade 10 - B", classId: "cls-10b", rollNo: "10B-06", guardianIds: [], admissionYear: 2022 },
  { id: "stu-007", name: "Arjun Das", grade: "Grade 10 - B", classId: "cls-10b", rollNo: "10B-07", guardianIds: [], admissionYear: 2022 },
  { id: "stu-008", name: "Sana Khan", grade: "Grade 10 - B", classId: "cls-10b", rollNo: "10B-08", guardianIds: [], admissionYear: 2021 },
  { id: "stu-009", name: "Kavya Joshi", grade: "Grade 9 - A", classId: "cls-9a", rollNo: "9A-01", guardianIds: [], admissionYear: 2023 },
  { id: "stu-010", name: "Dev Malhotra", grade: "Grade 9 - A", classId: "cls-9a", rollNo: "9A-02", guardianIds: [], admissionYear: 2023 },
  { id: "stu-011", name: "Ananya Roy", grade: "Grade 9 - A", classId: "cls-9a", rollNo: "9A-03", guardianIds: [], admissionYear: 2023 },
  { id: "stu-012", name: "Kabir Shah", grade: "Grade 9 - A", classId: "cls-9a", rollNo: "9A-04", guardianIds: [], admissionYear: 2022 },
  { id: "stu-013", name: "Meera Iyer", grade: "Grade 9 - A", classId: "cls-9a", rollNo: "9A-05", guardianIds: [], admissionYear: 2023 },
  { id: "stu-014", name: "Aditya Rao", grade: "Grade 9 - A", classId: "cls-9a", rollNo: "9A-06", guardianIds: [], admissionYear: 2023 },
  { id: "stu-015", name: "Zara Ahmed", grade: "Grade 9 - A", classId: "cls-9a", rollNo: "9A-07", guardianIds: [], admissionYear: 2023 },
];

const parents = [
  { id: "par-001", userId: "usr-par-001", studentIds: ["stu-001"] },
  { id: "par-002", userId: "usr-par-002", studentIds: ["stu-002"] },
  { id: "par-003", userId: "usr-par-003", studentIds: ["stu-003"] },
];

const classes = [
  {
    id: "cls-10b",
    name: "Grade 10-B",
    gradeLabel: "Grade 10",
    section: "B",
    subjectTeacherIds: { "sub-math": "usr-tch-001", "sub-sci": "usr-tch-002", "sub-eng": "usr-tch-003" },
  },
  {
    id: "cls-9a",
    name: "Grade 9-A",
    gradeLabel: "Grade 9",
    section: "A",
    subjectTeacherIds: { "sub-sci": "usr-tch-002", "sub-math": "usr-tch-001", "sub-eng": "usr-tch-003" },
  },
];

function buildAssessments(): MockDb["assessments"] {
  const terms = ["Term 1", "Mid-term", "Term 2", "Final"];
  const list: MockDb["assessments"] = [];
  let n = 0;
  for (const stu of students) {
    for (const sub of subjects.slice(0, 4)) {
      const base = stu.id === "stu-001" && sub.id === "sub-math" ? 62 : 72;
      terms.forEach((term, i) => {
        const dip = stu.id === "stu-001" && sub.id === "sub-math" && i >= 2 ? -12 : i * 2;
        list.push({
          id: `asm-${++n}`,
          studentId: stu.id,
          subjectId: sub.id,
          term,
          score: Math.min(98, Math.max(45, base + dip + (n % 7))),
          maxScore: 100,
          date: `2025-${String(9 + i).padStart(2, "0")}-15`,
        });
      });
    }
  }
  return list;
}

const attendance: MockDb["attendance"] = students.map((s, i) => ({
  studentId: s.id,
  month: "2026-06",
  presentDays: s.id === "stu-003" ? 14 : 22 - (i % 3),
  totalDays: 24,
}));

const learningGaps: MockDb["learningGaps"] = [
  {
    id: "gap-001",
    studentId: "stu-001",
    subjectId: "sub-math",
    topic: "Algebra — quadratic equations",
    severity: "high",
    identifiedOn: "2026-06-10",
  },
  {
    id: "gap-002",
    studentId: "stu-003",
    subjectId: "sub-sci",
    topic: "Lab report structure",
    severity: "medium",
    identifiedOn: "2026-06-08",
  },
  {
    id: "gap-003",
    studentId: "stu-010",
    subjectId: "sub-sci",
    topic: "Chemical bonding concepts",
    severity: "high",
    identifiedOn: "2026-06-05",
  },
];

const skillCategories = [
  "academic",
  "cognitive",
  "communication",
  "social",
  "digital",
  "career",
  "leadership",
  "self-management",
] as const;

const skillRatings: MockDb["skillRatings"] = [];
for (const stu of students.slice(0, 8)) {
  skillCategories.forEach((category, idx) => {
    skillRatings.push({
      studentId: stu.id,
      category,
      level: ((idx + stu.id.charCodeAt(4)) % 5) + 1 as 1 | 2 | 3 | 4 | 5,
      lastUpdated: "2026-06-01",
      source: idx % 2 === 0 ? "self" : "teacher",
    });
  });
}

const goals: MockDb["goals"] = [
  {
    id: "goal-001",
    studentId: "stu-001",
    title: "Improve Algebra weekly practice",
    category: "academic",
    targetDate: "2026-08-15",
    status: "in-progress",
    milestones: [
      { title: "Complete 4 practice sets", done: true },
      { title: "Score 75+ on next test", done: false },
    ],
    mentorId: "usr-tch-001",
  },
  {
    id: "goal-002",
    studentId: "stu-001",
    title: "Lead class eco-club initiative",
    category: "skill",
    targetDate: "2026-09-01",
    status: "in-progress",
    milestones: [{ title: "Draft project plan", done: true }],
  },
  {
    id: "goal-003",
    studentId: "stu-002",
    title: "Maintain 90% attendance",
    category: "attendance",
    targetDate: "2026-07-30",
    status: "in-progress",
    milestones: [{ title: "No unexcused absences", done: false }],
  },
];

const portfolioItems: MockDb["portfolioItems"] = [
  {
    id: "pf-001",
    studentId: "stu-001",
    type: "competition",
    title: "Regional Science Quiz — 2nd place",
    description: "Team lead for school science quiz team.",
    date: "2026-03-20",
    verified: true,
    evidenceLabel: "certificate.pdf",
  },
  {
    id: "pf-002",
    studentId: "stu-001",
    type: "project",
    title: "Solar still prototype",
    description: "Design project for environmental science unit.",
    date: "2026-05-10",
    verified: false,
    evidenceLabel: "project-photos.zip",
  },
  {
    id: "pf-003",
    studentId: "stu-002",
    type: "art",
    title: "Inter-school art exhibition",
    description: "Watercolour series on local heritage.",
    date: "2026-04-05",
    verified: true,
  },
];

const careerInterests: MockDb["careerInterests"] = [
  { studentId: "stu-001", cluster: "Engineering & Technology", score: 82 },
  { studentId: "stu-001", cluster: "Design", score: 64 },
  { studentId: "stu-001", cluster: "Commerce", score: 45 },
  { studentId: "stu-002", cluster: "Design", score: 88 },
  { studentId: "stu-002", cluster: "Engineering & Technology", score: 55 },
];

const careerSuggestions: MockDb["careerSuggestions"] = [
  {
    id: "cs-001",
    studentId: "stu-001",
    pathway: "STEM — Computer Science & Engineering",
    rationale:
      "Strong math aptitude and digital skills scores suggest readiness for analytical STEM pathways.",
    confidence: "high",
  },
  {
    id: "cs-002",
    studentId: "stu-001",
    pathway: "Product Design & UX",
    rationale: "Creative project work and communication skills support design-oriented careers.",
    confidence: "medium",
  },
];

const counsellingCases: MockDb["counsellingCases"] = [
  {
    id: "case-001",
    studentId: "stu-003",
    counsellorId: "usr-cou-001",
    concern: "Exam stress and sleep routine",
    status: "in-progress",
    priority: "medium",
    restrictedNotes: [
      { date: "2026-06-12", note: "Student reports difficulty winding down before exams." },
    ],
    supportPlan: "Weekly check-in, relaxation techniques, parent coordination on study schedule.",
    followUps: [{ date: "2026-06-19", action: "Review sleep diary", done: false }],
  },
  {
    id: "case-002",
    studentId: "stu-008",
    counsellorId: "usr-cou-001",
    concern: "Peer conflict — referred by teacher",
    status: "open",
    priority: "high",
    restrictedNotes: [],
    followUps: [],
    referredBy: "usr-tch-003",
  },
];

const appointments: MockDb["appointments"] = [
  {
    id: "appt-001",
    studentId: "stu-003",
    counsellorId: "usr-cou-001",
    dateTime: "2026-07-29T10:00:00",
    status: "confirmed",
  },
  {
    id: "appt-002",
    studentId: "stu-001",
    counsellorId: "usr-cou-001",
    dateTime: "2026-08-02T11:30:00",
    status: "requested",
  },
];

const messages: MockDb["messages"] = [
  {
    id: "msg-001",
    fromId: "usr-tch-001",
    toId: "usr-stu-001",
    subject: "Algebra practice resources",
    body: "Please review the attached worksheet before Friday's class.",
    date: "2026-07-25",
    read: false,
  },
  {
    id: "msg-002",
    fromId: "usr-prin-001",
    toId: "usr-par-001",
    subject: "PTM reminder",
    body: "Parent-teacher meeting slots open next week.",
    date: "2026-07-20",
    read: true,
  },
];

const announcements: MockDb["announcements"] = [
  {
    id: "ann-001",
    title: "Term 2 assessment calendar published",
    body: "Review dates on the student portal academics page.",
    audience: "all",
    date: "2026-07-18",
  },
  {
    id: "ann-002",
    title: "Career exploration week",
    body: "Grade 9–10 students: complete interest activities by Aug 10.",
    audience: "students",
    date: "2026-07-22",
  },
];

const classAnalytics: MockDb["classAnalytics"] = [
  { classId: "cls-10b", averageScore: 74, attendanceRate: 91, atRiskCount: 3, engagementIndex: 78 },
  { classId: "cls-9a", averageScore: 68, attendanceRate: 87, atRiskCount: 5, engagementIndex: 71 },
];

const interventionPlans: MockDb["interventionPlans"] = [
  {
    id: "int-001",
    studentId: "stu-001",
    teacherId: "usr-tch-001",
    topic: "Algebra — Quadratic Equations",
    action: "Remedial practice sessions twice weekly & step-by-step problem sets",
    targetDate: "2026-08-15",
    status: "active",
    createdAt: "2026-07-10",
  },
  {
    id: "int-002",
    studentId: "stu-003",
    teacherId: "usr-tch-001",
    topic: "Math Foundation & Exam Preparation",
    action: "Pair with peer tutor & weekly progress check-ins",
    targetDate: "2026-08-10",
    status: "active",
    createdAt: "2026-07-12",
  },
  {
    id: "int-003",
    studentId: "stu-008",
    teacherId: "usr-tch-001",
    topic: "Focus & Classroom Engagement",
    action: "Front row seating adjustment and daily assignment verification",
    targetDate: "2026-08-20",
    status: "in-progress",
    createdAt: "2026-07-15",
  },
  {
    id: "int-004",
    studentId: "stu-002",
    teacherId: "usr-tch-001",
    topic: "Advanced Geometry Extension",
    action: "Olympiad level practice problem sets and mentorship",
    targetDate: "2026-07-28",
    status: "completed",
    createdAt: "2026-06-20",
  },
  {
    id: "int-005",
    studentId: "stu-010",
    teacherId: "usr-tch-002",
    topic: "Science lab participation",
    action: "Pair with lab buddy for next 3 sessions",
    targetDate: "2026-08-01",
    status: "active",
    createdAt: "2026-06-15",
  },
];

const teacherFeedbacks: MockDb["teacherFeedbacks"] = [
  {
    id: "tf-001",
    studentId: "stu-001",
    teacherId: "usr-tch-001",
    subjectId: "sub-math",
    note: "Shows effort in class; needs consistent practice on algebra.",
    date: "2026-06-20",
  },
  {
    id: "tf-002",
    studentId: "stu-001",
    teacherId: "usr-tch-002",
    subjectId: "sub-sci",
    note: "Excellent participation in lab discussions.",
    date: "2026-06-18",
  },
];

const pendingActions: MockDb["pendingActions"] = [
  {
    id: "pa-001",
    parentUserId: "usr-par-001",
    studentId: "stu-001",
    type: "consent",
    title: "Field trip consent — Science museum",
    description: "Grade 10-B visit on Aug 12.",
    status: "pending",
  },
  {
    id: "pa-002",
    parentUserId: "usr-par-001",
    studentId: "stu-001",
    type: "meeting",
    title: "PTM slot request — Mrs. Iyer",
    description: "Proposed: Aug 5, 4:00 PM",
    status: "pending",
  },
];

const institutions: MockDb["institutions"] = [
  { id: "inst-001", name: "Greenfield International School", city: "Pune", studentCount: 1240 },
  { id: "inst-002", name: "Riverside Academy (Pilot)", city: "Mumbai", studentCount: 680 },
];

const riskTrend: MockDb["riskTrend"] = [
  { month: "2026-02", atRiskCount: 18 },
  { month: "2026-03", atRiskCount: 16 },
  { month: "2026-04", atRiskCount: 19 },
  { month: "2026-05", atRiskCount: 14 },
  { month: "2026-06", atRiskCount: 12 },
  { month: "2026-07", atRiskCount: 11 },
];

const observations: MockDb["observations"] = [
  {
    id: "obs-001",
    studentId: "stu-001",
    teacherId: "usr-tch-003",
    trait: "Confidence",
    note: "Volunteers answers more often in group discussions.",
    date: "2026-06-05",
  },
  {
    id: "obs-002",
    studentId: "stu-001",
    teacherId: "usr-tch-001",
    trait: "Teamwork",
    note: "Collaborates well in peer tutoring sessions.",
    date: "2026-05-28",
  },
];

const todayTasks: MockDb["todayTasks"] = {
  "stu-001": [
    { id: "t1", title: "Complete Algebra worksheet §4.2", done: false },
    { id: "t2", title: "Submit science lab reflection", done: true },
    { id: "t3", title: "Review career quiz prep reading", done: false },
  ],
};

export const initialMockDb: MockDb = {
  users,
  students,
  parents,
  classes,
  subjects,
  attendance,
  assessments: buildAssessments(),
  learningGaps,
  skillRatings,
  observations,
  goals,
  portfolioItems,
  careerInterests,
  careerSuggestions,
  counsellingCases,
  appointments,
  messages,
  announcements,
  classAnalytics,
  interventionPlans,
  teacherFeedbacks,
  pendingActions,
  institutions,
  riskTrend,
  todayTasks,
};

export type AppDataState = MockDb;
