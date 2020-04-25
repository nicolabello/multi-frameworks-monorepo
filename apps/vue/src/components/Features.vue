<template>
    <div role="presentation">

        <header class="mdc-top-app-bar mdc-top-app-bar--fixed">
            <div class="mdc-top-app-bar__row">
                <section class="mdc-top-app-bar__section mdc-top-app-bar__section--align-start">
                    <h1 class="mdc-top-app-bar__title">Feature toggles</h1>
                </section>
            </div>
        </header>

        <div class="mdc-top-app-bar--fixed-adjust" role="presentation">

            <main class="ft-main-content">
                <FeaturesList v-bind:data="data"/>
            </main>

            <button aria-label="Add feature" class="mdc-fab ft-fab-absolute" type="button" v-on:click="addNew()">
                <span class="mdc-fab__ripple"></span>
                <span class="mdc-fab__icon material-icons">add</span>
            </button>

        </div>

    </div>
</template>

<script lang="ts">
  import FeaturesList from '@/components/FeaturesList.vue';
  import { FeaturesService } from '@/services/features.service';
  import { onBeforeUnmount, onMounted, ref, SetupContext } from '@vue/composition-api';
  import { Feature } from '~express/models/feature';

  export default {
    setup(props: {}, context: SetupContext) {

      const router = context.root.$router;
      const addNew = () => router.push('/feature/new');

      const data = ref<Feature[]>();

      let cancelRequest: Function;

      onMounted(() => {
        let request: Promise<Feature[]>;
        ({ request, cancelRequest } = FeaturesService.getAll());
        (async () => data.value = await request)();
      });

      onBeforeUnmount(() => cancelRequest && cancelRequest());

      return { addNew, data };

    },
    components: {
      FeaturesList
    }
  };
</script>

<style lang="scss" scoped></style>
