import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RevisionRequerimientoEconomatoComponent } from './revision-requerimiento-economato.component';

describe('RevisionRequerimientoEconomatoComponent', () => {
  let component: RevisionRequerimientoEconomatoComponent;
  let fixture: ComponentFixture<RevisionRequerimientoEconomatoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RevisionRequerimientoEconomatoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RevisionRequerimientoEconomatoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
