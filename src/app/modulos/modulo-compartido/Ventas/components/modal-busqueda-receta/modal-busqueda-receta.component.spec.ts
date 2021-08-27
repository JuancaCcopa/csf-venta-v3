import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalBusquedaRecetaComponent } from './modal-busqueda-receta.component';

describe('ModalBusquedaRecetaComponent', () => {
  let component: ModalBusquedaRecetaComponent;
  let fixture: ComponentFixture<ModalBusquedaRecetaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalBusquedaRecetaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalBusquedaRecetaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
