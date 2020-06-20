import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageBankPaymentsComponent } from './manage-bank-payments.component';

describe('ManageSectionComponent', () => {
  let component: ManageBankPaymentsComponent;
  let fixture: ComponentFixture<ManageBankPaymentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageBankPaymentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageBankPaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

