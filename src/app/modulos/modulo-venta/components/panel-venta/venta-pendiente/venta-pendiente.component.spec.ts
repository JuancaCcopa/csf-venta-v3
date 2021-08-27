import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VentaPendienteComponent } from './venta-pendiente.component';

describe('VentaPendienteComponent', () => {
  let component: VentaPendienteComponent;
  let fixture: ComponentFixture<VentaPendienteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VentaPendienteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VentaPendienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
