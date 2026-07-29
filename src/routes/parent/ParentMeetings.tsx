import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useAppData } from "@/context/AppDataContext";
import { getLinkedStudentsForParent } from "@/lib/studentHelpers";
import { BookAppointmentDialog } from "@/components/dialogs/BookAppointmentDialog";
import { PageHeader } from "@/components/shared/PageHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function ParentMeetings() {
  const { session } = useAuth();
  const { db } = useAppData();
  const children = session ? getLinkedStudentsForParent(session.userId, db) : [];
  const [open, setOpen] = useState(false);
  const child = children[0];

  const meetings = db.pendingActions.filter(
    (p) => p.parentUserId === session?.userId && p.type === "meeting",
  );

  return (
    <div>
      <PageHeader
        title="Meetings & PTM"
        actions={
          child ? (
            <Button onClick={() => setOpen(true)}>Book a meeting</Button>
          ) : null
        }
      />
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Meeting requests</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {meetings.map((m) => (
            <div key={m.id} className="text-sm border-b pb-2">
              <p className="font-medium">{m.title}</p>
              <p className="text-muted-foreground">{m.description}</p>
              <p className="text-xs capitalize mt-1">Status: {m.status}</p>
            </div>
          ))}
        </CardContent>
      </Card>
      {child ? (
        <BookAppointmentDialog studentId={child.id} open={open} onOpenChange={setOpen} />
      ) : null}
    </div>
  );
}
