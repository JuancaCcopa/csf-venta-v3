import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigTrxVentaCreateComponent } from './config-trx-venta-create.component';

describe('ConfigTrxVentaCreateComponent', () => {
  let component: ConfigTrxVentaCreateComponent;
  let fixture: ComponentFixture<ConfigTrxVentaCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfigTrxVentaCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigTrxVentaCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
