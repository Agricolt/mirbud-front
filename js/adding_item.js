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
    dostepne_kategorie: [],
    przedmiot_kategorie: [],
    przedmiot_zdjecia: [],
    przedmiot_materialy: [],
    dodaj_kategoria: "",
    dodaj_zdjecie: "",
    dodaj_material: "",
    completed: false,
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
  watch: {
    completed() {
      this.item.cenaSprzedazy = 0;
      this.item.cenaZakupu = 0;
      this.item.czyArchiwalny = false;
      this.item.iloscNaMagazynie = 0;
      this.item.kategoriaId = [""];
      this.item.materialyElektroniczne = [""];
      this.item.nazwa = "";
      this.item.opis = "";
      this.item.zdjecia = [""];

      this.przedmiot_kategorie = [];
      this.przedmiot_zdjecia = [];
      this.przedmiot_materialy = [];

      this.completed = false;
    },
  },

  methods: {
    addCategory() {
      var step;
      var check = false;
      
      
      for (step = 0; step < this.dostepne_kategorie.length; step++) {
        if (
          this.dostepne_kategorie[step].nazwaKategorii == document.getElementById('item_category_type_update').value
        )
          check = true;
      }
      for(step=0; step < this.przedmiot_kategorie.length; step++){
        if(this.przedmiot_kategorie[step] == document.getElementById('item_category_type_update').value){
          check = false;
        }
      }
      if (check == false) {
        this.$toast.open({
          message: "Podaj prawidłową kategorię!",
          type: "error",
          duration: 5000,
          dismissible: true,
        });
        
      } else {
        this.przedmiot_kategorie.push(document.getElementById('item_category_type_update').value);
        
        check = false;
      }
    },
    deleteCategory() {

      const index = this.przedmiot_kategorie.indexOf(document.getElementById('item_category_type_update').value);
      var check = false;
      var step;
      for(step=0; step < this.przedmiot_kategorie.length; step++){
        if(this.przedmiot_kategorie[step] == document.getElementById('item_category_type_update').value){
          check = true;
        }
      }
      if(check == false){
        this.$toast.open({
          message: "Podaj prawidłową kategorię!",
          type: "error",
          duration: 5000,
          dismissible: true,
        });
      }
      else{
        this.przedmiot_kategorie.splice(index, 1);
      }
      
    },
    
    addImage() {
      this.przedmiot_zdjecia.push(this.dodaj_zdjecie);
      this.dodaj_zdjecie = "";
    },
    deleteImage() {
      const index = this.przedmiot_zdjecia.indexOf(this.dodaj_zdjecie);
      this.przedmiot_zdjecia.splice(index, 1);
      this.dodaj_zdjecie = "";
    },
    addMaterial() {
      this.przedmiot_materialy.push(this.dodaj_material);
      this.dodaj_material = "";
    },
    deleteMaterial() {
      const index = this.przedmiot_materialy.indexOf(this.dodaj_material);
      this.przedmiot_materialy.splice(index, 1);
      this.dodaj_material = "";
    },
    addItem() {
      if (this.item.cenaSprzedazy == 0 || this.item.cenaZakupu == 0) {
        this.$toast.open({
          message: "Podaj prawidłową cenę zakupu i sprzedaży",
          type: "error",
          duration: 5000,
          dismissible: true,
        });
      } else {
        this.item.iloscNaMagazynie = parseInt(this.item.iloscNaMagazynie);
        this.item.cenaSprzedazy = parseInt(this.item.cenaSprzedazy);
        this.item.kategoriaId = this.przedmiot_kategorie;
        this.item.materialyElektroniczne = this.przedmiot_materialy;
        this.item.zdjecia = this.przedmiot_zdjecia;

        axios
          .post("https://mirbud-restapi.herokuapp.com/api/item", this.item)
          .then(
            (response) => {
              this.$toast.open({
                message: "Pomyślnie dodano przedmiot",
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
      }
    },
  },
});
