<script setup lang="ts">
import type { Feature } from '@feature-toggles/helpers';
import FeatureListItem from './FeatureListItem.vue';

defineProps<{ features: Feature[] }>();
</script>

<template>
  <ul v-if="features.length" class="ft-cards-list">
    <li v-for="feature of features" :key="feature._id">
      <FeatureListItem :feature="feature" />
    </li>
  </ul>
  <p v-else class="ft-empty">No features yet.</p>
</template>
