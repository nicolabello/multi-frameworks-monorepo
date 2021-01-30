<template>
  <form class="ft-form" novalidate v-on:submit.prevent="submit()">

    <label v-mdc-text-field="{value: form.key, valid: !errors?.key, required: true}"
           class=" mdc-text-field mdc-text-field--filled">
      <span class="mdc-text-field__ripple"></span>
      <input v-model="form.key" aria-controls="key-helper-text-id" aria-describedby="key-helper-text-id"
             aria-labelledby="key-id"
             autofocus class="mdc-text-field__input" type="text">
      <span id="key-id" class="mdc-floating-label">Key</span>
      <span class="mdc-line-ripple"></span>
    </label>
    <div id="key-helper-text-id" aria-hidden="true" class="mdc-text-field-helper-line">
      <div v-if="errors?.key" v-mdc-text-field-helper-text
           class="mdc-text-field-helper-text mdc-text-field-helper-text--validation-msg">
        {{ errors?.key }}
      </div>
      <div v-else v-mdc-text-field-helper-text class="mdc-text-field-helper-text">This will be used as key in the
        response object
      </div>
    </div>

    <label v-mdc-text-field="{value: form.description, valid: !errors?.description}"
           class=" mdc-text-field mdc-text-field--filled">
      <span class="mdc-text-field__ripple"></span>
      <input v-model="form.description" aria-controls="description-helper-text-id"
             aria-describedby="description-helper-text-id" aria-labelledby="description-id"
             class="mdc-text-field__input" type="text">
      <span id="description-id" class="mdc-floating-label">Description</span>
      <span class="mdc-line-ripple"></span>
    </label>
    <div id="description-helper-text-id" aria-hidden="true" class="mdc-text-field-helper-line">
      <div v-mdc-text-field-helper-text
           class="mdc-text-field-helper-text mdc-text-field-helper-text--validation-msg">
        {{ errors?.description }}
      </div>
    </div>

    <div v-mdc-select="{value: form.type, valid: !errors?.type, onChange: setType, required: true}"
         class="mdc-select mdc-select--filled">
      <div class="mdc-select__anchor"
           role="button"
           aria-haspopup="listbox"
           aria-expanded="false"
           aria-labelledby="type-label-id type-selected-text-id">
        <div class="mdc-line-ripple"></div>
        <span class="mdc-floating-label" id="type-label-id">Type</span>
        <span class="mdc-select__selected-text-container">
        <span id="type-selected-text-id" class="mdc-select__selected-text"></span>
      </span>
        <span class="mdc-select__dropdown-icon">
        <span class="mdc-select__dropdown-icon-graphic">
        <span class="mdc-select__dropdown-icon-inactive material-icons">arrow_drop_down</span>
        <span class="mdc-select__dropdown-icon-active material-icons">arrow_drop_up</span>
          </span>
      </span>
      </div>
      <div class="mdc-select__menu mdc-menu mdc-menu-surface" role="listbox">
        <ul class="mdc-list" role="listbox" aria-label="Type">
          <li aria-selected="false" class="mdc-list-item" data-value="boolean" role="option">
            <span class="mdc-list-item__ripple"></span>
            <span class="mdc-list-item__text">Toggle</span>
          </li>
          <li aria-selected="false" class="mdc-list-item" data-value="string" role="option">
            <span class="mdc-list-item__ripple"></span>
            <span class="mdc-list-item__text">String</span>
          </li>
          <li aria-selected="false" class="mdc-list-item" data-value="number" role="option">
            <span class="mdc-list-item__ripple"></span>
            <span class="mdc-list-item__text">Number</span>
          </li>
        </ul>
      </div>
    </div>
    <div id="type-helper-text-id" v-mdc-select-helper-text
         aria-hidden="true" class="mdc-select-helper-text mdc-select-helper-text--validation-msg">
      {{ errors?.type }}
    </div>

    <div v-if="form.type === types.Boolean" class="ft-switch" role="presentation">
      <div v-mdc-switch class="mdc-switch">
        <div class="mdc-switch__track"></div>
        <div class="mdc-switch__thumb-underlay">
          <div class="mdc-switch__thumb"></div>
          <input id="value-boolean-id"
                 v-model="form.value"
                 class="mdc-switch__native-control" role="switch"
                 type="checkbox" v-bind:aria-checked="form.value === true">
        </div>
      </div>
      <label for="value-boolean-id">Off/On</label>
    </div>
    <label v-if="form.type === types.Number" v-mdc-text-field="{value: form.value, valid: !errors?.value}"
           class=" mdc-text-field mdc-text-field--filled">
      <span class="mdc-text-field__ripple"></span>
      <input v-model.number="form.value" aria-controls="value-number-helper-text-id"
             aria-describedby="value-number-helper-text-id" aria-labelledby="value-number-id"
             class="mdc-text-field__input"
             type="number">
      <span id="value-number-id" class="mdc-floating-label">Value</span>
      <span class="mdc-line-ripple"></span>
    </label>
    <div v-if="form.type === types.Number" id="value-number-helper-text-id" aria-hidden="true"
         class="mdc-text-field-helper-line">
      <div v-mdc-text-field-helper-text
           class="mdc-text-field-helper-text mdc-text-field-helper-text--validation-msg">
        {{ errors?.value }}
      </div>
    </div>
    <label v-if="form.type === types.String" v-mdc-text-field="{value: form.value, valid: !errors?.value}"
           class=" mdc-text-field mdc-text-field--filled">
      <span class="mdc-text-field__ripple"></span>
      <input v-model="form.value" aria-controls="value-string-helper-text-id"
             aria-describedby="value-string-helper-text-id" aria-labelledby="value-string-id"
             class="mdc-text-field__input"
             type="text">
      <span id="value-string-id" class="mdc-floating-label">Value</span>
      <span class="mdc-line-ripple"></span>
    </label>
    <div v-if="form.type === types.String" id="value-string-helper-text-id" aria-hidden="true"
         class="mdc-text-field-helper-line">
      <div v-mdc-text-field-helper-text
           class="mdc-text-field-helper-text mdc-text-field-helper-text--validation-msg">
        {{ errors?.value }}
      </div>
    </div>

    <pre class="ft-feature-preview">{{ preview }}</pre>

    <div class="ft-form-controls">

      <div class="mdc-touch-target-wrapper">
        <button v-mdc-button class="mdc-button" type="button" v-on:click="cancel()">
          <span class="mdc-button__ripple"></span>
          Cancel
        </button>
      </div>

      <div class="mdc-touch-target-wrapper">
        <button v-mdc-button class="mdc-button mdc-button--unelevated" type="submit" v-bind:disabled="!isValid">
          <span class="mdc-button__ripple"></span>
          Save
        </button>
      </div>

    </div>

  </form>
</template>

<script lang="ts">
import mdcButton from '@/modules/material-components-web/directives/mdc-button';
import mdcSelect from '@/modules/material-components-web/directives/mdc-select';
import mdcSelectHelperText from '@/modules/material-components-web/directives/mdc-select-helper-text';
import mdcSwitch from '@/modules/material-components-web/directives/mdc-switch';
import mdcTextField from '@/modules/material-components-web/directives/mdc-text-field';
import mdcTextFieldHelperText from '@/modules/material-components-web/directives/mdc-text-field-helper-text';
import {
  castFeatureValue,
  Feature,
  FeatureErrors,
  FeatureValueType,
  normalizeFeature,
  toInputValue,
  validateFeature
} from '@feature-toggles/helpers';
import { Component, computed, reactive, SetupContext, watchEffect } from 'vue';

const component: Component = {
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
        const normalizedValues = normalizeFeature(props.data);
        form.key = normalizedValues.key;
        form.description = normalizedValues.description;
        form.type = normalizedValues.type;
        form.value = normalizedValues.value;
      }
    });

    const getErrors = () => validateFeature({
      key: form.key,
      description: form.description,
      type: form.type,
      value: form.value
    } as Feature);

    const errors = computed<FeatureErrors | null>(getErrors);
    const isValid = computed<boolean>(() => !getErrors());

    const preview = computed<string>(() => JSON.stringify({ [`${form.key}`]: form.value }, null, 2));

    const cancel = () => context.emit('ftCancel');

    const submit = () => context.emit('ftSubmit', {
      ...(props.data || {}),
      key: form.key,
      description: form.description,
      type: form.type,
      value: form.value
    });

    const updateValue = (type: FeatureValueType) => {
      const value = form.value;
      const newValue = castFeatureValue(value, type);
      if (newValue !== value) {
        form.value = newValue;
      }
    };

    const setType = (value: FeatureValueType) => {
      if (form.type !== value) {
        form.type = value;
        updateValue(value);
      }
    };

    return { form, preview, cancel, submit, errors, isValid, setType, types: FeatureValueType, toInputValue };

  },
  directives: { mdcTextField, mdcTextFieldHelperText, mdcButton, mdcSelect, mdcSelectHelperText, mdcSwitch }
};

export default component;
</script>

<style lang="scss" scoped></style>
