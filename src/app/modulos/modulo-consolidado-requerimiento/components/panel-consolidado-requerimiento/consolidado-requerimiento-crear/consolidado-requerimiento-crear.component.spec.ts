import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsolidadoRequerimientoCrearComponent } from './consolidado-requerimiento-crear.component';

describe('ConsolidadoRequerimientoCrearComponent', () => {
  let component: ConsolidadoRequerimientoCrearComponent;
  let fixture: ComponentFixture<ConsolidadoRequerimientoCrearComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsolidadoRequerimientoCrearComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsolidadoRequerimientoCrearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
