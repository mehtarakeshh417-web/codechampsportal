export type ActivityKind = "assignment" | "project";
export type ActivityStatus = "Attempted" | "Not Attempted" | "Completed / Submitted";

export interface ActivityEvidence {
  kind: ActivityKind;
  hasSubmission: boolean;
  evaluationStatus?: string | null;
  evaluatedAt?: string | null;
}

export interface ActivityStatusCounts {
  assigned: number;
  attempted: number;
  notAttempted: number;
  completed: number;
  pending: number;
}

export function deriveActivityStatus({ kind, hasSubmission, evaluationStatus, evaluatedAt }: ActivityEvidence): ActivityStatus {
  if (!hasSubmission) return "Not Attempted";
  if (kind === "assignment") return "Completed / Submitted";

  const reviewed = Boolean(evaluatedAt) || ["approved", "needs_improvement"].includes((evaluationStatus || "").toLowerCase());
  return reviewed ? "Completed / Submitted" : "Attempted";
}

export function summarizeActivityStatuses(statuses: ActivityStatus[]): ActivityStatusCounts {
  const attempted = statuses.filter((status) => status === "Attempted").length;
  const notAttempted = statuses.filter((status) => status === "Not Attempted").length;
  const completed = statuses.filter((status) => status === "Completed / Submitted").length;

  return {
    assigned: statuses.length,
    attempted,
    notAttempted,
    completed,
    pending: attempted + notAttempted,
  };
}