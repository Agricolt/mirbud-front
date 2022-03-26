// Functions for easy array acces from localStorage

Storage.prototype.setObj = function(key, obj) {
    return this.setItem(key, JSON.stringify(obj))
}
Storage.prototype.getObj = function(key) {
    return JSON.parse(this.getItem(key))
}

Vue.component('displayed-item', {
	methods : {
		addToCart : function(item_id, item_name, item_photo_url, item_price, item_rating){
			var cartArray = localStorage.getObj('cart');
			// check if item is already in cart - if yes just add 1 more to item_count
			if (cartArray.length == 0){
				this.pushAnItem(item_id, item_name, item_photo_url, item_price, item_rating);
			}
			else{
				if (this.checkIfAlreadyInCartAndIncCount(item_id) == false){
					this.pushAnItem(item_id, item_name, item_photo_url, item_price, item_rating);
				}
			}
			// Display a toast message
			this.$toast.open({
				message: "Przedmiot: " + item_name + " został pomyślnie dodany do koszyka",
				type: "success",
				duration: 5000,
				dismissible: true
			})
		},
		checkIfAlreadyInCartAndIncCount : function(item_id){
			var cartArray = localStorage.getObj('cart');
			for (var i = 0; i < cartArray.length; i++){
				if (cartArray[i].item_id == item_id){
					cartArray[i].item_count++;
					localStorage.removeItem('cart');
					localStorage.setObj('cart', cartArray);
					return true;
				}
			}
			return false;
		},
		pushAnItem : function(item_id, item_name, item_photo_url, item_price, item_rating){
			var cartArray = localStorage.getObj('cart');
			cartArray.push({
				item_id: item_id,
				item_name: item_name,
				item_photo_url: item_photo_url,
				item_price: item_price,
				item_rating: item_rating,
				item_count: 1
			})
			localStorage.removeItem('cart');
			localStorage.setObj('cart', cartArray);
		}
	},
	props: ['item_class', 'item_photo_url', 'item_name', 'item_price', 'item_rating', 'item_id'],
	template: `
				<li>
				<div :class="item_class">
					<img :src="item_photo_url" class="item_photo">
					<a :href="'item_detail.html' + '?itemId=' + item_id" ><h4 class="item_name">{{item_name}}</h4></a>
					<h4 class="item_price">Cena za sztukę: {{item_price}}</h4>
					<h4 class="item_rating">Ocena: {{item_rating}}</h4>
					<button class="add_to_cart_button"  v-on:click="addToCart(item_id, item_name, item_photo_url, item_price, item_rating)">
						<div class="add_to_cart_box">
							<img src="img/add_to_cart.png" class="add_to_cart">
							<p>
								Dodaj do koszyka
							</p>
						</div>
					</button>
				</div>
			</li>
		`
});
