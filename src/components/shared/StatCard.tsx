import type { LucideIcon } from "lucide-react";
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
  return (
    <Card className={cn("border-2 border-[#e5e5e5] border-b-4 border-b-[#e5e5e5] bg-white rounded-xl transition-all hover:border-slate-300", className)}>
      <CardHeader className="flex flex-row items-center justify-between pb-1">
        <CardTitle className="text-xs font-bold text-[#777777] uppercase tracking-wider">{label}</CardTitle>
        <div className="size-9 rounded-xl bg-[#eefce8] border-2 border-[#a5ed6e] flex items-center justify-center text-[#58cc02]">
          <Icon className="size-5" />
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="text-3xl font-extrabold font-feather text-[#042c60] tracking-tight">{value}</div>
        {trend ? (
          <p className="text-xs font-bold text-[#58cc02] mt-1 flex items-center gap-1">
            <span>⚡</span> {trend}
          </p>
        ) : null}
      </CardContent>
    </Card>
  );
}
