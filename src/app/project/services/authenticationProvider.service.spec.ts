/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AuthenticationProviderService } from './authenticationProvider.service';

describe('Service: AuthenticationProvider', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthenticationProviderService]
    });
  });

  it('should ...', inject([AuthenticationProviderService], (service: AuthenticationProviderService) => {
    expect(service).toBeTruthy();
  }));
});