import type { MockDb } from "@/types";

export type RiskLevel = "low" | "medium" | "high";

export function getStudentRiskLevel(studentId: string, db: MockDb): RiskLevel {
  const gap = db.learningGaps.find((g) => g.studentId === studentId);
  const att = db.attendance.find((a) => a.studentId === studentId);
  const attPct = att && att.totalDays ? att.presentDays / att.totalDays : 1;
  const counselling = db.counsellingCases.some(
    (c) => c.studentId === studentId && c.status !== "closed" && c.priority === "high",
  );
  if (gap?.severity === "high" || attPct < 0.75 || counselling) return "high";
  if (gap?.severity === "medium" || attPct < 0.85) return "medium";
  return "low";
}

export function studentsNeedingSupport(db: MockDb, classId?: string): MockDb["students"] {
  return db.students.filter((s) => {
    if (classId && s.classId !== classId) return false;
    return getStudentRiskLevel(s.id, db) !== "low";
  });
}

export function hasCounsellingSupport(studentId: string, db: MockDb): boolean {
  return db.counsellingCases.some(
    (c) => c.studentId === studentId && (c.status === "open" || c.status === "in-progress"),
  );
}

export function counsellingStatusLabel(studentId: string, db: MockDb): string | null {
  const c = db.counsellingCases.find(
    (x) => x.studentId === studentId && x.status !== "closed",
  );
  if (!c) return null;
  if (c.status === "in-progress") return "Support in progress";
  if (c.status === "open") return "Counselling referral received";
  return null;
}

export function isReferredForCounselling(studentId: string, db: MockDb): boolean {
  return db.counsellingCases.some((c) => c.studentId === studentId);
}
