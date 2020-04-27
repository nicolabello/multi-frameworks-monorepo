<template>
    <form class="ft-form" novalidate v-on:submit.prevent="submit()">

        <label class="mdc-text-field" v-mdc-text-field="{value: form.key, valid: !errors.key, required: true}">
            <span class="mdc-text-field__ripple"></span>
            <input aria-controls="key-helper-text-id" aria-describedby="key-helper-text-id" aria-labelledby="key-id"
                   autofocus
                   class="mdc-text-field__input" type="text" v-model="form.key">
            <span class="mdc-floating-label" id="key-id">Key</span>
            <span class="mdc-line-ripple"></span>
        </label>
        <div aria-hidden="true" class="mdc-text-field-helper-line" id="key-helper-text-id">
            <div class="mdc-text-field-helper-text mdc-text-field-helper-text--validation-msg" v-if="errors.key"
                 v-mdc-text-field-helper-text>
                {{errors.key}}
            </div>
            <div class="mdc-text-field-helper-text" v-else v-mdc-text-field-helper-text>This will be used as key in the
                response object
            </div>
        </div>

        <label class="mdc-text-field" v-mdc-text-field="{value: form.description, valid: !errors.description}">
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
                {{errors.description}}
            </div>
        </div>

        <div class="mdc-select" v-mdc-select="{value: form.type, valid: !errors.type, onChange: setType}">
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
        <div aria-hidden="true" class="mdc-select-helper-text mdc-select-helper-text--validation-msg"
             id="type-helper-text-id" v-mdc-select-helper-text>
            {{errors.type}}
        </div>

        <div class="ft-switch" role="presentation" v-if="form.type === types.Boolean">
            <div class="mdc-switch" v-mdc-switch>
                <div class="mdc-switch__track"></div>
                <div class="mdc-switch__thumb-underlay">
                    <div class="mdc-switch__thumb"></div>
                    <input class="mdc-switch__native-control"
                           id="value-boolean-id"
                           role="switch" type="checkbox"
                           v-bind:aria-checked="form.value === true" v-model="form.value">
                </div>
            </div>
            <label for="value-boolean-id">Off/On</label>
        </div>
        <label class="mdc-text-field" v-if="form.type === types.Number"
               v-mdc-text-field="{value: toFormValue(form.value), valid: !errors.value, required: true}">
            <span class="mdc-text-field__ripple"></span>
            <input aria-controls="value-number-helper-text-id" aria-describedby="value-number-helper-text-id"
                   aria-labelledby="value-number-id" class="mdc-text-field__input" type="number"
                   v-model.number="form.value">
            <span class="mdc-floating-label" id="value-number-id">Value</span>
            <span class="mdc-line-ripple"></span>
        </label>
        <div aria-hidden="true" class="mdc-text-field-helper-line" id="value-number-helper-text-id"
             v-if="form.type === types.Number">
            <div class="mdc-text-field-helper-text mdc-text-field-helper-text--validation-msg"
                 v-mdc-text-field-helper-text>
                {{errors.value}}
            </div>
        </div>
        <label class="mdc-text-field" v-if="form.type === types.String"
               v-mdc-text-field="{value: toFormValue(form.value), valid: !errors.value, required: true}">
            <span class="mdc-text-field__ripple"></span>
            <input aria-controls="value-string-helper-text-id" aria-describedby="value-string-helper-text-id"
                   aria-labelledby="value-string-id" class="mdc-text-field__input" type="text"
                   v-model="form.value">
            <span class="mdc-floating-label" id="value-string-id">Value</span>
            <span class="mdc-line-ripple"></span>
        </label>
        <div aria-hidden="true" class="mdc-text-field-helper-line" id="value-string-helper-text-id"
             v-if="form.type === types.String">
            <div class="mdc-text-field-helper-text mdc-text-field-helper-text--validation-msg"
                 v-mdc-text-field-helper-text>
                {{errors.value}}
            </div>
        </div>

        <pre class="ft-feature-preview">{{preview}}</pre>

        <div class="ft-form-controls">

            <div class="mdc-touch-target-wrapper">
                <button class="mdc-button" type="button" v-mdc-button v-on:click="cancel()">
                    <span class="mdc-button__ripple"></span>
                    Cancel
                </button>
            </div>

            <div class="mdc-touch-target-wrapper">
                <button class="mdc-button mdc-button--unelevated" type="submit" v-bind:disabled="!isValid" v-mdc-button>
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
  import { computed, reactive, SetupContext, watchEffect } from '@vue/composition-api';
  import Vue, { ComponentOptions } from 'vue';
  import { Feature, FeatureValue } from '~express/models/feature';

  // TODO: this should be imported, but it's giving error "This dependency was not found"
  enum FeatureValueType {
    String = 'string',
    Number = 'number',
    Boolean = 'boolean',
  }

  // TODO: this should be imported, but it's giving error "This dependency was not found"
  const featureValueTypes: string[] = Object.keys(FeatureValueType).map(
    (key) => (FeatureValueType as any)[key] as string
  );

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

      // const errors = ref<{ [key in keyof Feature]?: string }>({});

      let data: Feature | undefined;

      watchEffect(() => {
        if (props.data !== data) {

          data = props.data;

          form.key = props.data?.key || '';
          form.description = props.data?.description || '';
          form.type = props.data?.type || null;
          form.value = props.data?.value || null;

          // errors.value = {};

        }
      });

      // The following causes infinite loop
      /*watchEffect(() => {

        console.log('update errors');

        const formErrors: { [key in keyof Feature]?: string } = {};

        if (!form.key) {
          formErrors.key = 'This is required';
        }

        if (!form.type) {
          formErrors.type = 'This is required';
        } else if (!featureValueTypes.includes(form.type)) {
          formErrors.type = 'Value not allowed';
        }

        errors.value = formErrors;

      });*/

      const getErrors = () => {

        const errors: { [key in keyof Feature]?: string } = {};

        if (!form.key) {
          errors.key = 'This is required';
        }

        if (!form.type) {
          errors.type = 'This is required';
        } else if (!featureValueTypes.includes(form.type)) {
          errors.type = 'Value not allowed';
        }

        return errors;

      };

      const errors = computed<{ [key in keyof Feature]?: string }>(getErrors);
      const isValid = computed<boolean>(() => !Object.keys(getErrors()).length);

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
        let newValue: FeatureValue;
        switch (type) {
          case FeatureValueType.Boolean:
            newValue = typeof value === 'boolean' ? value : value === 'true';
            if (newValue !== value) {
              form.value = newValue;
            }
            break;
          case FeatureValueType.Number:
            newValue = parseFloat(value as string) || null;
            if (newValue !== value) {
              form.value = newValue;
            }
            break;
          case FeatureValueType.String:
            newValue = typeof value !== 'undefined' && value !== null ? `${value}` : '';
            if (newValue !== value) {
              form.value = newValue;
            }
            break;
        }
      };

      const setType = (value: FeatureValueType) => {
        if (form.type !== value) {
          form.type = value;
          updateValue(value);
        }
      };

      const toFormValue = (value: any): string => {
        if (typeof value === 'string') {
          return value;
        }
        if (typeof value === 'number') {
          return `${value}`;
        }
        return '';
      };

      return { form, preview, cancel, submit, errors, isValid, setType, types: FeatureValueType, toFormValue };

    },
    directives: { mdcTextField, mdcTextFieldHelperText, mdcButton, mdcSelect, mdcSelectHelperText, mdcSwitch }
  };

  export default componentOptions;
</script>

<style lang="scss" scoped></style>
