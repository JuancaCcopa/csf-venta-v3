import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardGerencialComponent } from './dashboard-gerencial.component';

describe('DashboardGerencialComponent', () => {
  let component: DashboardGerencialComponent;
  let fixture: ComponentFixture<DashboardGerencialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardGerencialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardGerencialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
