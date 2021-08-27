import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelAprobacionRequerimientoComponent } from './panel-aprobacion-requerimiento.component';

describe('PanelAprobacionRequerimientoComponent', () => {
  let component: PanelAprobacionRequerimientoComponent;
  let fixture: ComponentFixture<PanelAprobacionRequerimientoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PanelAprobacionRequerimientoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelAprobacionRequerimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
