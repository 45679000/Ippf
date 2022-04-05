import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortalfooterComponent } from './portalfooter.component';

describe('PortalfooterComponent', () => {
  let component: PortalfooterComponent;
  let fixture: ComponentFixture<PortalfooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PortalfooterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PortalfooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
