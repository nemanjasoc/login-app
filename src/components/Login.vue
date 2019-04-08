<template>
	<div class="wrapper">
		<app-header></app-header>
		<app-user></app-user>
	</div>
</template>

<script>
import Header from '../components/login/Header.vue';
import User from '../components/login/User.vue';

export default {
	components: {
		appHeader: Header,
		appUser: User,
	}
}
</script>

<style lang="scss" scoped>
@import 'src/scss/mixins';

.wrapper {
	@include flexbox-column;
	width: 390px;
}
</style>
