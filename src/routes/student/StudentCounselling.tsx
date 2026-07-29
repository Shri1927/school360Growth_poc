import { useState } from "react";
import { Lock } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useAppData } from "@/context/AppDataContext";
import { counsellingStatusLabel } from "@/lib/risk";
import { getStudentForSession } from "@/lib/studentHelpers";
import { BookAppointmentDialog } from "@/components/dialogs/BookAppointmentDialog";
import { NewCounsellingCaseDialog } from "@/components/dialogs/NewCounsellingCaseDialog";
import { PageHeader } from "@/components/shared/PageHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function StudentCounselling() {
  const { session } = useAuth();
  const { db } = useAppData();
  const student = getStudentForSession(session, db);
  const [apptOpen, setApptOpen] = useState(false);
  const [concernOpen, setConcernOpen] = useState(false);

  if (!student) return null;

  const cases = db.counsellingCases.filter((c) => c.studentId === student.id);
  const appts = db.appointments.filter((a) => a.studentId === student.id);
  const status = counsellingStatusLabel(student.id, db);

  return (
    <div>
      <PageHeader
        title="Counselling support"
        description="Book appointments and view your support status"
        actions={
          <>
            <Button variant="outline" onClick={() => setConcernOpen(true)}>
              Raise a concern
            </Button>
            <Button onClick={() => setApptOpen(true)}>Book appointment</Button>
          </>
        }
      />
      {status ? (
        <Card className="mb-6 border-indigo-200 bg-indigo-50/30">
          <CardContent className="pt-6 flex items-center gap-2">
            <Badge>{status}</Badge>
            <p className="text-sm text-muted-foreground">
              Detailed counsellor notes are confidential and not shown here.
            </p>
          </CardContent>
        </Card>
      ) : null}
      {cases.map((c) => (
        <Card key={c.id} className="mb-4">
          <CardHeader>
            <CardTitle className="text-base">{c.concern}</CardTitle>
          </CardHeader>
          <CardContent className="text-sm space-y-2">
            <p>
              Status: <Badge variant="outline">{c.status}</Badge>
            </p>
            {c.supportPlan ? (
              <p className="text-muted-foreground">Support plan summary available to you when active.</p>
            ) : null}
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Lock className="size-3" />
              Restricted counsellor notes are not visible in student view
            </div>
          </CardContent>
        </Card>
      ))}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Appointments</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {appts.map((a) => (
            <div key={a.id} className="text-sm flex justify-between">
              <span>{new Date(a.dateTime).toLocaleString()}</span>
              <Badge variant="outline">{a.status}</Badge>
            </div>
          ))}
        </CardContent>
      </Card>
      <BookAppointmentDialog studentId={student.id} open={apptOpen} onOpenChange={setApptOpen} />
      <NewCounsellingCaseDialog
        open={concernOpen}
        onOpenChange={setConcernOpen}
        defaultStudentId={student.id}
        referredBy={session?.userId}
      />
    </div>
  );
}
