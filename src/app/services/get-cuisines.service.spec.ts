import { TestBed, inject } from '@angular/core/testing';

import { GetCuisinesService } from './get-cuisines.service';

describe('GetCuisinesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GetCuisinesService]
    });
  });

  it('should be created', inject([GetCuisinesService], (service: GetCuisinesService) => {
    expect(service).toBeTruthy();
  }));
});
