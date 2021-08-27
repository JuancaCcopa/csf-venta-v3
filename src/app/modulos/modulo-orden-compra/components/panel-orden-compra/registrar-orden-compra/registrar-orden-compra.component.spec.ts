import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarOrdenCompraComponent } from './registrar-orden-compra.component';

describe('RegistrarOrdenCompraComponent', () => {
  let component: RegistrarOrdenCompraComponent;
  let fixture: ComponentFixture<RegistrarOrdenCompraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrarOrdenCompraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrarOrdenCompraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
