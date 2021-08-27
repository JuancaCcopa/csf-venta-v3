import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAprobacionRequerimientoMasivaComponent } from './modal-aprobacion-requerimiento-masiva.component';

describe('ModalAprobacionRequerimientoMasivaComponent', () => {
  let component: ModalAprobacionRequerimientoMasivaComponent;
  let fixture: ComponentFixture<ModalAprobacionRequerimientoMasivaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalAprobacionRequerimientoMasivaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAprobacionRequerimientoMasivaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
