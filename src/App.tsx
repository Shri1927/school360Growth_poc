import { Navigate, Route, Routes } from "react-router-dom";
import { Landing } from "@/routes/Landing";
import { ProtectedLayout, RoleGuard } from "@/routes/ProtectedLayout";
import { StudentDashboard } from "@/routes/student/StudentDashboard";
import { StudentAcademics } from "@/routes/student/StudentAcademics";
import { StudentSkills } from "@/routes/student/StudentSkills";
import { StudentGoals } from "@/routes/student/StudentGoals";
import { StudentPortfolio } from "@/routes/student/StudentPortfolio";
import { StudentCareer } from "@/routes/student/StudentCareer";
import { StudentCounselling } from "@/routes/student/StudentCounselling";
import { StudentMessages } from "@/routes/student/StudentMessages";
import { StudentReport } from "@/routes/student/StudentReport";
import { ParentDashboard } from "@/routes/parent/ParentDashboard";
import { ParentAcademics } from "@/routes/parent/ParentAcademics";
import { ParentAttendance } from "@/routes/parent/ParentAttendance";
import { ParentFeedback } from "@/routes/parent/ParentFeedback";
import { ParentMeetings } from "@/routes/parent/ParentMeetings";
import { ParentReport } from "@/routes/parent/ParentReport";
import { TeacherDashboard } from "@/routes/teacher/TeacherDashboard";
import { TeacherClassRoster } from "@/routes/teacher/TeacherClassRoster";
import { TeacherStudentDetail } from "@/routes/teacher/TeacherStudentDetail";
import { TeacherInterventions } from "@/routes/teacher/TeacherInterventions";
import { TeacherAnalytics } from "@/routes/teacher/TeacherAnalytics";
import { CounsellorDashboard } from "@/routes/counsellor/CounsellorDashboard";
import { CounsellorCases } from "@/routes/counsellor/CounsellorCases";
import { CounsellorCaseDetail } from "@/routes/counsellor/CounsellorCaseDetail";
import { CounsellorAppointments } from "@/routes/counsellor/CounsellorAppointments";
import { PrincipalDashboard } from "@/routes/principal/PrincipalDashboard";
import { PrincipalDepartments } from "@/routes/principal/PrincipalDepartments";
import { PrincipalRisk } from "@/routes/principal/PrincipalRisk";
import { PrincipalEngagement } from "@/routes/principal/PrincipalEngagement";
import { AdminOverview } from "@/routes/admin/AdminOverview";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route element={<ProtectedLayout />}>
        <Route
          path="/student"
          element={
            <RoleGuard role="student">
              <StudentDashboard />
            </RoleGuard>
          }
        />
        <Route path="/student/academics" element={<RoleGuard role="student"><StudentAcademics /></RoleGuard>} />
        <Route path="/student/skills" element={<RoleGuard role="student"><StudentSkills /></RoleGuard>} />
        <Route path="/student/goals" element={<RoleGuard role="student"><StudentGoals /></RoleGuard>} />
        <Route path="/student/portfolio" element={<RoleGuard role="student"><StudentPortfolio /></RoleGuard>} />
        <Route path="/student/career" element={<RoleGuard role="student"><StudentCareer /></RoleGuard>} />
        <Route path="/student/counselling" element={<RoleGuard role="student"><StudentCounselling /></RoleGuard>} />
        <Route path="/student/messages" element={<RoleGuard role="student"><StudentMessages /></RoleGuard>} />
        <Route path="/student/report" element={<RoleGuard role="student"><StudentReport /></RoleGuard>} />

        <Route path="/parent" element={<RoleGuard role="parent"><ParentDashboard /></RoleGuard>} />
        <Route path="/parent/academics" element={<RoleGuard role="parent"><ParentAcademics /></RoleGuard>} />
        <Route path="/parent/attendance" element={<RoleGuard role="parent"><ParentAttendance /></RoleGuard>} />
        <Route path="/parent/feedback" element={<RoleGuard role="parent"><ParentFeedback /></RoleGuard>} />
        <Route path="/parent/meetings" element={<RoleGuard role="parent"><ParentMeetings /></RoleGuard>} />
        <Route path="/parent/report" element={<RoleGuard role="parent"><ParentReport /></RoleGuard>} />

        <Route path="/teacher" element={<RoleGuard role="teacher"><TeacherDashboard /></RoleGuard>} />
        <Route path="/teacher/classes/:classId" element={<RoleGuard role="teacher"><TeacherClassRoster /></RoleGuard>} />
        <Route path="/teacher/students/:studentId" element={<RoleGuard role="teacher"><TeacherStudentDetail /></RoleGuard>} />
        <Route path="/teacher/interventions" element={<RoleGuard role="teacher"><TeacherInterventions /></RoleGuard>} />
        <Route path="/teacher/analytics" element={<RoleGuard role="teacher"><TeacherAnalytics /></RoleGuard>} />

        <Route path="/counsellor" element={<RoleGuard role="counsellor"><CounsellorDashboard /></RoleGuard>} />
        <Route path="/counsellor/cases" element={<RoleGuard role="counsellor"><CounsellorCases /></RoleGuard>} />
        <Route path="/counsellor/cases/:caseId" element={<RoleGuard role="counsellor"><CounsellorCaseDetail /></RoleGuard>} />
        <Route path="/counsellor/appointments" element={<RoleGuard role="counsellor"><CounsellorAppointments /></RoleGuard>} />

        <Route path="/principal" element={<RoleGuard role="principal"><PrincipalDashboard /></RoleGuard>} />
        <Route path="/principal/departments" element={<RoleGuard role="principal"><PrincipalDepartments /></RoleGuard>} />
        <Route path="/principal/risk" element={<RoleGuard role="principal"><PrincipalRisk /></RoleGuard>} />
        <Route path="/principal/engagement" element={<RoleGuard role="principal"><PrincipalEngagement /></RoleGuard>} />

        <Route path="/admin" element={<RoleGuard role="admin"><AdminOverview /></RoleGuard>} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
