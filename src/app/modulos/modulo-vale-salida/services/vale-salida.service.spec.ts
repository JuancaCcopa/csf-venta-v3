import { TestBed } from '@angular/core/testing';

import { ValeSalidaService } from './vale-salida.service';

describe('ValeSalidaService', () => {
  let service: ValeSalidaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ValeSalidaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
