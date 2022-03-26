Vue.use(VueToast, {});

app = new Vue({
  el: ".manager-list",

  data: {
    managers: [],
  },
  created: function () {
    axios.get("https://mirbud-restapi.herokuapp.com/api/clients/managers").then(
      (response) => {
        this.managers = response.data;
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

    const sendGetRequest = async () => {
      try {
        const resp = await axios.get(
          "https://mirbud-restapi.herokuapp.com/api/clients/managers"
        );
        this.managers = resp.data;

        var removeManagerButtons =
          document.getElementsByClassName("btn-danger");
        for (var i = 0; i < removeManagerButtons.length; i++) {
          var button = removeManagerButtons[i];
          button.addEventListener("click", this.removeManager);
        }
      } catch (err) {
        window.location.href = "error.html?error=503";
      }
    };
    sendGetRequest();
  },

  methods: {
    removeManager: function (event) {
      //usuwanie produktów z koszyka
      var buttonClicked = event.target;
      // usun przedmiot z listy przedmiotow
      var classString = buttonClicked.parentElement.parentElement.className;
      var classesSeparated = classString.split(" ");
      var managerId = classesSeparated[1];
      for (var i = 0; i < this.managers.length; i++) {
        if (managerId == this.managers[i].id) {
          this.managers.splice(i, 1);
        }
      }
      // usun przedmiot z widoku

      buttonClicked.parentElement.parentElement.remove();
    },
  },
});
