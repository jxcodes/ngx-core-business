import { TestBed } from '@angular/core/testing';

import { NgxKitBusinessService } from './ngx-kit-business.service';

describe('NgxKitBusinessService', () => {
  let service: NgxKitBusinessService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxKitBusinessService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
