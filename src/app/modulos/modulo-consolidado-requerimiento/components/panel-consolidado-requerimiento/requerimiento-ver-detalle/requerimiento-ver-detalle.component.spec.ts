import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequerimientoVerDetalleComponent } from './requerimiento-ver-detalle.component';

describe('RequerimientoVerDetalleComponent', () => {
  let component: RequerimientoVerDetalleComponent;
  let fixture: ComponentFixture<RequerimientoVerDetalleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequerimientoVerDetalleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequerimientoVerDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
