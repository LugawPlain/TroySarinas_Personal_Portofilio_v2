# PLAN: Privacy-First Interaction Tracking

> **Status:** Draft / Planning
> **Task Slug:** privacy-tracking
> **Retention:** 90 Days
> **Scope:** Button Clicks + Section Engagement + Admin Activity Feed

---

## 1. Analysis & Architecture

### Goal

Track unique employer interactions via generated links without compromising privacy or site trust.

### Technical Stack

- **Database:** Supabase (Postgres)
- **Identity:** First-party cookies (`visitor_link_id`) via Next.js Middleware
- **Tracking:** Event-delegation in shared UI components (Shadcn Button)
- **Storage:** `gateway_events` table with Row Level Security (RLS)

### Privacy Protocol

- **Anonymization:** No IP logging in events (IP Hash used only in initial visit).
- **Transparency:** Use standard, non-obfuscated cookie names.
- **Data Minimization:** Only track intentional engagement.

---

## 2. Phase 1: Database Foundation

- [ ] **Migration (Supabase):**
  - Create `gateway_events` table:
    - `id` (UUID, PK)
    - `link_id` (UUID, FK to `gateway_links.id`)
    - `event_name` (Text) - e.g., 'resume_download'
    - `section` (Text, optional) - e.g., 'hero'
    - `metadata` (JSONB) - extra context
    - `created_at` (Timestptz)
  - Enable RLS:
    - `INSERT`: Allow anonymous (public) insert.
    - `SELECT`: Only authenticated admin (`troyjeffreysarinas@gmail.com`).
  - **Retention Logic:** Setup a Cron trigger/manual script task to delete records where `created_at < now() - interval '90 days'`.

---

## 3. Phase 2: Identity & Tracking Engine

- [ ] **Middleware Update:**
  - Modify `src/middleware.ts` to set a `visitor_link_id` cookie when a valid `?ver=` version slug is detected.
  - Path: `/`, Duration: 7 days.
- [ ] **Tracking Helper (`src/lib/tracker.ts`):**
  - Create a client-side function `trackInteraction(eventName, metadata)`.
  - Function must:
    1. Check for `visitor_link_id` cookie.
    2. If present, push event to Supabase.
    3. Fail silently if cookie is missing (no tracking for general public).

---

## 4. Phase 3: Component Supercharging

- [ ] **Shadcn Button Enhancement:**
  - Update `src/components/ui/button.tsx`.
  - Add `trackId` (string) and `trackMetadata` (object) props.
  - Implement `onClick` wrapper that fires the tracker helper without interrupting the main action.
- [ ] **Intersection Tracking (Scope Enhancement):**
  - Add a `TrackedSection` wrapper component.
  - Use `IntersectionObserver` to log when an employer spends >3 seconds looking at a specific project or section.

---

## 5. Phase 4: Admin Visibility (The Activity Feed)

- [ ] **Activity Feed Component:**
  - Create a "Live Insights" panel in the Admin Dashboard.
  - Display a list of recent events grouped by Employer Link Profile.
  - Example: _"Spotify HR just viewed 'AI Chatbot Project' (2 mins ago)"_.
- [ ] **Dashboard Integration:**
  - Add stats to the Link Manager (e.g., "Total Clicks" vs "Total Visits").

---

## 6. Verification Checklist

- [ ] **Privacy Check:** Verify no PII is being sent in the `metadata` JSON.
- [ ] **Middleware Check:** Confirm cookie is set on land and persists across page navigation.
- [ ] **Performance Check:** Ensure `trackInteraction` is "fire-and-forget" and doesn't block UI.
- [ ] **Admin Check:** Verify RLS prevents public from querying the event table.
- [ ] **Retention Check:** Run manual SQL to test the 90-day deletion logic.

---

## Agent Assignments

| Agent                 | Task                                                |
| --------------------- | --------------------------------------------------- |
| `backend-specialist`  | Database Migration, RLS, & 90-day cleanup logic     |
| `frontend-specialist` | Middleware, Tracking Engine, & Button supercharging |
| `orchestrator`        | Admin Dashboard activity feed implementation        |
