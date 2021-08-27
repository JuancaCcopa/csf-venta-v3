import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelUbicacionPorStockComponent } from './panel-ubicacion-por-stock.component';

describe('PanelUbicacionPorStockComponent', () => {
  let component: PanelUbicacionPorStockComponent;
  let fixture: ComponentFixture<PanelUbicacionPorStockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PanelUbicacionPorStockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelUbicacionPorStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
