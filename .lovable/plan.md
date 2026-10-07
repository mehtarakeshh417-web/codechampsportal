# School Teacher Activity Dashboard

## Scope
Add a School-only activity dashboard for existing teacher assignments and projects. Preserve current pages and data structures; do not add tables, authentication, or sample data.

## Implementation
- Add one School sidebar item, route, and page using the existing dashboard layout and visual patterns.
- Load assignments and projects for the logged-in school’s existing teachers, their target-class students, and their existing submission records.
- Provide Teacher, Class, Subject/tool, and Status filters. Show summary counts and a teacher/activity table; selecting a row opens its student roster and each learner’s derived status.
- Add an Excel report that exports the same filtered activity and student-status data using the existing `xlsx` capability.
- Derive statuses only from persisted records: no submission is Not Attempted; an unreviewed project submission is Attempted; an assignment submission or reviewed project submission is Completed/Submitted. Unfinished work before a submission is not recorded, so it cannot be separately identified.

## Validation
Check the preview build and exercise filters, drill-down, and export behavior without changing existing assignment/project workflows.
