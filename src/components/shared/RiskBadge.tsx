import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type RiskLevel = "low" | "medium" | "high";

const styles: Record<RiskLevel, string> = {
  low: "bg-[#eefce8] text-[#58cc02] border-[#a5ed6e]",
  medium: "bg-[#fffbeb] text-[#d97706] border-[#fde68a]",
  high: "bg-[#fff0f0] text-[#ff4b4b] border-[#ff4b4b]",
};

const labels: Record<RiskLevel, string> = {
  low: "On Track",
  medium: "Needs Focus",
  high: "Action Needed",
};

export function RiskBadge({ level, className }: { level: RiskLevel; className?: string }) {
  return (
    <Badge className={cn("font-bold uppercase tracking-wider text-[11px]", styles[level], className)}>
      {labels[level]}
    </Badge>
  );
}
