import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalBusquedaServicioComponent } from './modal-busqueda-servicio.component';

describe('ModalBusquedaServicioComponent', () => {
  let component: ModalBusquedaServicioComponent;
  let fixture: ComponentFixture<ModalBusquedaServicioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalBusquedaServicioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalBusquedaServicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
