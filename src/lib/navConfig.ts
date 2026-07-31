import type { UserRole } from "@/types";

export interface NavItem {
  label: string;
  path: string;
}

export const navByRole: Record<UserRole, NavItem[]> = {
  student: [
    { label: "Dashboard", path: "/student" },
    { label: "Academics", path: "/student/academics" },
    { label: "Skills", path: "/student/skills" },
    { label: "Goals", path: "/student/goals" },
    { label: "Portfolio", path: "/student/portfolio" },
    { label: "Career", path: "/student/career" },
    { label: "Counselling", path: "/student/counselling" },
    { label: "Messages", path: "/student/messages" },
    { label: "360° Report", path: "/student/report" },
  ],
  parent: [
    { label: "Dashboard", path: "/parent" },
    { label: "Academics", path: "/parent/academics" },
    { label: "Attendance", path: "/parent/attendance" },
    { label: "Feedback", path: "/parent/feedback" },
    { label: "Meetings", path: "/parent/meetings" },
    { label: "360° Report", path: "/parent/report" },
  ],
  teacher: [
    { label: "Dashboard", path: "/teacher" },
    { label: "AI Assistant", path: "/teacher/ai-assistant" },
    { label: "Interventions", path: "/teacher/interventions" },
    { label: "Analytics", path: "/teacher/analytics" },
  ],
  counsellor: [
    { label: "Dashboard", path: "/counsellor" },
    { label: "Cases", path: "/counsellor/cases" },
    { label: "Appointments", path: "/counsellor/appointments" },
  ],
  principal: [
    { label: "Dashboard", path: "/principal" },
    { label: "Departments", path: "/principal/departments" },
    { label: "Risk", path: "/principal/risk" },
    { label: "Engagement", path: "/principal/engagement" },
  ],
  admin: [
    { label: "Overview", path: "/admin" },
  ],
};

export const roleLabels: Record<UserRole, string> = {
  student: "Student",
  parent: "Parent",
  teacher: "Teacher",
  counsellor: "Counsellor",
  principal: "Principal",
  admin: "Platform Admin",
};
