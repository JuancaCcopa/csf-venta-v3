import { TestBed } from '@angular/core/testing';

import { PanelPrincipalService } from './panel-principal.service';

describe('PanelPrincipalService', () => {
  let service: PanelPrincipalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PanelPrincipalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
