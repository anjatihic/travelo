import { TestBed } from '@angular/core/testing';

import { TravelGroupService } from './travel-group.service';

describe('TravelGroupService', () => {
  let service: TravelGroupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TravelGroupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
