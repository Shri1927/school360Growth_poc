import { NavLink } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { navByRole } from "@/lib/navConfig";
import { cn } from "@/lib/utils";

export function Sidebar() {
  const { session } = useAuth();
  if (!session) return null;
  const items = navByRole[session.role];

  return (
    <aside className="no-print hidden md:flex w-64 flex-col border-r-2 border-[#e5e5e5] bg-white p-4">
      {/* Brand Header with Duolingo Style Duo Mascot & Wordmark */}
      <div className="flex items-center gap-3 px-3 py-4 mb-6 border-b-2 border-[#e5e5e5]">
        <div className="size-11 rounded-2xl bg-[#58cc02] border-b-4 border-[#46a302] flex items-center justify-center text-white text-2xl font-black shadow-none shrink-0 animate-bounce-subtle">
          🦉
        </div>
        <div>
          <p className="font-extrabold font-feather text-xl text-[#58cc02] leading-none tracking-tight">SCHOOL360</p>
          <p className="text-[11px] font-extrabold text-[#1cb0f6] uppercase tracking-wider mt-1">GROWTH CANVAS</p>
        </div>
      </div>

      {/* Navigation Buttons */}
      <nav className="flex-1 space-y-2">
        {items.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path.split("/").length <= 2}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 rounded-xl px-4 py-3 text-xs font-extrabold uppercase tracking-wider transition-all select-none",
                isActive
                  ? "bg-[#58cc02] text-white border-b-4 border-[#46a302] translate-y-0"
                  : "text-[#4b4b4b] border-2 border-transparent hover:border-[#a5ed6e] hover:bg-[#eefce8] hover:text-[#58cc02]",
              )
            }
          >
            <span>{item.label}</span>
          </NavLink>
        ))}
        {session.role === "teacher"
          ? [
              { label: "Grade 10-B", path: "/teacher/classes/cls-10b" },
              { label: "Grade 9-A", path: "/teacher/classes/cls-9a" },
            ].map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-3 rounded-xl px-4 py-3 text-xs font-extrabold uppercase tracking-wider transition-all select-none",
                    isActive
                      ? "bg-[#1cb0f6] text-white border-b-4 border-[#1899d6]"
                      : "text-[#4b4b4b] border-2 border-transparent hover:border-[#1cb0f6] hover:bg-[#f0f9ff] hover:text-[#1cb0f6]",
                  )
                }
              >
                <span>{item.label}</span>
              </NavLink>
            ))
          : null}
      </nav>

      {/* Footer Gamification Box */}
      <div className="mt-auto pt-4 border-t-2 border-[#e5e5e5]">
        <div className="rounded-xl border-2 border-[#a5ed6e] border-b-4 border-b-[#a5ed6e] bg-[#eefce8] p-3 text-center">
          <div className="flex items-center justify-center gap-2 text-sm font-extrabold text-[#58cc02] uppercase tracking-wider">
            <span>🔥 7 DAY STREAK</span>
          </div>
          <p className="text-[11px] font-bold text-[#777777] mt-1">Growth tasks active today!</p>
        </div>
      </div>
    </aside>
  );
}
