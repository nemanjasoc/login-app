<template>
	<div id="app">
		<router-view></router-view>
	</div>
</template>

<script>
export default {

}
</script>

<style lang="scss">
@import 'src/scss/mixins';
@import 'src/scss/variables';

#app {
	@include main-font-family;
	@include flexbox-center;
	padding-top: $base-padding-top;
}
</style>
