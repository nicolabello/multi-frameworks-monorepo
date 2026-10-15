import { Component, input } from '@angular/core';
import type { Feature } from '@feature-toggles/helpers';
import { FeatureListItemComponent } from './feature-list-item';

@Component({
  selector: 'ft-features-list',
  imports: [FeatureListItemComponent],
  template: `
    @if (features().length) {
      <ul class="ft-cards-list">
        <!-- track tells Angular how to identify items between renders: https://angular.dev/guide/templates/control-flow#why-is-track-in-for-blocks-important -->
        @for (feature of features(); track feature._id) {
          <li><ft-feature-list-item [feature]="feature" /></li>
        }
      </ul>
    } @else {
      <p class="ft-empty">No features yet.</p>
    }
  `,
})
export class FeaturesListComponent {
  // Signal inputs: https://angular.dev/guide/components/inputs
  readonly features = input.required<Feature[]>();
}
