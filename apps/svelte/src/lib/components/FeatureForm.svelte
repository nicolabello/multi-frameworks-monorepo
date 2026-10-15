<script lang="ts">
  import {
    castFeatureValue,
    type Feature,
    featurePreview,
    FeatureValueType,
    normalizeFeature,
    validateFeature,
  } from '@feature-toggles/helpers';

  interface Props {
    feature?: Feature | null;
    oncancel: () => void;
    onsubmit: (feature: Feature) => void;
  }

  // Svelte 5 runes: `$props`, `$state` and `$derived` declare props and reactive state.
  // https://svelte.dev/docs/svelte/what-are-runes
  // Callback props (`onsubmit`…) replace Svelte 4's `createEventDispatcher`: https://svelte.dev/docs/svelte/v5-migration-guide#Event-changes
  let { feature, oncancel, onsubmit }: Props = $props();

  // The parent re-creates this component with {#key} when the feature changes, so the initial value is enough
  // svelte-ignore state_referenced_locally
  // `$state` on an object makes a deeply reactive proxy: https://svelte.dev/docs/svelte/$state
  const form = $state(normalizeFeature(feature));
  const touched = $state<Partial<Record<keyof Feature, boolean>>>({});

  // Recomputed whenever something it reads changes: https://svelte.dev/docs/svelte/$derived
  const errors = $derived(validateFeature(form));
  const showError = (field: keyof Feature) => (touched[field] && errors?.[field]) || undefined;

  // Function binding (`bind:value={get, set}`): intercept writes to keep the value compatible whenever the
  // type changes. https://svelte.dev/docs/svelte/bind#Function-bindings
  const getType = () => form.type;
  const setType = (type: FeatureValueType | null) => {
    form.type = type;
    form.value = castFeatureValue(form.value, type);
  };

  function submit(event: SubmitEvent) {
    event.preventDefault();
    if (!errors) {
      onsubmit({ ...form });
    }
  }
</script>

<form class="ft-form" novalidate onsubmit={submit}>
  <div class="ft-field">
    <label for="key" class="ft-label">Key</label>
    <!-- svelte-ignore a11y_autofocus -->
    <input
      id="key"
      type="text"
      class="ft-input"
      required
      autofocus
      aria-invalid={!!showError('key')}
      aria-describedby="key-helper"
      bind:value={form.key}
      onblur={() => (touched.key = true)}
    />
    <p id="key-helper" class={showError('key') ? 'ft-error' : 'ft-helper'}>
      {showError('key') ?? 'This will be used as key in the response object'}
    </p>
  </div>

  <div class="ft-field">
    <label for="description" class="ft-label">Description</label>
    <input id="description" type="text" class="ft-input" bind:value={form.description} />
  </div>

  <div class="ft-field">
    <label for="type" class="ft-label">Type</label>
    <select
      id="type"
      class="ft-input"
      required
      aria-invalid={!!showError('type')}
      aria-describedby="type-helper"
      bind:value={getType, setType}
      onblur={() => (touched.type = true)}
    >
      <option value={null} disabled>Select a type…</option>
      <option value={FeatureValueType.Boolean}>Toggle</option>
      <option value={FeatureValueType.String}>String</option>
      <option value={FeatureValueType.Number}>Number</option>
    </select>
    {#if showError('type')}
      <p id="type-helper" class="ft-error">{showError('type')}</p>
    {/if}
  </div>

  {#if form.type === FeatureValueType.Boolean}
    <label class="ft-switch">
      <input
        type="checkbox"
        role="switch"
        class="peer sr-only"
        checked={form.value === true}
        onchange={(event) => (form.value = event.currentTarget.checked)}
      />
      <span class="ft-switch-track"></span>
      Off/On
    </label>
  {:else if form.type}
    <div class="ft-field">
      <label for="value" class="ft-label">Value</label>
      {#if form.type === FeatureValueType.Number}
        <input
          id="value"
          type="number"
          class="ft-input"
          aria-invalid={!!showError('value')}
          aria-describedby="value-helper"
          bind:value={form.value}
          onblur={() => (touched.value = true)}
        />
      {:else}
        <input
          id="value"
          type="text"
          class="ft-input"
          aria-invalid={!!showError('value')}
          aria-describedby="value-helper"
          bind:value={form.value}
          onblur={() => (touched.value = true)}
        />
      {/if}
      {#if showError('value')}
        <p id="value-helper" class="ft-error">{showError('value')}</p>
      {/if}
    </div>
  {/if}

  <pre class="ft-preview">{featurePreview(form)}</pre>

  <div class="ft-form-controls">
    <button type="button" class="ft-btn" onclick={oncancel}>Cancel</button>
    <button type="submit" class="ft-btn ft-btn-primary" disabled={!!errors}>Save</button>
  </div>
</form>
