import Login from './components/Login.vue';
import Grid from './components/Grid.vue';
import store from './store';

export const routes = [
  {
    path: '/login',
    component: Login,
    beforeEnter: function (to, from, next) {
      // Check if logged in. If logged in redirect to /grid. If not logged in call next().
      if (store.state.auth) {
        next({ path: '/grid' })
      }

        next()
    }
  },
  {
    path: '/grid',
    component: Grid,
    beforeEnter: function (to, from, next) {
      // Check if logged in. If not logged in redirect to /login. If logged in call next().
      if (!store.state.auth) {
        next({ path: '/login' })
      }

        next()
    }
  },
  {
    path: '*',
    redirect: '/login'
  }
];
