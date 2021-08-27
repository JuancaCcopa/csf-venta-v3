import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelValeDeliveryComponent } from './panel-vale-delivery.component';

describe('PanelValeDeliveryComponent', () => {
  let component: PanelValeDeliveryComponent;
  let fixture: ComponentFixture<PanelValeDeliveryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PanelValeDeliveryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelValeDeliveryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
