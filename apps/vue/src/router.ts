import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';
import Feature from './components/Feature.vue';
import Features from './components/Features.vue';

export const routes: RouteRecordRaw[] = [
  { path: '/features', name: 'features', component: Features },
  { path: '/features/:id', name: 'feature', component: Feature, props: true },
  { path: '/:pathMatch(.*)*', redirect: '/features' },
];

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});
