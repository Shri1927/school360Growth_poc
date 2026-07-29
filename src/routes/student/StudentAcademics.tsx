import { useAuth } from "@/context/AuthContext";
import { useAppData } from "@/context/AppDataContext";
import { getStudentForSession } from "@/lib/studentHelpers";
import { PageHeader } from "@/components/shared/PageHeader";
import { TrendChart } from "@/components/shared/TrendChart";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function StudentAcademics() {
  const { session } = useAuth();
  const { db } = useAppData();
  const student = getStudentForSession(session, db);
  if (!student) return null;

  const assessments = db.assessments.filter((a) => a.studentId === student.id);
  const gaps = db.learningGaps.filter((g) => g.studentId === student.id);
  const bySubject = db.subjects.map((sub) => {
    const rows = assessments.filter((a) => a.subjectId === sub.id);
    const chart = rows.slice(-4).map((r) => ({
      label: r.term,
      value: Math.round((r.score / r.maxScore) * 100),
    }));
    return { sub, chart };
  });

  return (
    <div>
      <PageHeader title="Academics" description="Subject performance, marks, and learning gaps" />
      <div className="grid gap-6 lg:grid-cols-2 mb-6">
        {bySubject.slice(0, 2).map(({ sub, chart }) => (
          <TrendChart key={sub.id} title={sub.name} data={chart} />
        ))}
      </div>
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-base">Assessment history</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Subject</TableHead>
                <TableHead>Term</TableHead>
                <TableHead>Score</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {assessments.slice(0, 12).map((a) => (
                <TableRow key={a.id}>
                  <TableCell>{db.subjects.find((s) => s.id === a.subjectId)?.name}</TableCell>
                  <TableCell>{a.term}</TableCell>
                  <TableCell>
                    {a.score}/{a.maxScore}
                  </TableCell>
                  <TableCell>{a.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Learning gaps</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {gaps.map((g) => (
            <div key={g.id} className="flex items-center gap-2 text-sm">
              <Badge variant="outline">{g.severity}</Badge>
              <span>
                {db.subjects.find((s) => s.id === g.subjectId)?.name}: {g.topic}
              </span>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
