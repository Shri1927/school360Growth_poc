import { useNavigate } from "react-router-dom";
import { useAuth, roleHomePath } from "@/context/AuthContext";
import { useAppData } from "@/context/AppDataContext";
import type { UserRole } from "@/types";
import { roleLabels } from "@/lib/navConfig";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowLeft } from "lucide-react";

const personas: { role: UserRole; userIds: string[]; icon: string; tag: string }[] = [
  { role: "student", userIds: ["usr-stu-001", "usr-stu-002", "usr-stu-003"], icon: "🎓", tag: "LEARNER QUEST" },
  { role: "parent", userIds: ["usr-par-001", "usr-par-002", "usr-par-003"], icon: "🏠", tag: "FAMILY HUB" },
  { role: "teacher", userIds: ["usr-tch-001", "usr-tch-002", "usr-tch-003"], icon: "📚", tag: "CLASS COACH" },
  { role: "counsellor", userIds: ["usr-cou-001"], icon: "🌱", tag: "WELLBEING" },
  { role: "principal", userIds: ["usr-prin-001"], icon: "🏆", tag: "LEADERSHIP" },
  { role: "admin", userIds: ["usr-adm-001"], icon: "⚡", tag: "SYSTEM GOVERNANCE" },
];

export function Login() {
  const { login } = useAuth();
  const { db } = useAppData();
  const navigate = useNavigate();

  const handleLogin = (role: UserRole, userId: string) => {
    login({ role, userId });
    navigate(roleHomePath(role));
  };

  return (
    <div className="min-h-screen w-full bg-[#0b1329] text-white flex flex-col items-center justify-start p-4 sm:p-6 md:p-12 overflow-x-hidden">
      {/* Header Bar */}
      <header className="w-full max-w-6xl mx-auto flex items-center justify-between py-4 mb-10 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="size-11 rounded-2xl bg-[#58cc02] border-b-4 border-[#46a302] flex items-center justify-center text-white text-xl font-black shadow-none">
            🦉
          </div>
          <span className="font-feather-student font-extrabold text-2xl text-[#58cc02] tracking-tight">
            SCHOOL360
          </span>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={() => navigate("/")}
          className="border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white"
        >
          <ArrowLeft className="size-4 mr-2" /> Back to Home
        </Button>
      </header>

      {/* Main Title Section */}
      <div className="w-full max-w-4xl mx-auto text-center space-y-3 mb-12">
        <span className="inline-block px-3.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-wider border border-emerald-500/30">
          DEMO PERSONA ENVIRONMENT
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
          Choose Your Adventure
        </h1>
        <p className="text-slate-400 text-sm sm:text-base font-medium max-w-xl mx-auto">
          Select a role profile below to instantly experience their personalized 360° growth dashboard.
        </p>
      </div>

      {/* Role Picker Grid (3D Persona Cards) */}
      <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 w-full max-w-6xl mx-auto mb-16">
        {personas.map(({ role, userIds, icon, tag }) => (
          <div
            key={role}
            className="bg-[#121c38] rounded-2xl border border-slate-700/80 p-6 space-y-4 hover:border-emerald-500/60 transition-all shadow-xl flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="text-3xl">{icon}</div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  {tag}
                </span>
              </div>

              <div>
                <h2 className="text-xl font-bold text-white">{roleLabels[role]}</h2>
                <p className="text-xs text-slate-400 font-medium">Select a profile to enter:</p>
              </div>

              <div className="space-y-2.5 pt-2">
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
                    <button
                      key={userId}
                      onClick={() => handleLogin(role, userId)}
                      className="w-full flex items-center justify-between text-left p-3.5 rounded-xl bg-[#0b1329] hover:bg-emerald-600/20 border border-slate-700/90 hover:border-emerald-500/50 text-xs transition-all group"
                    >
                      <div>
                        <p className="font-bold text-white group-hover:text-emerald-300 text-sm">{user.name}</p>
                        <p className="text-xs text-slate-400 capitalize mt-0.5">{subtitle}</p>
                      </div>
                      <ArrowRight className="size-4 text-slate-500 group-hover:text-emerald-400 transition-transform group-hover:translate-x-1 shrink-0" />
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Footer */}
      <footer className="w-full max-w-5xl mx-auto pt-8 border-t border-slate-800 text-center text-xs text-slate-500 font-medium">
        <p>School360 Growth Platform — Interactive Demo Login</p>
      </footer>
    </div>
  );
}
