import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarAprobadorComponent } from './registrar-aprobador.component';

describe('RegistrarAprobadorComponent', () => {
  let component: RegistrarAprobadorComponent;
  let fixture: ComponentFixture<RegistrarAprobadorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrarAprobadorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrarAprobadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
