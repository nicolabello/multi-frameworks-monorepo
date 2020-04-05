import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeatureComponent } from './components/feature/feature.component';
import { FeaturesComponent } from './components/features/features.component';


const routes: Routes = [
  {
    path: 'features',
    component: FeaturesComponent
  },
  {
    path: 'features/:id',
    component: FeatureComponent
  },
  {
    path: '**',
    redirectTo: '/features',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
