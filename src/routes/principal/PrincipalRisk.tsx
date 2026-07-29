import { useAppData } from "@/context/AppDataContext";
import { getStudentRiskLevel } from "@/lib/risk";
import { PageHeader } from "@/components/shared/PageHeader";
import { RiskBadge } from "@/components/shared/RiskBadge";
import { TrendChart } from "@/components/shared/TrendChart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function PrincipalRisk() {
  const { db } = useAppData();
  const riskChart = db.riskTrend.map((r) => ({ label: r.month.slice(5), value: r.atRiskCount }));
  const atRiskStudents = db.students.filter((s) => getStudentRiskLevel(s.id, db) !== "low");

  return (
    <div>
      <PageHeader title="Risk & intervention outcomes" />
      <TrendChart title="At-risk count over time" data={riskChart} />
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="text-base">Students flagged</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student</TableHead>
                <TableHead>Class</TableHead>
                <TableHead>Risk level</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {atRiskStudents.map((s) => (
                <TableRow key={s.id}>
                  <TableCell>{s.name}</TableCell>
                  <TableCell>{s.grade}</TableCell>
                  <TableCell>
                    <RiskBadge level={getStudentRiskLevel(s.id, db)} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
