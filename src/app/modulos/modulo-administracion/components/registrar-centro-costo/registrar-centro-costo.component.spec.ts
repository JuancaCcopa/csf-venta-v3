import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarCentroCostoComponent } from './registrar-centro-costo.component';

describe('RegistrarCentroCostoComponent', () => {
  let component: RegistrarCentroCostoComponent;
  let fixture: ComponentFixture<RegistrarCentroCostoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrarCentroCostoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrarCentroCostoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
