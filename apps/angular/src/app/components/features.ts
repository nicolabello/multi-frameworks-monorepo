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
      <!-- Built-in control flow (@if, @for, @switch) replaces *ngIf/*ngFor: https://angular.dev/guide/templates/control-flow -->
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
  // `httpResource` performs a GET and exposes the result as signals (`value()`, `isLoading()`, `error()`…).
  // https://angular.dev/guide/http/http-resource
  protected readonly features = httpResource<Feature[]>(() => featuresUrl);
}
