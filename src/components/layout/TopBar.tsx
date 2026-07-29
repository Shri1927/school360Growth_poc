import { Bell, LogOut } from "lucide-react";
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
    <header className="no-print sticky top-0 z-10 flex h-14 items-center justify-between border-b bg-white px-4 md:px-6">
      <p className="text-sm text-muted-foreground hidden sm:block">
        {roleLabels[session.role]} view — {user.name}
      </p>
      <div className="flex items-center gap-2 ml-auto">
        <RoleSwitcher />
        <DropdownMenu>
          <DropdownMenuTrigger
            className="inline-flex size-8 items-center justify-center rounded-lg hover:bg-muted"
            aria-label="Notifications"
          >
            <Bell className="size-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-64">
            {notifications.map((n) => (
              <DropdownMenuItem key={n.id} className="text-sm">
                {n.text}
              </DropdownMenuItem>
            ))}
            {db.announcements.slice(0, 1).map((a) => (
              <DropdownMenuItem key={a.id} className="text-sm text-muted-foreground">
                {a.title}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <Avatar className="size-8">
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => {
            logout();
            navigate("/");
          }}
          aria-label="Log out"
        >
          <LogOut className="size-4" />
        </Button>
      </div>
    </header>
  );
}
