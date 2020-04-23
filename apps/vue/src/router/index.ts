import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import FeatureView from '../views/FeatureView.vue';
import FeaturesView from '../views/FeaturesView.vue';

Vue.use(VueRouter);

const routes: RouteConfig[] = [
  {
    path: '/features',
    name: 'Features',
    component: FeaturesView
  },
  {
    path: '/feature/:id',
    name: 'Feature',
    component: FeatureView
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '*',
    redirect: '/features'
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
