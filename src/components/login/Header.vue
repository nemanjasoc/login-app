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

<style scoped>
.header-wrapper {
	display: flex;
	justify-content: center;
	flex-direction: column;
}

.title {
	display: block;
	font-family: 'Poppins', sans-serif;
	font-weight: 900;
	font-size: 39px;
	color: #333;
	text-align: center;
	padding-bottom: 35px;
}

.user {
	display: flex;
	justify-content: center;
	position: relative;
	padding-bottom: 35px;
}

.fa-user-circle {
	position: absolute;
	font-size: 60px;
}
</style>
