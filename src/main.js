import Vue from 'vue'
import VueRouter from 'vue-router';
import App from './App.vue'
import { routes } from './routes';
import store from './store';

import '@progress/kendo-ui'
import '@progress/kendo-theme-default/dist/all.css'
import { Grid, GridToolbar, GridNoRecords } from '@progress/kendo-vue-grid'

Vue.use(VueRouter);

Vue.component('kendo-grid', Grid);
Vue.component('grid-toolbar', GridToolbar);
Vue.component('grid-norecords', GridNoRecords);

const router = new VueRouter({
	routes,
	mode: 'history'
});

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
