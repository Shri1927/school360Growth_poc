import { useNavigate } from "react-router-dom";
import { useAuth, roleHomePath } from "@/context/AuthContext";
import { useAppData } from "@/context/AppDataContext";
import type { UserRole } from "@/types";
import { roleLabels } from "@/lib/navConfig";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Users } from "lucide-react";

const demoPersonas: { role: UserRole; userId: string; label: string; icon: string }[] = [
  { role: "student", userId: "usr-stu-001", label: "Aarav Sharma (Grade 10)", icon: "🎓" },
  { role: "student", userId: "usr-stu-002", label: "Priya Nair (Grade 10)", icon: "🎓" },
  { role: "parent", userId: "usr-par-001", label: "Rajesh Sharma (Parent)", icon: "🏠" },
  { role: "teacher", userId: "usr-tch-001", label: "Mrs. Iyer (Math)", icon: "📚" },
  { role: "counsellor", userId: "usr-cou-001", label: "Dr. Desai (Counsellor)", icon: "🌱" },
  { role: "principal", userId: "usr-prin-001", label: "Mr. Verma (Principal)", icon: "🏆" },
  { role: "admin", userId: "usr-adm-001", label: "Platform Admin", icon: "⚡" },
];

export function RoleSwitcher() {
  const { session, switchRole } = useAuth();
  const { db } = useAppData();
  const navigate = useNavigate();

  const value = session ? `${session.role}:${session.userId}` : "";

  return (
    <Select
      value={value}
      onValueChange={(v) => {
        if (!v) return;
        const [role, userId] = v.split(":") as [UserRole, string];
        if (!db.users.some((u) => u.id === userId)) return;
        switchRole({ role, userId });
        navigate(roleHomePath(role));
      }}
    >
      <SelectTrigger className="w-[210px] h-9 text-xs font-bold uppercase tracking-wider rounded-xl border-2 border-[#e5e5e5] border-b-4 border-b-[#e5e5e5] bg-white text-[#4b4b4b] hover:bg-slate-50 transition-all">
        <div className="flex items-center gap-1.5 overflow-hidden">
          <Users className="size-3.5 text-[#58cc02]" />
          <SelectValue placeholder="SWITCH ROLE" />
        </div>
      </SelectTrigger>
      <SelectContent className="rounded-xl border-2 border-[#e5e5e5] border-b-4 border-b-[#e5e5e5] bg-white p-1 shadow-none">
        {demoPersonas.map((p) => (
          <SelectItem key={p.userId} value={`${p.role}:${p.userId}`} className="rounded-lg font-bold text-xs py-2 hover:bg-[#eefce8] hover:text-[#58cc02]">
            <span className="mr-1.5">{p.icon}</span>
            <span>{roleLabels[p.role].toUpperCase()} — {p.label}</span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
