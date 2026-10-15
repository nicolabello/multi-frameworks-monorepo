<script lang="ts">
  import { goto } from '$app/navigation';
  import { resolve } from '$app/paths';
  import ArrowBackIcon from '#lib/components/ArrowBackIcon.svelte';
  import FeatureForm from '#lib/components/FeatureForm.svelte';
  import { type Feature, FeatureService } from '@feature-toggles/helpers';
  import type { PageProps } from './$types';

  let { data }: PageProps = $props();

  // `resolve` builds a type-checked URL for a route (and adds the app's base path, if any);
  // `goto` navigates client-side. https://svelte.dev/docs/kit/$app-paths#resolve https://svelte.dev/docs/kit/$app-navigation#goto
  const showList = () => goto(resolve('/features'));

  async function save(feature: Feature) {
    await (data.feature ? FeatureService.update(feature) : FeatureService.add(feature));
    await showList();
  }
</script>

<header class="ft-app-bar">
  <button type="button" class="ft-icon-button" aria-label="Back" onclick={showList}>
    <ArrowBackIcon />
  </button>
  <h1 class="ft-app-bar-title">{data.feature ? 'Edit feature' : 'Add feature'}</h1>
</header>

<main class="ft-main">
  <!-- {#key} destroys and re-creates its content when the value changes: a fresh form for another feature.
       https://svelte.dev/docs/svelte/key -->
  {#key data.feature?._id}
    <FeatureForm feature={data.feature} oncancel={showList} onsubmit={save} />
  {/key}
</main>
