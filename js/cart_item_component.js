Vue.component('cart-item', {

	methods : {
	},
	props: ['item_photo_url', 'item_name', 'item_price', 'item_id', 'item_count'],
	template: `
    <li :class="item_id">
        <div class="cart-item cart-column">
            <img class="cart-item-image" :src="item_photo_url" width="100" height="100">
            <span class="cart-item-title">{{item_name}}</span>
        </div>
        <span class="cart-price cart-column">{{item_price}}</span>
        <div class="cart-quantity cart-column">
            <input class="cart-quantity-input" type="number" :value="item_count">
            <button class="btn btn-danger" type="button">Usuń</button>
        </div>
    </li>
		`
})