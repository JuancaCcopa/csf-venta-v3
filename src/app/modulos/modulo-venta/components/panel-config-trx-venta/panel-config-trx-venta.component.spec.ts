import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelConfigTrxVentaComponent } from './panel-config-trx-venta.component';

describe('PanelConfigTrxVentaComponent', () => {
  let component: PanelConfigTrxVentaComponent;
  let fixture: ComponentFixture<PanelConfigTrxVentaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PanelConfigTrxVentaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelConfigTrxVentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
