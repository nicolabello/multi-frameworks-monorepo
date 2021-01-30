<template>
  <div role="presentation">

    <header v-mdc-top-app-bar class="mdc-top-app-bar mdc-top-app-bar--fixed">
      <div class="mdc-top-app-bar__row">
        <section class="mdc-top-app-bar__section mdc-top-app-bar__section--align-start">
          <button class="material-icons mdc-top-app-bar__navigation-icon mdc-icon-button"
                  v-on:click="showList()">
            arrow_back
          </button>
          <h1 class="mdc-top-app-bar__title">{{ addingNew ? 'Add feature' : 'Edit feature' }}</h1>
        </section>
      </div>
    </header>

    <div class="mdc-drawer-app-content mdc-top-app-bar--fixed-adjust">
      <main class="ft-main-content">
        <FeatureForm v-bind:data="data" v-on:ftCancel="showList()" v-on:ftSubmit="addOrUpdate"/>
      </main>
    </div>

  </div>
</template>

<script lang="ts">
import FeatureForm from '@/components/FeatureForm.vue';
import mdcTopAppBar from '@/modules/material-components-web/directives/mdc-top-app-bar';
import { Feature, FeatureService } from '@feature-toggles/helpers';
import { Component, onBeforeUnmount, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const component: Component = {
  setup() {

    const route = useRoute();
    const id = route.params.id;
    const addingNew = ref<boolean>(id === 'new');

    const router = useRouter();
    const showList = () => router.push('/features');

    const data = ref<Feature>();

    let cancelGetRequest: Function;
    onMounted(() => {
      if (!addingNew.value) {
        const { request, cancelRequest } = FeatureService.get(id);
        cancelGetRequest = cancelRequest;
        (async () => data.value = await request)();
      }
    });

    onBeforeUnmount(() => cancelGetRequest && cancelGetRequest());

    let cancelAddOrUpdateRequest: Function;
    const addOrUpdate = (data: Feature) => {
      cancelAddOrUpdateRequest && cancelAddOrUpdateRequest();
      const { request, cancelRequest } = addingNew.value ? FeatureService.add(data) : FeatureService.update(data);
      cancelAddOrUpdateRequest = cancelRequest;
      (async () => {
        await request;
        showList();
      })();
    };

    return { addingNew, showList, data, addOrUpdate };

  },
  components: { FeatureForm },
  directives: { mdcTopAppBar }
};

export default component;
</script>

<style lang="scss" scoped></style>
