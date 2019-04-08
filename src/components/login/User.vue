<template>
	<div class="user-wrapper">
		<form action="">
			<div class="wrap-username">
				<input type="username" id="username" v-model="username" @keyup.enter="login" required/>
				<label for="username">Username</label>
			</div>
			<div class="wrap-password">
				<input type="password" id="password" v-model="password" @keyup.enter="login" required/>
				<label for="password">Password</label>
			</div>
		</form>
		<div class="login-button" @click="login">Login</div>
	</div>
</template>

<script>
export default {
	data () {
		return {
			username: '',
			password: ''
		}
	},
	mounted() {
		// If username is not defined in localStorage, set default username
		if (!localStorage.username) {
			localStorage.setItem('username', 'test@test');
		}
		// If password is not defined in localStorage, set default password
		if (!localStorage.password) {
			localStorage.setItem('password', 'test');
		}
	},
	methods: {
		login() {
			// Check if typed username matches username from localStorage
			if (localStorage.username != this.username) {
				return alert("Wrong username. Try again!");
			}
			// Check if typed password matches password from localStorage
			if (localStorage.password != this.password) {
				return alert("Wrong password. Try again!");
			}
			this.$store.commit('setAuth');
			this.$router.push('/grid');
			this.username = '';
			this.password = '';
		}
	}
}
</script>

<style lang="scss" scoped>
@import 'src/scss/mixins';
@import 'src/scss/variables';

.user-wrapper {
	padding-top: $base-padding-top;
}

.wrap-username,
.wrap-password {
	position: $position-relative;
	margin-bottom: $margin-bottom-user;
	@include height;
}

label {
	font-family: $font-family;
	position: $position-absolute;
	top: 0;
	left: 0;
	width: 100%;
	color: $gray;
	transition: 0.2s all;
	cursor: text;
}

input {
	font-family: $font-family;
	font-weight: $thinner;
	width: 100%;
	border: 0;
	outline: 0;
	padding: 0.5rem 0;
	border-bottom: 2px solid $gray;
	box-shadow: none;
	color: #555555;
	font-size: $base-font-size;
	@include transition-border-bottom-vendors;

	&:invalid {
		outline: 0;
	}

	&:focus,
	&:valid {
		border-color: $green;
	}

	&:focus~label,
	&:valid~label {
		font-size: $base-font-size -4;
		top: -24px;
		color: $green;
	}
}

.login-button {
	background-color: $green;
	border-radius: $base-border-radius;
	cursor: pointer;
	font-size: $base-font-size;
	color: white;
	height: $base-height + 6;
	text-align: $alignment-center;
	align-items: $alignment-center;
	@include flexbox-center;
	font-weight: $thin;
	@include button-shadow-vendors;
	@include button-transition-vendors;

	&:hover {
		background: black;
		@include button-hover-vendors;
	}
}
</style>
