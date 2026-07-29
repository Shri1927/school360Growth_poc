import { NavLink } from "react-router-dom";
import { GraduationCap } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { navByRole } from "@/lib/navConfig";
import { cn } from "@/lib/utils";

export function Sidebar() {
  const { session } = useAuth();
  if (!session) return null;
  const items = navByRole[session.role];

  return (
    <aside className="no-print hidden md:flex w-60 flex-col border-r bg-white">
      <div className="flex items-center gap-2 px-4 py-5 border-b">
        <GraduationCap className="size-6 text-primary" />
        <div>
          <p className="text-sm font-semibold leading-tight">Student 360°</p>
          <p className="text-xs text-muted-foreground">Growth Platform</p>
        </div>
      </div>
      <nav className="flex-1 p-3 space-y-1">
        {items.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path.split("/").length <= 2}
            className={({ isActive }) =>
              cn(
                "block rounded-lg px-3 py-2 text-sm transition-colors",
                isActive ? "bg-indigo-50 text-indigo-700 font-medium" : "text-slate-600 hover:bg-slate-100",
              )
            }
          >
            {item.label}
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
                    "block rounded-lg px-3 py-2 text-sm transition-colors",
                    isActive ? "bg-indigo-50 text-indigo-700 font-medium" : "text-slate-600 hover:bg-slate-100",
                  )
                }
              >
                {item.label}
              </NavLink>
            ))
          : null}
      </nav>
    </aside>
  );
}
