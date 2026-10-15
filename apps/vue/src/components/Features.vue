<script setup lang="ts">
import { type Feature, FeaturesService } from '@feature-toggles/helpers';
import { onBeforeUnmount, ref } from 'vue';
import AddIcon from './AddIcon.vue';
import FeaturesList from './FeaturesList.vue';

const features = ref<Feature[]>();

const controller = new AbortController();
FeaturesService.getAll({ signal: controller.signal }).then((data) => (features.value = data));
onBeforeUnmount(() => controller.abort());
</script>

<template>
  <header class="ft-app-bar">
    <h1 class="ft-app-bar-title">Feature toggles</h1>
  </header>

  <main class="ft-main">
    <FeaturesList v-if="features" :features="features" />
  </main>

  <RouterLink to="/features/new" class="ft-fab" aria-label="Add feature">
    <AddIcon />
  </RouterLink>
</template>
