import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VentaSimuladorComponent } from './venta-simulador.component';

describe('VentaSimuladorComponent', () => {
  let component: VentaSimuladorComponent;
  let fixture: ComponentFixture<VentaSimuladorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VentaSimuladorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VentaSimuladorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
