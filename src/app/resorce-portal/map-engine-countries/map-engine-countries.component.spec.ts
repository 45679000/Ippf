import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapEngineCountriesComponent } from './map-engine-countries.component';

describe('MapEngineCountriesComponent', () => {
  let component: MapEngineCountriesComponent;
  let fixture: ComponentFixture<MapEngineCountriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MapEngineCountriesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MapEngineCountriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
