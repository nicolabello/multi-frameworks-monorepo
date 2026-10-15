<script lang="ts">
  import { goto } from '$app/navigation';
  import { resolve } from '$app/paths';
  import ArrowBackIcon from '#lib/components/ArrowBackIcon.svelte';
  import FeatureForm from '#lib/components/FeatureForm.svelte';
  import { type Feature, FeatureService } from '@feature-toggles/helpers';
  import type { PageProps } from './$types';

  let { data }: PageProps = $props();

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
  {#key data.feature?._id}
    <FeatureForm feature={data.feature} oncancel={showList} onsubmit={save} />
  {/key}
</main>
