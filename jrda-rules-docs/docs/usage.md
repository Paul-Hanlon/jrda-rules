---
sidebar_position: 3
---

# Usage

## Running locally

```bash
# Install dependencies
npm install

# Start the dev server (http://localhost:4200)
ng serve

# Production build
ng build

# Run unit tests
ng test
```

## Navigation

| Route | Description |
|---|---|
| `/` | Dashboard / home |
| `/rules` | Browse all rule sections |
| `/rules/:sectionId` | View a specific rule section |
| `/glossary` | Search the glossary |
| `/quizzes` | List all quiz topics |
| `/quizzes/:topicId` | Take a quiz on a specific topic |
| `/casebook` | Browse casebook scenarios |
| `/casebook/:scenarioId` | View a specific scenario |
| `/support` | Support / feedback |

## Reading age

On first visit, users are prompted to select a reading age group. This can be changed at any time using the reading age selector in the header. Content across the glossary, quizzes, and casebook adapts to the selected age group.
