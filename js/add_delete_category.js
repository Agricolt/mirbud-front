Vue.use(VueToast, {});

new Vue({
  el: "#app",
  data: {
    dostepne_kategorie: [],
    dodaj_kategoria: "",
  },

  mounted() {
    axios
      .get("https://mirbud-restapi.herokuapp.com/api/categories/getAll")
      .then(
        (response) => {
          this.dostepne_kategorie = response.data;
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
  methods: {
    addNewCategory() {
      axios
        .post("https://mirbud-restapi.herokuapp.com/api/categories/add", {
          id: 0,
          kategoriaPrzedmiotyId: [0],
          nazwaKategorii: this.dodaj_kategoria,
        })
        .then(
          (response) => {
            this.$toast.open({
              message: "Pomyślnie dodano nową kategorię",
              type: "success",
              duration: 5000,
              dismissible: true,
            });
            this.dostepne_kategorie.push({
              id: 0,
              kategoriaPrzedmiotyId: [0],
              nazwaKategorii: this.dodaj_kategoria,
            });

            this.dodaj_kategoria = "";
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
    deleteCategory() {
      axios
        .delete(
          `https://mirbud-restapi.herokuapp.com/api/categories/delete/${this.dodaj_kategoria}`
        )
        .then(
          (response) => {
            this.$toast.open({
              message: "Pomyślnie usunięto kategorię",
              type: "success",
              duration: 5000,
              dismissible: true,
            });

            const index = this.dostepne_kategorie.findIndex(
              (item) => item.nazwaKategorii == this.dodaj_kategoria
            );
            this.dostepne_kategorie.splice(index, 1);
            this.dodaj_kategoria = "";
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
});
