import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonaVerComponent } from './persona-ver.component';

describe('PersonaVerComponent', () => {
  let component: PersonaVerComponent;
  let fixture: ComponentFixture<PersonaVerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonaVerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonaVerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
