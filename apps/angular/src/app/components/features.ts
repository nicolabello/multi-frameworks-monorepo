import { httpResource } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import type { Feature } from '@feature-toggles/helpers';
import { featuresUrl } from '../feature.service';
import { FeaturesListComponent } from './features-list';
import { AddIcon } from './icons';

@Component({
  selector: 'ft-features',
  imports: [RouterLink, FeaturesListComponent, AddIcon],
  template: `
    <header class="ft-app-bar">
      <h1 class="ft-app-bar-title">Feature toggles</h1>
    </header>

    <main class="ft-main">
      @if (features.hasValue()) {
        <ft-features-list [features]="features.value()" />
      }
    </main>

    <a routerLink="/features/new" class="ft-fab" aria-label="Add feature">
      <ft-add-icon />
    </a>
  `,
})
export class FeaturesComponent {
  protected readonly features = httpResource<Feature[]>(() => featuresUrl);
}
