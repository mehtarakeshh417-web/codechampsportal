# Nested expansion for Teacher → Class → Section → Students

## Problem
Today, clicking a teacher on the Principal's Teachers page expands a single flat list of every student assigned to her (often hundreds of rows) — unreadable.

## Goal
Replace the flat list with a 3-level collapsible tree, scoped to that teacher:

```
▾ Shruti Sharma                                    120 students
   ▾ Class 5                                        80 students
      ▸ Section A                                   40 students
      ▾ Section B                                   40 students
         • Aarav Sharma     Roll 1
         • Diya Verma       Roll 2
         …
   ▸ Class 6                                        40 students
```

- Only one level expands at a time per click; siblings stay collapsed (default all collapsed).
- Counts shown at every level.
- Empty class/section nodes (teacher assigned but no students yet) still render so the principal can see the gap.
- Student row keeps the same info already shown: name + roll number.

## Scope (single file)
`src/components/ExpandableTeacherCard.tsx` — replace the current flat student loop with a nested renderer. No data model, no API, no parent-page changes (it already passes `teacher` + `students`).

## Implementation sketch

1. Group `teacherStudents` by `class`, then by `section` (using existing `s.class` / `s.section` fields).
2. Iterate the teacher's own `teacher.classes` (e.g. `["5th-A","5th-B","6th-A"]`) to derive the class/section structure — so classes the teacher is assigned to but has zero students still appear.
3. Two local `useState<Record<string, boolean>>` maps: `openClasses`, `openSections` (keys: `"5th"`, `"5th-A"`). Toggle on header click.
4. Reuse the existing visual language (glass rows, neon accents, chevron rotate, framer-motion height animation) — keep it consistent with the outer card.
5. Keep the outer card's summary chip (total student count) unchanged.

## Out of scope
- Search/filter inside a teacher (can add later if useful).
- Pagination inside a section (rarely >50 per section; fine as a scrollable list with `max-h-64 overflow-auto`).
- Changes to teacher edit/delete actions, or to `SchoolTeachers.tsx`.
