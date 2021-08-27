import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarRecetaObservacionComponent } from './registrar-receta-observacion.component';

describe('RegistrarRecetaObservacionComponent', () => {
  let component: RegistrarRecetaObservacionComponent;
  let fixture: ComponentFixture<RegistrarRecetaObservacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrarRecetaObservacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrarRecetaObservacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
