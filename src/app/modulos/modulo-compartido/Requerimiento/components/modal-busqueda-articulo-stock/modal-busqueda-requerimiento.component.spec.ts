import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalBusquedaArticuloStockComponent } from './modal-busqueda-articulo-stock.component';

describe('ModalBusquedaArticuloStockComponent', () => {
  let component: ModalBusquedaArticuloStockComponent;
  let fixture: ComponentFixture<ModalBusquedaArticuloStockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalBusquedaArticuloStockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalBusquedaArticuloStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
