import { useState } from "react";
import { Lock } from "lucide-react";
import { useAppData } from "@/context/AppDataContext";
import { NewCounsellingCaseDialog } from "@/components/dialogs/NewCounsellingCaseDialog";
import { LinkButton } from "@/components/shared/LinkButton";
import { PageHeader } from "@/components/shared/PageHeader";
import { Badge } from "@/components/ui/badge";
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

export function CounsellorDashboard() {
  const { db } = useAppData();
  const [open, setOpen] = useState(false);
  const today = new Date().toISOString().slice(0, 10);
  const todayAppts = db.appointments.filter((a) => a.dateTime.startsWith(today));
  const openCases = db.counsellingCases.filter((c) => c.status !== "closed");
  const closed = db.counsellingCases.filter((c) => c.status === "closed").length;

  return (
    <div>
      <PageHeader
        title="Counsellor view — Dr. Desai"
        description="Appointments and case priorities"
        actions={
          <Button onClick={() => setOpen(true)}>New referral</Button>
        }
      />
      <div className="grid gap-6 lg:grid-cols-2 mb-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Today&apos;s appointments</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {todayAppts.length ? (
              todayAppts.map((a) => (
                <div key={a.id} className="text-sm flex justify-between">
                  <span>{db.students.find((s) => s.id === a.studentId)?.name}</span>
                  <Badge variant="outline">{a.status}</Badge>
                </div>
              ))
            ) : (
              <p className="text-sm text-muted-foreground">No appointments today — see upcoming list.</p>
            )}
            {db.appointments.slice(0, 3).map((a) => (
              <div key={a.id} className="text-sm flex justify-between border-t pt-2">
                <span>
                  {db.students.find((s) => s.id === a.studentId)?.name} ·{" "}
                  {new Date(a.dateTime).toLocaleDateString()}
                </span>
                <Badge variant="outline">{a.status}</Badge>
              </div>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Outcome tracking</CardTitle>
          </CardHeader>
          <CardContent className="text-sm space-y-2">
            <p>Open / in-progress: {openCases.length}</p>
            <p>Closed: {closed}</p>
            <p className="text-muted-foreground">Avg resolution time: 18 days (mock)</p>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            Case priority list
            <Lock className="size-4 text-muted-foreground" />
            <span className="text-xs font-normal text-muted-foreground">Restricted — Counsellor only</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student</TableHead>
                <TableHead>Concern</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Status</TableHead>
                <TableHead />
              </TableRow>
            </TableHeader>
            <TableBody>
              {openCases.map((c) => (
                <TableRow key={c.id}>
                  <TableCell>{db.students.find((s) => s.id === c.studentId)?.name}</TableCell>
                  <TableCell>{c.concern}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{c.priority}</Badge>
                  </TableCell>
                  <TableCell>{c.status}</TableCell>
                  <TableCell>
                    <LinkButton to={`/counsellor/cases/${c.id}`} size="sm" variant="outline">
                      Open
                    </LinkButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <NewCounsellingCaseDialog open={open} onOpenChange={setOpen} />
    </div>
  );
}
