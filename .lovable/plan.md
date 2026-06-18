## Why this happened

`ClientStudentBulkUpload.tsx` matches each row to a teacher using:

```
teachers.find(t => t.classes.some(tc => cls===row.className && sec===row.section))
```

`Array.find` returns the **first** teacher in the list that has *any* class‑section matching the row. When the upload runs from the School → Students page, no `defaultTeacherId` is passed, so the result depends on the order of the `teachers` array.

- For Class 6 the only teacher whose `classes` includes the 6‑A/B/C/D sections is **Shruti Sharma**, so she wins.
- For Class 7, **Meenakshi Gupta** also has Class 7 sections assigned (or is assigned to overlapping 7‑A/B/C/D) and appears earlier in the teachers array, so `find` returns her before Shruti — even though Shruti is the intended owner of those sections.

So the bug is: the auto-match is ambiguous whenever two teachers share any class+section, and silently picks the first one. There is no way for the school user to disambiguate from the template.

## Permanent fix

1. **Add a `Teacher` column to the bulk‑upload template** (optional). Accepted values: teacher username, full name ("First Last"), or first name when unique.
2. **Update the parser** in `ClientStudentBulkUpload.tsx`:
   - Read the new `Teacher` cell (`readCell(item, "Teacher", "Teacher Username", "Teacher Name")`).
   - When present: resolve to a teacher id via username match → full-name match → unique first-name match. If not resolvable, mark the row as an error ("Unknown teacher 'X'").
   - When blank: fall back to the existing class+section auto-match, but:
     - filter to teachers whose `classes` contains the exact `class-section` pair, and
     - if **more than one** teacher matches, mark the row as an error ("Ambiguous teacher for 7‑A; specify Teacher column") instead of silently picking the first.
3. **Download template** updated to include the `Teacher` column with one example value.
4. No change to the per‑teacher upload flow (where `defaultTeacherId` is already passed), so that path remains unaffected.

This makes mismatches impossible: the school user is forced to be explicit whenever the system can't unambiguously infer the teacher.

## One-off data remap (Class 7 students → Shruti Sharma)

The uploaded sheet `student_VI_VII_upload.xlsx` lists the affected students. Apply a SQL migration that:

- Looks up Shruti Sharma's teacher row (by first/last name within the school).
- Updates `students.teacher_id = <shruti.id>` for every student where `class = '7th'` AND the current `teacher_id` belongs to Meenakshi Gupta AND `name` is one of the Class 7 names in the uploaded sheet (scoped to the same school).
- Leaves Class 6 students untouched.

The migration is idempotent (re-running is a no-op once teacher_id already equals Shruti's id).

## Technical details

Files touched:
- `src/components/ClientStudentBulkUpload.tsx` — template columns, parser, teacher resolution, ambiguity check.
- New Supabase migration `remap_class7_students_meenakshi_to_shruti.sql` — targeted UPDATE on `public.students`.

No changes to RLS, schema, or other components.
