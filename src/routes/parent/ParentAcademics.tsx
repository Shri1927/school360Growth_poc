import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useAppData } from "@/context/AppDataContext";
import { getLinkedStudentsForParent } from "@/lib/studentHelpers";
import { onSelectString } from "@/lib/selectHelpers";
import { PageHeader } from "@/components/shared/PageHeader";
import { TrendChart } from "@/components/shared/TrendChart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function ParentAcademics() {
  const { session } = useAuth();
  const { db } = useAppData();
  const children = session ? getLinkedStudentsForParent(session.userId, db) : [];
  const [childId, setChildId] = useState(children[0]?.id ?? "");
  const child = db.students.find((s) => s.id === childId);
  if (!child) return null;

  const chartData = db.assessments
    .filter((a) => a.studentId === child.id && a.subjectId === "sub-math")
    .slice(-6)
    .map((a) => ({ label: a.term, value: Math.round((a.score / a.maxScore) * 100) }));

  return (
    <div>
      <PageHeader
        title="Academic trends"
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
      <TrendChart title={`${child.name} — Mathematics`} data={chartData} />
    </div>
  );
}
