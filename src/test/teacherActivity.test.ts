import { describe, expect, it } from "vitest";
import { deriveActivityStatus, summarizeActivityStatuses } from "@/lib/teacherActivity";

describe("teacher activity statuses", () => {
  it("marks a student with no submission as Not Attempted", () => {
    expect(deriveActivityStatus({ kind: "assignment", hasSubmission: false })).toBe("Not Attempted");
  });

  it("marks a submitted assignment as Completed / Submitted", () => {
    expect(deriveActivityStatus({ kind: "assignment", hasSubmission: true })).toBe("Completed / Submitted");
  });

  it("marks an unreviewed project submission as Attempted", () => {
    expect(deriveActivityStatus({ kind: "project", hasSubmission: true, evaluationStatus: "pending" })).toBe("Attempted");
  });

  it("marks a reviewed project submission as Completed / Submitted", () => {
    expect(deriveActivityStatus({ kind: "project", hasSubmission: true, evaluationStatus: "approved" })).toBe("Completed / Submitted");
  });

  it("counts attempted and not-yet-started learners as pending", () => {
    expect(summarizeActivityStatuses(["Attempted", "Not Attempted", "Completed / Submitted"])).toEqual({
      assigned: 3,
      attempted: 1,
      notAttempted: 1,
      completed: 1,
      pending: 2,
    });
  });
});