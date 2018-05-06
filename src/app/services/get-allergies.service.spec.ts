import { TestBed, inject } from '@angular/core/testing';

import { GetAllergiesService } from './get-allergies.service';

describe('GetAllergiesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GetAllergiesService]
    });
  });

  it('should be created', inject([GetAllergiesService], (service: GetAllergiesService) => {
    expect(service).toBeTruthy();
  }));
});
