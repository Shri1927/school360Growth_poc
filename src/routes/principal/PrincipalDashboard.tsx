import { useAppData } from "@/context/AppDataContext";
import { computeGrowthIndex } from "@/lib/growthIndex";
import { principalAttentionItems } from "@/lib/mockAi";
import { AiBadge } from "@/components/shared/AiBadge";
import { LinkButton } from "@/components/shared/LinkButton";
import { PageHeader } from "@/components/shared/PageHeader";
import { StatCard } from "@/components/shared/StatCard";
import { TrendChart } from "@/components/shared/TrendChart";
import { Users, Activity, AlertCircle, Heart } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function PrincipalDashboard() {
  const { db } = useAppData();
  const avgGrowth =
    Math.round(
      db.students.reduce((s, st) => s + computeGrowthIndex(st.id, db), 0) / db.students.length,
    ) || 0;
  const avgAtt =
    Math.round(
      db.classAnalytics.reduce((s, c) => s + c.attendanceRate, 0) / db.classAnalytics.length,
    ) || 0;
  const activeCases = db.counsellingCases.filter((c) => c.status !== "closed").length;
  const atRisk = db.classAnalytics.reduce((s, c) => s + c.atRiskCount, 0);
  const riskChart = db.riskTrend.map((r) => ({ label: r.month.slice(5), value: r.atRiskCount }));
  const insights = principalAttentionItems(db);

  return (
    <div>
      <PageHeader title="Institution KPI dashboard" description="Principal view — Greenfield International School" />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5 mb-6">
        <StatCard icon={Users} label="Total students" value={String(db.students.length)} />
        <StatCard icon={Activity} label="Avg attendance" value={`${avgAtt}%`} />
        <StatCard icon={Heart} label="Avg growth index" value={String(avgGrowth)} />
        <StatCard icon={AlertCircle} label="Active counselling" value={String(activeCases)} />
        <StatCard icon={AlertCircle} label="At-risk students" value={String(atRisk)} />
      </div>
      <div className="grid gap-6 lg:grid-cols-2 mb-6">
        <TrendChart title="Risk trend (at-risk count)" data={riskChart} />
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              Areas requiring attention
              <AiBadge />
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {insights.map((item) => (
              <div key={item.id} className="text-sm">
                <p>{item.text}</p>
                {item.classId ? (
                  <LinkButton to={`/principal/departments?class=${item.classId}`} variant="link" size="sm" className="px-0 h-auto">
                    Drill down →
                  </LinkButton>
                ) : null}
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Counselling & intervention outcomes</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          {db.interventionPlans.filter((p) => p.status === "active").length} active intervention plans ·{" "}
          {db.counsellingCases.filter((c) => c.status === "closed").length} counselling cases closed this term
        </CardContent>
      </Card>
    </div>
  );
}
