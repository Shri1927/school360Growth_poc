import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAppData } from "@/context/AppDataContext";
import type { InterventionPlan } from "@/types";
import { uid } from "@/lib/studentHelpers";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const schema = z.object({
  studentId: z.string().min(1, "Please select a student"),
  topic: z.string().min(1, "Topic is required"),
  action: z.string().min(1, "Action details are required"),
  targetDate: z.string().min(1, "Target date is required"),
});

type FormData = z.infer<typeof schema>;

export function LogInterventionDialog({
  studentId: initialStudentId,
  teacherId,
  open,
  onOpenChange,
}: {
  studentId?: string;
  teacherId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const { db, addIntervention } = useAppData();
  const { register, handleSubmit, reset } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      studentId: initialStudentId || (db.students[0]?.id ?? ""),
      targetDate: "2026-08-15",
    },
  });

  const onSubmit = (data: FormData) => {
    const plan: InterventionPlan = {
      id: uid("int"),
      studentId: data.studentId || initialStudentId || db.students[0]?.id || "",
      teacherId,
      topic: data.topic,
      action: data.action,
      targetDate: data.targetDate,
      status: "active",
      createdAt: new Date().toISOString().slice(0, 10),
    };
    addIntervention(plan);
    reset();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create Intervention Plan</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {!initialStudentId && (
            <div>
              <Label htmlFor="studentSelect">Select Student</Label>
              <select
                id="studentSelect"
                {...register("studentId")}
                className="w-full mt-1.5 p-2 rounded-lg border border-slate-200 text-sm bg-white focus:ring-2 focus:ring-emerald-500"
              >
                {db.students.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name} ({s.grade} · Roll {s.rollNo})
                  </option>
                ))}
              </select>
            </div>
          )}
          <div>
            <Label htmlFor="topic">Topic / Focus Area</Label>
            <Input id="topic" {...register("topic")} placeholder="e.g. Algebra — quadratic equations drill" />
          </div>
          <div>
            <Label htmlFor="action">Action Plan & Support Strategy</Label>
            <Textarea id="action" {...register("action")} placeholder="Detailed support steps, buddy system, tutoring schedules..." />
          </div>
          <div>
            <Label htmlFor="targetDate">Target Completion Date</Label>
            <Input id="targetDate" type="date" {...register("targetDate")} />
          </div>
          <DialogFooter>
            <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700 text-white">Save Intervention Plan</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
