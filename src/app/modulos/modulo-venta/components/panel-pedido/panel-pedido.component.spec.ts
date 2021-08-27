import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelPedidoComponent } from './panel-pedido.component';

describe('PanelPedidoComponent', () => {
  let component: PanelPedidoComponent;
  let fixture: ComponentFixture<PanelPedidoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PanelPedidoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelPedidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
