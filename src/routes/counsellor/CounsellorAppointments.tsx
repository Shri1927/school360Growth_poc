import { useAppData } from "@/context/AppDataContext";
import { PageHeader } from "@/components/shared/PageHeader";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function CounsellorAppointments() {
  const { db } = useAppData();
  const sorted = [...db.appointments].sort(
    (a, b) => new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime(),
  );

  return (
    <div>
      <PageHeader title="Appointments" description="Scheduled counselling sessions" />
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Upcoming & past</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {sorted.map((a) => (
            <div key={a.id} className="flex justify-between items-center text-sm border-b pb-2">
              <div>
                <p className="font-medium">{db.students.find((s) => s.id === a.studentId)?.name}</p>
                <p className="text-muted-foreground">{new Date(a.dateTime).toLocaleString()}</p>
              </div>
              <Badge variant="outline">{a.status}</Badge>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
