import { useState } from "react";
import { Plus, CheckCircle2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useAppData } from "@/context/AppDataContext";
import { getStudentForSession } from "@/lib/studentHelpers";
import { NewPortfolioItemDialog } from "@/components/dialogs/NewPortfolioItemDialog";
import { PageHeader } from "@/components/shared/PageHeader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function StudentPortfolio() {
  const { session } = useAuth();
  const { db } = useAppData();
  const student = getStudentForSession(session, db);
  const [open, setOpen] = useState(false);

  if (!student) return null;

  const items = db.portfolioItems.filter((p) => p.studentId === student.id);

  return (
    <div>
      <PageHeader
        title="Digital portfolio"
        actions={
          <Button onClick={() => setOpen(true)}>
            <Plus className="size-4 mr-2" />
            Add achievement
          </Button>
        }
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((p) => (
          <Card key={p.id} className={p.verified ? "border-emerald-200" : "border-amber-200"}>
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between">
                <CardTitle className="text-base">{p.title}</CardTitle>
                {p.verified ? (
                  <CheckCircle2 className="size-5 text-emerald-600" />
                ) : (
                  <Badge variant="outline">Pending</Badge>
                )}
              </div>
              <Badge variant="secondary" className="w-fit capitalize">
                {p.type}
              </Badge>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{p.description}</p>
              <p className="text-xs text-muted-foreground mt-2">{p.date}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      <NewPortfolioItemDialog studentId={student.id} open={open} onOpenChange={setOpen} />
    </div>
  );
}
