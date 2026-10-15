import { JsonPipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import type { Feature } from '@feature-toggles/helpers';

@Component({
  selector: 'ft-feature-list-item',
  imports: [RouterLink, JsonPipe],
  template: `
    <a [routerLink]="['/features', feature()._id]" class="ft-card">
      <h2 class="ft-card-title">{{ feature().key }}</h2>
      @if (feature().description) {
        <p class="ft-card-description">{{ feature().description }}</p>
      }
      <pre class="ft-card-value">{{ feature().value | json }}</pre>
    </a>
  `,
})
export class FeatureListItemComponent {
  readonly feature = input.required<Feature>();
}
