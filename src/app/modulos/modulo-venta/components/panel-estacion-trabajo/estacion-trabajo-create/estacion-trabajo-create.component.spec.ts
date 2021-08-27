import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstacionTrabajoCreateComponent } from './estacion-trabajo-create.component';

describe('EstacionTrabajoCreateComponent', () => {
  let component: EstacionTrabajoCreateComponent;
  let fixture: ComponentFixture<EstacionTrabajoCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstacionTrabajoCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstacionTrabajoCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
