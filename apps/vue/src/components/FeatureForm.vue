<script setup lang="ts">
import {
  castFeatureValue,
  type Feature,
  featurePreview,
  FeatureValueType,
  normalizeFeature,
  validateFeature,
} from '@feature-toggles/helpers';
import { computed, reactive, watch } from 'vue';

// Typed props and events: https://vuejs.org/guide/typescript/composition-api.html
const props = defineProps<{ feature?: Feature | null }>();
const emit = defineEmits<{ cancel: []; submit: [feature: Feature] }>();

// `reactive` makes a deeply reactive copy of the object, which the inputs edit through `v-model`.
// Taking the prop's initial value is enough: the parent re-creates this component (`:key`) for another feature.
// https://vuejs.org/api/reactivity-core.html#reactive
const form = reactive<Feature>(normalizeFeature(props.feature));
const touched = reactive<Partial<Record<keyof Feature, boolean>>>({});

// Keep the value compatible with the selected type
watch(
  () => form.type,
  (type) => (form.value = castFeatureValue(form.value, type)),
);

// Re-evaluated automatically whenever a field used by `validateFeature` changes. https://vuejs.org/guide/essentials/computed.html
const errors = computed(() => validateFeature(form));
const showError = (field: keyof Feature) => (touched[field] && errors.value?.[field]) || undefined;

const submit = () => {
  if (!errors.value) {
    emit('submit', { ...form });
  }
};
</script>

<template>
  <form class="ft-form" novalidate @submit.prevent="submit">
    <div class="ft-field">
      <label for="key" class="ft-label">Key</label>
      <input
        id="key"
        v-model="form.key"
        type="text"
        class="ft-input"
        required
        autofocus
        :aria-invalid="!!showError('key')"
        aria-describedby="key-helper"
        @blur="touched.key = true"
      />
      <p id="key-helper" :class="showError('key') ? 'ft-error' : 'ft-helper'">
        {{ showError('key') ?? 'This will be used as key in the response object' }}
      </p>
    </div>

    <div class="ft-field">
      <label for="description" class="ft-label">Description</label>
      <input id="description" v-model="form.description" type="text" class="ft-input" />
    </div>

    <div class="ft-field">
      <label for="type" class="ft-label">Type</label>
      <select
        id="type"
        v-model="form.type"
        class="ft-input"
        required
        :aria-invalid="!!showError('type')"
        aria-describedby="type-helper"
        @blur="touched.type = true"
      >
        <option :value="null" disabled>Select a type…</option>
        <option :value="FeatureValueType.Boolean">Toggle</option>
        <option :value="FeatureValueType.String">String</option>
        <option :value="FeatureValueType.Number">Number</option>
      </select>
      <p v-if="showError('type')" id="type-helper" class="ft-error">{{ showError('type') }}</p>
    </div>

    <label v-if="form.type === FeatureValueType.Boolean" class="ft-switch">
      <input v-model="form.value" type="checkbox" role="switch" class="peer sr-only" />
      <span class="ft-switch-track"></span>
      Off/On
    </label>

    <div v-else-if="form.type" class="ft-field">
      <label for="value" class="ft-label">Value</label>
      <!-- `.number` casts the input to a number: https://vuejs.org/guide/essentials/forms.html#number -->
      <input
        v-if="form.type === FeatureValueType.Number"
        id="value"
        v-model.number="form.value"
        type="number"
        class="ft-input"
        :aria-invalid="!!showError('value')"
        aria-describedby="value-helper"
        @blur="touched.value = true"
      />
      <input
        v-else
        id="value"
        v-model="form.value"
        type="text"
        class="ft-input"
        :aria-invalid="!!showError('value')"
        aria-describedby="value-helper"
        @blur="touched.value = true"
      />
      <p v-if="showError('value')" id="value-helper" class="ft-error">{{ showError('value') }}</p>
    </div>

    <pre class="ft-preview">{{ featurePreview(form) }}</pre>

    <div class="ft-form-controls">
      <button type="button" class="ft-btn" @click="emit('cancel')">Cancel</button>
      <button type="submit" class="ft-btn ft-btn-primary" :disabled="!!errors">Save</button>
    </div>
  </form>
</template>
