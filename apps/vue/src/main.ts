import VueCompositionApi from '@vue/composition-api';
import Vue from 'vue';
// import store from './store'
import App from './App.vue';
// import './registerServiceWorker'
import router from './router';

Vue.use(VueCompositionApi);

Vue.config.productionTip = false;

new Vue({
  router,
  // store,
  render: h => h(App)
}).$mount('#app');
