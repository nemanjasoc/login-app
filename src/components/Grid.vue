<template>
	<div style="width:100%">
		<div class="top-container">
			<h1>Edit your data</h1>
			<div class="sign-out-button" @click="signOut">Sign out</div>
		</div>

		<kendo-grid
			ref="grid"
			:style="{height: '500px', width: '100%'}"
			:data-items="categories"
			:detail="cellTemplate"
			:edit-field="'inEdit'"
			@edit="edit"
			@remove="remove"
			@save="save"
			@cancel="cancel"
			@itemchange="itemChange"
			:columns="columns"
			@expandchange="expandChange"
			:expand-field="'expanded'">
				<grid-norecords>
					There is no data available custom
				</grid-norecords>
		</kendo-grid>
	</div>
</template>

<script>
import Vue from 'vue'
import { process, filterBy } from '@progress/kendo-data-query'

export default {
	data() {
		const OuterCommandCell = Vue.component("outercommandcell-component", {
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
								class="k-primary k-button k-grid-edit-command"
								@click="outerEditHandler">
								Edit
							</button>
							<button
								class="k-button k-grid-remove-command"
								@click="outerRemoveHandler">
								Remove
							</button>
						</td>
						<td v-else>
							<button
								class="k-button k-grid-save-command"
								@click="outerAddUpdateHandler">
								{{this.dataItem.CategoryID? 'Update' : 'Add'}}
							</button>
							<button
								class="k-button k-grid-cancel-command"
								@click="outerCancelDiscardHandler">
								{{this.dataItem.CategoryID? 'Cancel' : 'Discard'}}
							</button>
						</td>`,

			methods: {
				outerEditHandler: function() {
					this.$emit('edit', this.dataItem);
				},
				outerRemoveHandler: function() {
					this.$emit('remove', this.dataItem);
				},
				outerAddUpdateHandler: function() {
					this.$emit('save', this.dataItem);
				},
				outerCancelDiscardHandler: function() {
					this.$emit('cancel', this.dataItem);
				}
			}
		});

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
							:edit-field="'inEdit'"
							@edit="edit"
							@remove="remove"
							@save="save"
							@cancel="cancel"
							@itemchange="itemChange"
							:columns="columns">
								<grid-norecords>
									There is no data available custom
								</grid-norecords>
							</kendo-grid>`,

				data () {
					var products = [{
						"ProductID": 1,
						"ProductName": "Chai",
						"UnitsInStock": 39,
						"Discontinued": false,
						"FirstOrderedOn": new Date(1996, 8, 20),
						"Category": {
							"CategoryID": 1,
							"CategoryName": "Beverages",
							"Description": "Soft drinks, coffees, teas, beers, and ales"
						}
					},
					{
						"ProductID": 2,
						"ProductName": "Chang",
						"UnitsInStock": 17,
						"Discontinued": false,
						"FirstOrderedOn": new Date(1996, 7, 12),
						"Category": {
							"CategoryID": 1,
							"CategoryName": "Beverages",
							"Description": "Soft drinks, coffees, teas, beers, and ales"
						}
					},
					{
						"ProductID": 3,
						"ProductName": "Aniseed Syrup",
						"UnitsInStock": 13,
						"Discontinued": false,
						"FirstOrderedOn": new Date(1996, 8, 26),
						"Category": {
							"CategoryID": 2,
							"CategoryName": "Condiments",
							"Description": "Sweet and savory sauces, relishes, spreads, and seasonings"
						}
					},
					{
						"ProductID": 4,
						"ProductName": "Chef Anton's Cajun Seasoning",
						"UnitsInStock": 53,
						"Discontinued": false,
						"FirstOrderedOn": new Date(1996, 9, 19),
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

					var InnerCommandCell = Vue.component("innercommandcell-component", {
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

						template: `<td v-if="!dataItem['inEdit']">
										<button
											class="k-primary k-button k-grid-edit-command"
											@click="innerEditHandler">
											Edit
										</button>
										<button
											class="k-button k-grid-remove-command"
											@click="innerRemoveHandler">
											Remove
										</button>
									</td>
									<td v-else>
										<button
											class="k-button k-grid-save-command"
											@click="innerAddUpdateHandler">
											{{this.dataItem.ProductID? 'Update' : 'Add'}}
										</button>
										<button
											class="k-button k-grid-cancel-command"
											@click="innerCancelDiscardHandler">
											{{this.dataItem.ProductID? 'Cancel' : 'Discard'}}
										</button>
									</td>`,

						methods: {
							innerEditHandler: function() {
								this.$emit('edit', this.dataItem);
								console.log("innerEditHandler: ", this.dataItem); 
							},
							innerRemoveHandler: function() {
								this.$emit('remove', this.dataItem);
								console.log('innerRemoveHandler: ', this.dataItem); 
							},
							innerAddUpdateHandler: function() {
								this.$emit('save', this.dataItem);
								console.log('innerAddUpdateHandler', this.dataItem); 
							},
							innerCancelDiscardHandler: function() {
								this.$emit('cancel', this.dataItem);
								console.log("innerCancelDiscardHandler: ", this.dataItem); 
							},
						}
					});
					return {
						columns: [
							{ field: 'ProductID', editable: false, title: 'ID', width: '50px' },
							{ field: 'ProductName', title: 'Name' },
							{ field: 'FirstOrderedOn', editor: 'date', title: 'First Ordered', format: '{0:d}' },
							{ cell: InnerCommandCell, width: '180px' }
						],
						products: products
					}
				},
				computed: {
					getFilteredProducts() {
						const result = filterBy(this.products, {field: 'Category.CategoryID', operator: 'eq', value: this.dataItem.CategoryID});
						console.log("getFilteredProducts result: ", result);
						return result;
					},
					hasItemsInEdit() {
						return this.products.filter(p => p.inEdit).length > 0;
					}
				},
				methods: {
					update(data, item, remove) {
						console.log('prosledjeno u update, data, item, remove: ', data, item, remove);
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
						e.dataItem.inEdit = undefined;
						this.update(this.products, e.dataItem, true);
						this.products = this.products.slice();
					},
					itemChange: function (e) {
						console.log("prosledjeno u itemChang: ", e)
						if (e.dataItem.ProductID) {
							let item = this.products.find(p => p.ProductID === e.dataItem.ProductID);
							let index = this.products.findIndex(p => p.ProductID === item.ProductID);
							Vue.set(item, e.field, e.value);
							console.log("itemChange set: ", item, e.field, e.value)
						} else {
							Vue.set(e.dataItem, e.field, e.value);
							console.log(" else itemChange set: ", e.dataItem, e.field, e.value)
						}
					},
					edit: function (e) {
						console.log("prosledjeno u edit: ", e)
						Vue.set(e.dataItem, 'inEdit', true);
						console.log("edit set: ", e.dataItem, 'inEdit', true)
					},
					save: function(e) {
						console.log("prosledjeno u save: ", e)
						Vue.set(e.dataItem, 'inEdit', undefined);
						let item = this.products.find(p => p.ProductID === e.dataItem.ProductID);
						let index = this.products.findIndex(p => p.ProductID === item.ProductID);

						Vue.set(this.products, index, this.update(this.products.slice(), item));
						Vue.set(this.products[index], 'inEdit', undefined);
					},
					cancel(e) {
						console.log("prosledjeno u cancel: ", e)
						if (e.dataItem.ProductID) {
							let originalItem = this.products.find(p => p.ProductID === e.dataItem.ProductID);
							let index = this.products.findIndex(p => p.ProductID === originalItem.ProductID);

							Vue.set(originalItem, 'inEdit', undefined);
							Vue.set(this.products, index, originalItem);
						} else {
							this.update(this.products, e.dataItem, true);
						}
					}
				}
			}),
			columns: [
				{ field: 'CategoryID', title: 'ID', width: '50px' },
				{ field: 'CategoryName', title: 'Name' },
				{ cell: OuterCommandCell, width: '180px' }
			]
		};
	},
	computed: {
		hasItemsInEdit() {
			return this.categories.filter(p => p.inEdit).length > 0;
		}
    },
	methods: {
		signOut() {
			this.$router.push('/login');
		},
		expandChange(event) {
			Vue.set(event.dataItem, event.target.$props.expandField, event.value);
		},
		update(data, item, remove) {
			console.log('prosledjeno u update, data, item, remove: ', data, item, remove);
			let updated;
			let index = data.findIndex(p => item.CategoryID && p.CategoryID === item.CategoryID);
			if (index >= 0) {
				updated = Object.assign({}, item);
				data[index] = updated;
			} else {
				let id = 1;
				data.forEach(p => { if (p.CategoryID) { id = Math.max(p.CategoryID + 1, id); } });
				updated = Object.assign({}, item, { CategoryID: id });
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
			e.dataItem.inEdit = undefined;
			this.update(this.categories, e.dataItem, true);
			this.categories = this.categories.slice();
		},
		itemChange: function (e) {
			console.log("prosledjeno u itemChang: ", e)
			if (e.dataItem.CategoryID) {
				let item = this.categories.find(p => p.CategoryID === e.dataItem.CategoryID);
				let index = this.categories.findIndex(p => p.CategoryID === item.CategoryID);
				Vue.set(item, e.field, e.value);
				console.log("itemChange set: ", item, e.field, e.value)
			} else {
				Vue.set(e.dataItem, e.field, e.value);
				console.log(" else itemChange set: ", e.dataItem, e.field, e.value)
			}
		},
		edit: function (e) {
			console.log("prosledjeno u edit: ", e)
			Vue.set(e.dataItem, 'inEdit', true);
			console.log("edit set: ", e.dataItem, 'inEdit', true)
		},
		save: function(e) {
			console.log("prosledjeno u save: ", e)
			Vue.set(e.dataItem, 'inEdit', undefined);
			let item = this.categories.find(p => p.CategoryID === e.dataItem.CategoryID);
			let index = this.categories.findIndex(p => p.CategoryID === item.CategoryID);

			Vue.set(this.categories, index, this.update(this.categories.slice(), item));
			Vue.set(this.categories[index], 'inEdit', undefined);
		},
		cancel(e) {
			console.log("prosledjeno u cancel: ", e)
			if (e.dataItem.CategoryID) {
				let originalItem = this.categories.find(p => p.CategoryID === e.dataItem.CategoryID);
				let index = this.categories.findIndex(p => p.CategoryID === originalItem.CategoryID);

				Vue.set(originalItem, 'inEdit', undefined);
				Vue.set(this.categories, index, originalItem);
			} else {
				this.update(this.categories, e.dataItem, true);
			}
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
