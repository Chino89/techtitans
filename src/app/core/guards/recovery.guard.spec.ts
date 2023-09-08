import { TestBed } from '@angular/core/testing';

import { RecoveryGuard } from './recovery.guard';

describe('RecoveryGuard', () => {
  let guard: RecoveryGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(RecoveryGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
