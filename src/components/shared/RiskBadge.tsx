import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type RiskLevel = "low" | "medium" | "high";

const styles: Record<RiskLevel, string> = {
  low: "bg-emerald-100 text-emerald-800 border-emerald-200",
  medium: "bg-amber-100 text-amber-900 border-amber-200",
  high: "bg-rose-100 text-rose-800 border-rose-200",
};

const labels: Record<RiskLevel, string> = {
  low: "Low priority",
  medium: "Medium priority",
  high: "High priority",
};

export function RiskBadge({ level, className }: { level: RiskLevel; className?: string }) {
  return (
    <Badge variant="outline" className={cn("font-normal", styles[level], className)}>
      {labels[level]}
    </Badge>
  );
}
