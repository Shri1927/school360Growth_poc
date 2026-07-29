import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function GrowthIndexGauge({ value, caption }: { value: number; caption?: string }) {
  const pct = Math.min(100, Math.max(0, value));
  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-base">Growth progress index</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-3">
        <div
          className="relative flex size-32 items-center justify-center rounded-full"
          style={{
            background: `conic-gradient(#4F46E5 ${pct * 3.6}deg, #e2e8f0 0deg)`,
          }}
        >
          <div className="flex size-24 flex-col items-center justify-center rounded-full bg-white">
            <span className="text-2xl font-semibold">{pct}</span>
            <span className="text-xs text-muted-foreground">/ 100</span>
          </div>
        </div>
        <p className="text-center text-sm text-muted-foreground max-w-xs">
          {caption ?? "Composite progress across academic, attendance, skills, and goals dimensions."}
        </p>
      </CardContent>
    </Card>
  );
}
