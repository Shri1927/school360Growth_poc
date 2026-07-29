import { Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function AiBadge() {
  return (
    <Badge
      variant="secondary"
      className="gap-1 font-normal"
      title="Generated from student data. Reviewed content may differ."
    >
      <Sparkles className="size-3" />
      AI-assisted
    </Badge>
  );
}
