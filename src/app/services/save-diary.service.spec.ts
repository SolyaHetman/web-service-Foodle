import { TestBed, inject } from '@angular/core/testing';

import { SaveDiaryService } from './save-diary.service';

describe('SaveDiaryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SaveDiaryService]
    });
  });

  it('should be created', inject([SaveDiaryService], (service: SaveDiaryService) => {
    expect(service).toBeTruthy();
  }));
});
