import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarAprobadorTemporalComponent } from './registrar-aprobador-temporal.component';

describe('RegistrarAprobadorTemporalComponent', () => {
  let component: RegistrarAprobadorTemporalComponent;
  let fixture: ComponentFixture<RegistrarAprobadorTemporalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrarAprobadorTemporalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrarAprobadorTemporalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
