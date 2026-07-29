import { useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useAppData } from "@/context/AppDataContext";
import { counsellingStatusLabel, isReferredForCounselling } from "@/lib/risk";
import { LogInterventionDialog } from "@/components/dialogs/LogInterventionDialog";
import { NewObservationDialog } from "@/components/dialogs/NewObservationDialog";
import { NewCounsellingCaseDialog } from "@/components/dialogs/NewCounsellingCaseDialog";
import { LinkButton } from "@/components/shared/LinkButton";
import { PageHeader } from "@/components/shared/PageHeader";
import { TrendChart } from "@/components/shared/TrendChart";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function TeacherStudentDetail() {
  const { studentId } = useParams<{ studentId: string }>();
  const { session } = useAuth();
  const { db, verifyPortfolioItem } = useAppData();
  const [intOpen, setIntOpen] = useState(false);
  const [obsOpen, setObsOpen] = useState(false);
  const [referOpen, setReferOpen] = useState(false);

  const student = db.students.find((s) => s.id === studentId);
  if (!student || !session) return null;

  const chartData = db.assessments
    .filter((a) => a.studentId === student.id && a.subjectId === "sub-math")
    .map((a) => ({ label: a.term, value: Math.round((a.score / a.maxScore) * 100) }));
  const gaps = db.learningGaps.filter((g) => g.studentId === student.id);
  const pendingPortfolio = db.portfolioItems.filter((p) => p.studentId === student.id && !p.verified);
  const support = counsellingStatusLabel(student.id, db);
  const referred = isReferredForCounselling(student.id, db);

  return (
    <div>
      <PageHeader
        title={student.name}
        description={`${student.grade} · Deep-dive`}
        actions={
          <>
            <Button onClick={() => setIntOpen(true)}>Create intervention plan</Button>
            <Button variant="outline" onClick={() => setObsOpen(true)}>
              Add observation
            </Button>
            <Button variant="outline" onClick={() => setReferOpen(true)}>
              Raise concern
            </Button>
            <LinkButton to={`/teacher/classes/${student.classId}`} variant="ghost">
              ← Class
            </LinkButton>
          </>
        }
      />
      {referred ? (
        <div className="mb-4 flex gap-2 items-center">
          <Badge variant="outline">Referred for counselling</Badge>
          {support ? <span className="text-sm text-muted-foreground">{support}</span> : null}
        </div>
      ) : null}
      <TrendChart title="Mathematics trend" data={chartData} />
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="text-base">Learning gaps</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {gaps.map((g) => (
            <p key={g.id} className="text-sm">
              {db.subjects.find((s) => s.id === g.subjectId)?.name}: {g.topic} ({g.severity})
            </p>
          ))}
        </CardContent>
      </Card>
      {pendingPortfolio.length ? (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="text-base">Pending portfolio verification</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {pendingPortfolio.map((p) => (
              <div key={p.id} className="flex justify-between items-center text-sm">
                <span>{p.title}</span>
                <Button size="sm" onClick={() => verifyPortfolioItem(p.id)}>
                  Verify
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      ) : null}
      <LogInterventionDialog
        studentId={student.id}
        teacherId={session.userId}
        open={intOpen}
        onOpenChange={setIntOpen}
      />
      <NewObservationDialog
        studentId={student.id}
        teacherId={session.userId}
        open={obsOpen}
        onOpenChange={setObsOpen}
      />
      <NewCounsellingCaseDialog
        open={referOpen}
        onOpenChange={setReferOpen}
        defaultStudentId={student.id}
        referredBy={session.userId}
      />
    </div>
  );
}
