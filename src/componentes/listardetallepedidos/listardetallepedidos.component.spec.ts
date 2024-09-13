import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListardetallepedidosComponent } from './listardetallepedidos.component';

describe('ListardetallepedidosComponent', () => {
  let component: ListardetallepedidosComponent;
  let fixture: ComponentFixture<ListardetallepedidosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListardetallepedidosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListardetallepedidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
