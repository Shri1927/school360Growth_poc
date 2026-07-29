import { useAuth } from "@/context/AuthContext";
import { useAppData } from "@/context/AppDataContext";
import { getStudentForSession } from "@/lib/studentHelpers";
import { PageHeader } from "@/components/shared/PageHeader";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function StudentMessages() {
  const { session } = useAuth();
  const { db } = useAppData();
  const student = getStudentForSession(session, db);
  if (!student || !session) return null;

  const messages = db.messages.filter((m) => m.toId === session.userId || m.fromId === session.userId);
  const announcements = db.announcements.filter(
    (a) => a.audience === "all" || a.audience === "students",
  );

  return (
    <div>
      <PageHeader title="Messages & announcements" />
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Messages</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {messages.map((m) => (
              <div key={m.id} className="border-b pb-3 last:border-0">
                <div className="flex items-center justify-between">
                  <p className="font-medium text-sm">{m.subject}</p>
                  {!m.read ? <Badge>New</Badge> : null}
                </div>
                <p className="text-sm text-muted-foreground mt-1">{m.body}</p>
                <p className="text-xs text-muted-foreground mt-1">{m.date}</p>
              </div>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Announcements</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {announcements.map((a) => (
              <div key={a.id}>
                <p className="font-medium text-sm">{a.title}</p>
                <p className="text-sm text-muted-foreground">{a.body}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
