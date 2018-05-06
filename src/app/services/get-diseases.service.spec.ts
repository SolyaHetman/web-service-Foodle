import { TestBed, inject } from '@angular/core/testing';

import { GetDiseasesService } from './get-diseases.service';

describe('GetDiseasesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GetDiseasesService]
    });
  });

  it('should be created', inject([GetDiseasesService], (service: GetDiseasesService) => {
    expect(service).toBeTruthy();
  }));
});
