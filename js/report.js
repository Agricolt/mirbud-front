Vue.use(VueToast, {});



app = new Vue({
  el: ".main_body",
  data: {
    items: [], // all items list loaded from API
    viewedItems: [], // items currently rendered
    profit: 0,
    categories: [],
    endDay: "",
    endMonth: "",
    endYear: "",
    startDay: "",
    startMonth: "",
    startYear: "",

    dto: {
      categories: [],
      endDate: "",
      startDate: "",
    },
  },
  created: function () {
    const sendGetRequestCategories = async () => {
      try {
        const resp = await axios.get(
          "https://mirbud-restapi.herokuapp.com/api/categories/getAll"
        );
        this.categories = resp.data;
      } catch (err) {
        window.location.href = "error.html?error=503";
      }
    };
    sendGetRequestCategories();
  },
  methods: {
    filter: function () {
      this.items = [];
      this.dto.categories = [];
      var checkboxes = document.querySelectorAll(".category_checkbox");
      for (var i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked == true) {
          this.dto.categories.push(checkboxes[i].value);
        }
      }
      
      
      this.startDay = document.getElementById("date_from").value.substring(8, 10)
      this.startMonth = document.getElementById("date_from").value.substring(5, 7)
      this.startYear = document.getElementById("date_from").value.substring(0, 4)
      
      this.endDay = document.getElementById("date_to").value.substring(8, 10)
      this.endMonth = document.getElementById("date_to").value.substring(5, 7)
      this.endYear = document.getElementById("date_to").value.substring(0, 4)

      this.dto.endDate = this.endMonth + "-" + this.endDay + "-" + this.endYear;
      this.dto.startDate =
      this.startMonth + "-" + this.startDay + "-" + this.startYear;
      console.log(this.dto.startDate)
      console.log(this.dto.endDate)
      const sendGetRequestSelectedItems = async () => {
        try {
          const resp = await axios.post(
            "https://mirbud-restapi.herokuapp.com/api/reports",
            this.dto
          );
          this.items = resp.data.things;
          this.profit = resp.data.profit;

          this.items.sort((a, b) => (a.zysk < b.zysk ? 1 : -1));
        } catch (err) {
          window.location.href = "error.html?error=503";
        }
      };
      sendGetRequestSelectedItems();
    },
  },
});
