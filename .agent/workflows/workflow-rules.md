---
description: Next.js Robust Feature Implementation
---

trigger: 
  - on_file_create
  - on_file_modify

steps:
  # 1. Structural Validation
  - name: "Architecture Audit"
    agent_action: "analyze_code_structure"
    instructions: |
      Verify the following:
      - Component name and filename match PascalCase.
      - Component uses a named export.
      - Props are defined via 'interface'.
      - No 'use client' is used unless hooks/events are present.

  # 2. Styling Guard
  - name: "Tailwind v4 Compliance"
    agent_action: "check_css_standards"
    instructions: "Ensure no tailwind.config.js exists and opacity uses the 'color/value' syntax."

  # 3. Type Safety & Sync
  - name: "Type Safety Check"
    command: "npx supabase gen types typescript --local > src/types/supabase.ts && tsc --noEmit"
    action_on_fail: "analyze_and_fix"

  # 4. Immediate Lint Check
  - name: "Linting"
    command: "npm run lint"
    action_on_fail: "fix_and_retry"

  # 5. Render & Hydration Verification
  - name: "Render Verification"
    agent_action: "browser_verify"
    instructions: |
      1. Start the dev server (`npm run dev`).
      2. Navigate to the modified route.
      3. Check for 'Hydration failed' or HTML nesting errors in the console.

  # 6. Final Build Test
  - name: "Production Build Test"
    command: "npx next build"
    run_condition: "if_feature_complete"
    action_on_fail: "report_error"