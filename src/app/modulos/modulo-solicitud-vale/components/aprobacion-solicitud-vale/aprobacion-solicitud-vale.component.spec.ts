import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AprobacionSolicitudValeComponent } from './aprobacion-solicitud-vale.component';

describe('AprobacionSolicitudValeComponent', () => {
  let component: AprobacionSolicitudValeComponent;
  let fixture: ComponentFixture<AprobacionSolicitudValeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AprobacionSolicitudValeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AprobacionSolicitudValeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
