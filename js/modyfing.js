Vue.use(VueToast, {});

new Vue({
  el: "#app",

  data: {
    item: {
      cenaSprzedazy: 0,
      cenaZakupu: 0,
      czyArchiwalny: false,
      id: 0,
      iloscNaMagazynie: 0,
      kategoriaId: [""],
      materialyElektroniczne: [""],
      nazwa: "",
      opis: "",
      zdjecia: [""],
    },
    ImageDTO: {
      id: 0,
      ref: this.dodaj_zdjecie,
    },
    dostepne_kategorie: [],
    przedmiot_kategorie: [],
    przedmiot_zdjecia: [],
    przedmiot_materialy: [],
    przedmiot_materialyDTO: [],
    przedmiot_zdjeciaDTO: [],
    dodaj_kategoria: "",
    dodaj_zdjecie: "",
    dodaj_material: "",
    zdjecie_id: 0,
  },

  mounted() {
    axios
      .get(
        `https://mirbud-restapi.herokuapp.com/api/item/info/${JSON.parse(
          localStorage.getItem("item_id")
        )}`
      )
      .then((response) => {
        this.item.id = JSON.parse(localStorage.getItem("item_id"));
        this.item.cenaSprzedazy = response.data.cenaSprzedazy;
        this.item.nazwa = response.data.nazwa;
        this.item.iloscNaMagazynie = response.data.iloscNaMagazynie;
        this.item.opis = response.data.opis;
        this.item.czyArchiwalny = response.data.czyArchiwalny;

        this.przedmiot_kategorie = response.data.kategoriaId;
        this.przedmiot_zdjecia = response.data.zdjecia;
        this.przedmiot_materialy = response.data.materialyElektroniczne;

        this.przedmiot_materialyDTO = response.data.materialsDTO;
        this.przedmiot_zdjeciaDTO = response.data.imagesDTO;

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
      });
  },

  methods: {
    update() {
      this.item.iloscNaMagazynie = parseInt(this.item.iloscNaMagazynie);
      this.item.id = parseInt(this.item.id);
      this.item.cenaSprzedazy = parseInt(this.item.cenaSprzedazy);

      axios
        .put(
          `https://mirbud-restapi.herokuapp.com/api/item/${JSON.parse(
            localStorage.getItem("item_id")
          )}`,
          this.item
        )
        .then(
          (response) => {
            this.$toast.open({
              message: "Modyfikacja przebiegła pomyślnie",
              type: "success",
              duration: 5000,
              dismissible: true,
            });
          },
          (error) => {
            this.$toast.open({
              message: "Wypełnij prawidłowo wszystkie pola!",
              type: "warning",
              duration: 5000,
              dismissible: true,
            });
          }
        );
    },
    addCategory() {
      axios
        .put(
          `https://mirbud-restapi.herokuapp.com/api/item/category/${JSON.parse(
            localStorage.getItem("item_id")
          )}`,
          {
            categoryName: document.getElementById('item_category_type').value
          }
        )
        .then(
          (response) => {
            this.$toast.open({
              message: "Pomyślnie dodano kategorię",
              type: "success",
              duration: 5000,
              dismissible: true,
            });

            this.przedmiot_kategorie.push(document.getElementById('item_category_type').value);
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
          `https://mirbud-restapi.herokuapp.com/api/item/category/${JSON.parse(
            localStorage.getItem("item_id")
          )}/${document.getElementById('item_category_type').value}`
        )
        .then(
          (response) => {
            this.$toast.open({
              message: "Pomyślnie usunięto kategorię",
              type: "success",
              duration: 5000,
              dismissible: true,
            });
            const index = this.przedmiot_kategorie.indexOf(
              document.getElementById('item_category_type').value
            );
            this.przedmiot_kategorie.splice(index, 1);
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
    addImage() {
      axios
        .put(
          `https://mirbud-restapi.herokuapp.com/api/item/image/${JSON.parse(
            localStorage.getItem("item_id")
          )}`,
          {
            id: 0,
            ref: this.dodaj_zdjecie,
          }
        )
        .then(
          (response) => {
            this.$toast.open({
              message: "Pomyślnie dodano zdjęcie",
              type: "success",
              duration: 5000,
              dismissible: true,
            });

            this.przedmiot_zdjecia.push(this.dodaj_zdjecie);
            this.dodaj_zdjecie = "";

            axios
              .get(
                `https://mirbud-restapi.herokuapp.com/api/item/info/${JSON.parse(
                  localStorage.getItem("item_id")
                )}`
              )
              .then((response) => {
                this.item.id = JSON.parse(localStorage.getItem("item_id"));
                this.item.cenaSprzedazy = response.data.cenaSprzedazy;
                this.item.nazwa = response.data.nazwa;
                this.item.iloscNaMagazynie = response.data.iloscNaMagazynie;
                this.item.opis = response.data.opis;
                this.item.czyArchiwalny = response.data.czyArchiwalny;

                this.przedmiot_kategorie = response.data.kategoriaId;
                this.przedmiot_zdjecia = response.data.zdjecia;
                this.przedmiot_materialy = response.data.materialyElektroniczne;

                this.przedmiot_materialyDTO = response.data.materialsDTO;
                this.przedmiot_zdjeciaDTO = response.data.imagesDTO;

                axios
                  .get(
                    "https://mirbud-restapi.herokuapp.com/api/categories/getAll"
                  )
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
    deleteImage() {
      var step;
      var check = false;
      var id = 0;
      for (step = 0; step < this.przedmiot_zdjeciaDTO.length; step++) {
        if (this.przedmiot_zdjeciaDTO[step].ref == this.dodaj_zdjecie)
          check = true;
        id = this.przedmiot_zdjeciaDTO[step].id;
      }

      if (check == true) {
        axios
          .delete(`https://mirbud-restapi.herokuapp.com/api/item/image/${id}`)
          .then(
            (response) => {
              this.$toast.open({
                message: "Pomyślnie usunięto zdjęcie",
                type: "success",
                duration: 5000,
                dismissible: true,
              });
              const index = this.przedmiot_zdjecia.indexOf(this.dodaj_zdjecie);
              this.przedmiot_zdjecia.splice(index, 1);
              this.dodaj_zdjecie = "";
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
        check = false;
      } else {
        this.$toast.open({
          message: "Nieprawidłowe zdjęcie",
          type: "error",
          duration: 5000,
          dismissible: true,
        });
      }
    },

    addMaterial() {
      axios
        .put(
          `https://mirbud-restapi.herokuapp.com/api/item/electronical/${JSON.parse(
            localStorage.getItem("item_id")
          )}`,
          {
            id: 0,
            ref: this.dodaj_material,
          }
        )
        .then(
          (response) => {
            this.$toast.open({
              message: "Pomyślnie dodano materiał elektroniczny",
              type: "success",
              duration: 5000,
              dismissible: true,
            });
            this.przedmiot_materialy.push(this.dodaj_material);
            this.dodaj_material = "";

            axios
              .get(
                `https://mirbud-restapi.herokuapp.com/api/item/info/${JSON.parse(
                  localStorage.getItem("item_id")
                )}`
              )
              .then((response) => {
                this.item.id = JSON.parse(localStorage.getItem("item_id"));
                this.item.cenaSprzedazy = response.data.cenaSprzedazy;
                this.item.nazwa = response.data.nazwa;
                this.item.iloscNaMagazynie = response.data.iloscNaMagazynie;
                this.item.opis = response.data.opis;
                this.item.czyArchiwalny = response.data.czyArchiwalny;

                this.przedmiot_kategorie = response.data.kategoriaId;
                this.przedmiot_zdjecia = response.data.zdjecia;
                this.przedmiot_materialy = response.data.materialyElektroniczne;

                this.przedmiot_materialyDTO = response.data.materialsDTO;
                this.przedmiot_zdjeciaDTO = response.data.imagesDTO;

                axios
                  .get(
                    "https://mirbud-restapi.herokuapp.com/api/categories/getAll"
                  )
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
    deleteMaterial() {
      var step;
      var check = false;
      var id = 0;
      for (step = 0; step < this.przedmiot_materialyDTO.length; step++) {
        if (this.przedmiot_materialyDTO[step].ref == this.dodaj_material)
          check = true;
        id = this.przedmiot_materialyDTO[step].id;
      }

      if (check == true) {
        axios
          .delete(
            `https://mirbud-restapi.herokuapp.com/api/item/material/${id}`
          )
          .then(
            (response) => {
              this.$toast.open({
                message: "Pomyślnie usunięto materiał elektroniczny",
                type: "success",
                duration: 5000,
                dismissible: true,
              });
              const index = this.przedmiot_materialy.indexOf(
                this.dodaj_material
              );
              this.przedmiot_materialy.splice(index, 1);
              this.dodaj_material = "";
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
        check = false;
      } else {
        his.$toast.open({
          message: "Nieprawidłowe materiał",
          type: "error",
          duration: 5000,
          dismissible: true,
        });
      }
    },
    goBack() {
      window.location.replace("admin_item_list.html");
    },
  },
});
