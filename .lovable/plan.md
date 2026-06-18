# Fix: Bulk-upload assigns students to the wrong teacher

## Problem

When the Principal bulk-uploads students for a class that has multiple teachers (one per section), every row gets assigned to the *first* teacher in the list — e.g., all 5th-grade students go to **Meenakshi Gupta** even when the row's section belongs to **Shruti Sharma**.

## Root cause

`src/components/ClientStudentBulkUpload.tsx` (lines 183–185) matches a row to a teacher using **class only**, not class + section:

```ts
teachers.find(item => item.classes.some(tc =>
  normalizeClass(tc) === row.className || tc.startsWith(row.className)
))
```

Teachers' `classes` are stored as `"5th-A"`, `"5th-B"`, etc. `row.className` is `"5th"`. So `startsWith("5th")` matches every 5th-grade teacher, and `.find()` returns whichever one was created earliest (Meenakshi).

## Fix (single file: `src/components/ClientStudentBulkUpload.tsx`)

Replace the teacher-lookup with a section-aware match:

```ts
const target = `${row.className}-${row.section}`; // e.g. "5th-A"
const teacher = defaultTeacherId
  ? teachers.find(t => t.id === defaultTeacherId)
  : teachers.find(t =>
      t.classes.some(tc => normalizeClass(tc.split("-")[0]) === row.className
                          && (tc.split("-")[1] || "A") === row.section)
    );
```

Behavior:
- A row with `Class=5th, Section=B` → only a teacher whose `classes` includes `5th-B` matches. Shruti gets her students, Meenakshi gets hers.
- If no teacher is assigned to that exact class+section, `teacher_id` stays `null` (same as today's fallback). No row is silently misassigned.
- The `defaultTeacherId` path (upload launched from a specific teacher card) is unchanged.

## Verification

After the change, the Principal can:
1. Re-upload a small test sheet with mixed sections for class 5 and confirm each row appears under the correct teacher on the Teachers page.
2. Check the Students list — `teacher` column should reflect the section's actual teacher.

No schema changes, no migration, no backend changes. Pure frontend logic fix in one file.

## Out of scope (ask if you want these too)

- Reassigning the already-misuploaded students currently sitting under Meenakshi — that would need a one-off update query or a small "Reassign teacher" UI. Tell me if you'd like that included.
- Warning the uploader when a row's class+section has no teacher assigned yet (currently silently inserts with `teacher_id = null`).
