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
	el: '.cart-items',
	data: {
		cart: [] // cart items loaded from localStorage
	},
	created() {
		// getting objects must be in created funciton
		this.cart = localStorage.getObj('cart');
	},
	mounted() {
		// add remove button action and quantity changed event to every cart element
		var removeCartItemButtons = document.getElementsByClassName('btn-danger');
		for (var i = 0; i < removeCartItemButtons.length; i++) {
			var button = removeCartItemButtons[i]
			button.addEventListener('click', this.removeCartItem);
		}
	
		var quantityInputs = document.getElementsByClassName('cart-quantity-input');
		for (var i = 0; i < quantityInputs.length; i++) {
			var input = quantityInputs[i];
			input.addEventListener('change', this.quantityChanged);
		}
	
		document.getElementsByClassName('btn-purchase')[0].addEventListener('click', this.purchaseClicked);
		this.updateCartTotal();
	},
	methods: {
		purchaseClicked : function(){
			// make a post request
			var jsonPostParams = {
				"clientId": 0, 
				"itemsId": [],
				"itemsQuantity": []
			}
			var userData = sessionStorage.getObj('userData');
			jsonPostParams.clientId = userData.id;

			for(var i = 0; i < this.cart.length; i++){
				jsonPostParams.itemsId.push(this.cart[i].item_id);
				jsonPostParams.itemsQuantity.push(this.cart[i].item_count);
			}

			if (jsonPostParams.itemsId.length == 0){
				this.$toast.open({
					message: "Zamówienie nie zostało złożone. Koszyk jest pusty!",
					type: "warning",
					duration: 5000,
					dismissible: true,
					position: 'bottom'
				});
				return;
			}

			axios.post('https://mirbud-restapi.herokuapp.com/api/orders', jsonPostParams)
			.then((response) =>{
				this.$toast.open({
					message: "Zamówienie zostało złożone!",
					type: "success",
					duration: 5000,
					dismissible: true,
					position: 'bottom'
				});
			},
			(error) => {
				// Display an error
				this.$toast.open({
					message: "Zamówienie nie zostało złożone. Spróbuj ponownie za chwilę",
					type: "warning",
					duration: 5000,
					dismissible: true,
					position: 'bottom'
				});
				return;
			});
			this.cart = [];
			localStorage.setObj('cart', this.cart);
			var cartItems = document.getElementsByClassName('cart-items')[0];
			while (cartItems.hasChildNodes()) {
				cartItems.removeChild(cartItems.firstChild);
			}
			this.updateCartTotal();
		},
		quantityChanged : function(event){
			var newValue = event.target.value;
			var itemId = event.target.parentElement.parentElement.classList[1];

			if (isNaN(newValue) || newValue <= 0) {//chcemy 1 lub wiecej
				newValue = 1;
			}

			for(var i = 0; i < this.cart.length; i++){
				if (this.cart[i].item_id == itemId){
					this.cart[i].item_count = newValue;
				}
			}

			this.updateCartTotal();
		},
		removeCartItem : function(event){
			//usuwanie produktów z koszyka
			var buttonClicked = event.target;
			// usun przedmiot z listy przedmiotow
			var classString = buttonClicked.parentElement.parentElement.className;
			var classesSeparated = classString.split(' ');
			var itemId = classesSeparated[1];
			console.log(this.cart);
			for (var i = 0; i < this.cart.length; i++){
				console.log(this.cart[i].item_id);
				if (itemId == this.cart[i].item_id){
					this.cart.splice(i, 1);
				}
			}
			localStorage.removeItem('cart');
			localStorage.setObj('cart', this.cart);
			// usun przedmiot z widoku
			buttonClicked.parentElement.parentElement.remove();
			
			this.updateCartTotal();
		},
		updateCartTotal : function(){
			var cartItemContainer = document.getElementsByClassName('cart-items')[0];
			var cartRows = cartItemContainer.getElementsByClassName('cart-row');
			var total = 0;
			for (var i = 0; i < cartRows.length; i++) {
				var cartRow = cartRows[i];
				var priceElement = cartRow.getElementsByClassName('cart-price')[0];
				var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')
				[0]
				var price = parseFloat(priceElement.innerText.replace(' zł', ''));
				var quantity = quantityElement.value;
				total = total + (price * quantity);
			}
			total = Math.round(total * 100) / 100 //zeby nie bylo miliona liczb po przecinku
			document.getElementsByClassName('cart-total-price')[0].innerText = total + ' zł';
		}
	}
})
