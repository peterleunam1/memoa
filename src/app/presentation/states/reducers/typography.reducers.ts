import { createReducer, on } from '@ngrx/store';
import { TypographyActions } from '../actions/typography.actions';
import { TypographyName } from '../../../domain/models/typography';
import { loadFromStorage, saveToStorage } from '../../helpers/local-storage';

const STORAGE_KEY = 'memora-typography';

const defaultState: TypographyName = {
  name: 'Epilogue'
};

export const initialState: TypographyName = loadFromStorage<TypographyName>(STORAGE_KEY, defaultState);

export const typographyReducer = createReducer(
  initialState,
  on(TypographyActions.setTypography, (state, { typography }) => {
    saveToStorage(STORAGE_KEY, typography);
    return typography;
  })
);
