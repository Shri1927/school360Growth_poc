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

const demoPersonas: { role: UserRole; userId: string; label: string }[] = [
  { role: "student", userId: "usr-stu-001", label: "Aarav Sharma (Grade 10)" },
  { role: "student", userId: "usr-stu-002", label: "Priya Nair (Grade 10)" },
  { role: "parent", userId: "usr-par-001", label: "Rajesh Sharma (Aarav's parent)" },
  { role: "teacher", userId: "usr-tch-001", label: "Mrs. Iyer (Math)" },
  { role: "counsellor", userId: "usr-cou-001", label: "Dr. Desai" },
  { role: "principal", userId: "usr-prin-001", label: "Mr. Verma" },
  { role: "admin", userId: "usr-adm-001", label: "Platform Admin" },
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
      <SelectTrigger className="w-[200px] h-8 text-xs">
        <SelectValue placeholder="Switch role" />
      </SelectTrigger>
      <SelectContent>
        {demoPersonas.map((p) => (
          <SelectItem key={p.userId} value={`${p.role}:${p.userId}`}>
            {roleLabels[p.role]} — {p.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
