import { Bell, LogOut, Flame, Gem, GraduationCap } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useAppData, useUser } from "@/context/AppDataContext";
import { RoleSwitcher } from "@/components/layout/RoleSwitcher";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { roleLabels } from "@/lib/navConfig";

export function TopBar() {
  const { session, logout } = useAuth();
  const user = useUser(session?.userId);
  const { db } = useAppData();
  const navigate = useNavigate();

  if (!session || !user) return null;

  const isStudent = session.role === "student";

  const notifications = [
    { id: "n1", text: "Term 2 assessment schedule updated" },
    { id: "n2", text: "New administrative announcement" },
  ];

  const initials = user.name
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2);

  return (
    <header className="no-print sticky top-0 z-20 flex h-16 items-center justify-between border-b border-slate-200 bg-white px-4 md:px-6 shadow-xs">
      <div className="flex items-center gap-3">
        {isStudent ? (
          <div className="md:hidden flex items-center gap-2">
            <div className="size-9 rounded-xl bg-[#58cc02] border-b-2 border-[#46a302] flex items-center justify-center text-white text-lg font-black">
              🦉
            </div>
            <span className="font-extrabold font-feather-student text-lg text-[#58cc02]">SCHOOL360</span>
          </div>
        ) : (
          <div className="md:hidden flex items-center gap-2">
            <div className="size-8 rounded-lg bg-slate-900 text-white flex items-center justify-center">
              <GraduationCap className="size-4" />
            </div>
            <span className="font-bold text-base text-slate-900 tracking-tight">School360</span>
          </div>
        )}

        <div className="hidden sm:flex items-center gap-2 text-xs font-semibold text-slate-600">
          <span className="bg-slate-100 px-2.5 py-1 rounded-lg border border-slate-200 text-slate-800 font-bold uppercase tracking-wide">
            {roleLabels[session.role]} PORTAL
          </span>
          <span className="text-slate-300">•</span>
          <span className="text-slate-700 font-bold">{user.name}</span>
        </div>
      </div>

      <div className="flex items-center gap-3 ml-auto">
        {/* Gamified Lingot & Flame badges shown ONLY on student side */}
        {isStudent && (
          <div className="hidden sm:flex items-center gap-2">
            <div className="flex items-center gap-1 px-3 py-1.5 rounded-xl border-2 border-[#ffc800] border-b-3 border-b-[#ffc800] bg-[#fffbeb] text-[#d97706] font-extrabold text-xs">
              <Flame className="size-4 text-[#ff4b4b] fill-[#ff4b4b]" />
              <span>7</span>
            </div>
            <div className="flex items-center gap-1 px-3 py-1.5 rounded-xl border-2 border-[#1cb0f6] border-b-3 border-b-[#1cb0f6] bg-[#f0f9ff] text-[#1cb0f6] font-extrabold text-xs">
              <Gem className="size-4 text-[#1cb0f6] fill-[#1cb0f6]" />
              <span>450</span>
            </div>
          </div>
        )}

        <RoleSwitcher />

        <DropdownMenu>
          <DropdownMenuTrigger
            className="inline-flex size-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-all outline-none"
            aria-label="Notifications"
          >
            <Bell className="size-4 text-slate-700" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-64 rounded-xl border border-slate-200 bg-white p-2 shadow-md">
            {notifications.map((n) => (
              <DropdownMenuItem key={n.id} className="text-xs font-semibold text-slate-700 py-2 rounded-lg hover:bg-slate-100">
                🔔 {n.text}
              </DropdownMenuItem>
            ))}
            {db.announcements.slice(0, 1).map((a) => (
              <DropdownMenuItem key={a.id} className="text-xs font-medium text-slate-500 py-2 rounded-lg">
                📢 {a.title}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <Avatar className="size-9 rounded-xl border border-slate-300">
          <AvatarFallback className="bg-slate-900 text-white font-bold text-xs">{initials}</AvatarFallback>
        </Avatar>

        <Button
          variant="ghost"
          size="icon-sm"
          onClick={() => {
            logout();
            navigate("/");
          }}
          aria-label="Log out"
          className="text-slate-500 hover:text-rose-600 hover:bg-rose-50"
        >
          <LogOut className="size-4" />
        </Button>
      </div>
    </header>
  );
}
