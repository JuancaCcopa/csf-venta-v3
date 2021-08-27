import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelUbicacionPorTipoProductoComponent } from './panel-ubicacion-por-tipo-producto.component';

describe('PanelUbicacionPorTipoProductoComponent', () => {
  let component: PanelUbicacionPorTipoProductoComponent;
  let fixture: ComponentFixture<PanelUbicacionPorTipoProductoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PanelUbicacionPorTipoProductoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelUbicacionPorTipoProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
