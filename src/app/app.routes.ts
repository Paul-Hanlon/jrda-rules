import { inject } from '@angular/core';
import { CanMatchFn, Routes } from '@angular/router';
import { UserProfileService } from './services/user-profile.service';

const isParentOnCustodianHome: CanMatchFn = () => {
  const s = inject(UserProfileService);
  // Parents get the custodian dashboard at `/` ONLY when they haven't stepped
  // into a junior. Stepping in flips `inJuniorView`, which makes this guard
  // fall through to the skater Dashboard route below.
  return s.profile()?.accountType === 'parent' && !s.inJuniorView();
};

export const routes: Routes = [
  {
    // Parents land on the custodian dashboard when visiting root.
    path: '',
    pathMatch: 'full',
    canMatch: [isParentOnCustodianHome],
    title: 'Parent Dashboard',
    loadComponent: () =>
      import('./features/custodian/custodian-dashboard.component').then(
        (m) => m.CustodianDashboardComponent,
      ),
  },
  {
    path: '',
    pathMatch: 'full',
    title: 'Dashboard',
    loadComponent: () =>
      import('./features/dashboard/dashboard.component').then((m) => m.DashboardComponent),
  },
  {
    path: 'custodian',
    title: 'Parent Dashboard',
    loadComponent: () =>
      import('./features/custodian/custodian-dashboard.component').then(
        (m) => m.CustodianDashboardComponent,
      ),
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
    path: 'profile',
    title: 'Profile',
    loadComponent: () =>
      import('./features/profile/profile.component').then((m) => m.ProfileComponent),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
