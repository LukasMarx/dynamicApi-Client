import { TestBed, inject } from '@angular/core/testing';

import { WidgetResolverService } from './widget-resolver.service';

describe('WidgetResolverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WidgetResolverService]
    });
  });

  it('should be created', inject([WidgetResolverService], (service: WidgetResolverService) => {
    expect(service).toBeTruthy();
  }));
});
