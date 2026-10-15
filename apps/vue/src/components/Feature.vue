<script setup lang="ts">
import { type Feature, FeatureService } from '@feature-toggles/helpers';
import { computed, onBeforeUnmount, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import ArrowBackIcon from './ArrowBackIcon.vue';
import FeatureForm from './FeatureForm.vue';

const props = defineProps<{ id: string }>();

const router = useRouter();
const showList = () => router.push('/features');

const addingNew = computed(() => props.id === 'new');
const feature = ref<Feature | null>(null);
const loaded = ref(false);

let controller: AbortController | undefined;

watch(
  () => props.id,
  async (id) => {
    controller?.abort();
    feature.value = null;
    loaded.value = addingNew.value;
    if (!addingNew.value) {
      controller = new AbortController();
      feature.value = await FeatureService.get(id, { signal: controller.signal });
      loaded.value = true;
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
