import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatedetallepedidosComponent } from './updatedetallepedidos.component';

describe('UpdatedetallepedidosComponent', () => {
  let component: UpdatedetallepedidosComponent;
  let fixture: ComponentFixture<UpdatedetallepedidosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdatedetallepedidosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdatedetallepedidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
