import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarUbicacionPorStockComponent } from './registrar-ubicacion-por-stock.component';

describe('RegistrarUbicacionPorStockComponent', () => {
  let component: RegistrarUbicacionPorStockComponent;
  let fixture: ComponentFixture<RegistrarUbicacionPorStockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrarUbicacionPorStockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrarUbicacionPorStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
