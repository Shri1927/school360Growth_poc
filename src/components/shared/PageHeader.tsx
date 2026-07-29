import type { ReactNode } from "react";

export function PageHeader({
  title,
  description,
  actions,
}: {
  title: string;
  description?: string;
  actions?: ReactNode;
}) {
  return (
    <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b-2 border-[#e5e5e5] pb-5">
      <div>
        <h1 className="text-3xl sm:text-4xl font-extrabold font-feather text-[#58cc02] tracking-tight">{title}</h1>
        {description ? <p className="text-[#777777] text-sm font-semibold mt-1">{description}</p> : null}
      </div>
      {actions ? <div className="flex flex-wrap gap-2.5">{actions}</div> : null}
    </div>
  );
}
