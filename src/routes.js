import Login from './components/Login.vue';
import Grid from './components/Grid.vue';

export const routes = [
	{ path: '/login', component: Login },
	{ path: '/grid', component: Grid },
	{ path: '*', redirect: '/login'}
];
