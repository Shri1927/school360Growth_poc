import { useState } from "react";
import { Plus, Search, Filter, Calendar, CheckCircle2, Clock, AlertCircle } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useAppData } from "@/context/AppDataContext";
import { PageHeader } from "@/components/shared/PageHeader";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LogInterventionDialog } from "@/components/dialogs/LogInterventionDialog";

export function TeacherInterventions() {
  const { session } = useAuth();
  const { db } = useAppData();
  const [openCreate, setOpenCreate] = useState(false);
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const teacherId = session?.userId || "usr-tch-001";
  
  // Get all plans associated with the current teacher or general database fallback
  const plans = db.interventionPlans.filter(
    (p) => p.teacherId === teacherId || p.teacherId === "usr-tch-001",
  );

  const filteredPlans = plans.filter((p) => {
    const student = db.students.find((s) => s.id === p.studentId);
    const matchesStatus = filterStatus === "all" || p.status === filterStatus;
    const matchesSearch =
      !searchQuery ||
      p.topic.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student?.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return (
          <Badge className="bg-emerald-100 text-emerald-800 border-emerald-300 font-semibold px-2.5 py-0.5">
            <Clock className="size-3 mr-1 inline" /> Active
          </Badge>
        );
      case "in-progress":
        return (
          <Badge className="bg-sky-100 text-sky-800 border-sky-300 font-semibold px-2.5 py-0.5">
            <AlertCircle className="size-3 mr-1 inline" /> In Progress
          </Badge>
        );
      case "completed":
        return (
          <Badge className="bg-slate-100 text-slate-700 border-slate-300 font-semibold px-2.5 py-0.5">
            <CheckCircle2 className="size-3 mr-1 inline" /> Completed
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Intervention Plans"
        description="Targeted academic & behavioral support plans for your class"
        actions={
          <Button onClick={() => setOpenCreate(true)} className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold">
            <Plus className="size-4 mr-2" />
            Create Intervention Plan
          </Button>
        }
      />

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-2.5 size-4 text-slate-400" />
          <Input
            placeholder="Search student, topic or strategy..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 bg-white border-slate-200 text-sm rounded-xl"
          />
        </div>

        <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto">
          <Filter className="size-4 text-slate-400 mr-1" />
          {["all", "active", "in-progress", "completed"].map((st) => (
            <button
              key={st}
              onClick={() => setFilterStatus(st)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold capitalize transition-all ${
                filterStatus === st
                  ? "bg-white text-emerald-700 shadow-sm border border-slate-200 scale-105"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/60"
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Plans List */}
      {filteredPlans.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2">
          {filteredPlans.map((p) => {
            const student = db.students.find((s) => s.id === p.studentId);
            return (
              <Card key={p.id} className="hover:shadow-md transition-shadow border border-slate-200/90 rounded-2xl bg-white overflow-hidden">
                <CardHeader className="pb-3 border-b border-slate-100 bg-slate-50/50">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <CardTitle className="text-base font-bold text-slate-900">{p.topic}</CardTitle>
                      <p className="text-xs font-semibold text-emerald-700 mt-1">
                        {student?.name || "Student"} {student ? `· ${student.grade}` : ""}
                      </p>
                    </div>
                    {getStatusBadge(p.status)}
                  </div>
                </CardHeader>

                <CardContent className="pt-4 text-sm space-y-3">
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/60">
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">Action Plan & Strategy</p>
                    <p className="text-slate-700 font-medium leading-relaxed">{p.action}</p>
                  </div>

                  <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="size-3.5 text-slate-400" />
                      <span>Target: <strong className="text-slate-700">{p.targetDate}</strong></span>
                    </div>
                    {p.createdAt && (
                      <span>Created: {p.createdAt}</span>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      ) : (
        <div className="text-center p-12 bg-slate-50 rounded-2xl border border-dashed border-slate-300 space-y-3">
          <p className="text-base font-bold text-slate-700">No intervention plans found</p>
          <p className="text-sm text-slate-500 max-w-md mx-auto">
            {searchQuery || filterStatus !== "all"
              ? "No plans match your current search or filter criteria. Try resetting filters."
              : "No active intervention plans logged yet. Click below to create a support plan for your students."}
          </p>
          <Button onClick={() => setOpenCreate(true)} className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold mt-2">
            <Plus className="size-4 mr-2" />
            Create Intervention Plan
          </Button>
        </div>
      )}

      <LogInterventionDialog
        teacherId={teacherId}
        open={openCreate}
        onOpenChange={setOpenCreate}
      />
    </div>
  );
}
