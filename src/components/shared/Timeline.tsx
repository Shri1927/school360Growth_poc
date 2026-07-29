import { formatDate } from "@/lib/utils";

export interface TimelineItem {
  date: string;
  title: string;
  description?: string;
  done?: boolean;
}

export function Timeline({ items }: { items: TimelineItem[] }) {
  return (
    <ol className="relative border-l border-slate-200 ml-3 space-y-6">
      {items.map((item) => (
        <li key={`${item.date}-${item.title}`} className="ml-6">
          <span
            className={`absolute -left-1.5 mt-1.5 size-3 rounded-full border-2 border-white ${
              item.done ? "bg-emerald-500" : "bg-indigo-500"
            }`}
          />
          <time className="text-xs text-muted-foreground">{formatDate(item.date)}</time>
          <h4 className="text-sm font-medium">{item.title}</h4>
          {item.description ? (
            <p className="text-sm text-muted-foreground">{item.description}</p>
          ) : null}
        </li>
      ))}
    </ol>
  );
}
