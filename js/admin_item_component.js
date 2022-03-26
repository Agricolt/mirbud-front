Vue.component('admin-item', {

	methods : {
	},
	props: ['item_photo_url', 'item_name',, 'is_archive', 'item_price', 'item_id', 'item_count'],
	template: `
    <li :class="item_id">
        <div class="admin-item admin-column">
            <img class="admin-item-image" :src="item_photo_url" width="100" height="100">
            <span class="admin-item-title">{{item_name}}</span>
        </div>
        <span class="admin-archival admin-column">{{is_archive}}</span>
        <span class="admin-price admin-column">{{item_price}}</span>
        <div class="admin-quantity admin-column">
            <span class="admin-quantity-input">{{item_count}}</span>
        </div>
        <div class="admin-buttons admin-column">
           <button class="btn btn-modify" type="button">Modyfikuj</button>
        </div>
    </li>
		`
})