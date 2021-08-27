import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarAprobadorComponent } from './modificar-aprobador.component';

describe('ModificarAprobadorComponent', () => {
  let component: ModificarAprobadorComponent;
  let fixture: ComponentFixture<ModificarAprobadorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModificarAprobadorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificarAprobadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
