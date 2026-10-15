<script setup lang="ts">
// `<script setup>` is the compact Composition API syntax: top-level bindings are usable in the template.
// https://vuejs.org/api/sfc-script-setup.html
import { type Feature, FeaturesService, isRequestCancelled } from '@feature-toggles/helpers';
import { onBeforeUnmount, ref } from 'vue';
import AddIcon from './AddIcon.vue';
import FeaturesList from './FeaturesList.vue';

// `ref` makes a value reactive: the template re-renders when `.value` changes. https://vuejs.org/guide/essentials/reactivity-fundamentals.html
const features = ref<Feature[]>();

// Fetch during setup and cancel the request if the component goes away before it completes.
// https://vuejs.org/api/composition-api-lifecycle.html#onbeforeunmount
const controller = new AbortController();
FeaturesService.getAll({ signal: controller.signal }).then(
  (data) => (features.value = data),
  (error) => {
    if (!isRequestCancelled(error)) throw error;
  },
);
onBeforeUnmount(() => controller.abort());
</script>

<template>
  <header class="ft-app-bar">
    <h1 class="ft-app-bar-title">Feature toggles</h1>
  </header>

  <main class="ft-main">
    <FeaturesList v-if="features" :features="features" />
  </main>

  <!-- RouterLink renders an <a> that navigates client-side: https://router.vuejs.org/guide/#RouterLink -->
  <RouterLink to="/features/new" class="ft-fab" aria-label="Add feature">
    <AddIcon />
  </RouterLink>
</template>
