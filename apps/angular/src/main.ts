import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app';
import { appConfig } from './app/app.config';

// Standalone bootstrap, no NgModule needed. Angular apps are zoneless by default since v21: change detection
// is driven by signals and events instead of zone.js. https://angular.dev/guide/zoneless
bootstrapApplication(App, appConfig).catch((err) => console.error(err));
