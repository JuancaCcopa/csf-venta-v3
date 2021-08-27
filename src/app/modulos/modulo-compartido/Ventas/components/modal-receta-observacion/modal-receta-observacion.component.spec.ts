import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalRecetaObservacionComponent } from './modal-receta-observacion.component';

describe('ModalRecetaObservacionComponent', () => {
  let component: ModalRecetaObservacionComponent;
  let fixture: ComponentFixture<ModalRecetaObservacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalRecetaObservacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalRecetaObservacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
