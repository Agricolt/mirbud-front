Vue.use(VueToast, {

});

app = new Vue({
	el: '.main_body',
	data: {
		items: [], 			// all items list loaded from API
		viewedItems: [], 	// items currently rendered

		categories: [], 		// categories to display
		categoryQueryString: "",
		lastRenderedItemIndex: 12
	},
	created: function() {
		//get the category from urlQuery
		const urlParams = new URLSearchParams(window.location.search);
		const categoriesParam = urlParams.get('category');

		this.categoryQueryString = categoriesParam;
		var queryURL = 'https://mirbud-restapi.herokuapp.com/api/item/categories/active/' + this.categoryQueryString;

		var data;
		// get data from API
		// fucntion must be async await to make sure
		// all data will be fetched correctly
		const sendGetRequestItems = async () => {
			try{
				const resp = await axios.get(queryURL);
				this.items = resp.data; 

				// items are fetched now, assign first 12 to render them
				var i;
				for (i = 0; i < this.lastRenderedItemIndex && i < this.items.length; i ++){
					this.viewedItems.push(this.items[i]);
				}
				document.getElementsByClassName('loader_indicator')[0].remove();
			}
			catch (err){
				//window.location.href = 'error.html?error=503';
			}
		};
		sendGetRequestItems();

		const sendGetRequestCategories = async () => {
			try{
				const resp = await axios.get("https://mirbud-restapi.herokuapp.com/api/categories/getAll");
				this.categories = resp.data; 
			}
			catch (err){
				window.location.href = 'error.html?error=503';
			}
		};
		sendGetRequestCategories();
	},
	methods: {
		clickForward : function(){
			if (this.lastRenderedItemIndex == this.items.length + 1){
				return;
			}

			viewedItems = [];
			var i;
			if (this.lastRenderedItemIndex + 12 < this.items.length){
				for (i = this.lastRenderedItemIndex; i < this.lastRenderedItemIndex + 12; i++){
					this.viewedItems.push(this.items[i]);
				}
				this.lastRenderedItemIndex = this.lastRenderedItemIndex + 12;
			}
			else{
				for (i = this.lastRenderedItemIndex; i < this.items.length; i++){
					this.viewedItems.push(this.items[i]);
				}
				this.lastRenderedItemIndex = this.lastRenderedItemIndex + this.items.length;
			}
		},
		filter : function(){
			this.items = [];
			this.viewedItems = [];
			this.lastRenderedItemIndex = 12;
			var categoriesQuery = "";
			var checkboxes = document.querySelectorAll('.category_checkbox');
			for (var i = 0; i < checkboxes.length; i++){
				if (checkboxes[i].checked == true){
					categoriesQuery += checkboxes[i].value + ', ';
				}
			}
			// cut the last character to avoid lone comma
			categoriesQuery = categoriesQuery.substr(0, categoriesQuery.length - 2);

			const sendGetRequestSelectedItems = async () => {
				try{
					var endAddress = "https://mirbud-restapi.herokuapp.com/api/item/categories/" + categoriesQuery;
					const resp = await axios.get(endAddress);
					this.items = resp.data; 

					var elements = document.getElementsByClassName('item');

					// items are fetched now, assign first 12 to render them
					var i;
					for (i = 0; i < this.lastRenderedItemIndex && i < this.items.length; i++){
						this.viewedItems.push(this.items[i]);
					}
				}
				catch (err){
					window.location.href = 'error.html?error=503';
				}
			};
			sendGetRequestSelectedItems();
		}
	}
})