import { TestBed } from '@angular/core/testing';

import { MenuDinamicoService } from './menu-dinamico.service';

describe('MenuDinamicoService', () => {
  let service: MenuDinamicoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MenuDinamicoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
