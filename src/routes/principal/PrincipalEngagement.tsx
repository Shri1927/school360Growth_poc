import { useAppData } from "@/context/AppDataContext";
import { PageHeader } from "@/components/shared/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export function PrincipalEngagement() {
  const { db } = useAppData();
  const parentViews = 68;
  const studentLogins = 82;
  const reportDownloads = 54;

  return (
    <div>
      <PageHeader title="Engagement analytics" description="Student & parent platform usage (mock)" />
      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Parent report views</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold mb-2">{parentViews}%</p>
            <Progress value={parentViews} className="h-2" />
            <p className="text-xs text-muted-foreground mt-2">Parents who viewed reports this month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Student active usage</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold mb-2">{studentLogins}%</p>
            <Progress value={studentLogins} className="h-2" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Class engagement index</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {db.classAnalytics.map((a) => {
              const cls = db.classes.find((c) => c.id === a.classId);
              return (
                <div key={a.classId}>
                  <div className="flex justify-between text-sm mb-1">
                    <span>{cls?.name}</span>
                    <span>{a.engagementIndex}</span>
                  </div>
                  <Progress value={a.engagementIndex} className="h-2" />
                </div>
              );
            })}
          </CardContent>
        </Card>
      </div>
      <Card className="mt-6">
        <CardContent className="pt-6 text-sm text-muted-foreground">
          Report download rate: {reportDownloads}% · Based on mock institutional analytics seed data.
        </CardContent>
      </Card>
    </div>
  );
}
