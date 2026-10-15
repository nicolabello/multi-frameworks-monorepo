import type { Routes } from '@angular/router';
import { FeatureComponent } from './components/feature';
import { FeaturesComponent } from './components/features';

// https://angular.dev/guide/routing/define-routes
export const routes: Routes = [
  { path: 'features', component: FeaturesComponent },
  { path: 'features/:id', component: FeatureComponent },
  // Wildcard route, must come last: https://angular.dev/guide/routing/define-routes#wildcards
  { path: '**', redirectTo: 'features' },
];
