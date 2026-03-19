---
sidebar_position: 4
---

# Architecture

## Tech stack

- **Framework**: Angular v21 (standalone components, signals)
- **Build tool**: Angular CLI 21.2.1
- **Testing**: Vitest via `@angular/build:unit-test`
- **Hosting**: Firebase Hosting
- **Styles**: SCSS (inline component styles)

## Key structure

```
src/
  app/
    features/         # Lazy-loaded feature routes
      dashboard/
      rules/
      glossary/
      quizzes/
      casebook/
      support/
    data/             # Static rule, quiz, glossary, and casebook data
    models/           # TypeScript interfaces (reading age, user profile)
    services/         # Singleton services (quiz, glossary, reading age, user profile)
    shared/           # Shared components (header, dialogs, selectors)
```

## Data model

All rule, quiz, glossary, and casebook content is stored as static TypeScript data files under `src/app/data/`. Age-specific variants (e.g. `glossary.data.7-8.ts`) are selected at runtime based on the user's reading age setting.

## State management

Component state uses Angular signals. Reading age and user profile are persisted via dedicated services (`ReadingAgeService`, `UserProfileService`).
