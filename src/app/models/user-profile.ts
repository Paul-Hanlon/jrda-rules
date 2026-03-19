import { ReadingAge } from './reading-age';

export type UserRole = 'skater' | 'coach' | 'parent';

export interface UserProfile {
  role: UserRole;
  level: 'L1' | 'L2' | 'L3';
  readingAge?: ReadingAge;
}
