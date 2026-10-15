<script lang="ts">
  import { resolve } from '$app/paths';
  import type { Feature } from '@feature-toggles/helpers';

  let { feature }: { feature: Feature } = $props();
</script>

<a href={resolve('/features/[id]', { id: feature._id ?? '' })} class="ft-card">
  <h2 class="ft-card-title">{feature.key}</h2>
  {#if feature.description}
    <p class="ft-card-description">{feature.description}</p>
  {/if}
  <pre class="ft-card-value">{JSON.stringify(feature.value)}</pre>
</a>
