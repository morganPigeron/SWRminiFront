import { TestBed } from '@angular/core/testing';

import { DisplayEngineService } from './display-engine.service';

describe('DisplayEngineService', () => {
  let service: DisplayEngineService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DisplayEngineService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
