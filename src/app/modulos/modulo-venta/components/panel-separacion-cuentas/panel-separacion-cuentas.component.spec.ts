import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelSeparacionCuentasComponent } from './panel-separacion-cuentas.component';

describe('PanelSeparacionCuentasComponent', () => {
  let component: PanelSeparacionCuentasComponent;
  let fixture: ComponentFixture<PanelSeparacionCuentasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PanelSeparacionCuentasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelSeparacionCuentasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
