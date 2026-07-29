import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useAppData } from "@/context/AppDataContext";
import { attendancePercent } from "@/lib/studentHelpers";
import { getStudentRiskLevel } from "@/lib/risk";
import { LinkButton } from "@/components/shared/LinkButton";
import { PageHeader } from "@/components/shared/PageHeader";
import { RiskBadge } from "@/components/shared/RiskBadge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

export function TeacherClassRoster() {
  const { classId } = useParams<{ classId: string }>();
  const { db, updateDb } = useAppData();
  const [marksOpen, setMarksOpen] = useState(false);

  const cls = db.classes.find((c) => c.id === classId);
  const roster = db.students.filter((s) => s.classId === classId);

  if (!cls) return null;

  const markPresent = (studentId: string) => {
    updateDb((prev) => ({
      ...prev,
      attendance: prev.attendance.map((a) =>
        a.studentId === studentId ? { ...a, presentDays: a.presentDays + 1 } : a,
      ),
    }));
  };

  return (
    <div>
      <PageHeader
        title={cls.name}
        description="Class roster · attendance & marks"
        actions={
          <>
            <Button variant="outline" onClick={() => setMarksOpen(!marksOpen)}>
              Enter marks (demo)
            </Button>
            <LinkButton to="/teacher" variant="ghost">
              ← Dashboard
            </LinkButton>
          </>
        }
      />
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Roster</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Roll</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Attendance</TableHead>
                <TableHead>Risk</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {roster.map((s) => {
                const att = attendancePercent(s.id, db);
                return (
                  <TableRow key={s.id}>
                    <TableCell>{s.rollNo}</TableCell>
                    <TableCell>
                      <Link className="text-primary hover:underline" to={`/teacher/students/${s.id}`}>
                        {s.name}
                      </Link>
                    </TableCell>
                    <TableCell>
                      <span
                        className={cn(
                          "font-medium",
                          att < 75 ? "text-rose-600" : att < 85 ? "text-amber-600" : "text-emerald-600",
                        )}
                      >
                        {att}%
                      </span>
                    </TableCell>
                    <TableCell>
                      <RiskBadge level={getStudentRiskLevel(s.id, db)} />
                    </TableCell>
                    <TableCell className="space-x-2">
                      <Button size="sm" variant="outline" onClick={() => markPresent(s.id)}>
                        Mark present
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      {marksOpen ? (
        <p className="text-sm text-muted-foreground mt-4">
          Marks entry saved locally when creating interventions from student deep-dive.
        </p>
      ) : null}
    </div>
  );
}
