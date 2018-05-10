import { TestBed, inject } from '@angular/core/testing';

import { GetRecipesService } from './get-recipes.service';

describe('GetRecipesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GetRecipesService]
    });
  });

  it('should be created', inject([GetRecipesService], (service: GetRecipesService) => {
    expect(service).toBeTruthy();
  }));
});
