# Portfolio Role Designs

## Overview

Each role in the portfolio has a unique target audience and should present content with a distinct visual language, section ordering, and component variants. This document outlines the design direction for each role page.

---

## 1. Software Engineer (`/portfolio/software-engineer`)

**Audience:** Engineering hiring managers, technical recruiters, CTOs

**Visual Theme:** Clean, professional. Blue/white gradient background. Technical typography. Monospace accents.

### Section Order

1. **Hero** (split layout)
2. **Projects** (featured + grid)
3. **Experience** (timeline)
4. **Education**
5. **Technologies** (categorized)
6. **Certifications**

### Section Details

| Section | Design |
|---------|--------|
| **Hero** | Split layout with status cards and Lottie animation (current `SoftwareEngineerHeroSection`). Add typing animation cycling through role titles: "Full Stack Developer" → "Frontend Engineer" → "Backend Developer". Keep availability status card and response time card. |
| **Projects** | Top: one full-width **featured project** hero card with large image, description, and prominent CTA. Below: 3-column card grid for remaining projects. Each card shows image, title, description, tech tags, and live demo / GitHub buttons. |
| **Technologies** | Flip-card grid with proficiency bars (current design is good). Add **category filter tabs** (Frontend / Backend / DevOps / Tools) to group technologies logically. |
| **Experience** | Horizontal cards with sidebar highlights (current layout). Add a **vertical timeline line** connecting cards to show career progression. Emphasize technologies used per role. |
| **Education** | Card with colored sidebar showing school logo, degree, period, and key courses. Current design works well. |
| **Certifications** | Simple grid of certification cards with logos and links. |

### Component Variants Needed

- `SoftwareEngineerHeroSection` (exists)
- `SoftwareEngineerHeader` (exists)
- No other role-specific variants needed; Standard variants work for remaining sections

---

## 2. Video Editor (`/portfolio/video-editor`)

**Audience:** Creative directors, production companies, content managers, agency art directors

**Visual Theme:** Cinematic. Dark mode by default. Rich blacks with warm amber or red accent colors. Large imagery. Generous whitespace. Visuals-first, minimal text.

### Section Order

1. **Hero** (video/visual)
2. **Showreel / Projects** (masonry/horizontal scroll)
3. **Experience** (client logos)
4. **Certifications** (prominently placed)
5. **Technologies** (minimal icon strip)

### Section Details

| Section | Design |
|---------|--------|
| **Hero** | Full-bleed **video background** or auto-playing demo reel. Dark overlay with white text. Minimal headline, name, and one CTA. Think: movie trailer aesthetic. No status cards or social links clutter. |
| **Projects** | Replace the standard card grid with either a **horizontal scrolling showreel** or a **masonry grid** with large thumbnails. On hover, show a short preview or play a clip. No description text until clicked — let the visuals speak. Click opens a lightbox or detail view with full video, behind-the-scenes, and tools used. |
| **Technologies** | Minimal presentation. Just a **horizontal scrolling icon strip** showing tools (Premiere Pro, After Effects, DaVinci Resolve, Final Cut, etc.). No proficiency bars — creatives care about the portfolio quality, not self-rated scores. |
| **Experience** | Compact timeline focusing on **clients and brands worked with**. Show company/brand logos prominently rather than bullet point descriptions. Brief role title and period. |
| **Education** | Minimize or move to bottom. Small, single-line entries. Not a priority for creative roles. |
| **Certifications** | Highlight these more than the software engineer version. Adobe Certified, DaVinci certifications, etc. Display as **large badge cards** with the cert logo, title, and verification link. These are trust signals for creative roles. |

### Component Variants Needed

- `CinematicHeroSection` — full-bleed video background, dark overlay, minimal text
- `CinematicProjects` — masonry grid or horizontal showreel with hover previews
- `CinematicTechnologies` — horizontal icon strip, no proficiency bars
- `CinematicExperience` — client logo-focused compact timeline
- `CinematicCertifications` — large badge card layout
- `CinematicHeader` — transparent/dark header, minimal nav

---

## 3. GTM Engineer (`/portfolio/gtm-engineer`)

**Audience:** VP of Sales, Marketing leaders, Revenue Operations managers, startup founders

**Visual Theme:** Data-driven, results-oriented. B2B SaaS landing page aesthetic. Clean white background. Green/blue accent colors. Metric-forward typography with large numbers. Professional but approachable.

### Section Order

1. **Hero** (metrics/impact)
2. **Case Studies / Projects** (narrative)
3. **Experience** (achievement-focused)
4. **Certifications** (trust badges)
5. **Blogs** (thought leadership)
6. **Technologies** (stack diagram)

### Section Details

| Section | Design |
|---------|--------|
| **Hero** | Lead with **metrics and impact**. Large numbers: "3x Pipeline Growth", "$2M+ Revenue Influenced". Split layout with stats on one side, brief intro on the other. Include a **trust bar** of company/client logos below the headline. CTA: "Let's Talk Strategy" or "Download Case Studies". |
| **Projects** | Present as **case studies** instead of project cards. Each case study follows: **Problem → Strategy → Result** (with metrics). Much more narrative than the software engineer project cards. Full-width layout with clear sections. Include charts or metric callouts where possible. |
| **Technologies** | Show as a **tool stack diagram** — grouped by category (Analytics, CRM, Automation, Ads, SEO) with integration lines connecting them. More about showing the ecosystem understanding than individual proficiency. |
| **Experience** | Emphasize **achievements and metrics** prominently. Big numbers (%, $, growth rates) displayed at the top of each card in large bold type. The highlights sidebar is perfect for this — just needs bigger number callouts. Example: "340% increase in qualified leads" as a hero stat. |
| **Certifications** | Grid of certification badges — Google Analytics, HubSpot, Salesforce, etc. Display as **trust badge cards** with logo, title, and verification link. These are critical trust signals for GTM roles. |
| **Blogs** | Promote this section **higher than in other roles**. Thought leadership content is critical for GTM positioning. Show latest 3 posts with featured images, titles, and read time. |

### Component Variants Needed

- `GTMHeroSection` — metrics-forward split layout with trust bar
- `GTMProjects` — case study format (Problem → Strategy → Result)
- `GTMTechnologies` — categorized tool stack diagram
- `GTMExperience` — achievement/metric-focused cards with large number callouts
- `GTMCertifications` — trust badge grid
- `GTMHeader` — clean, professional, with "Let's Talk Strategy" CTA

---

## Cross-Cutting Design Principles

### Section Ordering Flexibility

Each role page controls its own section order in the page component. The dynamic `[role]` page already supports this. Static role pages (software-engineer, video-editor, gtm-engineer) should each define their own ordering.

### Component Architecture

Each component follows the existing variant pattern:

```
src/components/<ComponentName>/
  index.tsx          ← switch on role, render correct variant
  variants/
    Standard.tsx     ← default fallback
    SoftwareEngineer.tsx  ← exists for Hero, Header
    Cinematic.tsx    ← for video-editor role
    GTM.tsx          ← for gtm-engineer role
```

### hero_config Usage

The `hero_config` field in the `job_roles` Supabase table already supports per-role configuration. The dynamic `[role]` page passes it to `HeroSection`. Static role pages should also pass it:

```tsx
<HeroSection
  headline={roleMetadata.headline}
  bio={roleMetadata.bio}
  resumeUrl={resumeUrl}
  heroConfig={roleMetadata.hero_config}
/>
```

### Data Fetching

All data fetching is already role-aware via the join tables in Supabase:
- `role_technologies` — links tech to roles
- `role_experience` — links experience to roles
- `role_education` — links education to roles
- `role_certifications` — links certs to roles

No changes needed to the data layer.

---

## Implementation Priority

1. **Software Engineer** — already mostly done. Minor enhancements (featured project, tech category tabs, timeline line).
2. **GTM Engineer** — closest to Standard variant. Easiest to differentiate with metric-forward styling.
3. **Video Editor** — most custom work needed. New cinematic variants for nearly every component.
