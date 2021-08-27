import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VentaSinStockComponent } from './venta-sin-stock.component';

describe('VentaSinStockComponent', () => {
  let component: VentaSinStockComponent;
  let fixture: ComponentFixture<VentaSinStockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VentaSinStockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VentaSinStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
