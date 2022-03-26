Vue.use(VueToast, {});

Vue.component("manager", {
  methods: {
    storeId(managerId) {
      axios
        .delete(
          `https://mirbud-restapi.herokuapp.com/api/clients/managers/${managerId}`
        )
        .then(
          (response) => {
            this.$toast.open({
              message: "Pomyślnie usunięto menadżera",
              type: "success",
              duration: 5000,
              dismissible: true,
            });
          },
          (error) => {
            if (error.response.data.message != null) {
              this.$toast.open({
                message: error.response.data.message,
                type: "error",
                duration: 5000,
                dismissible: true,
              });
            } else
              this.$toast.open({
                message: error.response.data,
                type: "error",
                duration: 5000,
                dismissible: true,
              });
          }
        );
    },
  },
  props: [
    "manager_name",
    "manager_surname",
    "manager_email",
    "manager_id",
    "manager_number",
    "manager_city",
  ],
  template: `
          <div>
          <div class="manager-container">
              <span class="cart-item-title2">{{manager_name}} {{manager_surname}} </span>
              <span class="cart-item-title2">{{manager_email}} </span>
              <span class="cart-item-title2">{{manager_number}} </span>
              <span class="cart-item-title2">{{manager_city}} </span>
              <button v-on:click="storeId(manager_id)" class="btn btn-danger" type="button">Usuń</button>
              
          </div>
          <hr>
          </div>
          `,
});
