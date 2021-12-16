import { trigger, transition, style, animate } from '@angular/animations';


export const ENTER_ANIMATION = [
  trigger(
    'enterAnimation',
    [
      transition(
        ':enter',
        [
          style({
            opacity: 0,
          }),
          animate('.5s ease-in'),
        ],
      ),

    ],
  ),
];
