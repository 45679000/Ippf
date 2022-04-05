import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResorcePortalComponent } from './resorce-portal.component';

describe('ResorcePortalComponent', () => {
  let component: ResorcePortalComponent;
  let fixture: ComponentFixture<ResorcePortalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResorcePortalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResorcePortalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
