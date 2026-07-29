import { Bell, LogOut, Flame, Gem } from "lucide-react";
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

  const notifications = [
    { id: "n1", text: "Term 2 calendar published" },
    { id: "n2", text: "New message from Mrs. Iyer" },
  ];

  const initials = user.name
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2);

  return (
    <header className="no-print sticky top-0 z-20 flex h-16 items-center justify-between border-b-2 border-[#e5e5e5] bg-white px-4 md:px-6">
      <div className="flex items-center gap-3">
        <div className="md:hidden flex items-center gap-2">
          <div className="size-9 rounded-xl bg-[#58cc02] border-b-2 border-[#46a302] flex items-center justify-center text-white text-lg font-black">
            🦉
          </div>
          <span className="font-extrabold font-feather text-lg text-[#58cc02]">SCHOOL360</span>
        </div>
        <p className="text-xs font-bold text-[#777777] uppercase tracking-wider hidden sm:block">
          <span className="text-[#58cc02] font-black">{roleLabels[session.role].toUpperCase()} VIEW</span> — {user.name}
        </p>
      </div>

      <div className="flex items-center gap-3 ml-auto">
        {/* Gamified Lingot & Flame badges */}
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

        <RoleSwitcher />

        <DropdownMenu>
          <DropdownMenuTrigger
            className="inline-flex size-9 items-center justify-center rounded-xl border-2 border-[#e5e5e5] border-b-3 border-b-[#e5e5e5] bg-white text-[#777777] hover:bg-slate-50 transition-all outline-none"
            aria-label="Notifications"
          >
            <Bell className="size-4 text-[#58cc02]" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-64 rounded-xl border-2 border-[#e5e5e5] border-b-4 border-b-[#e5e5e5] bg-white p-2 shadow-none">
            {notifications.map((n) => (
              <DropdownMenuItem key={n.id} className="text-xs font-bold text-[#4b4b4b] py-2 rounded-lg hover:bg-[#eefce8]">
                🔔 {n.text}
              </DropdownMenuItem>
            ))}
            {db.announcements.slice(0, 1).map((a) => (
              <DropdownMenuItem key={a.id} className="text-xs font-semibold text-[#777777] py-2 rounded-lg">
                📢 {a.title}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <Avatar className="size-9 rounded-xl border-2 border-[#58cc02] border-b-3 border-b-[#46a302]">
          <AvatarFallback className="bg-[#58cc02] text-white font-extrabold text-xs">{initials}</AvatarFallback>
        </Avatar>

        <Button
          variant="ghost"
          size="icon-sm"
          onClick={() => {
            logout();
            navigate("/");
          }}
          aria-label="Log out"
          className="text-[#777777] hover:text-[#ff4b4b]"
        >
          <LogOut className="size-4" />
        </Button>
      </div>
    </header>
  );
}
