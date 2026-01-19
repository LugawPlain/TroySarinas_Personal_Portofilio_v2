---
name: betterauth-patterns
description: Comprehensive guide for BetterAuth integration in Next.js. Covers authentication setup, API route handlers, client instances, and server-side session management.
---

# BetterAuth Patterns

BetterAuth is a modern, TypeScript-first authentication library designed for frameworks like Next.js.

## Core Integration Flow

### 1. Server Configuration (`lib/auth.ts`)
```typescript
import { betterAuth } from "better-auth";
import { databaseAdapter } from "better-auth/adapters/your-adapter";

export const auth = betterAuth({
    database: databaseAdapter,
    emailAndPassword: {
        enabled: true
    },
    // Add plugins here
});
```

### 2. Route Handler (`app/api/auth/[...all]/route.ts`)
```typescript
import { auth } from "@/lib/auth";
import { toNextJsHandler } from "better-auth/next-js";

export const { GET, POST } = toNextJsHandler(auth);
```

### 3. Client Instance (`lib/auth-client.ts`)
```typescript
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
    baseURL: process.env.NEXT_PUBLIC_APP_URL
});
```

## Best Practices

### Middleware and Route Protection
- **Optimistic Redirects**: In middleware, check for the existence of the session cookie for fast redirects.
- **Server Validation**: Perform full session validation (using `auth.api.getSession`) inside server components or server actions for security.

### Next.js 15+ Considerations
- BetterAuth supports both Node.js and Edge runtimes. Use Node.js runtime in middleware if full database validation is required, but prefer cookie-based checks for performance.

### Security
- Always use environment variables for `BETTER_AUTH_SECRET`.
- Enable CSRF protection (default in BetterAuth).
