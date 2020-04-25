<template>
    <form class="ft-form" novalidate v-on:submit.prevent="submit()">

        <label class="mdc-text-field" v-mdc-text-field>
            <span class="mdc-text-field__ripple"></span>
            <input aria-controls="key-helper-text-id" aria-describedby="key-helper-text-id" aria-labelledby="key-id"
                   autofocus
                   class="mdc-text-field__input" type="text" v-model="form.key">
            <span class="mdc-floating-label" id="key-id">Key</span>
            <span class="mdc-line-ripple"></span>
        </label>
        <div aria-hidden="true" class="mdc-text-field-helper-line" id="key-helper-text-id">
            <div class="mdc-text-field-helper-text mdc-text-field-helper-text--validation-msg" v-if="false"
                 v-mdc-text-field-helper-text>
                <!--<ft-validation-message [errors]="form.get('key').errors"></ft-validation-message>-->
            </div>
            <div class="mdc-text-field-helper-text" v-else v-mdc-text-field-helper-text>This will be used as key in the
                response object
            </div>
        </div>

        <label class="mdc-text-field" v-mdc-text-field>
            <span class="mdc-text-field__ripple"></span>
            <input aria-controls="description-helper-text-id" aria-describedby="description-helper-text-id"
                   aria-labelledby="description-id" class="mdc-text-field__input"
                   type="text" v-model="form.description">
            <span class="mdc-floating-label" id="description-id">Description</span>
            <span class="mdc-line-ripple"></span>
        </label>
        <div aria-hidden="true" class="mdc-text-field-helper-line" id="description-helper-text-id">
            <div class="mdc-text-field-helper-text mdc-text-field-helper-text--validation-msg"
                 v-mdc-text-field-helper-text>
                <!--<ft-validation-message [errors]="form.get('key').errors"></ft-validation-message>-->
            </div>
        </div>

        <!--<div [mdcSelect]="form.get('type')" [required]="true" class="mdc-select">
            <div class="mdc-select__anchor">
                <span class="mdc-select__dropdown-icon"></span>
                <div aria-controls="type-helper-text-id" aria-describedby="type-helper-text-id"
                     aria-haspopup="listbox" aria-labelledby="type-label-id type-selected-text-id"
                     class="mdc-select__selected-text" id="type-selected-text-id"
                     role="button"></div>
                <span class="mdc-floating-label" id="type-label-id">Type</span>
                <div class="mdc-line-ripple"></div>
            </div>
            <div class="mdc-select__menu mdc-menu mdc-menu-surface" role="listbox">
                <ul class="mdc-list">
                    <li aria-selected="false" class="mdc-list-item" data-value="boolean" role="option">Toggle</li>
                    <li aria-selected="false" class="mdc-list-item" data-value="string" role="option">String</li>
                    <li aria-selected="false" class="mdc-list-item" data-value="number" role="option">Number</li>
                </ul>
            </div>
        </div>
        <div aria-hidden="true" class="mdc-select-helper-text mdc-select-helper-text&#45;&#45;validation-msg"
             id="type-helper-text-id"
             mdcSelectHelperText>
            <ft-validation-message [errors]="form.get('type').errors"></ft-validation-message>
        </div>-->

        <!--<ng-container [ngSwitch]="form.get('type').value">
            <ng-container *ngSwitchCase="types.Boolean">
                <div class="ft-switch" role="presentation">
                    <div class="mdc-switch" mdcSwitch>
                        <div class="mdc-switch__track"></div>
                        <div class="mdc-switch__thumb-underlay">
                            <div class="mdc-switch__thumb"></div>
                            <input [attr.aria-checked]="form.get('value').value === true"
                                   class="mdc-switch__native-control"
                                   formControlName="value" id="value-boolean-id"
                                   role="switch" type="checkbox">
                        </div>
                    </div>
                    <label for="value-boolean-id">Off/On</label>
                </div>
            </ng-container>
            <ng-container *ngSwitchCase="types.Number">
                <label [mdcTextField]="form.get('value')" [required]="true" class="mdc-text-field">
                    <span class="mdc-text-field__ripple"></span>
                    <input aria-controls="value-number-helper-text-id" aria-describedby="value-number-helper-text-id"
                           aria-labelledby="value-number-id" class="mdc-text-field__input" formControlName="value"
                           type="number">
                    <span class="mdc-floating-label" id="value-number-id">Value</span>
                    <span class="mdc-line-ripple"></span>
                </label>
                <div aria-hidden="true" class="mdc-text-field-helper-line" id="value-number-helper-text-id">
                    <div class="mdc-text-field-helper-text mdc-text-field-helper-text&#45;&#45;validation-msg"
                         mdcTextFieldHelperText>
                        <ft-validation-message [errors]="form.get('value').errors"></ft-validation-message>
                    </div>
                </div>
            </ng-container>
            <ng-container *ngSwitchCase="types.String">
                <label [mdcTextField]="form.get('value')" [required]="true" class="mdc-text-field">
                    <span class="mdc-text-field__ripple"></span>
                    <input aria-controls="value-string-helper-text-id" aria-describedby="value-string-helper-text-id"
                           aria-labelledby="value-string-id" class="mdc-text-field__input" formControlName="value"
                           type="text">
                    <span class="mdc-floating-label" id="value-string-id">Value</span>
                    <span class="mdc-line-ripple"></span>
                </label>
                <div aria-hidden="true" class="mdc-text-field-helper-line" id="value-string-helper-text-id">
                    <div class="mdc-text-field-helper-text mdc-text-field-helper-text&#45;&#45;validation-msg"
                         mdcTextFieldHelperText>
                        <ft-validation-message [errors]="form.get('value').errors"></ft-validation-message>
                    </div>
                </div>
            </ng-container>
        </ng-container>-->

        <pre class="ft-feature-preview">{{preview}}</pre>

        <div class="ft-form-controls">

            <div class="mdc-touch-target-wrapper">
                <button class="mdc-button" type="button" v-on:click="cancel()">
                    <span class="mdc-button__ripple"></span>
                    Cancel
                </button>
            </div>

            <div class="mdc-touch-target-wrapper">
                <button class="mdc-button mdc-button--unelevated" type="submit">
                    <span class="mdc-button__ripple"></span>
                    Save
                </button>
            </div>

        </div>

    </form>
</template>

<script lang="ts">
  import mdcTextField from '@/modules/material-components-web/directives/mdc-text-field';
  import mdcTextFieldHelperText from '@/modules/material-components-web/directives/mdc-text-field-helper-text';
  import { computed, reactive, SetupContext, watchEffect } from '@vue/composition-api';
  import Vue, { ComponentOptions } from 'vue';
  import { Feature } from '~express/models/feature';

  const componentOptions: ComponentOptions<Vue> = {
    props: {
      data: { type: Object, default: () => ({}) },
    },
    setup(props: { data?: Feature }, context: SetupContext) {

      const form = reactive<Partial<Feature>>({
        key: '',
        description: '',
        type: null,
        value: null
      });

      let data: Feature | undefined;

      watchEffect(() => {
        if (props.data !== data) {
          data = props.data;
          form.key = props.data?.key || '';
          form.description = props.data?.description || '';
          form.type = props.data?.type || null;
          form.value = props.data?.value || null;
        }
      });

      const preview = computed(() => JSON.stringify({ [`${form.key}`]: form.value }, null, 2));

      const cancel = () => context.emit('ftCancel');

      const submit = () => context.emit('ftSubmit', {
        ...(props.data || {}),
        key: form.key,
        description: form.description,
        type: form.type,
        value: form.value
      });

      return { form, preview, cancel, submit };

    },
    directives: { mdcTextField, mdcTextFieldHelperText }
  };

  export default componentOptions;
</script>

<style lang="scss" scoped></style>
