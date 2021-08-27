import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalBusquedaUbicacionLtComponent } from './modal-busqueda-ubicacion-lt.component';

describe('ModalBusquedaUbicacionLtComponent', () => {
  let component: ModalBusquedaUbicacionLtComponent;
  let fixture: ComponentFixture<ModalBusquedaUbicacionLtComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalBusquedaUbicacionLtComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalBusquedaUbicacionLtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
