import type { Routes } from '@angular/router';
import { FeatureComponent } from './components/feature';
import { FeaturesComponent } from './components/features';

export const routes: Routes = [
  { path: 'features', component: FeaturesComponent },
  { path: 'features/:id', component: FeatureComponent },
  { path: '**', redirectTo: 'features' },
];
