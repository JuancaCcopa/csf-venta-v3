import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerDetalleSolicitudValeComponent } from './ver-detalle-solicitud-vale.component';

describe('VerDetalleSolicitudValeComponent', () => {
  let component: VerDetalleSolicitudValeComponent;
  let fixture: ComponentFixture<VerDetalleSolicitudValeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerDetalleSolicitudValeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerDetalleSolicitudValeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
