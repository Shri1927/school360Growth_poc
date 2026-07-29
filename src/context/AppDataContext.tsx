import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { initialMockDb } from "@/data/mockDb";
import { loadPersistedDb, persistDb } from "@/lib/storage";
import type {
  Appointment,
  CounsellingCase,
  Goal,
  InterventionPlan,
  LearningGap,
  MockDb,
  Observation,
  PendingAction,
  PortfolioItem,
  TeacherFeedback,
} from "@/types";

interface AppDataContextValue {
  db: MockDb;
  updateDb: (updater: (prev: MockDb) => MockDb) => void;
  addGoal: (goal: Goal) => void;
  addPortfolioItem: (item: PortfolioItem) => void;
  verifyPortfolioItem: (id: string) => void;
  addObservation: (obs: Observation) => void;
  addIntervention: (plan: InterventionPlan) => void;
  addCounsellingCase: (c: CounsellingCase) => void;
  updateCounsellingCase: (id: string, patch: Partial<CounsellingCase>) => void;
  addAppointment: (a: Appointment) => void;
  setPendingActionStatus: (id: string, status: PendingAction["status"]) => void;
  addTeacherFeedback: (fb: TeacherFeedback) => void;
  addLearningGap: (gap: LearningGap) => void;
  upsertCareerInterests: (studentId: string, clusters: { cluster: string; score: number }[]) => void;
  toggleTask: (studentId: string, taskId: string) => void;
}

const AppDataContext = createContext<AppDataContextValue | null>(null);

export function AppDataProvider({ children }: { children: ReactNode }) {
  const [db, setDb] = useState<MockDb>(() => loadPersistedDb(initialMockDb));

  useEffect(() => {
    persistDb(db);
  }, [db]);

  const updateDb = useCallback((updater: (prev: MockDb) => MockDb) => {
    setDb((prev) => updater(prev));
  }, []);

  const addGoal = useCallback((goal: Goal) => {
    setDb((prev) => ({ ...prev, goals: [...prev.goals, goal] }));
  }, []);

  const addPortfolioItem = useCallback((item: PortfolioItem) => {
    setDb((prev) => ({ ...prev, portfolioItems: [...prev.portfolioItems, item] }));
  }, []);

  const verifyPortfolioItem = useCallback((id: string) => {
    setDb((prev) => ({
      ...prev,
      portfolioItems: prev.portfolioItems.map((p) =>
        p.id === id ? { ...p, verified: true } : p,
      ),
    }));
  }, []);

  const addObservation = useCallback((obs: Observation) => {
    setDb((prev) => ({ ...prev, observations: [...prev.observations, obs] }));
  }, []);

  const addIntervention = useCallback((plan: InterventionPlan) => {
    setDb((prev) => {
      const pending: PendingAction = {
        id: `pa-int-${plan.id}`,
        parentUserId: prev.students.find((s) => s.id === plan.studentId)?.guardianIds[0] ?? "",
        studentId: plan.studentId,
        type: "intervention",
        title: `Intervention plan: ${plan.topic}`,
        description: plan.action,
        status: "pending",
      };
      const pendingActions =
        pending.parentUserId && !prev.pendingActions.some((p) => p.id === pending.id)
          ? [...prev.pendingActions, pending]
          : prev.pendingActions;

      const interventionGoal: Goal | null =
        plan.status === "active"
          ? {
              id: `goal-int-${plan.id}`,
              studentId: plan.studentId,
              title: plan.topic,
              category: "academic",
              targetDate: plan.targetDate,
              status: "in-progress",
              milestones: [{ title: plan.action, done: false }],
              mentorId: plan.teacherId,
              source: "intervention",
            }
          : null;

      return {
        ...prev,
        interventionPlans: [...prev.interventionPlans, plan],
        pendingActions,
        goals: interventionGoal ? [...prev.goals, interventionGoal] : prev.goals,
        teacherFeedbacks: [
          ...prev.teacherFeedbacks,
          {
            id: `tf-int-${plan.id}`,
            studentId: plan.studentId,
            teacherId: plan.teacherId,
            subjectId: "sub-math",
            note: `Intervention started: ${plan.action}`,
            date: new Date().toISOString().slice(0, 10),
          },
        ],
      };
    });
  }, []);

  const addCounsellingCase = useCallback((c: CounsellingCase) => {
    setDb((prev) => ({ ...prev, counsellingCases: [...prev.counsellingCases, c] }));
  }, []);

  const updateCounsellingCase = useCallback((id: string, patch: Partial<CounsellingCase>) => {
    setDb((prev) => ({
      ...prev,
      counsellingCases: prev.counsellingCases.map((c) => (c.id === id ? { ...c, ...patch } : c)),
    }));
  }, []);

  const addAppointment = useCallback((a: Appointment) => {
    setDb((prev) => ({ ...prev, appointments: [...prev.appointments, a] }));
  }, []);

  const setPendingActionStatus = useCallback((id: string, status: PendingAction["status"]) => {
    setDb((prev) => ({
      ...prev,
      pendingActions: prev.pendingActions.map((p) => (p.id === id ? { ...p, status } : p)),
    }));
  }, []);

  const addTeacherFeedback = useCallback((fb: TeacherFeedback) => {
    setDb((prev) => ({ ...prev, teacherFeedbacks: [...prev.teacherFeedbacks, fb] }));
  }, []);

  const addLearningGap = useCallback((gap: LearningGap) => {
    setDb((prev) => ({ ...prev, learningGaps: [...prev.learningGaps, gap] }));
  }, []);

  const upsertCareerInterests = useCallback(
    (studentId: string, clusters: { cluster: string; score: number }[]) => {
      setDb((prev) => {
        const rest = prev.careerInterests.filter((c) => c.studentId !== studentId);
        const careerInterests = [
          ...rest,
          ...clusters.map((c) => ({ studentId, cluster: c.cluster, score: c.score })),
        ];
        const top = [...clusters].sort((a, b) => b.score - a.score)[0];
        const careerSuggestions = prev.careerSuggestions.filter((s) => s.studentId !== studentId);
        if (top) {
          careerSuggestions.push({
            id: `cs-gen-${studentId}-${Date.now()}`,
            studentId,
            pathway: top.cluster,
            rationale: `Interest quiz indicates strong affinity for ${top.cluster}. Explore related subjects and mentorship options.`,
            confidence: top.score > 75 ? "high" : "medium",
          });
        }
        return { ...prev, careerInterests, careerSuggestions };
      });
    },
    [],
  );

  const toggleTask = useCallback((studentId: string, taskId: string) => {
    setDb((prev) => {
      const tasks = prev.todayTasks[studentId] ?? [];
      return {
        ...prev,
        todayTasks: {
          ...prev.todayTasks,
          [studentId]: tasks.map((t) => (t.id === taskId ? { ...t, done: !t.done } : t)),
        },
      };
    });
  }, []);

  const value = useMemo(
    () => ({
      db,
      updateDb,
      addGoal,
      addPortfolioItem,
      verifyPortfolioItem,
      addObservation,
      addIntervention,
      addCounsellingCase,
      updateCounsellingCase,
      addAppointment,
      setPendingActionStatus,
      addTeacherFeedback,
      addLearningGap,
      upsertCareerInterests,
      toggleTask,
    }),
    [
      db,
      updateDb,
      addGoal,
      addPortfolioItem,
      verifyPortfolioItem,
      addObservation,
      addIntervention,
      addCounsellingCase,
      updateCounsellingCase,
      addAppointment,
      setPendingActionStatus,
      addTeacherFeedback,
      addLearningGap,
      upsertCareerInterests,
      toggleTask,
    ],
  );

  return <AppDataContext.Provider value={value}>{children}</AppDataContext.Provider>;
}

export function useAppData() {
  const ctx = useContext(AppDataContext);
  if (!ctx) throw new Error("useAppData must be used within AppDataProvider");
  return ctx;
}

export function useUser(userId: string | undefined) {
  const { db } = useAppData();
  return useMemo(() => db.users.find((u) => u.id === userId), [db.users, userId]);
}

export function useStudentForUser(userId: string | undefined) {
  const { db } = useAppData();
  return useMemo(() => {
    if (!userId) return undefined;
    const user = db.users.find((u) => u.id === userId);
    if (!user) return undefined;
    return db.students.find((s) => s.name === user.name);
  }, [db, userId]);
}
