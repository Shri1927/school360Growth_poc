import { Lock } from "lucide-react";
import { useAppData } from "@/context/AppDataContext";
import { LinkButton } from "@/components/shared/LinkButton";
import { PageHeader } from "@/components/shared/PageHeader";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function CounsellorCases() {
  const { db } = useAppData();

  return (
    <div>
      <PageHeader
        title="Counselling cases"
        description="Confidential case management"
      />
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4">
            <Lock className="size-3" />
            Restricted — Counsellor only. Notes never visible to teachers or parents.
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student</TableHead>
                <TableHead>Concern</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Status</TableHead>
                <TableHead />
              </TableRow>
            </TableHeader>
            <TableBody>
              {db.counsellingCases.map((c) => (
                <TableRow key={c.id}>
                  <TableCell>{db.students.find((s) => s.id === c.studentId)?.name}</TableCell>
                  <TableCell>{c.concern}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{c.priority}</Badge>
                  </TableCell>
                  <TableCell>{c.status}</TableCell>
                  <TableCell>
                    <LinkButton to={`/counsellor/cases/${c.id}`} size="sm" variant="outline">
                      View
                    </LinkButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
