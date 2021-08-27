import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalConsultaLoteComponent } from './modal-consulta-lote.component';

describe('ModalConsultaLoteComponent', () => {
  let component: ModalConsultaLoteComponent;
  let fixture: ComponentFixture<ModalConsultaLoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalConsultaLoteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalConsultaLoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
