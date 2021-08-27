import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalVisorPdfComponent } from './modal-visor-pdf.component';

describe('ModalVisorPdfComponent', () => {
  let component: ModalVisorPdfComponent;
  let fixture: ComponentFixture<ModalVisorPdfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalVisorPdfComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalVisorPdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
