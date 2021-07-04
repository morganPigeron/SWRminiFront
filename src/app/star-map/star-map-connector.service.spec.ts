import { TestBed } from '@angular/core/testing';

import { StarMapConnectorService } from './star-map-connector.service';

describe('StarMapConnectorService', () => {
  let service: StarMapConnectorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StarMapConnectorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
