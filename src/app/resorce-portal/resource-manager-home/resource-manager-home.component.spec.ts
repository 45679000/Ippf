import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourceManagerHomeComponent } from './resource-manager-home.component';

describe('ResourceManagerHomeComponent', () => {
  let component: ResourceManagerHomeComponent;
  let fixture: ComponentFixture<ResourceManagerHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResourceManagerHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResourceManagerHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
