import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalBusquedaArticuloComponent } from './modal-busqueda-articulo.component';

describe('ModalBusquedaArticuloComponent', () => {
  let component: ModalBusquedaArticuloComponent;
  let fixture: ComponentFixture<ModalBusquedaArticuloComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalBusquedaArticuloComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalBusquedaArticuloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
