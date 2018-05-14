import { TestBed, inject } from '@angular/core/testing';

import { GetDiaryService } from './get-diary.service';

describe('GetDiaryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GetDiaryService]
    });
  });

  it('should be created', inject([GetDiaryService], (service: GetDiaryService) => {
    expect(service).toBeTruthy();
  }));
});
