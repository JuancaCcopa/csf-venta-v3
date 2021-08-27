import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalConsultaProductoComponent } from './modal-consulta-producto.component';

describe('ModalConsultaProductoComponent', () => {
  let component: ModalConsultaProductoComponent;
  let fixture: ComponentFixture<ModalConsultaProductoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalConsultaProductoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalConsultaProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
