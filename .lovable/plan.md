## Goal
Transform the existing curriculum topic experience into a premium **multi-page interactive chapter** with **inline images**, **colorful learning blocks**, and **chapter-style navigation**, applied uniformly across **all classes and topics** — without rewriting the 50+ existing content modules.

## Strategy
Instead of regenerating content for every topic (which previously caused timeouts and incomplete files), I'll **refactor the topic renderer** to *derive* a multi-page chapter from each topic's existing `TopicContentBundle`. This instantly upgrades every topic and keeps the architecture lazy/scalable.

## What changes

### 1. New "Chapter" experience (replaces tab-based topic page)
A topic becomes a sequence of **pages**:
```text
Page 1  Overview / Hook (summary + objectives + cover visual)
Page 2…N  Learn pages — ONE per learn block, with the matching image
          embedded inline (no more separate Images tab)
Page N+1  Activity Time (interactive activity cards)
Page N+2  Practice
Page N+3  Chapter Quiz
Page N+4  Recap + Next Topic CTA
+ optional Lab page (if topic has a lab)
```
Each page is rendered on demand; only the active page mounts.

### 2. Navigation
- **Sticky chapter header**: title, page X/Y, progress bar
- **Prev / Next buttons** at page bottom
- **Chapter sidebar** (desktop): clickable list of pages within the topic
- **Sibling-topic dropdown** kept in header for jumping topics
- **Breadcrumbs** retained
- Page index synced to URL hash (`#p=3`) so refresh / share works
- Auto scroll-to-top on page change

### 3. Inline images (kills the "Images" tab)
- The Images tab is removed from navigation.
- Each `learn.block` is paired with the next available `images.items[i]` and rendered **inline** (image card with caption + soft gradient background) right under the block.
- Any leftover images appear on a "Visual Recap" mini-page so nothing is lost.

### 4. Colorful, premium styling (works for ALL existing content)
Reusable **content blocks** with class-aware theming:
- Concept card (gradient header per class, large emoji)
- "💡 Did You Know?" callout
- "⚠️ Important" callout
- "🎨 Activity Time" card
- "🧠 Quick Recall" mini-quiz card
- "🚀 Challenge" card
- Numbered objective chips
- Bullet lists styled as check-rows
Lower classes (1–4) get playful gradients + larger type; classes 5–10 get cleaner, professional gradients. Class gradient is pulled from existing `ClassMeta.gradient`.

### 5. Interactive elements
- Expandable "Read more" on long blocks
- Flip/reveal cards for fun-fact bullets
- Lightbox (click to zoom) on inline images
- Smooth page transitions via framer-motion (already used)

### 6. Programming topics
When a learn block contains code-like content (detected by triple-backtick or `lab.starterCode` present), render a syntax-highlighted code card with a **"Try in Lab"** button that jumps to the Lab page.

### 7. Performance
- Each chapter page is its own component; only the active page is mounted.
- Lab editor stays lazy-loaded (existing).
- Content modules stay glob-imported lazily (existing `contentLoader`).
- No bulk fetch — derived chapter pages are built from already-loaded bundle, no extra network.

## Files to add
- `src/components/curriculum/chapter/ChapterShell.tsx` — header, sidebar, progress, prev/next
- `src/components/curriculum/chapter/buildChapterPages.ts` — derives pages from `TopicContentBundle`
- `src/components/curriculum/chapter/pages/OverviewPage.tsx`
- `src/components/curriculum/chapter/pages/LearnPage.tsx` (block + inline image + callouts)
- `src/components/curriculum/chapter/pages/ActivitiesPage.tsx`
- `src/components/curriculum/chapter/pages/PracticePage.tsx`
- `src/components/curriculum/chapter/pages/QuizPage.tsx`
- `src/components/curriculum/chapter/pages/LabPageWrapper.tsx`
- `src/components/curriculum/chapter/pages/RecapPage.tsx`
- `src/components/curriculum/chapter/blocks/Callout.tsx`, `ImageCard.tsx`, `CodeCard.tsx`

## Files to modify
- `src/components/curriculum/TopicPage.tsx` — replace tab system with `ChapterShell`. Keep route, completion tracking, and sibling sidebar.
- `src/components/curriculum/Tabs.tsx` — kept (PracticeTab/QuizTab still reused internally), `ImagesTab` no longer in nav.
- `src/lib/curriculum/types.ts` — small additive optional fields (none required; backward-compatible).

## Files NOT touched
- Routing, dashboard, registry, `contentLoader`, all 50+ content `.ts` files, lab editors, database schema.

## Outcome
Every existing topic — Class 1 through 8 — instantly becomes a colorful, multi-page, navigatable chapter with inline images, callouts, activities, practice, quiz, and (where applicable) a coding lab — without touching any topic's content file.