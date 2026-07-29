import type { MockDb, Student } from "@/types";

/** Weighted progress index 0–100 (not a grade label). */
export function computeGrowthIndex(studentId: string, db: MockDb): number {
  const academic = avgAssessmentPct(studentId, db) * 0.3;
  const attendance = attendancePct(studentId, db) * 0.1;
  const skills = avgSkillLevel(studentId, db) * 20 * 0.15;
  const communication = traitScore(studentId, db, "Confidence") * 0.1;
  const projects = Math.min(100, portfolioCount(studentId, db) * 25) * 0.1;
  const behaviour = traitScore(studentId, db, "Teamwork") * 0.1;
  const goals = goalProgress(studentId, db) * 0.1;
  const extracurricular = Math.min(100, portfolioCount(studentId, db) * 20) * 0.05;
  return Math.round(
    academic + attendance + skills + communication + projects + behaviour + goals + extracurricular,
  );
}

function avgAssessmentPct(studentId: string, db: MockDb): number {
  const rows = db.assessments.filter((a) => a.studentId === studentId);
  if (!rows.length) return 70;
  const sum = rows.reduce((acc, r) => acc + (r.score / r.maxScore) * 100, 0);
  return sum / rows.length;
}

function attendancePct(studentId: string, db: MockDb): number {
  const row = db.attendance.find((a) => a.studentId === studentId);
  if (!row || row.totalDays === 0) return 85;
  return (row.presentDays / row.totalDays) * 100;
}

function avgSkillLevel(studentId: string, db: MockDb): number {
  const rows = db.skillRatings.filter((s) => s.studentId === studentId);
  if (!rows.length) return 3;
  return rows.reduce((acc, r) => acc + r.level, 0) / rows.length;
}

function traitScore(studentId: string, db: MockDb, trait: string): number {
  const has = db.observations.some((o) => o.studentId === studentId && o.trait === trait);
  return has ? 85 : 70;
}

function portfolioCount(studentId: string, db: MockDb): number {
  return db.portfolioItems.filter((p) => p.studentId === studentId).length;
}

function goalProgress(studentId: string, db: MockDb): number {
  const goals = db.goals.filter((g) => g.studentId === studentId);
  if (!goals.length) return 65;
  const scores = goals.map((g) => {
    if (g.status === "achieved") return 100;
    const done = g.milestones.filter((m) => m.done).length;
    const total = g.milestones.length || 1;
    return (done / total) * 80 + (g.status === "in-progress" ? 10 : 0);
  });
  return scores.reduce((a, b) => a + b, 0) / scores.length;
}

export function getStudentByUserId(userId: string, db: MockDb): Student | undefined {
  const user = db.users.find((u) => u.id === userId);
  if (!user || user.role !== "student") return undefined;
  return db.students.find((s) => s.name === user.name);
}

export function studentDisplayName(studentId: string, db: MockDb): string {
  return db.students.find((s) => s.id === studentId)?.name ?? "Student";
}
