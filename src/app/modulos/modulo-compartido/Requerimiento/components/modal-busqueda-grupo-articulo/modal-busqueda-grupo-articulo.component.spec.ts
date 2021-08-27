import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalBusquedaGrupoArticuloComponent } from './modal-busqueda-grupo-articulo.component';

describe('ModalBusquedaGrupoArticuloComponent', () => {
  let component: ModalBusquedaGrupoArticuloComponent;
  let fixture: ComponentFixture<ModalBusquedaGrupoArticuloComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalBusquedaGrupoArticuloComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalBusquedaGrupoArticuloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
