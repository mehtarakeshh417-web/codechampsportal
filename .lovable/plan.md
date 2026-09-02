# Per-section targeting for assignments and projects

Replace the single "class-section" dropdown with a two-step picker: choose one class, then tick one or more sections of that class. The assignment/project is created only for the ticked sections.

## What changes for the teacher

- **Step 1 — Class**: radio buttons listing each distinct class the teacher is assigned to (Class 1, Class 6, ...), formatted with the active numeral setting.
- **Step 2 — Sections**: once a class is picked, its sections appear as selectable toggles (A, B, C ...) with a "Select all" option. Multiple sections can be ticked at once.
- Selecting a different class resets the section selection to that class's first section.
- Validation: at least one section must be selected before sending.
- Confirmation toast reports how many sections received it, e.g. "Sent to Class 1 — Sections A, C".

## Behaviour

- One assignment/project row is created per selected class-section (same as today's "All Sections" fan-out, but scoped to the ticked sections).
- Student notifications go only to students in the selected class-section pairs — no cross-section leakage.
- Existing assignments/projects and their student views are unchanged.

## Technical notes

- `src/pages/teacher/TeacherAssignments.tsx`
  - Derive `classGroups` from `teacher.classes` by splitting `"<class>-<section>"` into a `Record<class, section[]>`.
  - Replace `form.targetClass: string` with `form.targetClassName: string` + `form.targetSections: string[]`; drop the `ALL_SECTIONS` sentinel.
  - Build `targets = form.targetSections.map(s => `${form.targetClassName}-${s}`)` and reuse the existing per-target insert loop and notification filter.
- `src/pages/teacher/TeacherProjects.tsx`
  - Same picker; the create handler currently inserts a single row, so change it to loop over the selected targets and insert one project per section, with notifications filtered to those class-section pairs.
- Presentation only otherwise: no schema changes, no changes to the assignment library format (library items still store title/subject/questions, not targeting).
