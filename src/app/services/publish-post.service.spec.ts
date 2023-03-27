import { TestBed } from '@angular/core/testing';

import { PublishPostService } from './publish-post.service';

describe('PublishPostService', () => {
  let service: PublishPostService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PublishPostService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
