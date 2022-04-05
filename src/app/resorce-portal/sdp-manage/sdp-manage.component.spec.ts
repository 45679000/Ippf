import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SdpManageComponent } from './sdp-manage.component';

describe('SdpManageComponent', () => {
  let component: SdpManageComponent;
  let fixture: ComponentFixture<SdpManageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SdpManageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SdpManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
