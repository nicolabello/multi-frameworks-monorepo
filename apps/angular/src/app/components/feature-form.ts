import { Component, input, linkedSignal, output } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { form, FormField, validateTree } from '@angular/forms/signals';
import {
  castFeatureValue,
  type Feature,
  featurePreview,
  FeatureValueType,
  isFeatureValueType,
  normalizeFeature,
  toInputValue,
  validateFeature,
} from '@feature-toggles/helpers';

@Component({
  selector: 'ft-feature-form',
  imports: [FormField, NgTemplateOutlet],
  template: `
    <form class="ft-form" novalidate (submit)="submit($event)">
      <!-- [formField] binds an input to a Signal Forms field (value, touched state, errors…):
           https://angular.dev/guide/forms/signals/overview -->
      <div class="ft-field">
        <label for="key" class="ft-label">Key</label>
        <input
          id="key"
          type="text"
          class="ft-input"
          autofocus
          aria-describedby="key-helper"
          [formField]="featureForm.key"
          [attr.aria-invalid]="!!error('key')"
        />
        <p id="key-helper" [class]="error('key') ? 'ft-error' : 'ft-helper'">
          {{ error('key') ?? 'This will be used as key in the response object' }}
        </p>
      </div>

      <div class="ft-field">
        <label for="description" class="ft-label">Description</label>
        <input id="description" type="text" class="ft-input" [formField]="featureForm.description" />
      </div>

      <div class="ft-field">
        <label for="type" class="ft-label">Type</label>
        <!-- The select and the value inputs are wired by hand rather than with [formField], because changing
             the type must also convert the value (see setType/setValue). [selected] goes on the options because
             a [value] on the <select> would be applied before its options exist. -->
        <select
          id="type"
          class="ft-input"
          required
          aria-describedby="type-helper"
          [attr.aria-invalid]="!!error('type')"
          (change)="setType($any($event.target).value)"
          (blur)="featureForm.type().markAsTouched()"
        >
          <option value="" disabled [selected]="!model().type">Select a type…</option>
          <option [value]="types.Boolean" [selected]="model().type === types.Boolean">Toggle</option>
          <option [value]="types.String" [selected]="model().type === types.String">String</option>
          <option [value]="types.Number" [selected]="model().type === types.Number">Number</option>
        </select>
        @if (error('type'); as message) {
          <p id="type-helper" class="ft-error">{{ message }}</p>
        }
      </div>

      @switch (model().type) {
        @case (types.Boolean) {
          <label class="ft-switch">
            <input
              type="checkbox"
              role="switch"
              class="peer sr-only"
              [checked]="model().value === true"
              (change)="setValue($any($event.target).checked)"
            />
            <span class="ft-switch-track"></span>
            Off/On
          </label>
        }
        @case (types.Number) {
          <ng-container [ngTemplateOutlet]="valueField" [ngTemplateOutletContext]="{ type: 'number' }" />
        }
        @case (types.String) {
          <ng-container [ngTemplateOutlet]="valueField" [ngTemplateOutletContext]="{ type: 'text' }" />
        }
      }

      <!-- A reusable chunk of template, rendered by ngTemplateOutlet above with a different input type:
           https://angular.dev/guide/templates/ng-template -->
      <ng-template #valueField let-type="type">
        <div class="ft-field">
          <label for="value" class="ft-label">Value</label>
          <input
            id="value"
            class="ft-input"
            aria-describedby="value-helper"
            [type]="type"
            [value]="toInputValue(model().value)"
            [attr.aria-invalid]="!!error('value')"
            (input)="setValue($any($event.target).value)"
            (blur)="featureForm.value().markAsTouched()"
          />
          @if (error('value'); as message) {
            <p id="value-helper" class="ft-error">{{ message }}</p>
          }
        </div>
      </ng-template>

      <pre class="ft-preview">{{ preview(model()) }}</pre>

      <div class="ft-form-controls">
        <button type="button" class="ft-btn" (click)="cancelled.emit()">Cancel</button>
        <button type="submit" class="ft-btn ft-btn-primary" [disabled]="featureForm().invalid()">Save</button>
      </div>
    </form>
  `,
})
export class FeatureFormComponent {
  // Signal-based inputs and outputs: https://angular.dev/guide/components/inputs https://angular.dev/guide/components/outputs
  readonly feature = input<Feature | null>(null);
  readonly cancelled = output();
  readonly saved = output<Feature>();

  protected readonly types = FeatureValueType;
  protected readonly toInputValue = toInputValue;
  protected readonly preview = featurePreview;

  /**
   * Form model: a writable signal that resets whenever the `feature` input changes.
   * https://angular.dev/guide/signals/linked-signal
   */
  protected readonly model = linkedSignal(() => normalizeFeature(this.feature()));

  /**
   * Signal Form built on the model. Instead of per-field validators, `validateTree` runs the shared
   * `validateFeature` once and assigns each message to its field (`fieldTree`).
   * https://angular.dev/guide/forms/signals/validation
   */
  protected readonly featureForm = form(this.model, (path) => {
    validateTree(path, ({ value, fieldTree }) =>
      Object.entries(validateFeature(value()) ?? {}).map(([field, message]) => ({
        kind: 'feature',
        message,
        fieldTree: fieldTree[field as 'key' | 'type' | 'value'],
      })),
    );
  });

  protected error(field: 'key' | 'type' | 'value'): string | undefined {
    const state = this.featureForm[field]();
    return state.touched() ? state.errors()[0]?.message : undefined;
  }

  protected setType(type: string) {
    const newType = isFeatureValueType(type) ? type : null;
    this.model.update((model) => ({
      ...model,
      type: newType,
      value: castFeatureValue(model.value, newType),
    }));
  }

  protected setValue(value: string | boolean) {
    this.model.update((model) => ({
      ...model,
      value: model.type === FeatureValueType.String ? value : castFeatureValue(value, model.type),
    }));
    this.featureForm.value().markAsTouched();
  }

  protected submit(event: Event) {
    event.preventDefault();
    if (this.featureForm().valid()) {
      this.saved.emit(this.model());
    }
  }
}
