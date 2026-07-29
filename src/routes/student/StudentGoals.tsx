import { useState } from "react";
import { Plus } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useAppData } from "@/context/AppDataContext";
import { getStudentForSession } from "@/lib/studentHelpers";
import { NewGoalDialog } from "@/components/dialogs/NewGoalDialog";
import { PageHeader } from "@/components/shared/PageHeader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export function StudentGoals() {
  const { session } = useAuth();
  const { db } = useAppData();
  const student = getStudentForSession(session, db);
  const [open, setOpen] = useState(false);

  if (!student) return null;

  const goals = db.goals.filter((g) => g.studentId === student.id);

  return (
    <div>
      <PageHeader
        title="Goals & development plans"
        actions={
          <Button onClick={() => setOpen(true)}>
            <Plus className="size-4 mr-2" />
            New goal
          </Button>
        }
      />
      <div className="grid gap-4 md:grid-cols-2">
        {goals.map((g) => {
          const done = g.milestones.filter((m) => m.done).length;
          const total = g.milestones.length || 1;
          return (
            <Card key={g.id}>
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between gap-2">
                  <CardTitle className="text-base">{g.title}</CardTitle>
                  <Badge variant="outline">{g.status}</Badge>
                </div>
                {g.source === "intervention" ? (
                  <Badge variant="secondary" className="w-fit">
                    From intervention
                  </Badge>
                ) : null}
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground mb-2">Target: {g.targetDate}</p>
                <Progress value={(done / total) * 100} className="h-2 mb-2" />
                <ul className="text-sm space-y-1">
                  {g.milestones.map((m) => (
                    <li key={m.title} className={m.done ? "line-through text-muted-foreground" : ""}>
                      {m.title}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          );
        })}
      </div>
      <NewGoalDialog studentId={student.id} open={open} onOpenChange={setOpen} />
    </div>
  );
}
