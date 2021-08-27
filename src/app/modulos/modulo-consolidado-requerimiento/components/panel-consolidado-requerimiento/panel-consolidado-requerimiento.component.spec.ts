import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelConsolidadoRequerimientoComponent } from './panel-consolidado-requerimiento.component';

describe('PanelConsolidadoRequerimientoComponent', () => {
  let component: PanelConsolidadoRequerimientoComponent;
  let fixture: ComponentFixture<PanelConsolidadoRequerimientoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PanelConsolidadoRequerimientoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelConsolidadoRequerimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
