import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SdpHomeComponent } from './sdp-home.component';

describe('SdpHomeComponent', () => {
  let component: SdpHomeComponent;
  let fixture: ComponentFixture<SdpHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SdpHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SdpHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
