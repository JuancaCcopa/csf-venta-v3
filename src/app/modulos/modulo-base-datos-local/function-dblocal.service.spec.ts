import { TestBed } from '@angular/core/testing';

import { FunctionDblocalService } from './function-dblocal.service';

describe('FunctionDblocalService', () => {
  let service: FunctionDblocalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FunctionDblocalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
