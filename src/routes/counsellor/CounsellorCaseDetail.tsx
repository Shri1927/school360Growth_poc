import { useState } from "react";
import { useParams } from "react-router-dom";
import { Lock } from "lucide-react";
import { useAppData } from "@/context/AppDataContext";
import { PageHeader } from "@/components/shared/PageHeader";
import { LinkButton } from "@/components/shared/LinkButton";
import { Timeline } from "@/components/shared/Timeline";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function CounsellorCaseDetail() {
  const { caseId } = useParams<{ caseId: string }>();
  const { db, updateCounsellingCase } = useAppData();
  const [note, setNote] = useState("");
  const [followUp, setFollowUp] = useState("");
  const [supportPlan, setSupportPlan] = useState("");

  const c = db.counsellingCases.find((x) => x.id === caseId);
  if (!c) return null;

  const student = db.students.find((s) => s.id === c.studentId);
  const interests = db.careerInterests.filter((i) => i.studentId === c.studentId);

  const addNote = () => {
    if (!note.trim()) return;
    updateCounsellingCase(c.id, {
      restrictedNotes: [...c.restrictedNotes, { date: new Date().toISOString().slice(0, 10), note }],
      status: "in-progress",
    });
    setNote("");
  };

  const addFollowUp = () => {
    if (!followUp.trim()) return;
    updateCounsellingCase(c.id, {
      followUps: [
        ...c.followUps,
        { date: new Date().toISOString().slice(0, 10), action: followUp, done: false },
      ],
    });
    setFollowUp("");
  };

  const savePlan = () => {
    updateCounsellingCase(c.id, { supportPlan, status: "in-progress" });
  };

  return (
    <div>
      <PageHeader
        title={student?.name ?? "Case"}
        description={c.concern}
        actions={
          <LinkButton to="/counsellor/cases" variant="ghost">
            ← Cases
          </LinkButton>
        }
      />
      <div className="flex gap-2 mb-4">
        <Badge>{c.priority} priority</Badge>
        <Badge variant="outline">{c.status}</Badge>
      </div>
      <Card className="mb-6 border-indigo-200">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Lock className="size-4" />
            Restricted notes
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {c.restrictedNotes.map((n) => (
            <div key={n.date + n.note} className="text-sm border-l-2 pl-3">
              <p className="text-xs text-muted-foreground">{n.date}</p>
              <p>{n.note}</p>
            </div>
          ))}
          <div className="space-y-2">
            <Label>Add restricted note</Label>
            <Textarea value={note} onChange={(e) => setNote(e.target.value)} />
            <Button size="sm" onClick={addNote}>
              Save note
            </Button>
          </div>
        </CardContent>
      </Card>
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-base">Support plan</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <Textarea
            value={supportPlan || c.supportPlan || ""}
            onChange={(e) => setSupportPlan(e.target.value)}
            placeholder="Support plan text..."
          />
          <Button size="sm" onClick={savePlan}>
            Update plan
          </Button>
        </CardContent>
      </Card>
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-base">Follow-ups</CardTitle>
        </CardHeader>
        <CardContent>
          <Timeline items={c.followUps.map((f) => ({ date: f.date, title: f.action, done: f.done }))} />
          <div className="flex gap-2 mt-4">
            <Input value={followUp} onChange={(e) => setFollowUp(e.target.value)} placeholder="New follow-up" />
            <Button onClick={addFollowUp}>Add</Button>
          </div>
        </CardContent>
      </Card>
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-base">Career profile (read-only)</CardTitle>
        </CardHeader>
        <CardContent className="text-sm space-y-1">
          {interests.map((i) => (
            <p key={i.cluster}>
              {i.cluster}: {i.score}%
            </p>
          ))}
        </CardContent>
      </Card>
      <div className="flex gap-2">
        <Label>Status</Label>
        <Select
          value={c.status}
          onValueChange={(v) =>
            updateCounsellingCase(c.id, { status: v as typeof c.status })
          }
        >
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {(["open", "in-progress", "closed"] as const).map((s) => (
              <SelectItem key={s} value={s}>
                {s}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
