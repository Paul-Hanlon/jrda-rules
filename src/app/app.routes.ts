import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    title: 'Dashboard',
    loadComponent: () =>
      import('./features/dashboard/dashboard.component').then((m) => m.DashboardComponent),
  },
  {
    path: 'rules',
    title: 'Rules Browser',
    loadComponent: () =>
      import('./features/rules/rules-browser.component').then((m) => m.RulesBrowserComponent),
  },
  {
    path: 'rules/:sectionId',
    title: 'Rule Section',
    loadComponent: () =>
      import('./features/rules/rule-section.component').then((m) => m.RuleSectionComponent),
  },
  {
    path: 'glossary',
    title: 'Glossary',
    loadComponent: () =>
      import('./features/glossary/glossary.component').then((m) => m.GlossaryComponent),
  },
  {
    path: 'quizzes',
    title: 'Quizzes',
    loadComponent: () =>
      import('./features/quizzes/quiz-list.component').then((m) => m.QuizListComponent),
  },
  {
    path: 'quizzes/:topicId',
    title: 'Quiz',
    loadComponent: () =>
      import('./features/quizzes/quiz.component').then((m) => m.QuizComponent),
  },
  {
    path: 'casebook',
    title: 'Casebook',
    loadComponent: () =>
      import('./features/casebook/casebook-list.component').then((m) => m.CasebookListComponent),
  },
  {
    path: 'casebook/:scenarioId',
    title: 'Casebook Scenario',
    loadComponent: () =>
      import('./features/casebook/casebook-scenario.component').then(
        (m) => m.CasebookScenarioComponent
      ),
  },
  {
    path: 'support',
    title: 'Support',
    loadComponent: () =>
      import('./features/support/support.component').then((m) => m.SupportComponent),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
