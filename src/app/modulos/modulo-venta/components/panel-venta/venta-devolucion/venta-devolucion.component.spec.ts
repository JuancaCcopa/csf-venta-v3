import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VentaDevolucionComponent } from './venta-devolucion.component';

describe('VentaDevolucionComponent', () => {
  let component: VentaDevolucionComponent;
  let fixture: ComponentFixture<VentaDevolucionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VentaDevolucionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VentaDevolucionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
