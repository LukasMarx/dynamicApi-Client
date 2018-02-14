/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { KeyService } from './key.service';

describe('Service: Key', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [KeyService]
    });
  });

  it('should ...', inject([KeyService], (service: KeyService) => {
    expect(service).toBeTruthy();
  }));
});