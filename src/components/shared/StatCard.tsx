import type { LucideIcon } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatCardProps {
  label: string;
  value: string;
  icon: LucideIcon;
  trend?: string;
  className?: string;
}

export function StatCard({ label, value, icon: Icon, trend, className }: StatCardProps) {
  const { session } = useAuth();
  const isStudent = session?.role === "student";

  if (isStudent) {
    return (
      <Card className={cn("border-2 border-[#e5e5e5] border-b-4 border-b-[#e5e5e5] bg-white rounded-xl transition-all hover:border-slate-300", className)}>
        <CardHeader className="flex flex-row items-center justify-between pb-1">
          <CardTitle className="text-xs font-bold text-[#777777] uppercase tracking-wider">{label}</CardTitle>
          <div className="size-9 rounded-xl bg-[#eefce8] border-2 border-[#a5ed6e] flex items-center justify-center text-[#58cc02]">
            <Icon className="size-5" />
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="text-3xl font-extrabold font-feather-student text-[#042c60] tracking-tight">{value}</div>
          {trend ? (
            <p className="text-xs font-bold text-[#58cc02] mt-1 flex items-center gap-1">
              <span>⚡</span> {trend}
            </p>
          ) : null}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={cn("border border-slate-200/90 shadow-sm bg-white rounded-2xl transition-all hover:border-slate-300", className)}>
      <CardHeader className="flex flex-row items-center justify-between pb-1">
        <CardTitle className="text-xs font-bold text-slate-500 uppercase tracking-wider">{label}</CardTitle>
        <div className="size-9 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-700">
          <Icon className="size-4" />
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="text-2xl sm:text-3xl font-bold font-sans text-slate-900 tracking-tight">{value}</div>
        {trend ? (
          <p className="text-xs font-semibold text-emerald-600 mt-1 flex items-center gap-1">
            <span>↑</span> {trend}
          </p>
        ) : null}
      </CardContent>
    </Card>
  );
}
