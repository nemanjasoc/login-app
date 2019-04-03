<template>
	<div class="user-wrapper">
		<form action="">
			<div class="wrap-username">
				<input type="username" id="username" v-model="username" required/>
				<label for="username">Username</label>
			</div>
			<div class="wrap-password">
				<input type="password" id="password" v-model="password" required/>
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

<style scoped>
.user-wrapper {
	margin-top: 85px;
}

.wrap-username {
	position: relative;
	margin-bottom: 35px;
	position: relative;
	height: 44px;
	line-height: 44px;
}

.wrap-password {
	position: relative;
	margin-bottom: 35px;
	position: relative;
	height: 44px;
	line-height: 44px;
}

label {
	font-family: 'Poppins', sans-serif;
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	color: #d3d3d3;
	transition: 0.2s all;
	cursor: text;
}

input {
	font-family: 'Poppins', sans-serif;
	width: 100%;
	border: 0;
	outline: 0;
	padding: 0.5rem 0;
	border-bottom: 2px solid #d3d3d3;
	box-shadow: none;
	color: #555;
	font-size: 18px;
	-webkit-transition: border-bottom 0.4s ease-out;
	-o-transition: border-bottom 0.4s ease-out;
	-moz-transition: border-bottom 0.4s ease-out;
	transition: border-bottom 0.4s ease-out;
}

input:invalid {
	outline: 0;
}

input:focus,
input:valid {
	border-color: #57b846;
}

input:focus~label,
input:valid~label {
	font-size: 14px;
	top: -24px;
	color: #57b846;
}

.login-button {
	background-color: #57b846;
	border-radius: 25px;
	cursor: pointer;
	font-size: 18px;
	color: white;
	height: 50px;
	-ms-flex-align: center;
	align-items: center;
	display: flex;
	justify-content: center;
	font-weight: 700;
	box-shadow: 0 10px 30px 0px rgba(87, 184, 70, 0.5);
	-moz-box-shadow: 0 10px 30px 0px rgba(87, 184, 70, 0.5);
	-webkit-box-shadow: 0 10px 30px 0px rgba(87, 184, 70, 0.5);
	-o-box-shadow: 0 10px 30px 0px rgba(87, 184, 70, 0.5);
	-ms-box-shadow: 0 10px 30px 0px rgba(87, 184, 70, 0.5);
	-webkit-transition: all 0.4s;
	-o-transition: all 0.4s;
	-moz-transition: all 0.4s;
	transition: all 0.4s;
}

.login-button:hover {
	background: black;
	box-shadow: 0 10px 30px 0px black;
	-moz-box-shadow: 0 10px 30px 0px black;
	-webkit-box-shadow: 0 10px 30px 0px black;
	-o-box-shadow: 0 10px 30px 0px black;
	-ms-box-shadow: 0 10px 30px 0px black;
}
</style>
