<template>
	<div style="width:100%">
		<div class="top-container">
			<h1>Edit your data</h1>
			<div class="log-out-button" @click="logOut">Logout</div>
		</div>

		<kendo-grid
				ref="grid"
				:style="{height: 'auto', width: '100%'}"
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
				<grid-toolbar>
					<button title="Add new"
							class="k-button k-primary"
							@click='insert'>
							Add new
					</button>
					<button v-if="hasItemsInEdit"
							title="Cancel current changes"
							class="k-button"
							@click="cancelChanges">
							Cancel current changes
					</button>
				</grid-toolbar>
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
		/*OUTER*/
		const OuterDropDownCell = Vue.component('outerdropdowncell-component', {
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

			template: `<td v-if="!dataItem.inEdit" :class="className">{{ dataItem[field]}}</td>
							<td v-else><select class="k-textbox" @change="change">
							<option>True</option>
							<option>False</option>
						</select></td>`,

			methods: {
				change(e) { 
					this.$emit('change', e, e.target.value); 
				}
			}
		});//OuterDropDownCell

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
		});//OuterCommandCell
		/*INNER*/
		return {
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
							</kendo-grid>`,

				data () {
					var products = [
						{
							"ProductID": 1,
							"ProductName": "Chai",
							"CategoryID": 1,
							"QuantityPerUnit": "10 boxes x 20 bags",
							"UnitPrice": 18.0000,
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
							"CategoryID": 1,
							"QuantityPerUnit": "24 - 12 oz bottles",
							"UnitPrice": 19.0000,
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
							"CategoryID": 2,
							"QuantityPerUnit": "12 - 550 ml bottles",
							"UnitPrice": 10.0000,
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
							"CategoryID": 2,
							"QuantityPerUnit": "48 - 6 oz jars",
							"UnitPrice": 22.0000,
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
							"CategoryID": 2,
							"QuantityPerUnit": "36 boxes",
							"UnitPrice": 21.3500,
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
							"CategoryID": 2,
							"QuantityPerUnit": "12 - 8 oz jars",
							"UnitPrice": 25.0000,
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
							"CategoryID": 7,
							"QuantityPerUnit": "12 - 1 lb pkgs.",
							"UnitPrice": 30.0000,
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
							"CategoryID": 2,
							"QuantityPerUnit": "12 - 12 oz jars",
							"UnitPrice": 40.0000,
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
							"CategoryID": 6,
							"QuantityPerUnit": "18 - 500 g pkgs.",
							"UnitPrice": 97.0000,
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
							"CategoryID": 8,
							"QuantityPerUnit": "12 - 200 ml jars",
							"UnitPrice": 31.0000,
							"Discontinued": false,
							"Category": {
								"CategoryID": 8,
								"CategoryName": "Seafood",
								"Description": "Seaweed and fish"
							}
						}
					];//products

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
							},
							innerRemoveHandler: function() {
								this.$emit('remove', this.dataItem); 
							},
							innerAddUpdateHandler: function() {
								this.$emit('save', this.dataItem); 
							},
							innerCancelDiscardHandler: function() {
								this.$emit('cancel', this.dataItem); 
							},
						}
					});//InnerCommandCell

					var InnerDropDownCell = Vue.component('innerdropdowncell-component', {
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

						template: `<td v-if="!dataItem.inEdit" :class="className">{{ dataItem[field]}}</td>
										<td v-else><select class="k-textbox" @change="change">
										<option>True</option>
										<option>False</option>
									</select></td>`,

						methods: {
							change(e) {
								this.$emit('change', e, e.target.value);
							}
						}
					});//InnerDropDownCell

					return {
						updatedInnerData: [],
						columns: [
							{ field: 'ProductID', editable: false, title: 'ID', width: '50px' },
							{ field: 'ProductName', title: 'Name' },
							{ field: 'Discontinued', title: 'ValidForm', cell: InnerDropDownCell },
							{ field: 'QuantityPerUnit', title: 'Quantity'},
							{ field: 'UnitPrice', title: 'Price', editor: 'numeric'},
							{ cell: InnerCommandCell, width: '180px' }
						],
						products: products
					}
				},//data()INNER
				computed: {
					getFilteredProducts() { 
						const result = filterBy(this.products, {field: 'Category.CategoryID', operator: 'eq', value: this.dataItem.CategoryID});
						return result;
					}
				},
				mounted () {
					this.updatedInnerData = JSON.parse(JSON.stringify(this.products));
				},
				methods: {
					update(data, item, remove) { 
						let updated;
						let index = data.findIndex(p => item.ProductID && p.ProductID === item.ProductID); 
						if (index >= 0) {
							updated = Object.assign({}, item);
							data[index] = updated; 
						}
						if (remove) {
							data = data.splice(index, 1); 
						}
						return data[index];
					},
					remove(e) { 
						e.dataItem.inEdit = undefined;
						this.update(this.products, e.dataItem, true);
						this.update(this.updatedInnerData, e.dataItem, true);
						this.products = this.products.slice();
					},
					itemChange: function (e) {
						if (e.dataItem.ProductID) {
							let item = this.products.find(p => p.ProductID === e.dataItem.ProductID);
							let index = this.products.findIndex(p => p.ProductID === item.ProductID);
							Vue.set(item, e.field, e.value);
						} else {
							Vue.set(e.dataItem, e.field, e.value);
						}
					},
					edit: function (e) {
						Vue.set(e.dataItem, 'inEdit', true); 
					},
					save: function(e) {
						Vue.set(e.dataItem, 'inEdit', undefined);
						let item = this.products.find(p => p.ProductID === e.dataItem.ProductID);
						let index = this.products.findIndex(p => p.ProductID === item.ProductID);

						Vue.set(this.products, index, this.update(this.products.slice(), item));
						Vue.set(this.products[index], 'inEdit', undefined);
						this.updatedInnerData = JSON.parse(JSON.stringify(this.products));
					},
					cancel(e) {
						if (e.dataItem.ProductID) {
							let originalItem = this.updatedInnerData.find(p => p.ProductID === e.dataItem.ProductID);
							let index = this.updatedInnerData.findIndex(p => p.ProductID === originalItem.ProductID);

							Vue.set(originalItem, 'inEdit', undefined);
							Vue.set(this.products, index, originalItem);
						} else {
							this.update(this.products, e.dataItem, true);
						}
					}
				}
			}),//CellTemplate INNER
			/*OUTER*/
			categories: [
				{CategoryID: 1, CategoryName: 'Beverages', "Discontinued": false,},
				{CategoryID: 2, CategoryName: 'Condiments', "Discontinued": false,},
				{CategoryID: 3, CategoryName: 'Confections', "Discontinued": false,},
				{CategoryID: 4, CategoryName: 'Dairy Products', "Discontinued": false,},
				{CategoryID: 5, CategoryName: 'Grains/Cereals', "Discontinued": true,},
				{CategoryID: 6, CategoryName: 'Meat/Poultry', "Discontinued": false,},
				{CategoryID: 7, CategoryName: 'Produce', "Discontinued": false,},
				{CategoryID: 8, CategoryName: 'Seafood', "Discontinued": false,}
			],
			updatedData: [],
			columns: [
				{ field: 'CategoryID', title: 'ID', width: '50px' },
				{ field: 'CategoryName', title: 'Name' },
				{ field: 'Discontinued', title: 'Discontinued', cell: OuterDropDownCell },
				{ cell: OuterCommandCell, width: '180px' }
			]
		};//return INNER
	},//data() OUTER
	computed: {
		hasItemsInEdit() {
			return this.categories.filter(p => p.inEdit).length > 0;
		}
	},
	mounted () {
		this.updatedData = JSON.parse(JSON.stringify(this.categories));
	},
	methods: {
		logOut() {
			this.$store.commit('resetAuth');
			this.$router.push('/login');
		},
		expandChange(event) {
			Vue.set(event.dataItem, event.target.$props.expandField, event.value);
		},
		update(data, item, remove) {
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
			e.dataItem.inEdit = undefined;
			this.update(this.categories, e.dataItem, true);
			this.update(this.updatedData, e.dataItem, true);
			this.categories = this.categories.slice();
		},
		itemChange: function (e) {
			if (e.dataItem.CategoryID) {
				let item = this.categories.find(p => p.CategoryID === e.dataItem.CategoryID);
				let index = this.categories.findIndex(p => p.CategoryID === item.CategoryID);
				Vue.set(item, e.field, e.value);
			} else {
				Vue.set(e.dataItem, e.field, e.value);
			}
		},
		insert() {
			const dataItem = { inEdit: true, Discontinued: false };
			const newcategories = this.categories.slice();
			newcategories.unshift(dataItem);
			Vue.set(this, "categories", newcategories);
		},
		edit: function (e) {
			Vue.set(e.dataItem, 'inEdit', true);
		},
		save: function(e) {
			Vue.set(e.dataItem, 'inEdit', undefined);
			let item = this.categories.find(p => p.CategoryID === e.dataItem.CategoryID);
			let index = this.categories.findIndex(p => p.CategoryID === item.CategoryID);

			Vue.set(this.categories, index, this.update(this.categories.slice(), item));
			Vue.set(this.categories[index], 'inEdit', undefined);
			this.updatedData = JSON.parse(JSON.stringify(this.categories));
		},
		cancel(e) {
			if (e.dataItem.CategoryID) {
				let originalItem = this.updatedData.find(p => p.CategoryID === e.dataItem.CategoryID);
				let index = this.updatedData.findIndex(p => p.CategoryID === originalItem.CategoryID);

				Vue.set(originalItem, 'inEdit', undefined);
				Vue.set(this.categories, index, originalItem);
			} else {
				this.update(this.categories, e.dataItem, true);
			}
		},
		cancelChanges () { 
			let editedItems = this.updatedData.filter(p => p.inEdit === true);
			if (editedItems.length) {
				editedItems.forEach(
					item => {
						Vue.set(item, 'inEdit', undefined);
				});
			}
			Vue.set(this, 'categories', this.updatedData.slice());
		}
	}
}/*export default*/
</script>

<style lang="scss" scoped>
@import 'src/scss/mixins';
@import 'src/scss/variables';

.top-container {
	@include flexbox-space-between;
	align-items: $alignment-center;
}

.log-out-button {
	padding: 0 20px;
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
