import { ChangeDetectionStrategy, Component } from '@angular/core';

import { ENTER_ANIMATION } from './animations';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [ENTER_ANIMATION],
})
export class AppComponent { }
