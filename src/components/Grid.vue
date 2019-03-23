<template>
	<div>
		<div class="top-container">
			<h1>Grid component</h1>
			<div class="sign-out-button" @click="signOut">Sign out</div>
		</div>

		<kendo-grid :style="{height: '280px'}"
					:data-items="items"
					:columns="columns">
		</kendo-grid>
	</div>
</template>

<script>
import { Grid } from '@progress/kendo-vue-grid'

export default {
	components: {
		'kendo-grid': Grid
	},

	data() {
    return {
      items: [],
      columns: [
        { field: 'ProductID' },
        { field: 'ProductName', title: 'Product Name' },
        { field: 'UnitPrice', title: 'Unit Price' }
      ]
    };
  },

	methods: {
		signOut() {
			this.$router.push('/login');
		},

		createRandomData(count) {
      const productNames = ['Chai', 'Chang', 'Syrup', 'Apple', 'Orange', 'Banana', 'Lemon', 'Pineapple', 'Tea', 'Milk'];
      const unitPrices = [12.5, 10.1, 5.3, 7, 22.53, 16.22, 20, 50, 100, 120]

      return Array(count).fill({}).map((_, idx) => ({
        ProductID: idx + 1,
        ProductName: productNames[Math.floor(Math.random() * productNames.length)],
        UnitPrice: unitPrices[Math.floor(Math.random() * unitPrices.length)]
      }));
    }
	},

	mounted() {
    this.items = this.createRandomData(50);
  }
}
</script>

<style scoped>
.top-container {
	display: flex;
	align-items: center;
	justify-content: space-between;
}

.sign-out-button {
	padding: 0 20px;
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

.sign-out-button:hover {
	background: black;
	box-shadow: 0 10px 30px 0px black;
	-moz-box-shadow: 0 10px 30px 0px black;
	-webkit-box-shadow: 0 10px 30px 0px black;
	-o-box-shadow: 0 10px 30px 0px black;
	-ms-box-shadow: 0 10px 30px 0px black;
}
</style>
