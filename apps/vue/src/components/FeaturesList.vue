<template>
  <ul class="ft-cards-list">
    <li v-for="item of data" v-bind:key="item._id">
      <FeatureListItem v-bind:data="item"/>
    </li>
  </ul>
</template>

<script lang="ts">
import FeatureListItem from '@/components/FeatureListItem.vue';
import { Component } from 'vue';

const component: Component = {
  props: {
    data: { type: Array, default: () => [] }
  },
  setup() {
    return {};
  },
  components: { FeatureListItem }
};

export default component;
</script>

<style lang="scss" scoped></style>
