import type { AuthSession, MockDb, Student } from "@/types";
import { getStudentByUserId } from "@/lib/growthIndex";

export function getStudentForSession(session: AuthSession | null, db: MockDb): Student | undefined {
  if (!session) return undefined;
  if (session.role === "student") return getStudentByUserId(session.userId, db);
  return undefined;
}

export function getLinkedStudentsForParent(userId: string, db: MockDb): Student[] {
  const profile = db.parents.find((p) => p.userId === userId);
  if (!profile) return [];
  return profile.studentIds
    .map((id) => db.students.find((s) => s.id === id))
    .filter((s): s is Student => Boolean(s));
}

export function attendancePercent(studentId: string, db: MockDb): number {
  const row = db.attendance.find((a) => a.studentId === studentId);
  if (!row || !row.totalDays) return 0;
  return Math.round((row.presentDays / row.totalDays) * 100);
}

export function pendingAssignmentsCount(_studentId: string): number {
  return 3;
}

export function uid(prefix: string): string {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}
