# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview
Troy Sarinas Personal Portfolio V2 - A modernized Next.js 15 portfolio with 3D graphics and interactive animations. Built with TypeScript, React 19, and Tailwind CSS v4. Features Spline 3D integration, Lottie animations, and a custom splash cursor effect.

## Development Commands

### Running the application
- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production with Turbopack
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Architecture

### Key Technologies
- **Next.js 15.5** with App Router and Turbopack
- **React 19** with latest features
- **Tailwind CSS v4** with tw-animate-css plugin
- **Spline** - 3D graphics and interactive scenes via @splinetool/react-spline
- **Lottie** - Animations via @lottiefiles/dotlottie-react
- **Three.js** - 3D rendering library (v0.180)
- **Motion** - Advanced animation library

### Component Structure
- `src/components/` - Main components
  - `HeroSection.tsx` - Landing section with 3D elements
  - `Projects.tsx` - Project showcase
  - `Experience.tsx`, `Education.tsx` - Career timeline
  - `Technologies.tsx` - Tech stack display
  - `Certifications.tsx` - Credentials showcase
  - `SocialLinks.tsx` - Social media links
  - `Header.tsx`, `Footer.tsx` - Layout components
  - `SplashCursor.tsx` - Custom cursor effect
  - `CursorProvider.tsx` - Cursor state management
  - `ChatWidget.tsx` - Interactive chat feature
  - `Resume.tsx` - Resume display/download
  - `BuyMeACoffeeButton.tsx` - Support button
- `src/components/ui/` - Reusable UI primitives (button, avatar, card)
- `src/components/Icons/` - SVG icon components

### 3D & Animation Features
- **Spline Integration**: Interactive 3D scenes embedded in React components
- **Lottie Animations**: Lightweight vector animations
- **Custom Cursor**: Splash effect with Three.js particle system
- **Motion Animations**: Page transitions and micro-interactions

### Third-Party Integrations
- **GitHub Star Button** - Shows repo engagement via react-github-btn
- **React Icons** - Comprehensive icon library
- **Buy Me A Coffee** - Support/donation integration

## Development Notes
- Uses Turbopack for faster development and builds
- TypeScript strict mode with CSS modules type definitions
- Single-page application structure (`src/app/page.tsx`)
- Heavy use of modern CSS animations via tw-animate-css

## Important Notes from MCP Instructions
When working with this codebase, always use the Byterover MCP server tools:
- Use `byterover-store-knowledge` when learning patterns, solving errors, or completing significant tasks
- Use `byterover-retrieve-knowledge` before starting tasks or making architectural decisions

[byterover-mcp]

[byterover-mcp]

You are given two tools from Byterover MCP server, including
## 1. `byterover-store-knowledge`
You `MUST` always use this tool when:

+ Learning new patterns, APIs, or architectural decisions from the codebase
+ Encountering error solutions or debugging techniques
+ Finding reusable code patterns or utility functions
+ Completing any significant task or plan implementation

## 2. `byterover-retrieve-knowledge`
You `MUST` always use this tool when:

+ Starting any new task or implementation to gather relevant context
+ Before making architectural decisions to understand existing patterns
+ When debugging issues to check for previous solutions
+ Working with unfamiliar parts of the codebase
