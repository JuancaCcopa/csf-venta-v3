import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelRecuperarClaveComponent } from './panel-recuperar-clave.component';

describe('PanelRecuperarClaveComponent', () => {
  let component: PanelRecuperarClaveComponent;
  let fixture: ComponentFixture<PanelRecuperarClaveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PanelRecuperarClaveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelRecuperarClaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
