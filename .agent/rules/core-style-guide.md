---
trigger: always_on
---

"Always enforce strict TypeScript types.",
"Forbidden: Use of 'any' or 'explicit-any'.",
"Source of Truth: Always index 'convex/schema.ts' and '\_generated/' before writing Convex logic",
"Next.js Best Practice: Always use Zod for runtime validation alongside TS interfaces."

1. Never emit `any`.
2. If a type is missing in Convex, you are REQUIRED to check the schema or run codegen.
3. If the user asks for a feature, you must first verify the data types.
