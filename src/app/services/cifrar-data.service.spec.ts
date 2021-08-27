import { TestBed } from '@angular/core/testing';

import { CifrarDataService } from './cifrar-data.service';

describe('CifrarDataService', () => {
  let service: CifrarDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CifrarDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
