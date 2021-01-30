<template>
  <div v-mdc-card class="mdc-card mdc-card--outlined">
    <a class="mdc-card__primary-action ft-card-content" v-on:click="showDetails()">
      <h2 class="mdc-typography--headline6">{{ data.key }}</h2>
      <p v-if="data.description" class="mdc-typography--subtitle2">{{ data.description }}</p>
      <div class="feature-value" role="presentation">
        <pre>{{ value }}</pre>
      </div>
    </a>
  </div>
</template>

<script lang="ts">
import mdcCard from '@/modules/material-components-web/directives/mdc-card';
import { Feature } from '@feature-toggles/helpers';
import { Component, computed } from 'vue';
import { useRouter } from 'vue-router';

const component: Component = {
  props: {
    data: { type: Object, default: () => ({}) },
  },
  setup(props: { data?: Feature }) {

    const router = useRouter();
    const showDetails = () => router.push(`/feature/${props.data?._id}`);

    const value = computed(() => JSON.stringify(props.data?.value));

    return { value, showDetails };

  },
  directives: { mdcCard }
};

export default component;
</script>

<style lang="scss" scoped></style>
