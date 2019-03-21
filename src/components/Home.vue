<template>
  <div class="wrapper">
	<app-header></app-header>
	<app-login></app-login>
  </div>
</template>

<script>
import Header from '../components/home/Header.vue';
import Login from '../components/home/Login.vue';

export default {
	components: {
		appHeader: Header,
		appLogin: Login,
	}
}
</script>

<style>
.wrapper {
	display: flex;
	flex-direction: column;
	width: 390px;
}
</style>