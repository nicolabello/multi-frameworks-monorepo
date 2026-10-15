<script setup lang="ts">
import { type Feature, FeatureService, isRequestCancelled } from '@feature-toggles/helpers';
import { computed, onBeforeUnmount, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import ArrowBackIcon from './ArrowBackIcon.vue';
import FeatureForm from './FeatureForm.vue';

// `id` comes from the `:id` route param thanks to `props: true` in router.ts. https://router.vuejs.org/guide/essentials/passing-props.html
const props = defineProps<{ id: string }>();

const router = useRouter();
const showList = () => router.push('/features');

const addingNew = computed(() => props.id === 'new');
const feature = ref<Feature | null>(null);
const loaded = ref(false);

let controller: AbortController | undefined;

// The same component instance is reused when only the route param changes (e.g. /features/1 → /features/2),
// so watch `id` instead of loading once on mount. `immediate` runs it for the initial value too.
// https://vuejs.org/guide/essentials/watchers.html
watch(
  () => props.id,
  async (id) => {
    controller?.abort();
    feature.value = null;
    loaded.value = addingNew.value;
    if (!addingNew.value) {
      controller = new AbortController();
      try {
        feature.value = await FeatureService.get(id, { signal: controller.signal });
        loaded.value = true;
      } catch (error) {
        // Cancelled because the id changed or the page was left: nothing to do
        if (!isRequestCancelled(error)) throw error;
      }
    }
  },
  { immediate: true },
);

onBeforeUnmount(() => controller?.abort());

async function save(data: Feature) {
  await (addingNew.value ? FeatureService.add(data) : FeatureService.update(data));
  await showList();
}
</script>

<template>
  <header class="ft-app-bar">
    <button type="button" class="ft-icon-button" aria-label="Back" @click="showList">
      <ArrowBackIcon />
    </button>
    <h1 class="ft-app-bar-title">{{ addingNew ? 'Add feature' : 'Edit feature' }}</h1>
  </header>

  <main class="ft-main">
    <FeatureForm v-if="loaded" :key="id" :feature="feature" @cancel="showList" @submit="save" />
  </main>
</template>
