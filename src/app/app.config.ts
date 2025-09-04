import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { ThemeGateway } from './domain/theme/theme.gateway';
import { ThemeService } from './infrastructure/theme/theme';
import { provideStore } from '@ngrx/store';
import { NotesReducer } from './presentation/states/reducers/notes.reducers';
import { themeReducer } from './presentation/states/reducers/theme.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes), provideClientHydration(withEventReplay()),
    { provide: ThemeGateway, useClass: ThemeService },
    provideStore({notes: NotesReducer, theme: themeReducer})
]
};
