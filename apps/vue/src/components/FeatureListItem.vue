<script setup lang="ts">
import type { Feature } from '@feature-toggles/helpers';

defineProps<{ feature: Feature }>();
</script>

<template>
  <RouterLink :to="`/features/${feature._id}`" class="ft-card">
    <h2 class="ft-card-title">{{ feature.key }}</h2>
    <p v-if="feature.description" class="ft-card-description">{{ feature.description }}</p>
    <pre class="ft-card-value">{{ JSON.stringify(feature.value) }}</pre>
  </RouterLink>
</template>
