import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useAppData } from "@/context/AppDataContext";
import { getStudentForSession } from "@/lib/studentHelpers";
import { PageHeader } from "@/components/shared/PageHeader";
import { SkillRadar } from "@/components/shared/SkillRadar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export function StudentSkills() {
  const { session } = useAuth();
  const { db } = useAppData();
  const student = getStudentForSession(session, db);
  const [selfRatings, setSelfRatings] = useState<Record<string, number>>({});

  if (!student) return null;

  const ratings = db.skillRatings.filter((s) => s.studentId === student.id);
  const radarData = ratings.map((r) => ({
    category: r.category,
    level: selfRatings[r.category] ?? r.level,
  }));

  return (
    <div>
      <PageHeader title="Skills & competency" description="Radar profile and self-assessment" />
      <SkillRadar data={radarData} />
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="text-base">Self-assessment (demo)</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {ratings.map((r) => (
            <div key={r.category}>
              <div className="flex justify-between text-sm mb-1">
                <span className="capitalize">{r.category}</span>
                <span>{selfRatings[r.category] ?? r.level}/5</span>
              </div>
              <Progress value={((selfRatings[r.category] ?? r.level) / 5) * 100} className="h-2" />
              <div className="flex gap-1 mt-2">
                {[1, 2, 3, 4, 5].map((n) => (
                  <Button
                    key={n}
                    size="sm"
                    variant={(selfRatings[r.category] ?? r.level) === n ? "default" : "outline"}
                    onClick={() => setSelfRatings((prev) => ({ ...prev, [r.category]: n }))}
                  >
                    {n}
                  </Button>
                ))}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
