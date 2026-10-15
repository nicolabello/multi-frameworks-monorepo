import { provideHttpClient } from '@angular/common/http';
import { type ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    // HttpClient, which uses the browser's fetch API by default (the old `withFetch()` option is deprecated):
    // https://angular.dev/guide/http/setup
    provideHttpClient(),
    // Route params (e.g. `:id`) are bound straight to component inputs:
    // https://angular.dev/guide/routing/common-router-tasks#getting-route-information
    provideRouter(routes, withComponentInputBinding()),
  ],
};
