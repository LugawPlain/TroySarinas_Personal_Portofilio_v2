# MASTER PLAN: Smart Portfolio Gateway

> **Version:** 2.0 (Deep Dive)
> **Goal:** Build a professional, stealthy, and tracked entry system for your portfolio. Recuriters receive specific "Versioned" links that unlock and redirect them to tailored portfolio experiences.

---

## 1. 📖 The End-to-End Narrative

### Part 1: The Setup (Admin / Troy)

1.  **Login**: You go to `troysarinas.dev/admin/dashboard`. You log in with your Google Account (`troy@...`).
2.  **Generation**: You have a specific job application for **Spotify**.
    - You select **Role**: `Audio Engineer` (or Software Engineer).
    - You add a **Label**: `Spotify Application Feb 2026`.
3.  **The Output**: The system gives you a **Camouflaged Link**:
    - `https://troysarinas.dev/?ver=2.05.012`
    - _Why this looks good:_ To a technical recruiter, this looks like you are sharing a specific "stable build" of your site. It implies precision and engineering rigor.

### Part 2: The Experience (The Recruiter)

4.  **The Click**: The recruiter clicks the link.
5.  **The "Magic" (Middleware)**:
    - The server intercepts the request before any page loads.
    - It checks `2.05.012` against your private database.
    - It sees: **"This is the Spotify Link for the Audio Engineer role."**
6.  **The Redirect**: The recruiter is instantly moved from `/` to `/portfolio/audio-engineer`.
    - _Note:_ The `?ver=` parameter is stripped. The URL is clean.
7.  **The Persistence**: A secure cookie is set. If they come back tomorrow (without the link), they are _still_ sent to the Audio Engineer page because the site "remembers" them.

### Part 3: The Content (Context-Aware)

8.  **The Page**: They are now on `/portfolio/audio-engineer`.
    - **The Blog**: They click "Blog". The page _knows_ (via the URL) to only fetch articles tagged `#audio` or `#streaming`. They do NOT see your generic "Web Dev" tutorials.
    - **The Projects**: They only see projects relevant to Audio Engineering.

### Part 4: The Loop (The Analytics)

9.  **The Insight**: You check your Dashboard.
10. **The Data**: You see:
    - `Spotify Application` (v2.05.012)
    - **Visited:** 3 times.
    - **Last Visit:** Today at 10:45 AM.
    - _Result:_ You know they are looking _right now_.

---

## 2. 🏗️ Technical Architecture

### A. Database Schema (Supabase)

We need two core tables to make this work.

**1. `gateway_links` (The Keys)**
| Column | Type | Description |
| :--- | :--- | :--- |
| `id` | UUID | Primary Key |
| `version_slug` | String (Unique) | The magic code (e.g., `1.05.009`). Indexed for speed. |
| `target_role` | String | The destination (e.g., `software-engineer`). |
| `label` | String | Your internal note (e.g., `Spotify`). |
| `is_active` | Boolean | Kill switch. If `false`, link redirects to generic home. |
| `created_at` | Timestamp | When you made it. |

**2. `gateway_visits` (The Logs)**
| Column | Type | Description |
| :--- | :--- | :--- |
| `id` | UUID | Primary Key |
| `link_id` | UUID | Foreign Key to `gateway_links`. |
| `user_agent` | String | Browser/Device info (e.g., "Chrome on Mac"). |
| `ip_hash` | String | Anonymized IP for unique visitor counting. |
| `visited_at` | Timestamp | Exact time of the click. |

### B. Middleware Logic (`src/middleware.ts`)

This is the "Brain" that runs on every request.

```typescript
// (Simplified Logic)
export async function middleware(req) {
  const url = req.nextUrl;
  const ver = url.searchParams.get('ver');

  // 1. IS THIS A TRACKING LINK?
  if (ver) {
    // Lookup in DB (Edge Function)
    const link = await getLinkBySlug(ver);

    if (link && link.is_active) {
       // Log the visit (Fire and forget)
       logVisit(link.id, req);

       // Create the Redirect Response
       const response = NextResponse.redirect(new URL(`/portfolio/${link.target_role}`, req.url));

       // Set the Sticky Cookie
       response.cookies.set('portfolio_role', link.target_role, { maxAge: 7 days });
       return response;
    }
  }

  // 2. IS THIS A RETURNING USER? (Sticky Session)
  const savedRole = req.cookies.get('portfolio_role');
  if (req.nextUrl.pathname === '/' && savedRole) {
     return NextResponse.redirect(new URL(`/portfolio/${savedRole}`, req.url));
  }
}
```

### C. File Structure (The Skeleton)

```text
src/app/
├── (admin)                 # Protected Group
│   └── dashboard/          # Your Control Center
├── portfolio/              # The Dynamic Container
│   └── [role]/             # Dynamic Route (e.g., "software-engineer")
│       ├── page.tsx        # "Welcome, Future Employer"
│       ├── blog/
│       │   └── page.tsx    # Fetches blogs WHERE category = [role]
│       └── projects/
│           └── page.tsx    # Fetches projects WHERE category = [role]
└── page.tsx                # Generic "Lobby" (For people with no link)
```

---

## 3. 🛡️ Security & Privacy

1.  **Admin Protection**:
    - The `/dashboard` route is protected by `middleware`.
    - It checks for a Supabase Session **AND** verifies the email is `troyjeffreysarinas@gmail.com` (or your chosen email).
    - No one else can generate links.
2.  **Visitor Privacy**:
    - We do not track PII (Personally Identifiable Information) unless they submit a contact form.
    - We use their "User Agent" to tell you if they are on Mobile or Desktop.

---

## 4. 📝 Implementation Phases (The Roadmap)

### Phase 1: The Foundation (Data & Auth) ✅

- **Goal**: Integrate with existing Supabase schema (`blogs`, `projects`, `users`) and add Gateway requirements.
- [x] **Analyze Schema**: Confirmed existing tables (`blogs`, `projects`, `users`).
- [x] **Migration**: Created and applied `20260202134500_gateway_setup.sql`.
  - Added `gateway_links`, `gateway_visits`, and `gateway_resumes` tables.
  - Added `job_role` column to `projects` and `blogs`.
- [x] **Auth**: RLS policies for admin (`troyjeffreysarinas@gmail.com`) and public access are active. (Note: Ensure Google OAuth is enabled in Supabase Dash).

### Phase 2: The Control Center (Dashboard) ✅

- **Goal**: You can create a `?ver=...` link.
- [x] **Build Login Page**: Created `/login` with Google OAuth.
- [x] **Build Admin Layout**: Created `/admin/layout.tsx` with email-based protection.
- [x] **Build `/dashboard` page**: Interactive dashboard with stats and link table.
- [x] **Create "Generate Link" functionality**: Server actions in `actions.ts`.
- [x] **Create "Active Links" table**: With click tracking and management tools.

### Phase 3: The Gatekeeper (Middleware) ✅

- **Goal**: Clicking the link actually works.
- [x] **Write `middleware.ts`**: Implemented `ver` detection and Supabase lookup.
- [x] **Visit Logging**: Automated logging of user-agent and IP hash.
- [x] **Redirection & Cookies**: Roles are cached for 7 days via cookies.

### Phase 4: The Experience (Role Pages) ✅

- **Goal**: The destination pages exist and look correct.
- [x] **Refactored Components**: `HeroSection`, `Projects`, `Technologies`, and `Experience` are all role-aware.
- [x] **Build `src/app/portfolio/[role]/page.tsx`**: Dynamic page that fetches role-specific resumes and filtered projects.
<!-- - [x] **Responsive Filtering**: Components now show tailored content based on the assigned job role. -->
- [x] **Role-Aware Navigation**: Header and navigation links preserve the role context.
- [x] **Nested Role Routes**: Implemented `/portfolio/[role]/blog` and `/portfolio/[role]/projects` for deep context preservation.

### Phase 5: Polishing & Validation ✅

- **Goal**: Ensure everything is perfect for recruiter eyes.
- [x] **Internal Navigation**: Fixed smooth scrolling for internal section links within role pages.
- [x] **Manual Content Control**: Implementation of `roleContent` mapping in `[role]/page.tsx` for easy copy editing.
- [x] **Deep Linking**: Role context is maintained across blog posts and project details.
- [ ] **Final Deployment Check**: Run full test cycle and verify on Vercel.

### Phase 6: Static Role Transition (Manual Control) ✅

- **Goal**: Move from dynamic `[role]` folder to static, unique folders for maximum manual editing flexibility.
- [x] **Global Portfolio Layout**: Moved `[role]/layout.tsx` to `portfolio/layout.tsx`. Header/Footer are now shared across all static folders.
- [x] **Static Folder Creation**: Created dedicated folders for `software-engineer`, `gtm-engineer`, and `video-editor`.
- [x] **Manual Page Implementation**: Converted the dynamic logic into independent static `page.tsx` files for each role.
- [x] **Content Preservation**: Dynamic sections like `<Projects role="..." />` and `<Experience role="..." />` still filter correctly from the DB.
- [x] **Deep Linking Preservation**: Maintained `/portfolio/[role]/blog` and `/portfolio/[role]/projects` for deep context while landing pages are manual.
- [x] **Clean Up**: Successfully removed the dynamic `[role]` landing page and layout to favor static overrides.
