# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

**Development:**
- `npm run dev` - Start Next.js development server
- `npm run build` - Build Next.js production bundle
- `npm run lint` - Run ESLint

**Sanity CMS:**
- `cd sanity && npm run dev` - Start Sanity Studio
- `cd sanity && npm run build` - Build Sanity Studio
- `cd sanity && npm run deploy` - Deploy Sanity Studio

## Architecture

This is a Next.js 15 creative boilerplate with Sanity CMS integration and GSAP animations.

### Key Libraries & Stack
- **Next.js 15** with App Router
- **Sanity CMS** for content management (separate workspace in `/sanity/`)
- **GSAP** with custom animation components using `@gsap/react`
- **Lenis** for smooth scrolling
- **Tempus** for animation timing
- **TypeScript** throughout
- **SCSS** for styling

### State Management
- **Global Store**: Context-based store (`libs/store.tsx`) manages:
  - Menu state (`isMenuOpened`)
  - Page visibility (`isPageVisible`) 
  - Lenis instance and readiness
  - Font loading state
- **Window Events**: Custom provider (`libs/events.tsx`) for centralized window event handling

### Animation System
Custom animation components in `app/(pages)/(animations)/`:
- `Appear.tsx` - Fade in animations
- `LineReveal.tsx` - Scale reveal animations
- `SlideUp.tsx` - Slide up with optional opacity
- `TextReveal.tsx` - Text reveal animations

All use consistent patterns:
- `useGSAP` hooks for GSAP integration
- Scroll trigger support with `target` prop
- Page load vs scroll-based animations
- TypeScript interfaces for props

### GSAP Configuration
- Custom GSAP setup in `components/Gsap.tsx` 
- Registers SplitText and ScrollTrigger plugins
- Integrates with Tempus for consistent timing
- Custom easing functions in `libs/easing.ts`

### Sanity Integration
- Schema types in `sanity/schemaTypes/`
- Singleton documents (home, about, settings) with structured content
- Image optimization with `@sanity/image-url`
- SEO data fetching with `getSeoData()` function

### Component Architecture
- Pages use modular content blocks from Sanity
- Reusable UI components in `/components/`
- Page-specific components in `app/(pages)/(components)/`
- Layout components (Navigation, Menu, Footer) with GSAP animations

### Styling
- SCSS with organized structure in `/styles/`
- Component-specific styles in `styles/components/`
- Layout styles in `styles/layouts/`
- Global variables and mixins

### Key Patterns
- All client components use `"use client"` directive
- Animation components accept `ReactElement` children with ref forwarding
- Consistent TypeScript interfaces for all component props
- Custom hooks for window events and smooth scrolling
- Event-driven architecture for page transitions