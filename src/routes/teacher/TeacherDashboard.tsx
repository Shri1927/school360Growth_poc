import { useState } from "react";
import { LinkButton } from "@/components/shared/LinkButton";
import { useAuth } from "@/context/AuthContext";
import { useAppData } from "@/context/AppDataContext";
import { studentsNeedingSupport } from "@/lib/risk";
import { NewCounsellingCaseDialog } from "@/components/dialogs/NewCounsellingCaseDialog";
import { LogInterventionDialog } from "@/components/dialogs/LogInterventionDialog";
import { PageHeader } from "@/components/shared/PageHeader";
import { RiskBadge } from "@/components/shared/RiskBadge";
import { StatCard } from "@/components/shared/StatCard";
import { StudentProfileDrawer } from "@/components/shared/StudentProfileDrawer";
import { TrendChart } from "@/components/shared/TrendChart";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Users, BookOpen, Plus, Sparkles } from "lucide-react";
import { getStudentRiskLevel } from "@/lib/risk";

export function TeacherDashboard() {
  const { session } = useAuth();
  const { db } = useAppData();
  const [drawerId, setDrawerId] = useState<string | null>(null);
  const [referOpen, setReferOpen] = useState(false);
  const [logInterventionOpen, setLogInterventionOpen] = useState(false);

  const teacherId = session?.userId || "usr-tch-001";
  const teacherPlans = db.interventionPlans.filter(
    (p) => p.teacherId === teacherId || p.teacherId === "usr-tch-001"
  );

  const teacherClasses = db.classes.filter((c) =>
    Object.values(c.subjectTeacherIds).includes(session?.userId ?? ""),
  );
  const support = studentsNeedingSupport(db).slice(0, 8);
  const chartData = ["Term 1", "Mid-term", "Term 2", "Final"].map((term, i) => ({
    label: term,
    value: 68 + i * 3,
  }));

  return (
    <div>
      <PageHeader
        title="Teacher view — Mrs. Iyer"
        description="Grade 10-B Mathematics · Class overview"
        actions={
          <Button variant="outline" onClick={() => setReferOpen(true)}>
            Raise a concern
          </Button>
        }
      />
      {/* AI Teaching Assistant Banner Widget */}
      <Card className="mb-6 border-indigo-200 bg-gradient-to-r from-indigo-900 via-slate-900 to-indigo-950 text-white shadow-md overflow-hidden">
        <CardContent className="p-5 space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-indigo-300 text-xs font-extrabold uppercase tracking-wider">
                <Sparkles className="size-4 text-amber-300 animate-pulse" />
                <span>AI Teaching Assistant & Lesson Copilot</span>
              </div>
              <h3 className="text-lg md:text-xl font-black text-white">
                Fast-Track Teaching Techniques, Videos, PPTs & PYQs
              </h3>
              <p className="text-xs text-slate-300">
                Searching for topics like <strong className="text-amber-300">Pythagoras Theorem (Algebra)</strong> populates 15s visual videos, lesson plans, PPTs & past board exam solutions.
              </p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <LinkButton to="/teacher/ai-assistant" className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-bold text-xs px-4 h-9 rounded-xl shadow-md border-0">
                <Sparkles className="size-3.5 mr-1.5 text-amber-300" /> Launch AI Assistant
              </LinkButton>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-white/10 text-xs">
            <span className="text-slate-400 font-semibold">Featured Topic Demo:</span>
            <LinkButton to="/teacher/ai-assistant" size="sm" variant="ghost" className="h-7 text-xs bg-white/10 text-slate-200 hover:bg-white/20 border border-white/10 rounded-lg">
              📐 Pythagoras Theorem (Algebra)
            </LinkButton>
            <LinkButton to="/teacher/ai-assistant" size="sm" variant="ghost" className="h-7 text-xs bg-white/10 text-slate-200 hover:bg-white/20 border border-white/10 rounded-lg">
              📈 Quadratic Equations
            </LinkButton>
            <LinkButton to="/teacher/ai-assistant" size="sm" variant="ghost" className="h-7 text-xs bg-white/10 text-slate-200 hover:bg-white/20 border border-white/10 rounded-lg">
              🌿 Photosynthesis
            </LinkButton>
            <LinkButton to="/teacher/ai-assistant" size="sm" variant="ghost" className="h-7 text-xs bg-white/10 text-slate-200 hover:bg-white/20 border border-white/10 rounded-lg">
              🚀 Newton's Laws
            </LinkButton>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mb-6">
        {teacherClasses.map((cls) => {
          const count = db.students.filter((s) => s.classId === cls.id).length;
          const analytics = db.classAnalytics.find((a) => a.classId === cls.id);
          return (
            <Card key={cls.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">{cls.name}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <StatCard icon={Users} label="Students" value={String(count)} />
                <StatCard icon={BookOpen} label="Avg score" value={`${analytics?.averageScore ?? "—"}%`} />
                <LinkButton to={`/teacher/classes/${cls.id}`} size="sm" className="w-full mt-2">
                  Open class
                </LinkButton>
              </CardContent>
            </Card>
          );
        })}
      </div>
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-base">Students requiring support</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student</TableHead>
                <TableHead>Grade</TableHead>
                <TableHead>Risk</TableHead>
                <TableHead />
              </TableRow>
            </TableHeader>
            <TableBody>
              {support.map((s) => (
                <TableRow key={s.id}>
                  <TableCell>{s.name}</TableCell>
                  <TableCell>{s.grade}</TableCell>
                  <TableCell>
                    <RiskBadge level={getStudentRiskLevel(s.id, db)} />
                  </TableCell>
                  <TableCell>
                    <Button size="sm" variant="outline" onClick={() => setDrawerId(s.id)}>
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="rounded-2xl border-slate-200">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-base font-bold text-slate-800">Active Intervention Plans</CardTitle>
            <div className="flex items-center gap-2">
              <Button size="sm" variant="outline" onClick={() => setLogInterventionOpen(true)} className="h-7 text-xs border-emerald-300 text-emerald-700 hover:bg-emerald-50">
                <Plus className="size-3 mr-1" /> New Plan
              </Button>
              <LinkButton to="/teacher/interventions" variant="ghost" size="sm" className="h-7 text-xs text-slate-600">
                View all
              </LinkButton>
            </div>
          </CardHeader>
          <CardContent className="space-y-2.5 pt-2">
            {teacherPlans.length > 0 ? (
              teacherPlans.slice(0, 4).map((p) => {
                const student = db.students.find((s) => s.id === p.studentId);
                return (
                  <div key={p.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-800 text-sm">{p.topic}</span>
                      <Badge className={p.status === "active" ? "bg-emerald-100 text-emerald-800 border-emerald-300 font-semibold text-[11px]" : "bg-sky-100 text-sky-800 border-sky-300 font-semibold text-[11px]"} variant="outline">
                        {p.status}
                      </Badge>
                    </div>
                    {student && (
                      <p className="text-xs font-semibold text-emerald-700">{student.name} ({student.grade})</p>
                    )}
                    <p className="text-xs text-slate-600 line-clamp-1">{p.action}</p>
                  </div>
                );
              })
            ) : (
              <p className="text-sm text-slate-500 py-4 text-center">No active intervention plans logged yet.</p>
            )}
          </CardContent>
        </Card>
        <TrendChart title="Class average trend" data={chartData} />
      </div>
      <StudentProfileDrawer
        studentId={drawerId}
        open={Boolean(drawerId)}
        onOpenChange={(o) => !o && setDrawerId(null)}
        viewerRole="teacher"
      />
      <NewCounsellingCaseDialog
        open={referOpen}
        onOpenChange={setReferOpen}
        referredBy={session?.userId}
      />
      <LogInterventionDialog
        teacherId={teacherId}
        open={logInterventionOpen}
        onOpenChange={setLogInterventionOpen}
      />
    </div>
  );
}
