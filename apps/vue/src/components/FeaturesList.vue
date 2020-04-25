<template>
    <ul class="ft-cards-list">
        <li v-bind:key="item._id" v-for="item of data">
            <FeatureListItem v-bind:data="item"/>
        </li>
    </ul>
</template>

<script lang="ts">
  import FeatureListItem from '@/components/FeatureListItem.vue';
  import Vue, { ComponentOptions } from 'vue';

  const componentOptions: ComponentOptions<Vue> = {
    props: {
      data: { type: Array, default: () => [] }
    },
    setup() {
      return {};
    },
    components: { FeatureListItem }
  };

  export default componentOptions;
</script>

<style lang="scss" scoped></style>
