<template>
	<div class="header-wrapper">
		<div class="title">Welcome</div>
		<div class="user">
			<i class="fa fa-user-circle" aria-hidden="true"></i>
		</div>
	</div>
</template>

<script>
	
</script>

<style lang="scss" scoped>
@import 'src/scss/mixins';
@import 'src/scss/variables';

.header-wrapper {
	@include flexbox-center;
	flex-direction: column;
}

.title {
	display: block;
	font-family: $font-family;
	font-weight: $thick;
	font-size: $base-font-size + 21;
	color: #333;
	text-align: $alignment-center;
	padding-bottom: $padding-bottom-header;
}

.user {
	@include flexbox-center;
	position: $position-relative;
	padding-bottom: $padding-bottom-header;
}

.fa-user-circle {
	position: $position-absolute;
	font-size: $base-font-size + 42;
}
</style>
