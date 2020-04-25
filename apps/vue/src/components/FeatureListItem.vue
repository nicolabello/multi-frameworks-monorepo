<template>
    <div class="mdc-card mdc-card--outlined">
        <a class="mdc-card__primary-action ft-card-content" v-on:click="showDetails()">
            <h2 class="mdc-typography--headline6">{{data.key}}</h2>
            <p v-if="data.description" class="mdc-typography--subtitle2">{{data.description}}</p>
            <div class="feature-value" role="presentation">
                <pre>{{value}}</pre>
            </div>
        </a>
    </div>
</template>

<script lang="ts">
  import { computed, SetupContext } from '@vue/composition-api';
  import { Feature } from '~express/models/feature';

  export default {
    props: {
      data: { type: Object, default: () => ({}) },
    },
    setup(props: {data?: Feature}, context: SetupContext) {

      const router = context.root.$router;
      const showDetails = () => router.push(`/feature/${props.data?._id}`);

      const value = computed(() => JSON.stringify(props.data?.value));

      return { value, showDetails };

    }
  };
</script>

<style lang="scss" scoped></style>
