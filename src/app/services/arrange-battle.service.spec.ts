import { TestBed } from '@angular/core/testing';

import { ArrangeBattleService } from './arrange-battle.service';

describe('ArrangeBattleService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ArrangeBattleService = TestBed.get(ArrangeBattleService);
    expect(service).toBeTruthy();
  });
});
