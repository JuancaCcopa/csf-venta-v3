import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanillaTipoPagoComponent } from './planilla-tipopago.component';

describe('PlanillaTipoPagoComponent', () => {
  let component: PlanillaTipoPagoComponent;
  let fixture: ComponentFixture<PlanillaTipoPagoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanillaTipoPagoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanillaTipoPagoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
