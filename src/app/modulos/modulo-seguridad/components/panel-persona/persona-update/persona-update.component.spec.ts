import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonaUpdateComponent } from './persona-update.component';

describe('PersonaUpdateComponent', () => {
  let component: PersonaUpdateComponent;
  let fixture: ComponentFixture<PersonaUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonaUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonaUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
