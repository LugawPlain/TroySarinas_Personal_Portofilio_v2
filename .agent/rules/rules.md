---
trigger: always_on
---

# Code Style & Architecture
- **Framework**: Next.js (App Router `src/` directory).
- **Language**: TypeScript (Strict Mode).
- **Styling**: Tailwind CSS v4.
- **Database**: Supabase.

# Coding Standards
- **Components**: 
  - Use React Server Components (RSC) by default. 
  - Only add 'use client' when hooks (useState, useEffect) or event listeners are strictly necessary.
  - Use PascalCase for filenames and component names.
  - Define props using `interface` (not `type`).

- **Tailwind v4 Specifics**:
  - Do NOT use `tailwind.config.js`; values are defined in CSS variables or `@theme` blocks in globals.css.
  - Use arbitrary values `w-[500px]` sparingly; prefer theme tokens.
  - Use the new opacity syntax (e.g., `bg-blue-500/50`).

- **Imports & Exports**:
  - Use named exports: `export const MyComponent = ...` (No `export default`).
  - Use absolute imports: `@/components/...` instead of relative paths.