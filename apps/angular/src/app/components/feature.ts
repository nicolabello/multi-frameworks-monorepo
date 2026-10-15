import { httpResource } from '@angular/common/http';
import { Component, computed, inject, input } from '@angular/core';
import { Router } from '@angular/router';
import type { Feature } from '@feature-toggles/helpers';
import { FeatureService, featureUrl } from '../feature.service';
import { FeatureFormComponent } from './feature-form';
import { ArrowBackIcon } from './icons';

@Component({
  selector: 'ft-feature',
  imports: [FeatureFormComponent, ArrowBackIcon],
  template: `
    <header class="ft-app-bar">
      <button type="button" class="ft-icon-button" aria-label="Back" (click)="showList()">
        <ft-arrow-back-icon />
      </button>
      <h1 class="ft-app-bar-title">{{ addingNew() ? 'Add feature' : 'Edit feature' }}</h1>
    </header>

    <main class="ft-main">
      @if (addingNew() || feature.hasValue()) {
        @let current = addingNew() ? null : feature.value()!;
        <ft-feature-form [feature]="current" (cancelled)="showList()" (saved)="save($event)" />
      }
    </main>
  `,
})
export class FeatureComponent {
  /** Bound from the `:id` route param */
  readonly id = input.required<string>();

  protected readonly addingNew = computed(() => this.id() === 'new');
  protected readonly feature = httpResource<Feature>(() =>
    this.addingNew() ? undefined : featureUrl(this.id()),
  );

  private readonly router = inject(Router);
  private readonly featureService = inject(FeatureService);

  protected showList() {
    return this.router.navigate(['/features']);
  }

  protected async save(feature: Feature) {
    await (this.addingNew() ? this.featureService.add(feature) : this.featureService.update(feature));
    await this.showList();
  }
}
