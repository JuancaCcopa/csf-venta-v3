import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarUbicacionPorTipoProductoComponent } from './registrar-ubicacion-por-tipo-producto.component';

describe('RegistrarUbicacionPorTipoProductoComponent', () => {
  let component: RegistrarUbicacionPorTipoProductoComponent;
  let fixture: ComponentFixture<RegistrarUbicacionPorTipoProductoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrarUbicacionPorTipoProductoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrarUbicacionPorTipoProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
