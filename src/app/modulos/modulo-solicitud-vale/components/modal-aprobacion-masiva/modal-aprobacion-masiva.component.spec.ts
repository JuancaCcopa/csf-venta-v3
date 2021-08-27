import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAprobacionMasivaComponent } from './modal-aprobacion-masiva.component';

describe('ModalAprobacionMasivaComponent', () => {
  let component: ModalAprobacionMasivaComponent;
  let fixture: ComponentFixture<ModalAprobacionMasivaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalAprobacionMasivaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAprobacionMasivaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
