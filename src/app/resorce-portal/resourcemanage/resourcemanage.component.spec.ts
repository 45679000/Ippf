import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourcemanageComponent } from './resourcemanage.component';

describe('ResourcemanageComponent', () => {
  let component: ResourcemanageComponent;
  let fixture: ComponentFixture<ResourcemanageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResourcemanageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResourcemanageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
