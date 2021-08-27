import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAprobadorTemporalComponent } from './admin-aprobador-temporal.component';

describe('AdminAprobadorTemporalComponent', () => {
  let component: AdminAprobadorTemporalComponent;
  let fixture: ComponentFixture<AdminAprobadorTemporalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminAprobadorTemporalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAprobadorTemporalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
