---
trigger: always_on
---

name: Next.js Robust Feature Implementation
trigger: 
  - on_file_create
  - on_file_modify

steps:
  # 1. Immediate Lint Check
  - name: "Linting"
    command: "npm run lint"
    action_on_fail: "fix_and_retry" # Agent attempts to fix ESLint errors automatically (max 3 tries)

  # 2. Type Safety Check (Crucial for TypeScript)
  - name: "Type Check"
    command: "tsc --noEmit"
    description: "Ensure no TypeScript errors are introduced."
    action_on_fail: "analyze_and_fix"

  # 3. Server/Client Boundary Verification
  # This is a specific Anti-Gravity agent behavior to check rendering
  - name: "Render Verification"
    agent_action: "browser_verify"
    instructions: |
      1. Start the dev server (`npm run dev`).
      2. Navigate to the page/component just modified.
      3. Check console for 'Hydration failed' or 'Text content does not match' errors.
      4. If errors exist, switch component to 'use client' or resolve HTML nesting issues.

  # 4. Final Build Check
  # Prevents 'it works on my machine' issues with Next.js specific build requirements
  - name: "Production Build Test"
    command: "npx next build"
    run_condition: "if_feature_complete" # Only runs when the agent thinks the whole task is done
    action_on_fail: "report_error"