import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAppData } from "@/context/AppDataContext";
import type { Goal } from "@/types";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const schema = z.object({
  title: z.string().min(1, "Title is required"),
  category: z.enum(["academic", "attendance", "skill", "career", "habit"]),
  targetDate: z.string().min(1, "Target date is required"),
});

type FormData = z.infer<typeof schema>;

export function NewGoalDialog({
  studentId,
  open,
  onOpenChange,
}: {
  studentId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const { addGoal } = useAppData();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { category: "academic", targetDate: "2026-09-01" },
  });

  const onSubmit = (data: FormData) => {
    const goal: Goal = {
      id: uid("goal"),
      studentId,
      title: data.title,
      category: data.category,
      targetDate: data.targetDate,
      status: "not-started",
      milestones: [{ title: "Get started", done: false }],
      source: "student",
    };
    addGoal(goal);
    reset();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New goal</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="title">Title</Label>
            <Input id="title" {...register("title")} />
            {errors.title ? <p className="text-xs text-destructive">{errors.title.message}</p> : null}
          </div>
          <div>
            <Label>Category</Label>
            <Select value={watch("category")} onValueChange={(v) => setValue("category", v as FormData["category"])}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {(["academic", "attendance", "skill", "career", "habit"] as const).map((c) => (
                  <SelectItem key={c} value={c}>
                    {c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="targetDate">Target date</Label>
            <Input id="targetDate" type="date" {...register("targetDate")} />
          </div>
          <DialogFooter>
            <Button type="submit">Save goal</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
