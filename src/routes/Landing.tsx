import { useNavigate } from "react-router-dom";
import { GraduationCap } from "lucide-react";
import { useAuth, roleHomePath } from "@/context/AuthContext";
import { useAppData } from "@/context/AppDataContext";
import type { UserRole } from "@/types";
import { roleLabels } from "@/lib/navConfig";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const personas: { role: UserRole; userIds: string[] }[] = [
  { role: "student", userIds: ["usr-stu-001", "usr-stu-002", "usr-stu-003"] },
  { role: "parent", userIds: ["usr-par-001", "usr-par-002", "usr-par-003"] },
  { role: "teacher", userIds: ["usr-tch-001", "usr-tch-002", "usr-tch-003"] },
  { role: "counsellor", userIds: ["usr-cou-001"] },
  { role: "principal", userIds: ["usr-prin-001"] },
  { role: "admin", userIds: ["usr-adm-001"] },
];

export function Landing() {
  const { login } = useAuth();
  const { db } = useAppData();
  const navigate = useNavigate();

  const handleLogin = (role: UserRole, userId: string) => {
    login({ role, userId });
    navigate(roleHomePath(role));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-indigo-50/40 flex flex-col items-center justify-center p-6">
      <div className="max-w-3xl w-full text-center mb-8">
        <div className="inline-flex items-center justify-center size-14 rounded-2xl bg-primary text-primary-foreground mb-4">
          <GraduationCap className="size-8" />
        </div>
        <h1 className="text-3xl font-bold tracking-tight">Student 360° Growth Platform</h1>
        <p className="text-muted-foreground mt-2 max-w-xl mx-auto">
          One student, one continuous digital profile, and one coordinated support system for
          complete academic, personal, social and career growth.
        </p>
        <p className="text-xs text-muted-foreground mt-4">Frontend POC — select a demo persona to begin</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 w-full max-w-4xl">
        {personas.map(({ role, userIds }) => (
          <Card key={role} className="shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">{roleLabels[role]}</CardTitle>
              <CardDescription>Login as</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
              {userIds.map((userId) => {
                const user = db.users.find((u) => u.id === userId);
                if (!user) return null;
                const student =
                  role === "student"
                    ? db.students.find((s) => s.name === user.name)
                    : role === "parent"
                      ? db.students.find((s) =>
                          db.parents
                            .find((p) => p.userId === userId)
                            ?.studentIds.includes(s.id),
                        )
                      : null;
                const subtitle =
                  role === "student" && student
                    ? student.grade
                    : role === "parent" && student
                      ? `Parent of ${student.name}`
                      : user.email;
                return (
                  <Button
                    key={userId}
                    variant="outline"
                    className="justify-start h-auto py-2"
                    onClick={() => handleLogin(role, userId)}
                  >
                    <span className="text-left">
                      <span className="block font-medium">{user.name}</span>
                      <span className="block text-xs text-muted-foreground font-normal">{subtitle}</span>
                    </span>
                  </Button>
                );
              })}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
