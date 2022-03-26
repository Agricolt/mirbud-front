Vue.use(VueToast, {});

new Vue({
  el: "#app",

  data: {
    reapet_password: "",
    user: {
      email: "",
      haslo: "",
      id: 0,
      imie: "",
      kodPocztowy: "",
      miejscowosc: "",
      nazwisko: "",
      nrTelefonu: "",
      ulicaNrDomu: "",
    },
    completed: false,
  },

  watch: {
    completed() {
      this.user.email = "";
      this.user.haslo = "";
      this.user.imie = "";
      this.user.kodPocztowy = "";
      this.user.miejscowosc = "";
      this.user.nazwisko = "";
      this.user.nrTelefonu = "";
      this.user.ulicaNrDomu = "";
      this.reapet_password = "";
      this.completed = false;
    },
  },

  methods: {
    register() {
      if (this.user.haslo == this.reapet_password) {
        axios
          .post(
            "https://mirbud-restapi.herokuapp.com/api/clients/registration",
            this.user
          )
          .then(
            (response) => {
              this.$toast.open({
                message: "Rejestracja przebiegła pomyślnie",
                type: "success",
                duration: 5000,
                dismissible: true,
              });
              this.completed = true;
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
      } else {
        this.$toast.open({
          message: "Hasła się nie zgadzają",
          type: "error",
          duration: 5000,
          dismissible: true,
        });
        this.user.haslo = "";
        this.reapet_password = "";
      }
    },
  },
});
