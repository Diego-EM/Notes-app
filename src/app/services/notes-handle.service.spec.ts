import { TestBed } from '@angular/core/testing';

import { NotesHandleService } from './notes-handle.service';

describe('NotesHandleService', () => {
  let service: NotesHandleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotesHandleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
