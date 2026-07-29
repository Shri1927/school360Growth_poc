import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useAppData } from "@/context/AppDataContext";
import { attendancePercent, getLinkedStudentsForParent } from "@/lib/studentHelpers";
import { onSelectString } from "@/lib/selectHelpers";
import { PageHeader } from "@/components/shared/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function ParentAttendance() {
  const { session } = useAuth();
  const { db } = useAppData();
  const children = session ? getLinkedStudentsForParent(session.userId, db) : [];
  const [childId, setChildId] = useState(children[0]?.id ?? "");
  const child = db.students.find((s) => s.id === childId);
  if (!child) return null;

  const att = db.attendance.find((a) => a.studentId === child.id);
  const pct = attendancePercent(child.id, db);

  return (
    <div>
      <PageHeader
        title="Attendance"
        actions={
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
        }
      />
      <Card>
        <CardHeader>
          <CardTitle className="text-base">{child.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold">{pct}%</p>
          <p className="text-sm text-muted-foreground">
            {att?.presentDays}/{att?.totalDays} days present ({att?.month})
          </p>
          {pct < 85 ? (
            <p className="text-sm text-amber-700 mt-4">
              Alert: Below 85% threshold. Reason recorded: Family travel (mock).
            </p>
          ) : null}
        </CardContent>
      </Card>
    </div>
  );
}
