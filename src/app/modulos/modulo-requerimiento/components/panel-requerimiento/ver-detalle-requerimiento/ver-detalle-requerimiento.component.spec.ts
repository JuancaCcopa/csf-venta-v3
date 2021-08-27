import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerDetalleRequerimientoComponent } from './ver-detalle-requerimiento.component';

describe('VerDetalleRequerimientoComponent', () => {
  let component: VerDetalleRequerimientoComponent;
  let fixture: ComponentFixture<VerDetalleRequerimientoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerDetalleRequerimientoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerDetalleRequerimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
