import { Inbox } from "lucide-react";

export function EmptyState({ title, description }: { title: string; description?: string }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg border border-dashed bg-white p-10 text-center">
      <Inbox className="size-10 text-muted-foreground mb-3" />
      <h3 className="font-medium">{title}</h3>
      {description ? <p className="text-sm text-muted-foreground mt-1 max-w-sm">{description}</p> : null}
    </div>
  );
}
