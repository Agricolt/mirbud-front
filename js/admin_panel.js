new Vue({
  el: "#app",

  data: {},
  methods: {
    register() {
      document.getElementById("frame").src = "rejestracja_Admin.html";
    },
    delete_user() {
      document.getElementById("frame").src = "manager_deleting.html";
    },
    add_category() {
      document.getElementById("frame").src = "add_delete_category.html";
    },
    update_item() {
        document.getElementById('frame').src =("admin_item_list.html");
    },
    add_item() {
        document.getElementById("frame").src = "adding_item.html";
    },
    logout(){
      sessionStorage.clear();
    }
  },
});
