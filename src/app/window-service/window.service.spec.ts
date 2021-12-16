import { TestBed } from '@angular/core/testing';

import { WindowService } from './window.service';


describe('WindowService', () => {

  let service: WindowService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        WindowService,
      ],
    });

    service = TestBed.inject(WindowService);
  });

  describe('getWindow()', () => {

    it('should return a browser window', () => {
      const result = service.getWindow();

      expect(result).toBe(window);
    });
  });
});
