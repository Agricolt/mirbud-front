// Functions for easy array acces from localStorage
Storage.prototype.setObj = function(key, obj) {
    return this.setItem(key, JSON.stringify(obj))
}
Storage.prototype.getObj = function(key) {
    return JSON.parse(this.getItem(key))
}

Vue.component('history-order', {
	props: ['order_no', 'order_date', 'order_state', 'order_sum', 'items_list'],
    data: function() {
        return {
            textOrderState : 'Niezrealizowane'
        }
    },
    created() {
        if (this.order_state == true){
            this.textOrderState = 'Zrealizowane';
        }
    },
	template: `
    <li class="order_item">
            <div class="order_details">
                <h2>Numer zamówienia: {{order_no}}</h2>
                <h6>Data zamówienia: {{order_date}}</h6>
                <h4 class="done_string">Stan zamówienia: {{textOrderState}}</h4>
                <h2>Lista przedmiotów zamówienia:</h2>
                <ul class="list_of_items_order">
                    <history-order-item
                    v-for="i in items_list"
                    v-bind:item_photo_url="i.item.zdjecia[0]"
                    v-bind:item_name="i.item.nazwa"
                    v-bind:item_price="i.cenaSprzedazy"
                    v-bind:item_count="i.iloscPrzedmiotu"
                    v-bind:is_archived="i.item.czyArchiwalny"
                    ></history-order-item>
                </ul>
                <h3>Suma całkowita: {{order_sum}}</h3>
            </div>
        </li>
		`
})