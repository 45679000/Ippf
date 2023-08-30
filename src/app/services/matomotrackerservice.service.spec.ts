import { TestBed } from '@angular/core/testing';

import { MatomotrackerserviceService } from './matomotrackerservice.service';

describe('MatomotrackerserviceService', () => {
  let service: MatomotrackerserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MatomotrackerserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
