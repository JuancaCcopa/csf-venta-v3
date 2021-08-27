import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstacionTrabajoUpdateComponent } from './estacion-trabajo-update.component';

describe('EstacionTrabajoUpdateComponent', () => {
  let component: EstacionTrabajoUpdateComponent;
  let fixture: ComponentFixture<EstacionTrabajoUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstacionTrabajoUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstacionTrabajoUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
