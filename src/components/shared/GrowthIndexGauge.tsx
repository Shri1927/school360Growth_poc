import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function GrowthIndexGauge({ value, caption }: { value: number; caption?: string }) {
  const pct = Math.min(100, Math.max(0, value));
  return (
    <Card className="border border-slate-200/90 shadow-sm bg-white rounded-2xl">
      <CardHeader className="pb-2 text-center">
        <CardTitle className="text-base font-bold text-slate-800">Growth Progress Level</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-4 py-2">
        <div
          className="relative flex size-36 items-center justify-center rounded-full border-4 border-emerald-100 shadow-inner"
          style={{
            background: `conic-gradient(#10b981 ${pct * 3.6}deg, #f1f5f9 0deg)`,
          }}
        >
          <div className="flex size-26 flex-col items-center justify-center rounded-full bg-white border border-slate-200 shadow-sm">
            <span className="text-3xl font-extrabold text-emerald-600 font-sans tracking-tight">{pct}</span>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">/ 100 PTS</span>
          </div>
        </div>
        <p className="text-center text-xs font-medium text-slate-500 max-w-xs leading-relaxed">
          {caption ?? "Composite progress index across academics, skills, and growth goals."}
        </p>
      </CardContent>
    </Card>
  );
}
