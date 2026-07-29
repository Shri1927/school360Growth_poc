import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useAppData } from "@/context/AppDataContext";
import { getLinkedStudentsForParent } from "@/lib/studentHelpers";
import { onSelectString } from "@/lib/selectHelpers";
import { StudentReportView } from "@/components/shared/StudentReportView";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function ParentReport() {
  const { session } = useAuth();
  const { db } = useAppData();
  const children = session ? getLinkedStudentsForParent(session.userId, db) : [];
  const [childId, setChildId] = useState(children[0]?.id ?? "");

  return (
    <div>
      {children.length > 1 ? (
        <Select value={childId} onValueChange={onSelectString(setChildId)}>
          <SelectTrigger className="w-48 mb-4">
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
      ) : null}
      <StudentReportView studentId={childId} backPath="/parent" />
    </div>
  );
}
