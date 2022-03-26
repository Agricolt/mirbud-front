// Functions for easy array acces from localStorage

Storage.prototype.setObj = function(key, obj) {
    return this.setItem(key, JSON.stringify(obj))
}
Storage.prototype.getObj = function(key) {
    return JSON.parse(this.getItem(key))
}

Vue.use(VueToast, {

});

app = new Vue({
	el: '.main_body',
	data: {
		items: [] // recommended items loaded from API
	},
	beforeCreate() {
		axios.get('https://mirbud-restapi.herokuapp.com/api/item/recommended/')
		.then(response => {
			this.items = response.data;
			document.getElementsByClassName('loader_indicator')[0].remove();
		})
		.catch(error => {
			window.location.href = 'error.html?error=503';
		});
	},
})