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
  topic: z.string().min(1),
  action: z.string().min(1),
  targetDate: z.string().min(1),
});

type FormData = z.infer<typeof schema>;

export function LogInterventionDialog({
  studentId,
  teacherId,
  open,
  onOpenChange,
}: {
  studentId: string;
  teacherId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const { addIntervention } = useAppData();
  const { register, handleSubmit, reset } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { targetDate: "2026-08-15" },
  });

  const onSubmit = (data: FormData) => {
    const plan: InterventionPlan = {
      id: uid("int"),
      studentId,
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
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create intervention plan</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="topic">Topic</Label>
            <Input id="topic" {...register("topic")} placeholder="e.g. Algebra — quadratic equations" />
          </div>
          <div>
            <Label htmlFor="action">Action</Label>
            <Textarea id="action" {...register("action")} placeholder="Specific steps and support" />
          </div>
          <div>
            <Label htmlFor="targetDate">Target date</Label>
            <Input id="targetDate" type="date" {...register("targetDate")} />
          </div>
          <DialogFooter>
            <Button type="submit">Save plan</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
