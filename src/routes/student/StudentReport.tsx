import { useAuth } from "@/context/AuthContext";
import { useAppData } from "@/context/AppDataContext";
import { getStudentForSession } from "@/lib/studentHelpers";
import { StudentReportView } from "@/components/shared/StudentReportView";

export function StudentReport() {
  const { session } = useAuth();
  const { db } = useAppData();
  const student = getStudentForSession(session, db);
  if (!student) return null;
  return <StudentReportView studentId={student.id} backPath="/student" />;
}
