# SIN.OS LAB Architecture & Extension Guide

## Overview

**SIN.OS LAB** is a lightweight, content-driven experimental area inside the SIN.OS portfolio website. It hosts interactive developer mini-games and system topology experiments.

---

## Folder Structure & Module Boundaries

```
content/
└── experiments/
    └── stack-builder.json        # Content-driven challenge & component definitions

src/
├── app/
│   ├── lab/
│   │   ├── page.tsx              # Server Component (Lab Shell & Experiment Cards)
│   │   └── stack-builder/
│   │       └── page.tsx          # Server Component (Lazy-loads StackBuilderModule)
│   
├── types/
│   └── lab.ts                    # Zod schemas & TypeScript interfaces
│   
├── lib/
│   └── lab-content.ts            # Server-side data loader & localization helper
│   
└── features/
    └── lab/
        └── stack-builder/
            ├── index.ts          # Public entry point for Stack Builder module
            ├── domain/
            │   └── architecture-validator.ts # Pure, framework-independent validation & scoring
            └── components/
                └── StackBuilderModule.tsx    # Lazy-loaded interactive client game component
```

---

## How Stack Builder Works

1. **Content-Driven Challenge Layer**:
   Challenge definitions and component palettes live in `content/experiments/stack-builder.json`.

2. **Deterministic Domain Logic**:
   The validation engine in `architecture-validator.ts` contains pure functions:
   - `validateArchitecture(challenge, userStack)` -> returns structured result code (`CORRECT_ARCHITECTURE`, `MISSING_COMPONENTS`, `INVALID_ORDER`, `UNNECESSARY_COMPONENTS`, `EMPTY_STACK`) and localized feedback key.
   - `calculateScore(params)` -> deterministic score calculation (0–100).

3. **Lazy-Loaded Client Bundle Isolation**:
   The game module is lazy-loaded via `next/dynamic` inside `/lab/stack-builder/page.tsx`. The main portfolio and homepage bundles carry zero Stack Builder JS cost.

---

## How to Add a New Stack Builder Challenge

To add a new challenge, open `content/experiments/stack-builder.json` and append a new challenge object to the `"challenges"` array:

```json
{
  "id": "stack-cache-005",
  "order": 5,
  "maxTimeSeconds": 60,
  "availableComponents": [
    "comp-frontend",
    "comp-api",
    "comp-backend",
    "comp-cache",
    "comp-database"
  ],
  "expectedArchitecture": [
    "comp-frontend",
    "comp-api",
    "comp-backend",
    "comp-cache",
    "comp-database"
  ],
  "locales": {
    "en": {
      "title": "Your Challenge Title",
      "description": "Your challenge description...",
      "hint": "Your challenge hint..."
    },
    "id": {
      "title": "Judul Tantangan Anda",
      "description": "Deskripsi tantangan...",
      "hint": "Petunjuk tantangan..."
    }
  }
}
```

No React UI code, routing, or score logic needs to be changed when adding new challenges.

---

## How to Add a New Lab Experiment (e.g. Debug SIN.OS or Terminal Mission)

1. Create the experiment module under `src/features/lab/<experiment-name>/`.
2. Add content definitions to `content/experiments/<experiment-name>.json` if applicable.
3. Create the route under `src/app/lab/<experiment-name>/page.tsx`.
4. Update the card status in `src/app/lab/page.tsx` from `COMING SOON` to `PLAYABLE`.
