# Copilot Instructions for Hayat Karnesi

## Project Overview
**Hayat Karnesi** is a Turkish "life assessment" web application built with Next.js. It's a quick test (1-3 questions) that evaluates users' current life situation and returns a percentage-based result with personalized feedback. The app routes through three pages: home → test questions → result page with sharing capability.

## Tech Stack
- **Framework**: Next.js 16.1.6 (App Router)
- **React**: 19.2.3 with TypeScript 5
- **Styling**: Tailwind CSS 4 with PostCSS
- **Linting**: ESLint 9 with Next.js config
- **Build/Run**: `npm run dev` (development), `npm run build` + `npm run start` (production)

## Architecture & Key Patterns

### App Router Structure
Pages use Next.js App Router conventions under `/app`:
- [app/page.tsx](app/page.tsx) - Home page with test entry point
- [app/test/page.tsx](app/test/page.tsx) - Quiz component (client-side state)
- [app/result/page.tsx](app/result/page.tsx) - Results display (URL query params)
- [app/layout.tsx](app/layout.tsx) - Root layout with metadata and font setup

### Client-Side State Management
Both test and result pages use `"use client"` directive:
- **Test page**: Manages `current` (question index) and `score` (accumulated points) with React `useState`
- **Result page**: Reads score from URL query params via `useSearchParams()` from `next/navigation`
- Data flow: Quiz → navigate with score param → result page parses and displays

### Scoring System
Questions are stored as objects with `text` and `options` array (see [app/test/page.tsx](app/test/page.tsx)):
- Each option has `label` and `score` (0, 5, or 10)
- Total possible: 30 points → displayed as percentage (0%, 50%, 100%)
- Result categories: ≤39 = "Alarm", 40-69 = "İdare Ediyor", ≥70 = "İyi Gidiyor"

### Styling Conventions
- Tailwind CSS utility-first approach with responsive classes
- Flexbox centering pattern: `min-h-screen flex flex-col items-center justify-center`
- Button hover states: `hover:bg-gray-100` for secondary, `bg-black text-white` for primary
- No custom CSS components; all styles inline via className

### Internationalization
Content is in Turkish. Key terms:
- "Hayat Karnesi" = Life Report Card
- "Teste Başla" = Start Test
- Metadata and descriptions use Turkish text

## Development Workflows

### Setup & Running
```bash
npm install          # Install dependencies
npm run dev          # Start dev server at http://localhost:3000 (hot reload)
npm run build        # Production build
npm run start        # Production serve
npm run lint         # ESLint check (no format, lint-only config)
```

### TypeScript Configuration
- Strict mode enabled (`"strict": true`)
- Path alias `@/*` maps to root directory (currently unused)
- Target: ES2017, module: esnext, JSX: react-jsx

### Linting Rules
[eslint.config.mjs](eslint.config.mjs) uses ESLint flat config with:
- `@next/core-web-vitals` - Core Web Vitals checks
- `@next/typescript` - TypeScript-specific rules
- Ignores: `.next/`, `out/`, `build/`, `next-env.d.ts`

## Common Patterns & Conventions

### Component Structure
All pages are export default React functional components returning JSX (no named exports for pages).

### Routing & Navigation
- Link via `<a href="/path">` for static routes (home to test)
- `useRouter()` from `next/navigation` for programmatic navigation with params
- Query params pass data between routes (see test → result score passing)

### Conditional Rendering
Use ternary operators for simple if/else (result page title/description logic).

### Naming
- camelCase for variables, functions (`handleAnswer`, `newScore`)
- PascalCase for components (default exports)
- Turkish parameter names only in business logic (`scoreParam`), English for code

## Critical Integration Points

1. **Home → Test**: Static link to `/test`
2. **Test → Result**: `router.push(`/result?score=${newScore}`)` passes final score
3. **Result Sharing**: Uses Web Share API with fallback to clipboard; constructs `shareText` with current origin

## Important Notes for AI Agents
- No API routes or backend logic; all computation is client-side
- No database or external services
- No environment variables configured
- Single .tsx file per page (no component decomposition yet)
- Metadata in layout.tsx needs update to match actual app ("Create Next App" is placeholder)
