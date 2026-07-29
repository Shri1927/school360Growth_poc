import { computeGrowthIndex } from "@/lib/growthIndex";
import { counsellingStatusLabel, getStudentRiskLevel, isReferredForCounselling } from "@/lib/risk";
import { useAppData } from "@/context/AppDataContext";
import { GrowthIndexGauge } from "@/components/shared/GrowthIndexGauge";
import { LinkButton } from "@/components/shared/LinkButton";
import { RiskBadge } from "@/components/shared/RiskBadge";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";

interface StudentProfileDrawerProps {
  studentId: string | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  viewerRole?: string;
}

export function StudentProfileDrawer({
  studentId,
  open,
  onOpenChange,
  viewerRole,
}: StudentProfileDrawerProps) {
  const { db } = useAppData();
  const student = db.students.find((s) => s.id === studentId);
  if (!student) {
    return (
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent />
      </Sheet>
    );
  }
  const growth = computeGrowthIndex(student.id, db);
  const risk = getStudentRiskLevel(student.id, db);
  const support = counsellingStatusLabel(student.id, db);
  const referred = isReferredForCounselling(student.id, db);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-md overflow-y-auto">
        <SheetHeader>
          <SheetTitle>{student.name}</SheetTitle>
          <p className="text-sm text-muted-foreground">{student.grade} · Roll {student.rollNo}</p>
        </SheetHeader>
        <div className="mt-4 space-y-4">
          <div className="flex items-center gap-2">
            <RiskBadge level={risk} />
            {referred ? <Badge variant="outline">Referred for counselling</Badge> : null}
          </div>
          {support && viewerRole !== "counsellor" ? (
            <p className="text-sm text-muted-foreground">{support}</p>
          ) : null}
          <GrowthIndexGauge value={growth} />
          {viewerRole === "teacher" ? (
            <LinkButton to={`/teacher/students/${student.id}`} variant="outline" className="w-full" onClick={() => onOpenChange(false)}>
              Open student deep-dive
            </LinkButton>
          ) : null}
        </div>
      </SheetContent>
    </Sheet>
  );
}
