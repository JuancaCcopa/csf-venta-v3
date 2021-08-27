import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlTipoVentaComponent } from './control-tipo-venta.component';

describe('ControlTipoVentaComponent', () => {
  let component: ControlTipoVentaComponent;
  let fixture: ComponentFixture<ControlTipoVentaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ControlTipoVentaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlTipoVentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
