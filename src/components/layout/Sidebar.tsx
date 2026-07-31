import { NavLink } from "react-router-dom";
import { GraduationCap, ShieldCheck } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useUser } from "@/context/AppDataContext";
import { navByRole, roleLabels } from "@/lib/navConfig";
import { cn } from "@/lib/utils";

export function Sidebar() {
  const { session } = useAuth();
  if (!session) return null;
  const user = useUser(session.userId);
  const items = navByRole[session.role];
  const isStudent = session.role === "student";

  return (
    <aside className="no-print hidden md:flex w-64 flex-col border-r border-slate-200 bg-white p-4">
      {/* Brand Header */}
      {isStudent ? (
        <div className="flex items-center gap-3 px-3 py-4 mb-6 border-b-2 border-[#e5e5e5]">
          <div className="size-11 rounded-2xl bg-[#58cc02] border-b-4 border-[#46a302] flex items-center justify-center text-white text-2xl font-black shadow-none shrink-0 animate-bounce-subtle">
            🦉
          </div>
          <div>
            <p className="font-extrabold font-feather-student text-xl text-[#58cc02] leading-none tracking-tight">SCHOOL360</p>
            <p className="text-[11px] font-extrabold text-[#1cb0f6] uppercase tracking-wider mt-1">GROWTH CANVAS</p>
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-3 px-3 py-4 mb-6 border-b border-slate-200">
          <div className="size-10 rounded-xl bg-slate-900 text-white flex items-center justify-center shadow-sm shrink-0">
            <GraduationCap className="size-5" />
          </div>
          <div>
            <p className="font-bold text-slate-900 text-lg leading-tight tracking-tight">School360</p>
            <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
              {roleLabels[session.role]} Portal
            </p>
          </div>
        </div>
      )}

      {/* Navigation Buttons */}
      <nav className="flex-1 space-y-1.5">
        {items.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path.split("/").length <= 2}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-xs select-none transition-all",
                isStudent
                  ? isActive
                    ? "bg-[#58cc02] text-white border-b-4 border-[#46a302] font-extrabold uppercase tracking-wider"
                    : "text-[#4b4b4b] border-2 border-transparent hover:border-[#a5ed6e] hover:bg-[#eefce8] hover:text-[#58cc02] font-extrabold uppercase tracking-wider"
                  : isActive
                    ? "bg-slate-900 text-white shadow-sm font-bold tracking-tight"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/80 font-semibold"
              )
            }
          >
            <span>{item.label}</span>
          </NavLink>
        ))}

        {!isStudent && session.role === "teacher"
          ? [
              { label: "Grade 10-B Class", path: "/teacher/classes/cls-10b" },
              { label: "Grade 9-A Class", path: "/teacher/classes/cls-9a" },
            ].map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-xs font-semibold select-none transition-all",
                    isActive
                      ? "bg-emerald-700 text-white shadow-sm"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/80"
                  )
                }
              >
                <span>{item.label}</span>
              </NavLink>
            ))
          : null}
      </nav>

      {/* Footer Box */}
      <div className="mt-auto pt-4 border-t border-slate-200">
        {isStudent ? (
          <div className="rounded-xl border-2 border-[#a5ed6e] border-b-4 border-b-[#a5ed6e] bg-[#eefce8] p-3 text-center">
            <div className="flex items-center justify-center gap-2 text-sm font-extrabold text-[#58cc02] uppercase tracking-wider">
              <span>🔥 7 DAY STREAK</span>
            </div>
            <p className="text-[11px] font-bold text-[#777777] mt-1">Growth tasks active today!</p>
          </div>
        ) : (
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 space-y-1">
            <div className="flex items-center gap-2 text-slate-800 font-bold text-xs">
              <ShieldCheck className="size-3.5 text-emerald-600" />
              <span className="truncate">{user?.name || "Authenticated User"}</span>
            </div>
            <p className="text-[11px] font-medium text-slate-500 capitalize">
              {roleLabels[session.role]} Management Workspace
            </p>
          </div>
        )}
      </div>
    </aside>
  );
}
