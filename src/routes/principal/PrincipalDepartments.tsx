import { useSearchParams } from "react-router-dom";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import { useAppData } from "@/context/AppDataContext";
import { LinkButton } from "@/components/shared/LinkButton";
import { PageHeader } from "@/components/shared/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function PrincipalDepartments() {
  const { db } = useAppData();
  const [params] = useSearchParams();
  const filterClass = params.get("class");

  const chartData = db.classes.map((cls) => {
    const a = db.classAnalytics.find((x) => x.classId === cls.id);
    return {
      name: cls.name,
      classId: cls.id,
      score: a?.averageScore ?? 0,
      attendance: a?.attendanceRate ?? 0,
    };
  });

  const filtered = filterClass ? chartData.filter((c) => c.classId === filterClass) : chartData;

  return (
    <div>
      <PageHeader
        title="Department / class comparison"
        description={filterClass ? `Filtered: ${db.classes.find((c) => c.id === filterClass)?.name}` : "All classes"}
        actions={
          filterClass ? (
            <LinkButton to="/principal/departments" variant="outline">Clear filter</LinkButton>
          ) : null
        }
      />
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Average score by class</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={filtered}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Bar dataKey="score" fill="#4F46E5" name="Avg score" />
              <Bar dataKey="attendance" fill="#10B981" name="Attendance %" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
