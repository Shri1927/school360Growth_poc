import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useAppData } from "@/context/AppDataContext";
import { careerRationale } from "@/lib/mockAi";
import { getStudentForSession } from "@/lib/studentHelpers";
import { AiBadge } from "@/components/shared/AiBadge";
import { PageHeader } from "@/components/shared/PageHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const QUIZ = [
  { q: "I enjoy solving logical puzzles", clusters: { "Engineering & Technology": 3, Design: 1 } },
  { q: "I prefer creative visual work", clusters: { Design: 3, "Engineering & Technology": 1 } },
  { q: "I like working with numbers and data", clusters: { Commerce: 2, "Engineering & Technology": 2 } },
  { q: "I enjoy helping people one-on-one", clusters: { "Health & Social": 3, Design: 1 } },
  { q: "I want to build things that scale", clusters: { "Engineering & Technology": 3, Commerce: 1 } },
];

export function StudentCareer() {
  const { session } = useAuth();
  const { db, upsertCareerInterests } = useAppData();
  const student = getStudentForSession(session, db);
  const [answers, setAnswers] = useState<number[]>([]);
  const [done, setDone] = useState(false);

  if (!student) return null;

  const interests = db.careerInterests
    .filter((c) => c.studentId === student.id)
    .sort((a, b) => b.score - a.score);
  const suggestions = db.careerSuggestions.filter((c) => c.studentId === student.id);

  const submitQuiz = () => {
    const scores: Record<string, number> = {};
    answers.forEach((choice, i) => {
      const q = QUIZ[i];
      if (!q) return;
      Object.entries(q.clusters).forEach(([cluster, boost]) => {
        scores[cluster] = (scores[cluster] ?? 40) + (choice === 0 ? boost * 8 : boost * 4);
      });
    });
    upsertCareerInterests(
      student.id,
      Object.entries(scores).map(([cluster, score]) => ({ cluster, score: Math.min(100, score) })),
    );
    setDone(true);
  };

  return (
    <div>
      <PageHeader title="Career exploration" description="Interest quiz and suggested pathways" />
      {!done ? (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-base">Interest quiz (5 questions)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {QUIZ.map((item, i) => (
              <div key={item.q}>
                <p className="text-sm font-medium mb-2">{item.q}</p>
                <div className="flex gap-2">
                  {["Strongly agree", "Somewhat agree"].map((label, idx) => (
                    <Button
                      key={label}
                      variant={answers[i] === idx ? "default" : "outline"}
                      size="sm"
                      onClick={() => {
                        const next = [...answers];
                        next[i] = idx;
                        setAnswers(next);
                      }}
                    >
                      {label}
                    </Button>
                  ))}
                </div>
              </div>
            ))}
            <Button disabled={answers.length < 5} onClick={submitQuiz}>
              See results
            </Button>
          </CardContent>
        </Card>
      ) : null}
      <div className="grid gap-4 md:grid-cols-2 mb-6">
        {interests.map((c) => (
          <Card key={c.cluster}>
            <CardContent className="pt-6">
              <p className="font-medium">{c.cluster}</p>
              <p className="text-2xl font-bold text-primary">{c.score}%</p>
              <p className="text-xs text-muted-foreground">Interest affinity</p>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="space-y-4">
        {suggestions.map((s) => (
          <Card key={s.id}>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                {s.pathway}
                <AiBadge />
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              {s.rationale || careerRationale(s.pathway, student.name)}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
