import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface SkillRadarProps {
  title?: string;
  data: { category: string; level: number }[];
}

export function SkillRadar({ title = "Skills profile", data }: SkillRadarProps) {
  const chartData = data.map((d) => ({ subject: d.category, level: d.level }));
  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-base">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={280}>
          <RadarChart data={chartData}>
            <PolarGrid />
            <PolarAngleAxis dataKey="subject" tick={{ fontSize: 10 }} />
            <PolarRadiusAxis angle={30} domain={[0, 5]} tick={{ fontSize: 10 }} />
            <Radar dataKey="level" stroke="#4F46E5" fill="#4F46E5" fillOpacity={0.35} />
          </RadarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
