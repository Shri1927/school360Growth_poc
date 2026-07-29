import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useAppData } from "@/context/AppDataContext";
import { getLinkedStudentsForParent } from "@/lib/studentHelpers";
import { onSelectString } from "@/lib/selectHelpers";
import { PageHeader } from "@/components/shared/PageHeader";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function ParentFeedback() {
  const { session } = useAuth();
  const { db } = useAppData();
  const children = session ? getLinkedStudentsForParent(session.userId, db) : [];
  const [childId, setChildId] = useState(children[0]?.id ?? "");
  const [subjectFilter, setSubjectFilter] = useState("all");

  const feedbacks = db.teacherFeedbacks.filter((f) => {
    if (f.studentId !== childId) return false;
    if (subjectFilter === "all") return true;
    return f.subjectId === subjectFilter;
  });

  return (
    <div>
      <PageHeader
        title="Teacher feedback log"
        actions={
          <div className="flex gap-2">
            <Select value={childId} onValueChange={onSelectString(setChildId)}>
              <SelectTrigger className="w-40">
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
            <Select value={subjectFilter} onValueChange={onSelectString(setSubjectFilter)}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All subjects</SelectItem>
                {db.subjects.map((s) => (
                  <SelectItem key={s.id} value={s.id}>
                    {s.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        }
      />
      <div className="space-y-3">
        {feedbacks.map((f) => (
          <Card key={f.id}>
            <CardContent className="pt-6">
              <p className="text-xs text-muted-foreground mb-1">
                {db.subjects.find((s) => s.id === f.subjectId)?.name} · {f.date}
              </p>
              <p className="text-sm">{f.note}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
