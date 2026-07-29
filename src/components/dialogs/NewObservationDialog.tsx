import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAppData } from "@/context/AppDataContext";
import type { Observation } from "@/types";
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
  trait: z.string().min(1),
  note: z.string().min(1),
});

type FormData = z.infer<typeof schema>;

export function NewObservationDialog({
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
  const { addObservation } = useAppData();
  const { register, handleSubmit, reset } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { trait: "Confidence" },
  });

  const onSubmit = (data: FormData) => {
    const obs: Observation = {
      id: uid("obs"),
      studentId,
      teacherId,
      trait: data.trait,
      note: data.note,
      date: new Date().toISOString().slice(0, 10),
    };
    addObservation(obs);
    reset();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add observation</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="trait">Trait</Label>
            <Input id="trait" {...register("trait")} />
          </div>
          <div>
            <Label htmlFor="note">Note</Label>
            <Textarea id="note" {...register("note")} />
          </div>
          <DialogFooter>
            <Button type="submit">Save observation</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
