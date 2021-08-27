import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalBusquedaArticuloPorGrupopComponent } from './modal-busqueda-articulo-por-grupop.component';

describe('ModalBusquedaArticuloPorGrupopComponent', () => {
  let component: ModalBusquedaArticuloPorGrupopComponent;
  let fixture: ComponentFixture<ModalBusquedaArticuloPorGrupopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalBusquedaArticuloPorGrupopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalBusquedaArticuloPorGrupopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
