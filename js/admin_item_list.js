app = new Vue({
  el: ".admin-items",
  data: {
    items: [],
    search: "",
  },
  created() {
    axios.get('https://mirbud-restapi.herokuapp.com/api/item/name/empty')
      .then(response => {
        this.items = response.data;
        this.login()
      })
      .catch(error => {
        window.location.href = 'error.html?error=503';
      });
    //console.log(this.items);
  },
  mounted() {
  },
  methods: {
    login() {
      setTimeout(() => {
        var modifyAdminItemButtons = document.getElementsByClassName('btn-modify');
        console.log(modifyAdminItemButtons.length)
        for (var i = 0; i < modifyAdminItemButtons.length; i++) {
          var button = modifyAdminItemButtons[i]
          button.addEventListener('click', this.modifyAdminItem);
        }

        var searchButton = document.getElementsByClassName('btn-search');
        console.log(searchButton.length)
        var button = searchButton[0]
        button.addEventListener('click', this.searchItem);
      }, 0);

    },

    modifyAdminItem: function (event) {
      var buttonClicked = event.target;
      var classString = buttonClicked.parentElement.parentElement.className;
      var classesSeparated = classString.split(' ');
      var itemId = classesSeparated[1];
      localStorage.setItem("item_id", itemId)
      window.location.href = 'item_updating.html';
    },

    searchItem: function (event) {
      if (document.getElementById("searchInput").value != null) {
        var itemName = document.getElementById('searchInput').value;
        console.log(itemName)
        if(itemName == null || itemName == ""){
          itemName = "empty"
        }
        axios.get('https://mirbud-restapi.herokuapp.com/api/item/name/' + itemName)
          .then(response => {
            this.items = response.data;
            this.login()
          })
          .catch(error => {
            window.location.href = 'error.html?error=503';
          });
      }
    }
  },
});
