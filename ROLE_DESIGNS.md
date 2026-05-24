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

---

## 4. Data Analyst / Scientist (`/portfolio/data-analyst`)

**Audience:** Data science managers, analytics leads, research directors, BI teams

**Visual Theme:** Light analytical dashboard aesthetic. Clean white background with blue/violet data viz accents. Interactive charts and visualizations throughout — portfolio functions as a live BI dashboard. Think modern Tableau/Looker interface with interactive elements. Professional but approachable.

### Section Order

1. **Hero** (interactive metrics dashboard)
2. **Projects** (data stories with chart previews)
3. **Experience** (impact metrics with before/after charts)
4. **Technologies** (analytics stack with radar chart)
5. **Certifications** (data credentials with category distribution)
6. **Education**

### Section Details

| Section | Design |
|---------|--------|
| **Hero** | Interactive dashboard layout. **4 metric cards** with sparkline charts showing trends. **Main interactive chart** (Area/Bar/Line toggleable) with time range filter (6M/1Y). **Donut chart** for analysis type distribution. **Horizontal bar chart** for model accuracy vs benchmarks. White background with subtle grid pattern. Blue primary accent. |
| **Projects** | Each project displayed as a **data story card** with unique visualization type: **Waterfall chart** (data pipeline flow), **Scatter plot** (customer segmentation), **Funnel chart** (conversion analysis), **Heatmap** (usage patterns), **Composed chart** (revenue forecast). Left side: project info + methodology flow. Right side: interactive chart. |
| **Technologies** | Two views toggleable: **Skill Matrix** (Radar chart showing 6 dimensions) + **Tool Proficiency** (horizontal bar chart ranked by expertise). **Pipeline View** (workflow stages with progress bars). Color-coded by category (blue=Collection, violet=Processing, emerald=Analysis, amber=Visualization, rose=ML/AI). |
| **Experience** | Before/After **impact overview chart** at top. Each role card includes: **Metric callouts** in gradient banner, **Mini area chart** for project growth timeline. Timeline shows cumulative impact over months. Light cards with colored borders. |
| **Certifications** | Stats row at top (Professional Certs, Workshops, Avg Score, Verified). **Donut chart** for category distribution (Data Science, Analytics, Cloud, Visualization). Grid of **credibility badge cards** with logos and verification links. |
| **Education** | Clean card layout. Include relevant coursework. Keep concise. |

### Interactive Features

- **Chart type toggles** (Area ↔ Bar ↔ Line)
- **Time range filters** (6M / 1Y)
- **View switches** (Radar Matrix ↔ Pipeline)
- **Animated transitions** on scroll
- **Interactive tooltips** on all charts
- **Hover effects** on cards and charts

### Component Variants Needed

- `DataHeroSection` — interactive dashboard with multiple chart types and controls
- `DataProjects` — data story cards with unique visualizations per project
- `DataTechnologies` — radar chart + pipeline view with toggle
- `DataExperience` — before/after impact charts + timeline mini-charts
- `DataCertifications` — credential badges with category distribution chart
- `DataHeader` — light theme, minimal nav with active section indicator
- `DataFooter` — light theme with data branding
- `DataTechnologies` — pipeline/workflow diagram grouping
- `DataExperience` — impact metric-focused cards
- `DataCertifications` — credibility badge grid
- `DataHeader` — dark, minimal, dashboard-inspired

---

## 5. Social Media Manager (`/portfolio/social-media-manager`)

**Audience:** Brand managers, social media directors, content agencies, influencer marketing teams

**Visual Theme:** Vibrant, energetic, platform-native aesthetic. Instagram-inspired gradients (pink/purple/orange), TikTok energy, bold typography. High contrast, playful but professional. Content-first design with mockup-style previews.

### Section Order

1. **Hero** (engagement metrics)
2. **Projects** (campaign showcases)
3. **Experience** (brand portfolio)
4. **Certifications** (platform credentials)
5. **Technologies** (social stack)
6. **Blogs** (content strategy)

### Section Details

| Section | Design |
|---------|--------|
| **Hero** | High-energy layout with **engagement metrics**: "1M+ Impressions", "50K+ Followers Grown", "12% Avg. Engagement Rate". Use **gradient backgrounds** (pink to orange to purple). Include a **phone/device mockup** showing a sample social post or feed. Bold, playful headline. CTA: "Let's Go Viral" or "Work With Me". |
| **Projects** | Showcase as **campaign case studies**. Each campaign: Campaign Goal → Content Strategy → Platform Breakdown → Results (engagement, reach, conversions). Include **post mockups** or carousel previews. Make it visual — show the actual content created. |
| **Technologies** | Horizontal scrolling strip or grid of **platform logos and tools**: Meta Business Suite, TikTok Ads Manager, Canva, Later, Hootsuite, Sprout Social, Buffer. Group by: Content Creation, Scheduling, Analytics, Paid Ads. No proficiency bars — show platform expertise through campaign results. |
| **Experience** | Brand-focused timeline. Show **brand logos** prominently. For each role, highlight: Brands managed, follower growth, engagement improvements, viral moments. Use social-style metric cards (likes, shares, comments icons). |
| **Certifications** | Platform certifications: Meta Blueprint, Google Analytics for Social, TikTok Marketing Partner, HubSpot Social Media. Display as **platform-branded badges** with vibrant colors matching each platform's identity. |
| **Blogs** | Content strategy thought leadership. Higher priority than technical roles. Show content calendars, trend analysis, platform strategy guides. |

### Component Variants Needed

- `SocialHeroSection` — gradient background with engagement metrics and device mockup
- `SocialProjects` — campaign showcase with post mockups and platform breakdowns
- `SocialTechnologies` — platform tool grid with social media branding
- `SocialExperience` — brand portfolio with social metrics
- `SocialCertifications` — platform-branded badge cards
- `SocialHeader` — vibrant, gradient-accented, energetic

---

## 6. Marketing Manager (`/portfolio/marketing-manager`)

**Audience:** CMOs, marketing directors, brand managers, startup founders

**Visual Theme:** Strategic and conversion-focused. Warm orange/amber and deep blue palette. Clean SaaS aesthetic with conversion-oriented elements (funnels, charts, growth arrows). Professional but dynamic. Trust-building through proven results.

### Section Order

1. **Hero** (growth metrics)
2. **Projects** (campaign portfolio)
3. **Experience** (brand growth timeline)
4. **Blogs** (marketing strategy)
5. **Certifications** (marketing credentials)
6. **Technologies** (martech stack)

### Section Details

| Section | Design |
|---------|--------|
| **Hero** | Lead with **growth metrics**: "3x ROAS Achieved", "$500K+ Ad Spend Managed", "200% Lead Growth". Clean white background with orange/amber accent colors. Include a **funnel visualization** or growth arrow graphic. Trust bar with brand logos. CTA: "Drive Growth Together" or "View Campaign Results". |
| **Projects** | Present as **campaign portfolios** with clear before/after metrics. Each project: Campaign Objective → Strategy → Channels Used → Results (ROI, conversions, reach). Include channel breakdown visuals (pie charts, bar graphs). Focus on **conversion and revenue impact**. |
| **Technologies** | **MarTech stack diagram** grouped by function: Advertising (Google Ads, Meta Ads, LinkedIn Ads), Email (Mailchimp, Klaviyo, HubSpot), Analytics (Google Analytics 4, Mixpanel), CMS (WordPress, Webflow), Automation (Zapier, Make). Show how tools connect in the marketing workflow. |
| **Experience** | Highlight **brand growth and campaign scale**. For each role: Brands managed, budget oversight, team size, key achievements ("Grew revenue 150% YoY", "Launched product generating $2M first year"). Use large metric callouts with growth arrows. |
| **Certifications** | Marketing credentials: Google Ads Certification, HubSpot Marketing Software, Meta Certified Media Buying Professional, Google Analytics 4. Display as **professional trust badges**. |
| **Blogs** | Marketing strategy and insights. High priority — showcase thought leadership on growth marketing, brand strategy, and campaign optimization. |

### Component Variants Needed

- `MarketingHeroSection` — growth metrics with funnel visual, trust bar
- `MarketingProjects` — campaign portfolio with before/after metrics
- `MarketingTechnologies` — MarTech stack diagram
- `MarketingExperience` — brand growth timeline with metric callouts
- `MarketingCertifications` — professional trust badge grid
- `MarketingHeader` — clean, conversion-focused with "Drive Growth" CTA

---

## Cross-Cutting Design Principles

### Section Ordering Flexibility

Each role page controls its own section order in the page component. The dynamic `[role]` page already supports this. Static role pages (software-engineer, video-editor, gtm-engineer, data-analyst, social-media-manager, marketing-manager) should each define their own ordering.

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
    Data.tsx         ← for data-analyst role
    Social.tsx       ← for social-media-manager role
    Marketing.tsx    ← for marketing-manager role
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

### Reuse Strategy

To minimize duplicate code while maintaining distinct designs:

| Role | Can Reuse From | Unique Components |
|------|---------------|-------------------|
| **Data Analyst** | SoftwareEngineer (structure, tech grid) | Hero (dashboard style), Projects (notebook format) |
| **Social Media Manager** | Video Editor (dark theme option), GTM (metrics) | Hero (gradient + device mockup), Projects (post mockups) |
| **Marketing Manager** | GTM (metrics, case studies), Data Analyst (charts) | Hero (funnel visual), Projects (before/after metrics) |

---

## Implementation Priority

1. **Software Engineer** — already mostly done. Minor enhancements (featured project, tech category tabs, timeline line).
2. **GTM Engineer** — closest to Standard variant. Easiest to differentiate with metric-forward styling.
3. **Video Editor** — most custom work needed. New cinematic variants for nearly every component.
4. **Data Analyst** — medium effort. Dashboard aesthetic requires new hero and project variants.
5. **Marketing Manager** — low-medium effort. Can reuse GTM structure with orange/amber theme swap.
6. **Social Media Manager** — medium effort. Requires gradient hero, campaign mockups, platform-specific styling.
