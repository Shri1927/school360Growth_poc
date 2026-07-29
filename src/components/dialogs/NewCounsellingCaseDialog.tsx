import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAppData } from "@/context/AppDataContext";
import type { CounsellingCase } from "@/types";
import { uid } from "@/lib/studentHelpers";
import { onSelectString } from "@/lib/selectHelpers";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const schema = z.object({
  studentId: z.string().min(1),
  concern: z.string().min(1),
  priority: z.enum(["low", "medium", "high"]),
});

type FormData = z.infer<typeof schema>;

export function NewCounsellingCaseDialog({
  open,
  onOpenChange,
  defaultStudentId,
  referredBy,
  studentOptions,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultStudentId?: string;
  referredBy?: string;
  studentOptions?: { id: string; name: string }[];
}) {
  const { db, addCounsellingCase } = useAppData();
  const options =
    studentOptions ??
    db.students.map((s) => ({ id: s.id, name: `${s.name} (${s.grade})` }));

  const { register, handleSubmit, setValue, watch, reset } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      studentId: defaultStudentId ?? options[0]?.id ?? "",
      priority: "medium",
    },
  });

  const onSubmit = (data: FormData) => {
    const c: CounsellingCase = {
      id: uid("case"),
      studentId: data.studentId,
      counsellorId: "usr-cou-001",
      concern: data.concern,
      status: "open",
      priority: data.priority,
      restrictedNotes: [],
      followUps: [],
      referredBy,
    };
    addCounsellingCase(c);
    reset();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{referredBy ? "Raise a concern" : "New referral"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label>Student</Label>
            <Select
              value={watch("studentId")}
              onValueChange={onSelectString((v) => setValue("studentId", v))}
              disabled={Boolean(defaultStudentId)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {options.map((s) => (
                  <SelectItem key={s.id} value={s.id}>
                    {s.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="concern">Concern</Label>
            <Textarea id="concern" {...register("concern")} />
          </div>
          <div>
            <Label>Priority</Label>
            <Select
              value={watch("priority")}
              onValueChange={onSelectString((v) => setValue("priority", v as FormData["priority"]))}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {(["low", "medium", "high"] as const).map((p) => (
                  <SelectItem key={p} value={p}>
                    {p}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <Button type="submit">Submit</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
