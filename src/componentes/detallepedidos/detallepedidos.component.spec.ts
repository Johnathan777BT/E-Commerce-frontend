import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallepedidosComponent } from './detallepedidos.component';

describe('DetallepedidosComponent', () => {
  let component: DetallepedidosComponent;
  let fixture: ComponentFixture<DetallepedidosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetallepedidosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetallepedidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
