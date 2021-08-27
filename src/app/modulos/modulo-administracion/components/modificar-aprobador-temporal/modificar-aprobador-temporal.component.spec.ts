import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarAprobadorTemporalComponent } from './modificar-aprobador-temporal.component';

describe('ModificarAprobadorTemporalComponent', () => {
  let component: ModificarAprobadorTemporalComponent;
  let fixture: ComponentFixture<ModificarAprobadorTemporalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModificarAprobadorTemporalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificarAprobadorTemporalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
