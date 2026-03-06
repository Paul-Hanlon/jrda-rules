import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/dashboard/dashboard.component').then((m) => m.DashboardComponent),
  },
  {
    path: 'rules',
    loadComponent: () =>
      import('./features/rules/rules-browser.component').then((m) => m.RulesBrowserComponent),
  },
  {
    path: 'rules/:sectionId',
    loadComponent: () =>
      import('./features/rules/rule-section.component').then((m) => m.RuleSectionComponent),
  },
  {
    path: 'glossary',
    loadComponent: () =>
      import('./features/glossary/glossary.component').then((m) => m.GlossaryComponent),
  },
  {
    path: 'quizzes',
    loadComponent: () =>
      import('./features/quizzes/quiz-list.component').then((m) => m.QuizListComponent),
  },
  {
    path: 'quizzes/:topicId',
    loadComponent: () =>
      import('./features/quizzes/quiz.component').then((m) => m.QuizComponent),
  },
  {
    path: 'casebook',
    loadComponent: () =>
      import('./features/casebook/casebook-list.component').then((m) => m.CasebookListComponent),
  },
  {
    path: 'casebook/:scenarioId',
    loadComponent: () =>
      import('./features/casebook/casebook-scenario.component').then(
        (m) => m.CasebookScenarioComponent
      ),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
