import { Component, input } from '@angular/core';
import type { Feature } from '@feature-toggles/helpers';
import { FeatureListItemComponent } from './feature-list-item';

@Component({
  selector: 'ft-features-list',
  imports: [FeatureListItemComponent],
  template: `
    @if (features().length) {
      <ul class="ft-cards-list">
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
  readonly features = input.required<Feature[]>();
}
