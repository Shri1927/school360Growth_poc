import { useAuth } from "@/context/AuthContext";
import { useAppData } from "@/context/AppDataContext";
import { PageHeader } from "@/components/shared/PageHeader";
import { TrendChart } from "@/components/shared/TrendChart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function TeacherAnalytics() {
  const { session } = useAuth();
  const { db } = useAppData();
  const teacherClasses = db.classes.filter((c) =>
    Object.values(c.subjectTeacherIds).includes(session?.userId ?? ""),
  );

  return (
    <div>
      <PageHeader title="Class analytics" description="Subject and class performance" />
      <div className="grid gap-6 lg:grid-cols-2">
        {teacherClasses.map((cls) => {
          const analytics = db.classAnalytics.find((a) => a.classId === cls.id);
          const chartData = ["T1", "MT", "T2", "F"].map((label, i) => ({
            label,
            value: (analytics?.averageScore ?? 70) - 4 + i * 3,
          }));
          return (
            <div key={cls.id}>
              <Card className="mb-2">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">{cls.name}</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  Avg {analytics?.averageScore}% · Attendance {analytics?.attendanceRate}% · At-risk{" "}
                  {analytics?.atRiskCount}
                </CardContent>
              </Card>
              <TrendChart data={chartData} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
