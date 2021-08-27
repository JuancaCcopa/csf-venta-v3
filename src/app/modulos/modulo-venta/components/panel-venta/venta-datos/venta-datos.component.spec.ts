import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VentaDatosComponent } from './venta-datos.component';

describe('VentaDatosComponent', () => {
  let component: VentaDatosComponent;
  let fixture: ComponentFixture<VentaDatosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VentaDatosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VentaDatosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
