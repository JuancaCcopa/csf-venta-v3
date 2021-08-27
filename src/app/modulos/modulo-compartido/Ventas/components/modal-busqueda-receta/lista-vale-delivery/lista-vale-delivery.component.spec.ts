import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaValeDeliveryComponent } from './lista-vale-delivery.component';

describe('ListaValeDeliveryComponent', () => {
  let component: ListaValeDeliveryComponent;
  let fixture: ComponentFixture<ListaValeDeliveryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaValeDeliveryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaValeDeliveryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
