import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlDropdownComponent } from './control-dropdown.component';

describe('ControlDropdownComponent', () => {
  let component: ControlDropdownComponent;
  let fixture: ComponentFixture<ControlDropdownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ControlDropdownComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
