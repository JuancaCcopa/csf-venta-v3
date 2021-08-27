import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarSolicitudValeComponent } from './registrar-solicitud-vale.component';

describe('RegistrarSolicitudValeComponent', () => {
  let component: RegistrarSolicitudValeComponent;
  let fixture: ComponentFixture<RegistrarSolicitudValeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrarSolicitudValeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrarSolicitudValeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
