import { useAppData } from "@/context/AppDataContext";
import { roleLabels } from "@/lib/navConfig";
import { PageHeader } from "@/components/shared/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { UserRole } from "@/types";

const permissions: { role: UserRole; canView: string[] }[] = [
  { role: "student", canView: ["Own profile", "Goals", "Portfolio", "Career quiz", "Counselling status (limited)"] },
  { role: "parent", canView: ["Linked child progress", "Attendance", "Feedback", "360° report"] },
  { role: "teacher", canView: ["Class roster", "Observations", "Interventions", "Referral flag only for counselling"] },
  { role: "counsellor", canView: ["Cases", "Restricted notes", "Support plans", "Appointments"] },
  { role: "principal", canView: ["Institution KPIs", "Aggregated risk", "Engagement analytics"] },
  { role: "admin", canView: ["Institutions", "Users", "Role reference (demo)"] },
];

export function AdminOverview() {
  const { db } = useAppData();

  return (
    <div>
      <PageHeader title="Platform admin" description="Institutions, users, and role permissions (demo)" />
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-base">Institutions</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>City</TableHead>
                <TableHead>Students</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {db.institutions.map((i) => (
                <TableRow key={i.id}>
                  <TableCell>{i.name}</TableCell>
                  <TableCell>{i.city}</TableCell>
                  <TableCell>{i.studentCount}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-base">Users</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {db.users.map((u) => (
                <TableRow key={u.id}>
                  <TableCell>{u.name}</TableCell>
                  <TableCell>{u.email}</TableCell>
                  <TableCell>{roleLabels[u.role]}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Role permissions (reference)</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Role</TableHead>
                <TableHead>Access</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {permissions.map((p) => (
                <TableRow key={p.role}>
                  <TableCell>{roleLabels[p.role]}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{p.canView.join(" · ")}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
