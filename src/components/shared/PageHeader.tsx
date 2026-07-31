import type { ReactNode } from "react";
import { useAuth } from "@/context/AuthContext";

export function PageHeader({
  title,
  description,
  actions,
}: {
  title: string;
  description?: string;
  actions?: ReactNode;
}) {
  const { session } = useAuth();
  const isStudent = session?.role === "student";

  return (
    <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-slate-200 pb-5">
      <div>
        {isStudent ? (
          <h1 className="text-3xl sm:text-4xl font-extrabold font-feather-student text-[#58cc02] tracking-tight">
            {title}
          </h1>
        ) : (
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-sans">
            {title}
          </h1>
        )}
        {description ? (
          <p className={isStudent ? "text-[#777777] text-sm font-semibold mt-1" : "text-slate-500 text-sm font-medium mt-1"}>
            {description}
          </p>
        ) : null}
      </div>
      {actions ? <div className="flex flex-wrap gap-2.5">{actions}</div> : null}
    </div>
  );
}
