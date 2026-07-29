import { useState } from "react";
import { AlertTriangle } from "lucide-react";
import { LinkButton } from "@/components/shared/LinkButton";
import { useAuth } from "@/context/AuthContext";
import { useAppData } from "@/context/AppDataContext";
import { computeGrowthIndex } from "@/lib/growthIndex";
import { parentProgressSummary } from "@/lib/mockAi";
import { counsellingStatusLabel } from "@/lib/risk";
import { attendancePercent, getLinkedStudentsForParent } from "@/lib/studentHelpers";
import { onSelectString } from "@/lib/selectHelpers";
import { AiBadge } from "@/components/shared/AiBadge";
import { GrowthIndexGauge } from "@/components/shared/GrowthIndexGauge";
import { PageHeader } from "@/components/shared/PageHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function ParentDashboard() {
  const { session } = useAuth();
  const { db, setPendingActionStatus } = useAppData();
  const children = session ? getLinkedStudentsForParent(session.userId, db) : [];
  const [childId, setChildId] = useState(children[0]?.id ?? "");

  const child = db.students.find((s) => s.id === childId);
  if (!child || !session) return null;

  const growth = computeGrowthIndex(child.id, db);
  const att = attendancePercent(child.id, db);
  const pending = db.pendingActions.filter(
    (p) => p.parentUserId === session.userId && p.studentId === child.id && p.status === "pending",
  );
  const feedbacks = db.teacherFeedbacks.filter((f) => f.studentId === child.id).slice(0, 3);
  const support = counsellingStatusLabel(child.id, db);

  return (
    <div>
      <PageHeader
        title={`Parent view — ${session.userId === "usr-par-001" ? "Rajesh Sharma" : db.users.find((u) => u.id === session.userId)?.name}`}
        description={`Monitoring progress for linked child(ren)`}
        actions={
          children.length > 1 ? (
            <Select value={childId} onValueChange={onSelectString(setChildId)}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {children.map((c) => (
                  <SelectItem key={c.id} value={c.id}>
                    {c.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          ) : null
        }
      />
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            Overall progress — {child.name}
            <AiBadge />
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col sm:flex-row gap-6">
          <GrowthIndexGauge value={growth} />
          <p className="text-sm text-muted-foreground flex-1">{parentProgressSummary(child.id, db)}</p>
        </CardContent>
      </Card>
      {att < 85 ? (
        <Card className="mb-6 border-amber-200 bg-amber-50/40">
          <CardContent className="pt-6 flex gap-2">
            <AlertTriangle className="size-5 text-amber-600 shrink-0" />
            <div>
              <p className="font-medium text-sm">Attendance alert</p>
              <p className="text-sm text-muted-foreground">
                Attendance dropped below 85% this month ({att}%).
              </p>
              <p className="text-xs text-muted-foreground mt-1">Reason recorded: Family travel (mock)</p>
            </div>
          </CardContent>
        </Card>
      ) : null}
      {support ? (
        <Card className="mb-6">
          <CardContent className="pt-6 text-sm">{support}</CardContent>
        </Card>
      ) : null}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Pending actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {pending.map((p) => (
              <div key={p.id} className="border rounded-lg p-3">
                <p className="font-medium text-sm">{p.title}</p>
                <p className="text-xs text-muted-foreground">{p.description}</p>
                <div className="flex gap-2 mt-2">
                  <Button size="sm" onClick={() => setPendingActionStatus(p.id, "approved")}>
                    Approve
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => setPendingActionStatus(p.id, "declined")}>
                    Decline
                  </Button>
                </div>
              </div>
            ))}
            {!pending.length ? <p className="text-sm text-muted-foreground">No pending actions.</p> : null}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Recent teacher feedback</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {feedbacks.map((f) => (
              <blockquote key={f.id} className="text-sm border-l-2 pl-3">
                {f.note}
              </blockquote>
            ))}
          </CardContent>
        </Card>
      </div>
      <LinkButton to="/parent/report" className="mt-6">
        View full 360° Report
      </LinkButton>
    </div>
  );
}
