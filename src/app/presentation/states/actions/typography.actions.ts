import { createActionGroup, props } from '@ngrx/store';
import { TypographyName } from '../../../domain/models/typography';

export const TypographyActions = createActionGroup({
  source: 'Typography',
  events: {
    'Set Typography': props<{ typography: TypographyName }>()
  }
});