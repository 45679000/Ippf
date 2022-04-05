import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourceManageOneComponent } from './resource-manage-one.component';

describe('ResourceManageOneComponent', () => {
  let component: ResourceManageOneComponent;
  let fixture: ComponentFixture<ResourceManageOneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResourceManageOneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResourceManageOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
