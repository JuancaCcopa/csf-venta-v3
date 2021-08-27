import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalBusquedaProductoComponent } from './modal-busqueda-producto.component';

describe('ModalBusquedaProductoComponent', () => {
  let component: ModalBusquedaProductoComponent;
  let fixture: ComponentFixture<ModalBusquedaProductoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalBusquedaProductoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalBusquedaProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
