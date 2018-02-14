/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AssetServiceService } from './assetService.service';

describe('Service: AssetService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AssetServiceService]
    });
  });

  it('should ...', inject([AssetServiceService], (service: AssetServiceService) => {
    expect(service).toBeTruthy();
  }));
});