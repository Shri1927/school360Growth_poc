import { useNavigate } from "react-router-dom";
import { useAuth, roleHomePath } from "@/context/AuthContext";
import { useAppData } from "@/context/AppDataContext";
import type { UserRole } from "@/types";
import { roleLabels } from "@/lib/navConfig";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, Flame, Trophy, Heart } from "lucide-react";

const personas: { role: UserRole; userIds: string[]; icon: string; tag: string }[] = [
  { role: "student", userIds: ["usr-stu-001", "usr-stu-002", "usr-stu-003"], icon: "🎓", tag: "LEARNER QUEST" },
  { role: "parent", userIds: ["usr-par-001", "usr-par-002", "usr-par-003"], icon: "🏠", tag: "FAMILY HUB" },
  { role: "teacher", userIds: ["usr-tch-001", "usr-tch-002", "usr-tch-003"], icon: "📚", tag: "CLASS COACH" },
  { role: "counsellor", userIds: ["usr-cou-001"], icon: "🌱", tag: "WELLBEING" },
  { role: "principal", userIds: ["usr-prin-001"], icon: "🏆", tag: "LEADERSHIP" },
  { role: "admin", userIds: ["usr-adm-001"], icon: "⚡", tag: "SYSTEM GOVERNANCE" },
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
    <div className="min-h-screen w-full bg-white text-[#4b4b4b] flex flex-col items-center justify-start p-4 sm:p-6 md:p-12">
      {/* Top Navbar - Centered Container */}
      <header className="w-full max-w-6xl mx-auto flex items-center justify-between py-4 mb-12 border-b-2 border-[#e5e5e5]">
        <div className="flex items-center gap-3">
          <div className="size-12 rounded-2xl bg-[#58cc02] border-b-4 border-[#46a302] flex items-center justify-center text-white text-2xl font-black shadow-none">
            🦉
          </div>
          <span className="font-feather font-extrabold text-2xl text-[#58cc02] tracking-tight">
            SCHOOL360
          </span>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" onClick={() => handleLogin("student", "usr-stu-001")}>
            I ALREADY HAVE AN ACCOUNT
          </Button>
          <Button variant="default" size="sm" onClick={() => handleLogin("student", "usr-stu-001")}>
            GET STARTED
          </Button>
        </div>
      </header>

      {/* Hero Section Stack - Strictly Centered */}
      <main className="w-full max-w-4xl mx-auto flex flex-col items-center justify-center text-center gap-6 py-6 mb-16">
        {/* Duo Owl Cartoon Mascot Illustration */}
        <div className="relative mb-2 flex items-center justify-center mx-auto">
          <div className="size-36 md:size-44 rounded-full bg-[#eefce8] border-4 border-[#a5ed6e] flex items-center justify-center text-7xl md:text-8xl shadow-none animate-bounce-subtle">
            🦉
          </div>
          <div className="absolute -top-2 -right-2 px-3 py-1 bg-[#ffc800] border-2 border-[#e6b400] rounded-xl text-white font-black text-xs uppercase tracking-wider flex items-center gap-1">
            <Sparkles className="size-3 fill-white" /> LEVEL 10
          </div>
          <div className="absolute -bottom-2 -left-2 px-3 py-1 bg-[#ff4b4b] border-2 border-[#ea2b2b] rounded-xl text-white font-black text-xs uppercase tracking-wider flex items-center gap-1">
            <Heart className="size-3 fill-white" /> 5 LIVES
          </div>
        </div>

        {/* Oversized Section Headline - Explicitly Centered */}
        <h1 className="font-feather font-extrabold text-4xl sm:text-6xl md:text-7xl text-[#58cc02] leading-tight tracking-tight max-w-3xl text-center mx-auto">
          The free, fun, and effective way to grow!
        </h1>

        <p className="text-base sm:text-lg md:text-xl font-bold text-[#777777] max-w-2xl leading-relaxed text-center mx-auto">
          One student, one continuous digital profile, and one gamified support platform for academic, personal, and career excellence.
        </p>

        {/* Hero CTA Stack - Perfectly Centered Row / Column */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-4 w-full max-w-md mx-auto">
          <Button
            size="lg"
            className="w-full h-14 text-base font-extrabold uppercase tracking-wider"
            onClick={() => handleLogin("student", "usr-stu-001")}
          >
            START LEARNING NOW
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="w-full h-14 text-base font-extrabold uppercase tracking-wider"
            onClick={() => handleLogin("teacher", "usr-tch-001")}
          >
            TEACHER / ADMIN ACCESS
          </Button>
        </div>
      </main>

      {/* Gamification Stats Strip - Centered Grid */}
      <section className="w-full max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
        <div className="p-4 rounded-xl border-2 border-[#e5e5e5] border-b-4 border-b-[#e5e5e5] bg-white text-center">
          <div className="text-3xl font-black font-feather text-[#58cc02]">100%</div>
          <div className="text-xs font-extrabold text-[#777777] uppercase tracking-wider mt-1">FREE FOR SCHOOLS</div>
        </div>
        <div className="p-4 rounded-xl border-2 border-[#e5e5e5] border-b-4 border-b-[#e5e5e5] bg-white text-center">
          <div className="text-3xl font-black font-feather text-[#1cb0f6] flex items-center justify-center gap-1">
            <Flame className="size-7 text-[#ff4b4b] fill-[#ff4b4b]" /> 7 DAYS
          </div>
          <div className="text-xs font-extrabold text-[#777777] uppercase tracking-wider mt-1">CURRENT STREAK</div>
        </div>
        <div className="p-4 rounded-xl border-2 border-[#e5e5e5] border-b-4 border-b-[#e5e5e5] bg-white text-center">
          <div className="text-3xl font-black font-feather text-[#ffc800] flex items-center justify-center gap-1">
            <Trophy className="size-7 text-[#ffc800] fill-[#ffc800]" /> 360°
          </div>
          <div className="text-xs font-extrabold text-[#777777] uppercase tracking-wider mt-1">GROWTH MATRIX</div>
        </div>
        <div className="p-4 rounded-xl border-2 border-[#e5e5e5] border-b-4 border-b-[#e5e5e5] bg-white text-center">
          <div className="text-3xl font-black font-feather text-[#042c60]">6 ROLES</div>
          <div className="text-xs font-extrabold text-[#777777] uppercase tracking-wider mt-1">UNIFIED PORTAL</div>
        </div>
      </section>

      {/* Role Picker Title - Centered */}
      <div className="w-full max-w-4xl mx-auto mb-6 text-center">
        <h2 className="font-feather font-extrabold text-3xl text-[#042c60]">
          CHOOSE YOUR ADVENTURE
        </h2>
        <p className="text-sm font-bold text-[#777777] mt-1">
          Select a demo persona to step into their 360° dashboard
        </p>
      </div>

      {/* Role Picker Grid (3D Cards) - Centered Grid */}
      <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 w-full max-w-5xl mx-auto mb-20">
        {personas.map(({ role, userIds, icon, tag }) => (
          <Card key={role} className="border-2 border-[#e5e5e5] border-b-4 border-b-[#e5e5e5] bg-white rounded-xl hover:border-[#58cc02] transition-all">
            <CardHeader className="pb-3 border-b-2 border-[#e5e5e5] bg-[#f7f7f7] rounded-t-xl">
              <div className="flex items-center justify-between">
                <div className="text-2xl">{icon}</div>
                <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-lg bg-[#eefce8] text-[#58cc02] border border-[#a5ed6e]">
                  {tag}
                </span>
              </div>
              <CardTitle className="text-xl font-feather text-[#042c60] mt-2">
                {roleLabels[role]}
              </CardTitle>
              <CardDescription className="text-xs font-bold text-[#777777]">
                Log in as demo persona:
              </CardDescription>
            </CardHeader>

            <CardContent className="flex flex-col gap-2.5 pt-4">
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
                    ? `Grade ${student.grade}`
                    : role === "parent" && student
                      ? `Parent of ${student.name}`
                      : user.email;
                return (
                  <Button
                    key={userId}
                    variant="duoOutline"
                    className="justify-start h-auto py-2.5 px-3 text-left w-full"
                    onClick={() => handleLogin(role, userId)}
                  >
                    <div className="w-full flex flex-col">
                      <span className="font-extrabold text-sm text-[#3c3c3c]">{user.name}</span>
                      <span className="text-xs text-[#777777] font-semibold lowercase">{subtitle}</span>
                    </div>
                  </Button>
                );
              })}
            </CardContent>
          </Card>
        ))}
      </section>

      {/* Footer */}
      <footer className="w-full max-w-5xl mx-auto py-8 border-t-2 border-[#e5e5e5] text-center text-xs font-bold text-[#777777]">
        <p>School360 Growth Platform — Duolingo Style Reference Implementation</p>
      </footer>
    </div>
  );
}
