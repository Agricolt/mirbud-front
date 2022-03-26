Storage.prototype.setObj = function(key, obj) {
    return this.setItem(key, JSON.stringify(obj))
}
Storage.prototype.getObj = function(key) {
    return JSON.parse(this.getItem(key))
}

app3 = new Vue({
	el : '.nav_bar',
	data :{
		user_name : 'Niezalogowany - Gość'
	},
	mounted() {
		// Get the user email to be displayed on the page
		var userData = sessionStorage.getObj('userData');
		if(userData != null){
			this.user_name = userData.email;
			var loginBtn = document.getElementsByClassName('login_btn')[0];
			if (loginBtn != null){
				loginBtn.remove();
			}
		}
	},
});