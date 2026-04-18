import { ReadingAge } from './reading-age';
import { SkillLevel } from './skill-level';

export type UserRole = 'skater' | 'coach' | 'parent';
export type DerivedRole = 'junior' | 'adult';
export type AccountType = 'skater' | 'parent';

export interface JuniorLogin {
  username: string;
  pin: string;
  createdAt: number;
}

export interface JuniorProfile {
  skateName: string;
  number?: string;
  age: string;
  dob?: string;
  team?: string;
  level: SkillLevel;
  login?: JuniorLogin;
}

export interface AuthDetails {
  uid: string;
  email?: string | null;
  displayName?: string | null;
  provider?: 'google' | 'password';
}

export interface UserProfile {
  role: UserRole;
  accountType?: AccountType;
  level: SkillLevel;
  readingAge?: ReadingAge;
  skateName?: string;
  number?: string;
  age?: string;
  dob?: string;
  team?: string;
  juniors?: JuniorProfile[];
  activeJuniorIndex?: number;
  auth?: AuthDetails;
  landed?: boolean;
  onboarded?: boolean;
}

export function roleFromAge(age: string | number | undefined | null): DerivedRole {
  const n = typeof age === 'number' ? age : parseInt(age ?? '', 10);
  return Number.isFinite(n) && n >= 18 ? 'adult' : 'junior';
}

export function computeAge(dob: string | undefined | null): number | null {
  if (!dob) return null;
  const d = new Date(dob);
  if (isNaN(+d)) return null;
  const now = new Date();
  let age = now.getFullYear() - d.getFullYear();
  const m = now.getMonth() - d.getMonth();
  if (m < 0 || (m === 0 && now.getDate() < d.getDate())) age--;
  return age;
}
