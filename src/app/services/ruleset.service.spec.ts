import { TestBed } from '@angular/core/testing';
import { RulesetService } from './ruleset.service';

describe('RulesetService', () => {
  afterEach(() => localStorage.clear());

  function make(): RulesetService {
    return TestBed.inject(RulesetService);
  }

  it('defaults to jrda when nothing is stored', () => {
    expect(make().rulesetId()).toBe('jrda');
  });

  it('setRuleset updates the signal and persists', () => {
    const svc = make();
    svc.setRuleset('wftda');
    expect(svc.selectedRulesetId()).toBe('wftda');
    expect(localStorage.getItem('derby-rules-ruleset')).toBe('wftda');
  });

  it('loads a previously stored selection', () => {
    localStorage.setItem('derby-rules-ruleset', 'mrda');
    expect(make().selectedRulesetId()).toBe('mrda');
  });

  it("an active junior's ruleset overrides the account selection", () => {
    localStorage.setItem('derby-rules-ruleset', 'wftda');
    localStorage.setItem(
      'jrda-user-profile',
      JSON.stringify({
        role: 'parent',
        level: 'L1',
        landed: true,
        onboarded: true,
        juniors: [{ skateName: 'Kid', age: '10', level: 'L1', rulesetId: 'jrda' }],
        activeJuniorIndex: 0,
      }),
    );
    expect(make().rulesetId()).toBe('jrda');
  });
});
