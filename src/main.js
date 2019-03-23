import Vue from 'vue'
import VueRouter from 'vue-router';
import App from './App.vue'
import { routes } from './routes';

import '@progress/kendo-ui'
import '@progress/kendo-theme-default/dist/all.css'

new Vue({
   el: '#app' //id of the container
})

Vue.use(VueRouter);

const router = new VueRouter({
	routes,
	mode: 'history'
});

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
