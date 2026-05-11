## Goal
Make the curriculum (and broader student area) feel like a game without changing any lesson/topic content. Existing scaffolding in `src/components/curriculum/enhancements/` (XP HUD, mascot, streaks, badges, sounds, celebration overlay) is already in place but currently localStorage-only. We will wire it up properly, sync to Lovable Cloud so progress follows the student across devices, and surface it across the student dashboard, curriculum list, topic pages, and quizzes.

## What gets gamified

1. Student Dashboard
   - Top "Player Card" strip: avatar, level, XP bar to next level, coin balance, current streak, total badges.
   - Daily streak nudge ("Open any chapter today to keep your 5-day streak!").
   - Mini leaderboard tile (class-wise), pulled from existing `leaderboard` data.

2. Curriculum dashboard (chapter list)
   - Each chapter card shows: % complete, XP earned from that chapter, a star meter (1–3 stars based on completion + quiz score), and a lock/unlock animation.
   - Class-level XP total + level badge at the top.

3. Topic pages (Learn / Activities / Recap / Quiz)
   - Persistent floating XP/Coin HUD (already exists) shown on every topic page.
   - Mascot reactions on page change, quiz answer, completion.
   - Award XP for: opening a topic (+5), finishing all pages (+25), correct quiz answer (+10), perfect quiz (+50 bonus + badge).
   - Confetti + sound on level-up, badge unlock, chapter complete.
   - "Daily quest" banner ("Finish 1 topic today for +30 XP").

4. Quizzes
   - Per-question XP popup, combo multiplier for streaks of correct answers, end-of-quiz star screen.

## Mechanics

- XP curve: level = floor(sqrt(xp / 50)) + 1 (gentle progression).
- Coins = floor(xp / 10), spendable later (placeholder for now — show "Coming soon: Avatar shop").
- Streaks: based on calendar day of any curriculum activity.
- Badges (initial set): First Step, 3-Day Streak, 7-Day Streak, Quiz Ace (perfect quiz), Chapter Champ (100% chapter), Class Conqueror (all chapters in a class), XP Milestones (100/500/2000).

## Storage (Lovable Cloud)

New table `student_game_state` (1 row per `auth.users.id`):
- `user_id uuid PK references auth.users`
- `xp int default 0`, `coins int default 0`
- `streak_days int default 0`, `last_visit_date date`
- `badges text[] default '{}'`
- `theme text default 'cyber'`, `sound_on bool default true`
- `updated_at timestamptz`
- RLS: user can `select`/`insert`/`update` only their own row. No delete.

Hook `useGameState(userId)` replaces / wraps `useLocalGameState`:
- Loads row on mount (creates it if missing).
- Optimistic local update + debounced upsert to Cloud (so XP feels instant).
- Falls back to localStorage if offline / not signed in.

## Visual polish (no content changes)

- Animated XP bar fill, coin counter ticker, badge unlock modal with confetti.
- Three theme presets the student can toggle (cyber / candy / space) — already scaffolded, just expose a switcher in the Player Card.
- Sound toggle in HUD; sounds are short and optional, default off for accessibility.

## Out of scope

- No edits to lesson text, images, video, quiz questions, or chapter structure.
- No changes to teacher / school / admin areas.
- Avatar shop is shown as "Coming soon" — not implemented this round.

## Technical changes

- Migration: create `student_game_state` table + RLS policies.
- New hook: `src/hooks/useGameState.ts` (Cloud-synced).
- New component: `PlayerCard.tsx` for dashboard + curriculum header.
- New component: `ChapterStarMeter.tsx` for chapter cards.
- Wire HUD/mascot/celebration into `StudentDashboard`, `StudentCurriculum`, `TopicViewer`/`AITopicViewer`, `TopicQuiz`.
- Add XP award calls at the right lifecycle points (page view, topic complete, quiz answer, quiz finish).
- Daily-quest + streak nudge components driven by the same hook.