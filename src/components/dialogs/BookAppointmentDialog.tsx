import { useForm } from "react-hook-form";
import { useAppData } from "@/context/AppDataContext";
import type { Appointment } from "@/types";
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

export function BookAppointmentDialog({
  studentId,
  counsellorId = "usr-cou-001",
  open,
  onOpenChange,
}: {
  studentId: string;
  counsellorId?: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const { addAppointment } = useAppData();
  const { register, handleSubmit, reset } = useForm<{ dateTime: string }>();

  const onSubmit = (data: { dateTime: string }) => {
    const appt: Appointment = {
      id: uid("appt"),
      studentId,
      counsellorId,
      dateTime: new Date(data.dateTime).toISOString(),
      status: "requested",
    };
    addAppointment(appt);
    reset();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Book counselling appointment</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="dateTime">Preferred date & time</Label>
            <Input id="dateTime" type="datetime-local" {...register("dateTime")} />
          </div>
          <DialogFooter>
            <Button type="submit">Request appointment</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
