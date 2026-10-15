<script lang="ts">
  import type { Feature } from '@feature-toggles/helpers';
  import FeatureListItem from './FeatureListItem.svelte';

  let { features }: { features: Feature[] } = $props();
</script>

{#if features.length}
  <ul class="ft-cards-list">
    {#each features as feature (feature._id)}
      <li><FeatureListItem {feature} /></li>
    {/each}
  </ul>
{:else}
  <p class="ft-empty">No features yet.</p>
{/if}
