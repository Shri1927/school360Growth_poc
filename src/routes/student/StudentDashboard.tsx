import { useState } from "react";
import { BookOpen, Calendar, Target, Trophy } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useAppData } from "@/context/AppDataContext";
import { computeGrowthIndex } from "@/lib/growthIndex";
import { learningRecommendation } from "@/lib/mockAi";
import { counsellingStatusLabel } from "@/lib/risk";
import { attendancePercent, getStudentForSession, pendingAssignmentsCount } from "@/lib/studentHelpers";
import { onSelectString } from "@/lib/selectHelpers";
import { AiBadge } from "@/components/shared/AiBadge";
import { GrowthIndexGauge } from "@/components/shared/GrowthIndexGauge";
import { LinkButton } from "@/components/shared/LinkButton";
import { PageHeader } from "@/components/shared/PageHeader";
import { StatCard } from "@/components/shared/StatCard";
import { TrendChart } from "@/components/shared/TrendChart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function StudentDashboard() {
  const { session } = useAuth();
  const { db, toggleTask } = useAppData();
  const student = getStudentForSession(session, db);
  const [subjectId, setSubjectId] = useState("sub-math");

  if (!student) return null;

  const growth = computeGrowthIndex(student.id, db);
  const tasks = db.todayTasks[student.id] ?? [];
  const goals = db.goals.filter((g) => g.studentId === student.id && g.status !== "achieved").slice(0, 3);
  const portfolio = db.portfolioItems.filter((p) => p.studentId === student.id).slice(0, 3);
  const interests = db.careerInterests
    .filter((c) => c.studentId === student.id)
    .sort((a, b) => b.score - a.score)
    .slice(0, 2);
  const chartData = db.assessments
    .filter((a) => a.studentId === student.id && a.subjectId === subjectId)
    .slice(-4)
    .map((a) => ({ label: a.term, value: Math.round((a.score / a.maxScore) * 100) }));
  const support = counsellingStatusLabel(student.id, db);

  return (
    <div>
      <PageHeader
        title={`Hello, ${student.name.split(" ")[0]}`}
        description={`Student view — ${student.grade}`}
      />
      <div className="flex flex-col lg:flex-row gap-6 mb-6">
        <GrowthIndexGauge value={growth} />
        {support ? <p className="text-sm text-muted-foreground self-center">{support}</p> : null}
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-6">
        <StatCard icon={Calendar} label="Attendance" value={`${attendancePercent(student.id, db)}%`} />
        <StatCard icon={BookOpen} label="Pending assignments" value={String(pendingAssignmentsCount(student.id))} />
        <StatCard icon={Target} label="Active goals" value={String(goals.length)} />
        <StatCard icon={Trophy} label="Portfolio items" value={String(db.portfolioItems.filter((p) => p.studentId === student.id).length)} />
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Today&apos;s schedule and tasks</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {tasks.map((t) => (
              <label key={t.id} className="flex items-center gap-2 text-sm">
                <Checkbox checked={t.done} onCheckedChange={() => toggleTask(student.id, t.id)} />
                <span className={t.done ? "line-through text-muted-foreground" : ""}>{t.title}</span>
              </label>
            ))}
          </CardContent>
        </Card>
        <div>
          <Select value={subjectId} onValueChange={onSelectString(setSubjectId)}>
            <SelectTrigger className="mb-2 w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {db.subjects.map((s) => (
                <SelectItem key={s.id} value={s.id}>
                  {s.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <TrendChart title="Subject trend" data={chartData} />
        </div>
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              Learning recommendation
              <AiBadge />
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            {learningRecommendation(student.id, db)}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-base">Goals snapshot</CardTitle>
            <LinkButton to="/student/goals" variant="link" size="sm">
              View all
            </LinkButton>
          </CardHeader>
          <CardContent className="space-y-4">
            {goals.map((g) => {
              const done = g.milestones.filter((m) => m.done).length;
              const total = g.milestones.length || 1;
              return (
                <div key={g.id}>
                  <p className="text-sm font-medium">{g.title}</p>
                  <Progress value={(done / total) * 100} className="mt-1 h-2" />
                </div>
              );
            })}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Recent achievements</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            {portfolio.map((p) => (
              <div key={p.id} className="rounded-lg border px-3 py-2 text-xs">
                {p.title}
              </div>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Career exploration</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {interests.map((c) => (
              <div key={c.cluster} className="flex justify-between text-sm">
                <span>{c.cluster}</span>
                <span className="text-muted-foreground">{c.score}%</span>
              </div>
            ))}
            <LinkButton to="/student/career" variant="outline" size="sm" className="mt-2">
              Explore careers
            </LinkButton>
          </CardContent>
        </Card>
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base">Announcements</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {db.announcements.slice(0, 3).map((a) => (
              <div key={a.id} className="text-sm">
                <p className="font-medium">{a.title}</p>
                <p className="text-muted-foreground">{a.body}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
