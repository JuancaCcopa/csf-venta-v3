import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAutenticacionComponent } from './modal-autenticacion.component';

describe('ModalAutenticacionComponent', () => {
  let component: ModalAutenticacionComponent;
  let fixture: ComponentFixture<ModalAutenticacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalAutenticacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAutenticacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
