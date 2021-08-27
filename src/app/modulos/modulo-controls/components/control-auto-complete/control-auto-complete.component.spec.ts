import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlAutoCompleteComponent } from './control-auto-complete.component';

describe('ControlAutoCompleteComponent', () => {
  let component: ControlAutoCompleteComponent;
  let fixture: ComponentFixture<ControlAutoCompleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ControlAutoCompleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlAutoCompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
