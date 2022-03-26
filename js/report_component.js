Vue.component("report", {
  props: ["item_id", "item_ilosc", "item_nazwa", "item_zysk"],
  template: `
          <div>
          <div class="manager-container">
              <span class="cart-item-title2">{{item_id}}</span>
              <span class="cart-item-title2">{{item_nazwa}} </span>
              <span class="cart-item-title2">{{item_ilosc}} </span>
              <span class="cart-item-title2">{{item_zysk}} </span>
          </div>
          <hr>
          </div>
          `,
});
