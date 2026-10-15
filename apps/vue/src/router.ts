import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';
import Feature from './components/Feature.vue';
import Features from './components/Features.vue';

// https://router.vuejs.org/guide/
export const routes: RouteRecordRaw[] = [
  { path: '/features', name: 'features', component: Features },
  { path: '/features/:id', name: 'feature', component: Feature, props: true },
  // Catch-all route: https://router.vuejs.org/guide/essentials/dynamic-matching.html#Catch-all-404-Not-found-Route
  { path: '/:pathMatch(.*)*', redirect: '/features' },
];

// HTML5 history mode: clean URLs without a `#`. https://router.vuejs.org/guide/essentials/history-mode.html
export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});
