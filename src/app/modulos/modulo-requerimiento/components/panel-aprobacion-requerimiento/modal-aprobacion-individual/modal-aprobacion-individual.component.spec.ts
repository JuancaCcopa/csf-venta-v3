import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAprobacionIndividualComponent } from './modal-aprobacion-individual.component';

describe('ModalAprobacionIndividualComponent', () => {
  let component: ModalAprobacionIndividualComponent;
  let fixture: ComponentFixture<ModalAprobacionIndividualComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalAprobacionIndividualComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAprobacionIndividualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
