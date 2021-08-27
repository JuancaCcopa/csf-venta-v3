import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelAProbacionSolicitudComponent } from './panel-aprobacion-solicitud.component';

describe('PanelAProbacionSolicitudComponent', () => {
  let component: PanelAProbacionSolicitudComponent;
  let fixture: ComponentFixture<PanelAProbacionSolicitudComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PanelAProbacionSolicitudComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelAProbacionSolicitudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
