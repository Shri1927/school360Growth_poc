export type UserRole =
  | "student"
  | "parent"
  | "teacher"
  | "counsellor"
  | "principal"
  | "admin";

export interface User {
  id: string;
  name: string;
  role: UserRole;
  avatarUrl?: string;
  email: string;
}

export interface Student {
  id: string;
  name: string;
  grade: string;
  classId: string;
  rollNo: string;
  guardianIds: string[];
  photoUrl?: string;
  admissionYear: number;
}

export interface ParentProfile {
  id: string;
  userId: string;
  studentIds: string[];
}

export interface SchoolClass {
  id: string;
  name: string;
  gradeLabel: string;
  section: string;
  subjectTeacherIds: Record<string, string>;
}

export interface AttendanceRecord {
  studentId: string;
  month: string;
  presentDays: number;
  totalDays: number;
}

export interface Subject {
  id: string;
  name: string;
}

export interface Assessment {
  id: string;
  studentId: string;
  subjectId: string;
  term: string;
  score: number;
  maxScore: number;
  date: string;
}

export interface LearningGap {
  id: string;
  studentId: string;
  subjectId: string;
  topic: string;
  severity: "low" | "medium" | "high";
  identifiedOn: string;
}

export type SkillCategory =
  | "academic"
  | "cognitive"
  | "communication"
  | "social"
  | "digital"
  | "career"
  | "leadership"
  | "self-management";

export interface SkillRating {
  studentId: string;
  category: SkillCategory;
  level: 1 | 2 | 3 | 4 | 5;
  lastUpdated: string;
  source: "self" | "teacher";
}

export interface Observation {
  id: string;
  studentId: string;
  teacherId: string;
  trait: string;
  note: string;
  date: string;
}

export interface Goal {
  id: string;
  studentId: string;
  title: string;
  category: "academic" | "attendance" | "skill" | "career" | "habit";
  targetDate: string;
  status: "not-started" | "in-progress" | "achieved";
  milestones: { title: string; done: boolean }[];
  mentorId?: string;
  source?: "student" | "intervention";
}

export interface PortfolioItem {
  id: string;
  studentId: string;
  type:
    | "certificate"
    | "project"
    | "sport"
    | "art"
    | "competition"
    | "volunteering"
    | "internship";
  title: string;
  description: string;
  date: string;
  verified: boolean;
  evidenceLabel?: string;
}

export interface CareerInterest {
  studentId: string;
  cluster: string;
  score: number;
}

export interface CareerSuggestion {
  id: string;
  studentId: string;
  pathway: string;
  rationale: string;
  confidence: "low" | "medium" | "high";
}

export interface CounsellingCase {
  id: string;
  studentId: string;
  counsellorId: string;
  concern: string;
  status: "open" | "in-progress" | "closed";
  priority: "low" | "medium" | "high";
  restrictedNotes: { date: string; note: string }[];
  supportPlan?: string;
  followUps: { date: string; action: string; done: boolean }[];
  referredBy?: string;
}

export interface Appointment {
  id: string;
  studentId: string;
  counsellorId: string;
  dateTime: string;
  status: "requested" | "confirmed" | "completed" | "cancelled";
}

export interface Message {
  id: string;
  fromId: string;
  toId: string;
  subject: string;
  body: string;
  date: string;
  read: boolean;
}

export interface Announcement {
  id: string;
  title: string;
  body: string;
  audience: "all" | "students" | "parents" | "teachers";
  date: string;
}

export interface ClassAnalytics {
  classId: string;
  averageScore: number;
  attendanceRate: number;
  atRiskCount: number;
  engagementIndex: number;
}

export interface InterventionPlan {
  id: string;
  studentId: string;
  teacherId: string;
  topic: string;
  action: string;
  targetDate: string;
  status: "active" | "in-progress" | "completed";
  createdAt: string;
}

export interface TeacherFeedback {
  id: string;
  studentId: string;
  teacherId: string;
  subjectId: string;
  note: string;
  date: string;
}

export interface PendingAction {
  id: string;
  parentUserId: string;
  studentId: string;
  type: "consent" | "meeting" | "intervention";
  title: string;
  description: string;
  status: "pending" | "approved" | "declined";
}

export interface Institution {
  id: string;
  name: string;
  city: string;
  studentCount: number;
}

export interface RiskTrendPoint {
  month: string;
  atRiskCount: number;
}

export interface MockDb {
  users: User[];
  students: Student[];
  parents: ParentProfile[];
  classes: SchoolClass[];
  subjects: Subject[];
  attendance: AttendanceRecord[];
  assessments: Assessment[];
  learningGaps: LearningGap[];
  skillRatings: SkillRating[];
  observations: Observation[];
  goals: Goal[];
  portfolioItems: PortfolioItem[];
  careerInterests: CareerInterest[];
  careerSuggestions: CareerSuggestion[];
  counsellingCases: CounsellingCase[];
  appointments: Appointment[];
  messages: Message[];
  announcements: Announcement[];
  classAnalytics: ClassAnalytics[];
  interventionPlans: InterventionPlan[];
  teacherFeedbacks: TeacherFeedback[];
  pendingActions: PendingAction[];
  institutions: Institution[];
  riskTrend: RiskTrendPoint[];
  todayTasks: Record<string, { id: string; title: string; done: boolean }[]>;
}

export interface AuthSession {
  role: UserRole;
  userId: string;
}
