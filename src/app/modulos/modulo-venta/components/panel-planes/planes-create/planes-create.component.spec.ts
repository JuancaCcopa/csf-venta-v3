import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanesCreateComponent } from './planes-create.component';

describe('PlanesCreateComponent', () => {
  let component: PlanesCreateComponent;
  let fixture: ComponentFixture<PlanesCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanesCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanesCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
