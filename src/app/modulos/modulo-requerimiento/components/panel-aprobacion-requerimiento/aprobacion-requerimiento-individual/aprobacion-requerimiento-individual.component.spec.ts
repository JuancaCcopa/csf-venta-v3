import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AprobacionRequerimientoIndividualComponent } from './aprobacion-requerimiento-individual.component';

describe('AprobacionRequerimientoIndividualComponent', () => {
  let component: AprobacionRequerimientoIndividualComponent;
  let fixture: ComponentFixture<AprobacionRequerimientoIndividualComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AprobacionRequerimientoIndividualComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AprobacionRequerimientoIndividualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
