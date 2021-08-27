import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalBusquedaArticuloPorUsuarioComponent } from './modal-busqueda-articulo-por-usuario.component';

describe('ModalBusquedaArticuloPorUsuarioComponent', () => {
  let component: ModalBusquedaArticuloPorUsuarioComponent;
  let fixture: ComponentFixture<ModalBusquedaArticuloPorUsuarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalBusquedaArticuloPorUsuarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalBusquedaArticuloPorUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
