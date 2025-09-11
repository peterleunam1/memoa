import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { ThemeGateway } from './domain/theme/theme.gateway';
import { ThemeService } from './infrastructure/theme/theme';
import { provideStore } from '@ngrx/store';
import { NotesReducer } from './presentation/states/reducers/notes.reducers';
import { typographyReducer } from './presentation/states/reducers/typography.reducers';

import { provideHttpClient } from '@angular/common/http';
import { provideTranslateService } from '@ngx-translate/core';
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';
import { SendEmailGateway } from './domain/send-email/send-email.gateway';
import { SendEmailService } from './infrastructure/email/email';
export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    { provide: ThemeGateway, useClass: ThemeService },
    { provide: SendEmailGateway, useClass: SendEmailService },
    provideStore({ notes: NotesReducer, typography: typographyReducer }),
    provideHttpClient(),
    provideTranslateService({
      lang: 'en',
      fallbackLang: 'en',
      loader: provideTranslateHttpLoader({
        prefix: '/i18n/',
        suffix: '.json'
      })
    })
  ]
};
