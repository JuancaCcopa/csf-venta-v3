import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CentroCostoAprobadorComponent } from './centro-costo-aprobador.component';

describe('CentroCostoAprobadorComponent', () => {
  let component: CentroCostoAprobadorComponent;
  let fixture: ComponentFixture<CentroCostoAprobadorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CentroCostoAprobadorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CentroCostoAprobadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
