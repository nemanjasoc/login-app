<template>
	<div style="width:100%">
		<div class="top-container">
			<h1>Grid component</h1>
			<div class="sign-out-button" @click="signOut">Sign out</div>
		</div>

		<kendo-grid
			ref="grid"
			:style="{height: '500px', width: '100%'}"
			:data-items="categories"
			:detail="cellTemplate"
			:columns="columns"
			@expandchange="expandChange"
			:expand-field="'expanded'"/>
	</div>
</template>

<script>
import Vue from 'vue'
import { process, filterBy } from '@progress/kendo-data-query'

export default {
	data() {
		return {
			categories: [
				{CategoryID: 1, CategoryName: 'Beverages', Descriptions: 'Soft drinks, coffees, teas, beers, and ales'},
				{CategoryID: 2, CategoryName: 'Condiments', Descriptions: 'Sweet and savory sauces, relishes, spreads, and seasonings'},
				{CategoryID: 3, CategoryName: 'Confections', Descriptions: 'Desserts, candies, and sweet breads'},
				{CategoryID: 4, CategoryName: 'Dairy Products', Descriptions: 'Cheeses'},
				{CategoryID: 5, CategoryName: 'Grains/Cereals', Descriptions: 'Breads, crackers, pasta, and cereal'},
				{CategoryID: 6, CategoryName: 'Meat/Poultry', Descriptions: 'Prepared meats'},
				{CategoryID: 7, CategoryName: 'Produce', Descriptions: 'Dried fruit and bean curd'},
				{CategoryID: 8, CategoryName: 'Seafood', Descriptions: 'Seaweed and fish'}
			],
			cellTemplate: Vue.component("celltemplate-component", {
				props: {
					dataItem: Object
				},

				template: `<kendo-grid
							:style="{height: 'auto'}" 
							:data-items="getFilteredProducts"
							@remove="remove"
                     		:columns="columns">
               				</kendo-grid>`,

				data () {
					var products = [{
						"ProductID": 1,
						"ProductName": "Chai",
						"SupplierID": 1,
						"CategoryID": 1,
						"QuantityPerUnit": "10 boxes x 20 bags",
						"UnitPrice": 18.0000,
						"UnitsInStock": 39,
						"UnitsOnOrder": 0,
						"ReorderLevel": 10,
						"Discontinued": false,
						"Category": {
							"CategoryID": 1,
							"CategoryName": "Beverages",
							"Description": "Soft drinks, coffees, teas, beers, and ales"
						}
					},
					{
						"ProductID": 2,
						"ProductName": "Chang",
						"SupplierID": 1,
						"CategoryID": 1,
						"QuantityPerUnit": "24 - 12 oz bottles",
						"UnitPrice": 19.0000,
						"UnitsInStock": 17,
						"UnitsOnOrder": 40,
						"ReorderLevel": 25,
						"Discontinued": false,
						"Category": {
							"CategoryID": 1,
							"CategoryName": "Beverages",
							"Description": "Soft drinks, coffees, teas, beers, and ales"
						}
					},
					{
						"ProductID": 3,
						"ProductName": "Aniseed Syrup",
						"SupplierID": 1,
						"CategoryID": 2,
						"QuantityPerUnit": "12 - 550 ml bottles",
						"UnitPrice": 10.0000,
						"UnitsInStock": 13,
						"UnitsOnOrder": 70,
						"ReorderLevel": 25,
						"Discontinued": false,
						"Category": {
							"CategoryID": 2,
							"CategoryName": "Condiments",
							"Description": "Sweet and savory sauces, relishes, spreads, and seasonings"
						}
					},
					{
						"ProductID": 4,
						"ProductName": "Chef Anton's Cajun Seasoning",
						"SupplierID": 2,
						"CategoryID": 2,
						"QuantityPerUnit": "48 - 6 oz jars",
						"UnitPrice": 22.0000,
						"UnitsInStock": 53,
						"UnitsOnOrder": 0,
						"ReorderLevel": 0,
						"Discontinued": false,
						"Category": {
							"CategoryID": 2,
							"CategoryName": "Condiments",
							"Description": "Sweet and savory sauces, relishes, spreads, and seasonings"
						}
					},
					{
						"ProductID": 5,
						"ProductName": "Chef Anton's Gumbo Mix",
						"SupplierID": 2,
						"CategoryID": 2,
						"QuantityPerUnit": "36 boxes",
						"UnitPrice": 21.3500,
						"UnitsInStock": 0,
						"UnitsOnOrder": 0,
						"ReorderLevel": 0,
						"Discontinued": true,
						"Category": {
							"CategoryID": 2,
							"CategoryName": "Condiments",
							"Description": "Sweet and savory sauces, relishes, spreads, and seasonings"
						}
					},
					{
						"ProductID": 6,
						"ProductName": "Grandma's Boysenberry Spread",
						"SupplierID": 3,
						"CategoryID": 2,
						"QuantityPerUnit": "12 - 8 oz jars",
						"UnitPrice": 25.0000,
						"UnitsInStock": 120,
						"UnitsOnOrder": 0,
						"ReorderLevel": 25,
						"Discontinued": false,
						"Category": {
							"CategoryID": 2,
							"CategoryName": "Condiments",
							"Description": "Sweet and savory sauces, relishes, spreads, and seasonings"
						}
					},
					{
						"ProductID": 7,
						"ProductName": "Uncle Bob's Organic Dried Pears",
						"SupplierID": 3,
						"CategoryID": 7,
						"QuantityPerUnit": "12 - 1 lb pkgs.",
						"UnitPrice": 30.0000,
						"UnitsInStock": 15,
						"UnitsOnOrder": 0,
						"ReorderLevel": 10,
						"Discontinued": false,
						"Category": {
							"CategoryID": 7,
							"CategoryName": "Produce",
							"Description": "Dried fruit and bean curd"
						}
					},
					{
						"ProductID": 8,
						"ProductName": "Northwoods Cranberry Sauce",
						"SupplierID": 3,
						"CategoryID": 2,
						"QuantityPerUnit": "12 - 12 oz jars",
						"UnitPrice": 40.0000,
						"UnitsInStock": 6,
						"UnitsOnOrder": 0,
						"ReorderLevel": 0,
						"Discontinued": false,
						"Category": {
							"CategoryID": 2,
							"CategoryName": "Condiments",
							"Description": "Sweet and savory sauces, relishes, spreads, and seasonings"
						}
					},
					{
						"ProductID": 9,
						"ProductName": "Mishi Kobe Niku",
						"SupplierID": 4,
						"CategoryID": 6,
						"QuantityPerUnit": "18 - 500 g pkgs.",
						"UnitPrice": 97.0000,
						"UnitsInStock": 29,
						"UnitsOnOrder": 0,
						"ReorderLevel": 0,
						"Discontinued": true,
						"Category": {
							"CategoryID": 6,
							"CategoryName": "Meat/Poultry",
							"Description": "Prepared meats"
						}
					},
					{
						"ProductID": 10,
						"ProductName": "Ikura",
						"SupplierID": 4,
						"CategoryID": 8,
						"QuantityPerUnit": "12 - 200 ml jars",
						"UnitPrice": 31.0000,
						"UnitsInStock": 31,
						"UnitsOnOrder": 0,
						"ReorderLevel": 0,
						"Discontinued": false,
						"Category": {
							"CategoryID": 8,
							"CategoryName": "Seafood",
							"Description": "Seaweed and fish"
						}
					}];
					var CommandCell = Vue.component("commandcelltemplate-component", {
						props: {
							field: String,
							dataItem: Object,
							format: String,
							className: String,
							columnIndex: Number,
							columnsCount: Number,
							rowType: String,
							level: Number,
							expanded: Boolean,
							editor: String
						},

						template: ` <td v-if="!dataItem['inEdit']">
										<button
											class="k-button k-grid-remove-command"
											@click="removeHandler">
											Remove
										</button>
									</td>`,

						methods: {
							removeHandler: function() {
								this.$emit('remove', this.dataItem);
								console.log('removeHandler: ', this.dataItem);
							}
						}
					});
					return {
						columns: [
							{ field: 'ProductID', title: 'ID', width: '50px' },
							{ field: 'ProductName', title: 'Name' },
							{ cell: CommandCell, width: '180px' }
						],
						products: products
					}
				},
				computed: {
					getFilteredProducts() {
						const result = filterBy(this.products, {field: 'Category.CategoryID', operator: 'eq', value: this.dataItem.CategoryID});

						return result;
					}
				},
				methods: {
					update(data, item, remove) {
						let updated;
						let index = data.findIndex(p => item.ProductID && p.ProductID === item.ProductID);
						if (index >= 0) {
							updated = Object.assign({}, item);
							data[index] = updated;
					} else {
						let id = 1;
						data.forEach(p => { if (p.ProductID) { id = Math.max(p.ProductID + 1, id); } });
						updated = Object.assign({}, item, { ProductID: id });
						data.unshift(updated);
						index = 0;
					}

					if (remove) {
						data = data.splice(index, 1);
					}
						return data[index];
					},
					remove(e) {
						console.log('prosledjeno u remove: ', e);
						this.update(this.products, e.dataItem, true);
						this.products = this.products.slice();
					}
				}
			}),
			columns: [
				{ field: 'CategoryID', title: 'ID', width: '50px' },
				{ field: 'CategoryName', title: 'Name' }
			]
		};
	},
	methods: {
		signOut() {
			this.$router.push('/login');
		},
		expandChange(event) {
			Vue.set(event.dataItem, event.target.$props.expandField, event.value);
		}
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
