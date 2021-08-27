import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonaCreateComponent } from './persona-create.component';

describe('PersonaCreateComponent', () => {
  let component: PersonaCreateComponent;
  let fixture: ComponentFixture<PersonaCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonaCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonaCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
