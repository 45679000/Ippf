import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WishscopeComponent } from './wishscope.component';

describe('WishscopeComponent', () => {
  let component: WishscopeComponent;
  let fixture: ComponentFixture<WishscopeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WishscopeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WishscopeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
