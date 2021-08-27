import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeriePorComprobanteCreateComponent } from './serie-por-comprobante-create.component';

describe('SeriePorComprobanteCreateComponent', () => {
  let component: SeriePorComprobanteCreateComponent;
  let fixture: ComponentFixture<SeriePorComprobanteCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeriePorComprobanteCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeriePorComprobanteCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
