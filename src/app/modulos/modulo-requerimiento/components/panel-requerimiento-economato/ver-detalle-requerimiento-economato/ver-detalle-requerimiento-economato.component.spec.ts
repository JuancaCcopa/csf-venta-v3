import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerDetalleRequerimientoEconomatoComponent } from './ver-detalle-requerimiento-economato.component';

describe('VerDetalleRequerimientoEconomatoComponent', () => {
  let component: VerDetalleRequerimientoEconomatoComponent;
  let fixture: ComponentFixture<VerDetalleRequerimientoEconomatoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerDetalleRequerimientoEconomatoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerDetalleRequerimientoEconomatoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
