import { useState } from "react";
import { LinkButton } from "@/components/shared/LinkButton";
import { useAuth } from "@/context/AuthContext";
import { useAppData } from "@/context/AppDataContext";
import { studentsNeedingSupport } from "@/lib/risk";
import { NewCounsellingCaseDialog } from "@/components/dialogs/NewCounsellingCaseDialog";
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
import { Users, BookOpen } from "lucide-react";
import { getStudentRiskLevel } from "@/lib/risk";

export function TeacherDashboard() {
  const { session } = useAuth();
  const { db } = useAppData();
  const [drawerId, setDrawerId] = useState<string | null>(null);
  const [referOpen, setReferOpen] = useState(false);

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
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Active intervention plans</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {db.interventionPlans
              .filter((p) => p.teacherId === session?.userId)
              .map((p) => (
                <div key={p.id} className="flex justify-between text-sm">
                  <span>{p.topic}</span>
                  <Badge variant="outline">{p.status}</Badge>
                </div>
              ))}
            <LinkButton to="/teacher/interventions" variant="link" size="sm" className="px-0">
              View all
            </LinkButton>
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
    </div>
  );
}
