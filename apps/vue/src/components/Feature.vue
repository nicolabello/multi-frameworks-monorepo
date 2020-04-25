<template>
    <div role="presentation">

        <header class="mdc-top-app-bar mdc-top-app-bar--fixed">
            <div class="mdc-top-app-bar__row">
                <section class="mdc-top-app-bar__section mdc-top-app-bar__section--align-start">
                    <button class="material-icons mdc-top-app-bar__navigation-icon mdc-icon-button"
                            v-on:click="showList()">
                        arrow_back
                    </button>
                    <h1 class="mdc-top-app-bar__title">{{addingNew ? 'Add feature' : 'Edit feature'}}</h1>
                </section>
            </div>
        </header>

        <div class="mdc-drawer-app-content mdc-top-app-bar--fixed-adjust">
            <main class="ft-main-content">
                {{JSON.stringify(data)}}
            </main>
        </div>

    </div>
</template>

<script lang="ts">
  import { FeatureService } from '@/services/feature.service';
  import { onBeforeUnmount, onMounted, ref, SetupContext } from '@vue/composition-api';
  import { Feature } from '~express/models/feature';

  export default {
    setup(props: {}, context: SetupContext) {

      const id = context.root.$route.params.id;
      const addingNew = ref<boolean>(id === 'new');

      const router = context.root.$router;
      const showList = () => router.push('/features');

      const data = ref<Feature>();
      let cancelRequest: Function;

      onMounted(() => {
        if (!addingNew.value) {
          let request: Promise<Feature>;
          ({ request, cancelRequest } = FeatureService.get(id));
          (async () => data.value = await request)();
        }
      });

      onBeforeUnmount(() => cancelRequest && cancelRequest());

      return { addingNew, showList, data };

    }
  };
</script>

<style lang="scss" scoped></style>
