import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalBusquedaHospitalExclusionesComponent } from './modal-busqueda-hospital-exclusiones.component';

describe('ModalBusquedaHospitalExclusionesComponent', () => {
  let component: ModalBusquedaHospitalExclusionesComponent;
  let fixture: ComponentFixture<ModalBusquedaHospitalExclusionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalBusquedaHospitalExclusionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalBusquedaHospitalExclusionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
