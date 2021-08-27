import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalBusquedaUbicacionComponent } from './modal-busqueda-ubicacion.component';

describe('ModalBusquedaUbicacionComponent', () => {
  let component: ModalBusquedaUbicacionComponent;
  let fixture: ComponentFixture<ModalBusquedaUbicacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalBusquedaUbicacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalBusquedaUbicacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
