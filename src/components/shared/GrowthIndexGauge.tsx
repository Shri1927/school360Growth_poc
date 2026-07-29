import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function GrowthIndexGauge({ value, caption }: { value: number; caption?: string }) {
  const pct = Math.min(100, Math.max(0, value));
  return (
    <Card className="border-2 border-[#e5e5e5] border-b-4 border-b-[#e5e5e5] bg-white rounded-xl">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-feather text-[#042c60]">Growth Progress Level</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-4 py-2">
        <div
          className="relative flex size-36 items-center justify-center rounded-full border-4 border-[#a5ed6e]"
          style={{
            background: `conic-gradient(#58cc02 ${pct * 3.6}deg, #e5e5e5 0deg)`,
          }}
        >
          <div className="flex size-26 flex-col items-center justify-center rounded-full bg-white border-2 border-[#e5e5e5]">
            <span className="text-3xl font-extrabold font-feather text-[#58cc02]">{pct}</span>
            <span className="text-[11px] font-extrabold text-[#777777] uppercase tracking-wider">/ 100 PTS</span>
          </div>
        </div>
        <p className="text-center text-xs font-semibold text-[#777777] max-w-xs">
          {caption ?? "Composite progress index across academics, skills, and growth goals."}
        </p>
      </CardContent>
    </Card>
  );
}
