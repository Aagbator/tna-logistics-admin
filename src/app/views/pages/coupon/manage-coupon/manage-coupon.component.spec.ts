import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageCouponComponent } from './manage-coupon.component';

describe('Manage Category Component', () => {
  let component: ManageCouponComponent;
  let fixture: ComponentFixture<ManageCouponComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageCouponComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageCouponComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
