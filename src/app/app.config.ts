import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(), // global handling of certain browser errors
    provideRouter(routes), // Enables router with my routes
    provideHttpClient() // Enables Angular to know to create/provide the dependency HttpClient
  ]
};
