import { useState } from "react";
import { Printer, ChevronLeft, ChevronRight, BookOpen } from "lucide-react";
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

  const [activeTab, setActiveTab] = useState("overview");
  const [animDirection, setAnimDirection] = useState<"next" | "prev">("next");
  const [animKey, setAnimKey] = useState(0);

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
    { id: "overview", label: "Overview", num: 1 },
    { id: "academic", label: "Academics", num: 2 },
    { id: "attendance", label: "Attendance", num: 3 },
    { id: "gaps", label: "Gaps", num: 4 },
    { id: "skills", label: "Skills", num: 5 },
    { id: "personality", label: "Personality", num: 6 },
    { id: "behaviour", label: "Behaviour", num: 7 },
    { id: "activities", label: "Activities", num: 8 },
    { id: "reflection", label: "Reflection", num: 9 },
    { id: "feedback", label: "Feedback", num: 10 },
    { id: "career", label: "Career", num: 11 },
    { id: "interventions", label: "Interventions", num: 12 },
    { id: "plan", label: "3-month plan", num: 13 },
  ];

  const currentIndex = sections.findIndex((s) => s.id === activeTab);
  const activeSection = sections[currentIndex] || sections[0];

  const handleTabChange = (targetId: string) => {
    if (targetId === activeTab) return;
    const targetIdx = sections.findIndex((s) => s.id === targetId);
    setAnimDirection(targetIdx >= currentIndex ? "next" : "prev");
    setActiveTab(targetId);
    setAnimKey((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      handleTabChange(sections[currentIndex - 1].id);
    }
  };

  const handleNext = () => {
    if (currentIndex < sections.length - 1) {
      handleTabChange(sections[currentIndex + 1].id);
    }
  };

  const sectionContentMap: Record<string, React.ReactNode> = {
    overview: (
      <section id="overview" className="scroll-mt-4">
        <Card className="border-0 shadow-none bg-transparent">
          <CardHeader className="px-0 pt-0">
            <CardTitle className="text-xl font-bold text-slate-800">1. Student Overview</CardTitle>
          </CardHeader>
          <CardContent className="px-0 flex flex-col sm:flex-row gap-6 items-start">
            <div className="flex-1 space-y-2">
              <p className="font-bold text-2xl text-slate-900">{student.name}</p>
              <p className="text-slate-600 font-medium">
                {student.grade} · Roll {student.rollNo}
              </p>
              {supportLabel ? (
                <div className="inline-block bg-emerald-50 text-emerald-700 text-xs font-semibold px-3 py-1.5 rounded-full border border-emerald-200">
                  {supportLabel}
                </div>
              ) : null}
              <p className="text-sm text-slate-500 pt-2 leading-relaxed">
                Comprehensive 360-degree evaluation aggregating academic marks, attendance stats, behavioral growth, AI career insights, and personal development goals.
              </p>
            </div>
            <div className="bg-slate-50/80 p-4 rounded-2xl border border-slate-200/60 w-full sm:w-auto flex justify-center">
              <GrowthIndexGauge value={growth} />
            </div>
          </CardContent>
        </Card>
      </section>
    ),
    academic: (
      <section id="academic">
        <Card className="border-0 shadow-none bg-transparent">
          <CardHeader className="px-0 pt-0">
            <CardTitle className="text-xl font-bold text-slate-800">2. Academic Performance & Trends</CardTitle>
          </CardHeader>
          <CardContent className="px-0">
            <div className="bg-slate-50/60 p-4 rounded-xl border border-slate-200/60">
              <TrendChart data={chartData} />
            </div>
          </CardContent>
        </Card>
      </section>
    ),
    attendance: (
      <section id="attendance">
        <Card className="border-0 shadow-none bg-transparent">
          <CardHeader className="px-0 pt-0">
            <CardTitle className="text-xl font-bold text-slate-800">3. Attendance & Consistency</CardTitle>
          </CardHeader>
          <CardContent className="px-0 space-y-4">
            <div className="flex items-center gap-6 bg-emerald-50/70 p-6 rounded-2xl border border-emerald-100">
              <div className="text-4xl font-extrabold text-emerald-700">
                {attendancePercent(studentId, db)}%
              </div>
              <div>
                <p className="font-semibold text-slate-800">Current Month Attendance Rate</p>
                <p className="text-sm text-slate-600">High attendance regularity maintained across standard terms.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    ),
    gaps: (
      <section id="gaps">
        <Card className="border-0 shadow-none bg-transparent">
          <CardHeader className="px-0 pt-0">
            <CardTitle className="text-xl font-bold text-slate-800">4. Subject Strengths & Learning Gaps</CardTitle>
          </CardHeader>
          <CardContent className="px-0 space-y-3">
            {gaps.length ? (
              gaps.map((g) => (
                <div key={g.id} className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200/70 text-sm">
                  <Badge variant="outline" className="font-semibold px-2.5 py-0.5">
                    {g.severity}
                  </Badge>
                  <span className="font-medium text-slate-800">
                    {db.subjects.find((s) => s.id === g.subjectId)?.name}: {g.topic}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-sm text-slate-500 italic">No significant learning gaps flagged.</p>
            )}
          </CardContent>
        </Card>
      </section>
    ),
    skills: (
      <section id="skills">
        <Card className="border-0 shadow-none bg-transparent">
          <CardHeader className="px-0 pt-0">
            <CardTitle className="text-xl font-bold text-slate-800">5. Skills & Competency Profile</CardTitle>
          </CardHeader>
          <CardContent className="px-0">
            <div className="bg-slate-50/60 p-4 rounded-xl border border-slate-200/60">
              <SkillRadar
                title=""
                data={skills.map((s) => ({ category: s.category, level: s.level }))}
              />
            </div>
          </CardContent>
        </Card>
      </section>
    ),
    personality: (
      <section id="personality">
        <Card className="border-0 shadow-none bg-transparent">
          <CardHeader className="px-0 pt-0">
            <CardTitle className="text-xl font-bold text-slate-800">6. Personality-Development Observations</CardTitle>
          </CardHeader>
          <CardContent className="px-0 space-y-3">
            {db.observations
              .filter((o) => o.studentId === studentId)
              .map((o) => (
                <div key={o.id} className="text-sm border-l-4 border-emerald-500 pl-4 py-2 bg-slate-50/80 rounded-r-xl border-y border-r border-slate-200/60">
                  <p className="font-bold text-slate-800">{o.trait}</p>
                  <p className="text-slate-600 mt-0.5">{o.note}</p>
                  <p className="text-xs text-slate-400 mt-1">{o.date}</p>
                </div>
              ))}
          </CardContent>
        </Card>
      </section>
    ),
    behaviour: (
      <section id="behaviour">
        <Card className="border-0 shadow-none bg-transparent">
          <CardHeader className="px-0 pt-0">
            <CardTitle className="text-xl font-bold text-slate-800">7. Participation, Behaviour & Responsibility</CardTitle>
          </CardHeader>
          <CardContent className="px-0">
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/70 text-sm text-slate-700 leading-relaxed">
              Demonstrates consistent classroom participation and collaborative behaviour in group
              activities. Takes active responsibility for assigned leadership roles in school projects.
            </div>
          </CardContent>
        </Card>
      </section>
    ),
    activities: (
      <section id="activities">
        <Card className="border-0 shadow-none bg-transparent">
          <CardHeader className="px-0 pt-0">
            <CardTitle className="text-xl font-bold text-slate-800">8. Activities, Projects & Achievements</CardTitle>
          </CardHeader>
          <CardContent className="px-0 grid gap-3 sm:grid-cols-2">
            {portfolio.map((p) => (
              <div key={p.id} className="rounded-xl border border-slate-200/80 bg-slate-50/60 p-4 text-sm space-y-1">
                <p className="font-bold text-slate-800">{p.title}</p>
                <p className="text-slate-600">{p.description}</p>
                {p.verified ? <Badge className="bg-emerald-600 text-white text-xs mt-2">Verified</Badge> : null}
              </div>
            ))}
          </CardContent>
        </Card>
      </section>
    ),
    reflection: (
      <section id="reflection">
        <Card className="border-0 shadow-none bg-transparent">
          <CardHeader className="px-0 pt-0">
            <CardTitle className="text-xl font-bold text-slate-800">9. Student Self-Reflection</CardTitle>
          </CardHeader>
          <CardContent className="px-0">
            <div className="p-5 bg-sky-50/70 border border-sky-100 rounded-2xl text-slate-700 italic text-sm leading-relaxed">
              "{selfReflectionQuote(student.name)}"
            </div>
          </CardContent>
        </Card>
      </section>
    ),
    feedback: (
      <section id="feedback">
        <Card className="border-0 shadow-none bg-transparent">
          <CardHeader className="px-0 pt-0">
            <CardTitle className="text-xl font-bold text-slate-800">10. Teacher & Parent Feedback</CardTitle>
          </CardHeader>
          <CardContent className="px-0 space-y-3">
            {db.teacherFeedbacks
              .filter((f) => f.studentId === studentId)
              .map((f) => (
                <blockquote key={f.id} className="text-sm border-l-4 border-sky-500 pl-4 py-2 bg-slate-50 rounded-r-xl text-slate-700">
                  {f.note}
                </blockquote>
              ))}
          </CardContent>
        </Card>
      </section>
    ),
    career: (
      <section id="career">
        <Card className="border-0 shadow-none bg-transparent">
          <CardHeader className="px-0 pt-0">
            <CardTitle className="text-xl font-bold text-slate-800 flex items-center gap-2">
              11. Career Interests & Readiness
              <AiBadge />
            </CardTitle>
          </CardHeader>
          <CardContent className="px-0 space-y-3">
            {suggestions.map((s) => (
              <div key={s.id} className="rounded-xl border border-slate-200/80 bg-slate-50/70 p-4 space-y-1">
                <p className="font-bold text-slate-800 text-base">{s.pathway}</p>
                <p className="text-sm text-slate-600">{s.rationale}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>
    ),
    interventions: (
      <section id="interventions">
        <Card className="border-0 shadow-none bg-transparent">
          <CardHeader className="px-0 pt-0">
            <CardTitle className="text-xl font-bold text-slate-800 flex items-center gap-2">
              12. Recommended Interventions
              <AiBadge />
            </CardTitle>
          </CardHeader>
          <CardContent className="px-0">
            <div className="bg-amber-50/60 border border-amber-100 p-5 rounded-2xl">
              <ul className="list-disc pl-5 text-sm text-slate-700 space-y-2">
                {reportInterventions(studentId, db).map((item) => (
                  <li key={item}>{item}</li>
                ))}
                <li className="font-semibold text-amber-900">{learningRecommendation(studentId, db)}</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </section>
    ),
    plan: (
      <section id="plan">
        <Card className="border-0 shadow-none bg-transparent">
          <CardHeader className="px-0 pt-0">
            <CardTitle className="text-xl font-bold text-slate-800">13. Three-Month Development Plan</CardTitle>
          </CardHeader>
          <CardContent className="px-0">
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
    ),
  };

  return (
    <div className="print-report max-w-4xl mx-auto pb-12">
      <PageHeader
        title="Student 360° Report"
        description={`${student.name} · ${student.grade}`}
        actions={
          showPrintButton ? (
            <Button variant="outline" onClick={() => window.print()} className="no-print border-slate-300">
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

      {/* Book Tabs Navigation */}
      <div className="no-print mb-6 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-100/90 p-2 rounded-2xl border border-slate-200/80">
          <div className="flex flex-wrap items-center gap-1.5 flex-1">
            {sections.map((s) => {
              const isActive = activeTab === s.id;
              return (
                <button
                  key={s.id}
                  onClick={() => handleTabChange(s.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 ${
                    isActive
                      ? "bg-white text-emerald-700 shadow-sm border border-slate-200/90 scale-105"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/60"
                  }`}
                >
                  {s.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Page Turner Controls */}
        <div className="flex items-center justify-between px-2 text-sm text-slate-600">
          <Button
            variant="ghost"
            size="sm"
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className="text-xs font-bold text-emerald-700 hover:text-emerald-800 disabled:opacity-30"
          >
            <ChevronLeft className="size-4 mr-1" />
            Previous Section
          </Button>

          <div className="flex items-center gap-2 font-bold text-xs text-slate-500 uppercase tracking-wider bg-slate-50 px-3 py-1 rounded-full border border-slate-200">
            <span>Section {activeSection.num} of {sections.length}</span>
            <span className="text-slate-300">•</span>
            <span className="text-slate-800">{activeSection.label}</span>
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={handleNext}
            disabled={currentIndex === sections.length - 1}
            className="text-xs font-bold text-emerald-700 hover:text-emerald-800 disabled:opacity-30"
          >
            Next Section
            <ChevronRight className="size-4 ml-1" />
          </Button>
        </div>
      </div>

      {/* Main 3D Book Area */}
      <div className="no-print book-perspective my-2">
        <div
          key={animKey}
          className={`book-paper-shadow relative rounded-2xl bg-white border border-slate-200/90 overflow-hidden min-h-[460px] p-6 sm:p-10 ${
            animDirection === "next" ? "animate-book-flip-next" : "animate-book-flip-prev"
          }`}
        >
          {/* Book Spine Shadow Gradient */}
          <div className="absolute left-0 top-0 bottom-0 w-6 book-spine-gradient pointer-events-none z-10" />

          {/* Book Header Bar */}
          <div className="flex items-center justify-between pb-6 mb-6 border-b border-slate-100 text-xs text-slate-400 font-medium">
            <div className="flex items-center gap-2">
              <BookOpen className="size-3.5 text-emerald-600" />
              <span className="font-semibold text-slate-600">SCHOOL360 STUDENT REPORT BOOK</span>
            </div>
            <div>{student.name} ({student.grade})</div>
          </div>

          {/* Active Page Content */}
          <div className="relative z-0 min-h-[300px]">
            {sectionContentMap[activeTab]}
          </div>

          {/* Book Footer Page Turn Navigation */}
          <div className="mt-10 pt-6 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className="flex items-center gap-1 font-semibold text-emerald-700 hover:underline disabled:opacity-30 disabled:no-underline"
            >
              <ChevronLeft className="size-3.5" />
              {currentIndex > 0 ? sections[currentIndex - 1].label : "Start"}
            </button>

            <span className="font-semibold text-slate-400">Page {activeSection.num} / {sections.length}</span>

            <button
              onClick={handleNext}
              disabled={currentIndex === sections.length - 1}
              className="flex items-center gap-1 font-semibold text-emerald-700 hover:underline disabled:opacity-30 disabled:no-underline"
            >
              {currentIndex < sections.length - 1 ? sections[currentIndex + 1].label : "End"}
              <ChevronRight className="size-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Hidden Print Container (renders all sections when downloading PDF / printing) */}
      <div className="hidden print:block space-y-8">
        {sections.map((s) => (
          <div key={s.id} className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
            {sectionContentMap[s.id]}
          </div>
        ))}
      </div>
    </div>
  );
}
