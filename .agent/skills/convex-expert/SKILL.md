---
name: convex-expert
description: Convex ORM expert for schema design, real-time queries, mutations, and actions in Next.js.
---

# Convex Expert

Convex is a full-stack TypeScript backend for real-time applications.

## Core Concepts

### 1. Schema (`convex/schema.ts`)
```typescript
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  posts: defineTable({
    title: v.string(),
    author: v.id("users"),
    content: v.string(),
  }).index("by_author", ["author"]),
});
```

### 2. Queries, Mutations, and Actions
- **Queries**: Read data (cached, reactive). Use `query`.
- **Mutations**: Write data (ACID compliant). Use `mutation`.
- **Actions**: Side effects (fetch external APIs). Use `action`.

## Best Practices

### Await all Promises
Always `await` promises within Convex functions to ensure proper execution and error handling.

### Efficient Data Access
- Avoid `.filter()` on large datasets.
- Use `.withIndex()` for efficient querying.
- Separate distinct object types into their own tables.

### Real-time UI
Use the `useQuery` hook in client components for automatic real-time updates when data changes in the Convex database.

### Security
- Validate arguments using `v` (Convex values) for all public-facing functions.
- Check `ctx.auth.getUserIdentity()` for authentication-required operations.
