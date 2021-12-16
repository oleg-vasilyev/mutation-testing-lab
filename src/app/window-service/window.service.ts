import { Injectable } from '@angular/core';


@Injectable()
export class WindowService {

  public getWindow(): Window {
    return window;
  }
}
