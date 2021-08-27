import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarCentroCostoComponent } from './modificar-centro-costo.component';

describe('ModificarCentroCostoComponent', () => {
  let component: ModificarCentroCostoComponent;
  let fixture: ComponentFixture<ModificarCentroCostoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModificarCentroCostoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificarCentroCostoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
