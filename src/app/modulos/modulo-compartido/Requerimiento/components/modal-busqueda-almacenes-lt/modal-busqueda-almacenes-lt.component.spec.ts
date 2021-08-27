import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalBusquedaAlmacenLtComponent } from './modal-busqueda-almacenes-lt.component';

describe('ModalBusquedaAlmacenLtComponent', () => {
  let component: ModalBusquedaAlmacenLtComponent;
  let fixture: ComponentFixture<ModalBusquedaAlmacenLtComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalBusquedaAlmacenLtComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalBusquedaAlmacenLtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
