Vue.component('category-checkbox', {

	methods : {
	},
	props: ['category', 'category_id'],
	template: `
    <li class="category_filter_element">
		<input type="checkbox" :id="category" class="category_checkbox" :name="category_id" :value="category">
		<label :for="category_id">{{category}}</label><br>
	</li>
		`
})