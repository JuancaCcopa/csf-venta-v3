import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsolidadoRequerimientoEditarComponent } from './consolidado-requerimiento-editar.component';

describe('ConsolidadoRequerimientoEditarComponent', () => {
  let component: ConsolidadoRequerimientoEditarComponent;
  let fixture: ComponentFixture<ConsolidadoRequerimientoEditarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsolidadoRequerimientoEditarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsolidadoRequerimientoEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
