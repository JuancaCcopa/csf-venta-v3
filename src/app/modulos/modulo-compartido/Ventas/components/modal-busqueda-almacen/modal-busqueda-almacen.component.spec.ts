import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalBusquedaAlmacenComponent } from './modal-busqueda-almacen.component';

describe('ModalBusquedaAlmacenComponent', () => {
  let component: ModalBusquedaAlmacenComponent;
  let fixture: ComponentFixture<ModalBusquedaAlmacenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalBusquedaAlmacenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalBusquedaAlmacenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
