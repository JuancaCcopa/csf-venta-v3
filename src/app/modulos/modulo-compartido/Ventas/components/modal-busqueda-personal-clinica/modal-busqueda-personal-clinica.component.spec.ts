import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalBusquedaPersonalClinicaComponent } from './modal-busqueda-personal-clinica.component';

describe('ModalBusquedaPersonalClinicaComponent', () => {
  let component: ModalBusquedaPersonalClinicaComponent;
  let fixture: ComponentFixture<ModalBusquedaPersonalClinicaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalBusquedaPersonalClinicaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalBusquedaPersonalClinicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
