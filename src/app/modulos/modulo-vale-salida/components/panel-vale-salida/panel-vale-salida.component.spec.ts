import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelValeSalidaComponent } from './panel-vale-salida.component';
//PanelOrdenCompraComponent
describe('PanelValeSalidaComponent', () => {
  let component: PanelValeSalidaComponent;
  let fixture: ComponentFixture<PanelValeSalidaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PanelValeSalidaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelValeSalidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
