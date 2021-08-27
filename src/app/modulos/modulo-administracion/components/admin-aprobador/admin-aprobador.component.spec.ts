import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAprobadorComponent } from './admin-aprobador.component';

describe('AdminAprobadorComponent', () => {
  let component: AdminAprobadorComponent;
  let fixture: ComponentFixture<AdminAprobadorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminAprobadorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAprobadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
