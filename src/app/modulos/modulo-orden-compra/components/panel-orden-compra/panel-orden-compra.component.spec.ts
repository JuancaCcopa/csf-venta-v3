import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelOrdenCompraComponent } from './panel-orden-compra.component';

describe('PanelOrdenCompraComponent', () => {
  let component: PanelOrdenCompraComponent;
  let fixture: ComponentFixture<PanelOrdenCompraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PanelOrdenCompraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelOrdenCompraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
