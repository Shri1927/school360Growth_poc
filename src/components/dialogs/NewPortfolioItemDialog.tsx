import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAppData } from "@/context/AppDataContext";
import type { PortfolioItem } from "@/types";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const schema = z.object({
  title: z.string().min(1),
  type: z.enum(["certificate", "project", "sport", "art", "competition", "volunteering", "internship"]),
  description: z.string().min(1),
  date: z.string().min(1),
});

type FormData = z.infer<typeof schema>;

export function NewPortfolioItemDialog({
  studentId,
  open,
  onOpenChange,
}: {
  studentId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const { addPortfolioItem } = useAppData();
  const { register, handleSubmit, setValue, watch, reset } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { type: "project", date: new Date().toISOString().slice(0, 10) },
  });

  const onSubmit = (data: FormData) => {
    const item: PortfolioItem = {
      id: uid("pf"),
      studentId,
      ...data,
      verified: false,
      evidenceLabel: "upload-placeholder.pdf",
    };
    addPortfolioItem(item);
    reset();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add achievement</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="title">Title</Label>
            <Input id="title" {...register("title")} />
          </div>
          <div>
            <Label>Type</Label>
            <Select value={watch("type")} onValueChange={(v) => setValue("type", v as FormData["type"])}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {(
                  ["certificate", "project", "sport", "art", "competition", "volunteering", "internship"] as const
                ).map((t) => (
                  <SelectItem key={t} value={t}>
                    {t}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" {...register("description")} />
          </div>
          <div>
            <Label htmlFor="date">Date</Label>
            <Input id="date" type="date" {...register("date")} />
          </div>
          <DialogFooter>
            <Button type="submit">Add to portfolio</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
