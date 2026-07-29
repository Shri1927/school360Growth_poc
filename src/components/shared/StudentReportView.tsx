import { Printer } from "lucide-react";
import { useAppData } from "@/context/AppDataContext";
import { computeGrowthIndex } from "@/lib/growthIndex";
import {
  learningRecommendation,
  reportInterventions,
  selfReflectionQuote,
} from "@/lib/mockAi";
import { counsellingStatusLabel } from "@/lib/risk";
import { attendancePercent } from "@/lib/studentHelpers";
import { AiBadge } from "@/components/shared/AiBadge";
import { GrowthIndexGauge } from "@/components/shared/GrowthIndexGauge";
import { LinkButton } from "@/components/shared/LinkButton";
import { PageHeader } from "@/components/shared/PageHeader";
import { SkillRadar } from "@/components/shared/SkillRadar";
import { Timeline } from "@/components/shared/Timeline";
import { TrendChart } from "@/components/shared/TrendChart";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function StudentReportView({
  studentId,
  showPrintButton = true,
  backPath,
}: {
  studentId: string;
  showPrintButton?: boolean;
  backPath?: string;
}) {
  const { db } = useAppData();
  const student = db.students.find((s) => s.id === studentId);
  if (!student) return null;

  const growth = computeGrowthIndex(studentId, db);
  const assessments = db.assessments.filter((a) => a.studentId === studentId);
  const chartData = assessments.slice(-8).map((a) => ({
    label: db.subjects.find((s) => s.id === a.subjectId)?.name?.slice(0, 6) ?? a.term,
    value: Math.round((a.score / a.maxScore) * 100),
  }));
  const gaps = db.learningGaps.filter((g) => g.studentId === studentId);
  const skills = db.skillRatings.filter((s) => s.studentId === studentId);
  const portfolio = db.portfolioItems.filter((p) => p.studentId === studentId);
  const suggestions = db.careerSuggestions.filter((c) => c.studentId === studentId);
  const goals = db.goals.filter((g) => g.studentId === studentId);
  const supportLabel = counsellingStatusLabel(studentId, db);

  const sections = [
    { id: "overview", label: "Overview" },
    { id: "academic", label: "Academics" },
    { id: "attendance", label: "Attendance" },
    { id: "gaps", label: "Gaps" },
    { id: "skills", label: "Skills" },
    { id: "personality", label: "Personality" },
    { id: "behaviour", label: "Behaviour" },
    { id: "activities", label: "Activities" },
    { id: "reflection", label: "Reflection" },
    { id: "feedback", label: "Feedback" },
    { id: "career", label: "Career" },
    { id: "interventions", label: "Interventions" },
    { id: "plan", label: "3-month plan" },
  ];

  return (
    <div className="print-report max-w-4xl mx-auto">
      <PageHeader
        title="Student 360° Report"
        description={`${student.name} · ${student.grade}`}
        actions={
          showPrintButton ? (
            <Button variant="outline" onClick={() => window.print()} className="no-print">
              <Printer className="size-4 mr-2" />
              Download PDF
            </Button>
          ) : null
        }
      />
      {backPath ? (
        <LinkButton to={backPath} variant="link" className="no-print -mt-4 mb-4 px-0">
          ← Back to dashboard
        </LinkButton>
      ) : null}

      <Tabs defaultValue="overview" className="no-print mb-6">
        <TabsList className="flex flex-wrap h-auto gap-1">
          {sections.map((s) => (
            <TabsTrigger key={s.id} value={s.id} className="text-xs">
              {s.label}
            </TabsTrigger>
          ))}
        </TabsList>
        {sections.map((s) => (
          <TabsContent key={s.id} value={s.id} />
        ))}
      </Tabs>

      <div className="space-y-8">
        <section id="overview" className="scroll-mt-4">
          <Card>
            <CardHeader>
              <CardTitle>1. Student overview</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col sm:flex-row gap-6 items-start">
              <div>
                <p className="font-semibold text-lg">{student.name}</p>
                <p className="text-muted-foreground">{student.grade} · Roll {student.rollNo}</p>
                {supportLabel ? (
                  <p className="text-sm text-muted-foreground mt-2">{supportLabel}</p>
                ) : null}
              </div>
              <GrowthIndexGauge value={growth} />
            </CardContent>
          </Card>
        </section>

        <section id="academic">
          <Card>
            <CardHeader>
              <CardTitle>2. Academic performance & trends</CardTitle>
            </CardHeader>
            <CardContent>
              <TrendChart data={chartData} />
            </CardContent>
          </Card>
        </section>

        <section id="attendance">
          <Card>
            <CardHeader>
              <CardTitle>3. Attendance & consistency</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-semibold">{attendancePercent(studentId, db)}%</p>
              <p className="text-sm text-muted-foreground">Current month attendance rate</p>
            </CardContent>
          </Card>
        </section>

        <section id="gaps">
          <Card>
            <CardHeader>
              <CardTitle>4. Subject strengths & learning gaps</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {gaps.length ? (
                gaps.map((g) => (
                  <div key={g.id} className="flex items-center gap-2 text-sm">
                    <Badge variant="outline">{g.severity}</Badge>
                    <span>
                      {db.subjects.find((s) => s.id === g.subjectId)?.name}: {g.topic}
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">No significant gaps flagged.</p>
              )}
            </CardContent>
          </Card>
        </section>

        <section id="skills">
          <Card>
            <CardHeader>
              <CardTitle>5. Skills & competency profile</CardTitle>
            </CardHeader>
            <CardContent>
              <SkillRadar
                title=""
                data={skills.map((s) => ({ category: s.category, level: s.level }))}
              />
            </CardContent>
          </Card>
        </section>

        <section id="personality">
          <Card>
            <CardHeader>
              <CardTitle>6. Personality-development observations</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {db.observations
                .filter((o) => o.studentId === studentId)
                .map((o) => (
                  <div key={o.id} className="text-sm border-l-2 pl-3 border-primary/30">
                    <p className="font-medium">{o.trait}</p>
                    <p className="text-muted-foreground">{o.note}</p>
                    <p className="text-xs text-muted-foreground">{o.date}</p>
                  </div>
                ))}
            </CardContent>
          </Card>
        </section>

        <section id="behaviour">
          <Card>
            <CardHeader>
              <CardTitle>7. Participation, behaviour & responsibility</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Demonstrates consistent classroom participation and collaborative behaviour in group
                activities. Takes responsibility for assigned roles in projects.
              </p>
            </CardContent>
          </Card>
        </section>

        <section id="activities">
          <Card>
            <CardHeader>
              <CardTitle>8. Activities, projects & achievements</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-3 sm:grid-cols-2">
              {portfolio.map((p) => (
                <div key={p.id} className="rounded-lg border p-3 text-sm">
                  <p className="font-medium">{p.title}</p>
                  <p className="text-muted-foreground">{p.description}</p>
                  {p.verified ? <Badge className="mt-1">Verified</Badge> : null}
                </div>
              ))}
            </CardContent>
          </Card>
        </section>

        <section id="reflection">
          <Card>
            <CardHeader>
              <CardTitle>9. Student self-reflection</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm italic">{selfReflectionQuote(student.name)}</p>
            </CardContent>
          </Card>
        </section>

        <section id="feedback">
          <Card>
            <CardHeader>
              <CardTitle>10. Teacher & parent feedback</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {db.teacherFeedbacks
                .filter((f) => f.studentId === studentId)
                .map((f) => (
                  <blockquote key={f.id} className="text-sm border-l-2 pl-3">
                    {f.note}
                  </blockquote>
                ))}
            </CardContent>
          </Card>
        </section>

        <section id="career">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                11. Career interests & readiness
                <AiBadge />
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {suggestions.map((s) => (
                <div key={s.id} className="rounded-lg border p-3">
                  <p className="font-medium">{s.pathway}</p>
                  <p className="text-sm text-muted-foreground">{s.rationale}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </section>

        <section id="interventions">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                12. Recommended interventions
                <AiBadge />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 text-sm space-y-1">
                {reportInterventions(studentId, db).map((item) => (
                  <li key={item}>{item}</li>
                ))}
                <li>{learningRecommendation(studentId, db)}</li>
              </ul>
            </CardContent>
          </Card>
        </section>

        <section id="plan">
          <Card>
            <CardHeader>
              <CardTitle>13. Three-month development plan</CardTitle>
            </CardHeader>
            <CardContent>
              <Timeline
                items={goals.flatMap((g) =>
                  g.milestones.map((m) => ({
                    date: g.targetDate,
                    title: m.title,
                    description: g.title,
                    done: m.done,
                  })),
                )}
              />
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}
