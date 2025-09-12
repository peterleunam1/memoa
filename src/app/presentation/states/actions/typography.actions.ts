import { TypographyName } from '@domain';
import { createActionGroup, props } from '@ngrx/store';

export const TypographyActions = createActionGroup({
  source: 'Typography',
  events: {
    'Set Typography': props<{ typography: TypographyName }>()
  }
});