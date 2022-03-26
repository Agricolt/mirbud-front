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
	el: '.list_of_orders',
	data: {
		items : [],
		orders : [],    		// every order client ordered is stored here
        clientID : 1,         	// client's ID
        is_orders : false
	},
    created() {
        const getOrdersHistory = async () => {
			try{
                var userData = sessionStorage.getObj('userData');
                this.clientID = userData.id;

                var queryURL = 'https://mirbud-restapi.herokuapp.com/api/orders/' + this.clientID;

				const resp = await axios.get(queryURL);
                if (resp.data != null){
                    document.getElementsByClassName('loader_indicator')[0].remove();
                    this.orders = resp.data;
                }
                else{
                    this.ifOrders = false;
                }
			}
			catch (err){
				window.location.href = 'error.html?error=503';
			}
		};
		getOrdersHistory();
    },
})