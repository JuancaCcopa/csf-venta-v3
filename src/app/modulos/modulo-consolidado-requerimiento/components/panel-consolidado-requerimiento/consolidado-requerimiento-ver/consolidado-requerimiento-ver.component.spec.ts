import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsolidadoRequerimientoVerComponent } from './consolidado-requerimiento-ver-component';

describe('ConsolidadoRequerimientoVerComponent', () => {
  let component: ConsolidadoRequerimientoVerComponent;
  let fixture: ComponentFixture<ConsolidadoRequerimientoVerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsolidadoRequerimientoVerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsolidadoRequerimientoVerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
