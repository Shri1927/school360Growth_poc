import type { MockDb } from "@/types";
import { studentDisplayName } from "@/lib/growthIndex";

export function learningRecommendation(studentId: string, db: MockDb): string {
  const name = studentDisplayName(studentId, db);
  const gap = db.learningGaps.find((g) => g.studentId === studentId);
  if (gap) {
    const sub = db.subjects.find((s) => s.id === gap.subjectId)?.name ?? "subject";
    return `Focus suggestion for this week: ${sub} — ${gap.topic}. Based on ${name}'s recent scores, targeted practice is recommended.`;
  }
  return `${name} is on track across subjects. Consider deepening project-based work in areas of strength.`;
}

export function parentProgressSummary(studentId: string, db: MockDb): string {
  const name = studentDisplayName(studentId, db);
  return `${name} is doing well overall. Attendance and academics are steady. Recommended focus: Science lab participation and consistent study routines.`;
}

export function institutionalInsight(classId: string, db: MockDb): string {
  const cls = db.classes.find((c) => c.id === classId);
  const analytics = db.classAnalytics.find((a) => a.classId === classId);
  if (!cls || !analytics) return "Review departmental plans for the current term.";
  if (analytics.averageScore < 70) {
    return `${cls.name} Science shows declining assessment trend over 2 terms — coordinate subject leads for intervention review.`;
  }
  return `${cls.name} engagement index is ${analytics.engagementIndex} — maintain current mentorship programs.`;
}

export function principalAttentionItems(_db: MockDb): { id: string; text: string; classId?: string }[] {
  return [
    {
      id: "ins-1",
      text: "Grade 9 Science shows declining assessment trend over 2 terms.",
      classId: "cls-9a",
    },
    {
      id: "ins-2",
      text: "Grade 10-B attendance stable; 3 students flagged for academic support.",
      classId: "cls-10b",
    },
    {
      id: "ins-3",
      text: "Parent report views up 12% vs last month — continue nudges before PTM.",
    },
  ];
}

export function careerRationale(pathway: string, studentName: string): string {
  return `Based on ${studentName}'s interest profile and skill ratings, ${pathway} aligns with demonstrated strengths. Review with counsellor before final decisions.`;
}

export function reportInterventions(studentId: string, db: MockDb): string[] {
  const gaps = db.learningGaps
    .filter((g) => g.studentId === studentId)
    .map((g) => `Address ${g.topic} (${g.severity} priority)`);
  const plans = db.interventionPlans
    .filter((p) => p.studentId === studentId && p.status === "active")
    .map((p) => p.action);
  return [...gaps, ...plans];
}

export function selfReflectionQuote(studentName: string): string {
  return `"I want to improve in math while keeping time for eco-club. My goal is to ask for help earlier when topics feel hard." — ${studentName}`;
}
