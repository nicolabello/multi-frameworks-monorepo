<script lang="ts">
  import { resolve } from '$app/paths';
  import AddIcon from '#lib/components/AddIcon.svelte';
  import FeaturesList from '#lib/components/FeaturesList.svelte';
  import type { PageProps } from './$types';

  let { data }: PageProps = $props();
</script>

<header class="ft-app-bar">
  <h1 class="ft-app-bar-title">Feature toggles</h1>
</header>

<main class="ft-main">
  <FeaturesList features={data.features} />
</main>

<a href={resolve('/features/[id]', { id: 'new' })} class="ft-fab" aria-label="Add feature">
  <AddIcon />
</a>
