import { createReducer, on } from '@ngrx/store';
import { toggleTheme } from '../actions/theme.actions';

const prefersDark =
  typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches;

const initialState: 'dark' | 'light' = prefersDark ? 'dark' : 'light';


export const themeReducer = createReducer(
  initialState,
  on(toggleTheme, (state) => (state === 'dark' ? 'light' : 'dark'))
);
