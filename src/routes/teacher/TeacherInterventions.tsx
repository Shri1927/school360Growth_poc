import { useAuth } from "@/context/AuthContext";
import { useAppData } from "@/context/AppDataContext";
import { PageHeader } from "@/components/shared/PageHeader";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function TeacherInterventions() {
  const { session } = useAuth();
  const { db } = useAppData();
  const plans = db.interventionPlans.filter((p) => p.teacherId === session?.userId);

  return (
    <div>
      <PageHeader title="Intervention plans" description="Active and completed support plans" />
      <div className="grid gap-4 md:grid-cols-2">
        {plans.map((p) => {
          const student = db.students.find((s) => s.id === p.studentId);
          return (
            <Card key={p.id}>
              <CardHeader className="pb-2">
                <div className="flex justify-between">
                  <CardTitle className="text-base">{p.topic}</CardTitle>
                  <Badge variant="outline">{p.status}</Badge>
                </div>
                <p className="text-sm text-muted-foreground">{student?.name}</p>
              </CardHeader>
              <CardContent className="text-sm space-y-1">
                <p>{p.action}</p>
                <p className="text-muted-foreground">Target: {p.targetDate}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
