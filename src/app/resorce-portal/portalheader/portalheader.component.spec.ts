import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortalheaderComponent } from './portalheader.component';

describe('PortalheaderComponent', () => {
  let component: PortalheaderComponent;
  let fixture: ComponentFixture<PortalheaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PortalheaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PortalheaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
