Vue.use(VueToast, {});

new Vue({
    el: "#app",

    template: `    <div>
    <div class="nav_bar">
    <a href="index.html"><img src="img/logo_small.png" class="logo"></a>
    <form class="search_bar">
      <input type="text" id="fsearch" name="fsearch" placeholder="Wpisz szukany przedmiot...">
    </form>

    <div class="nav_bar_cart_and_user">
      <div class="user">
        <h4>Witaj gościu!</h4>
      </div>
      <div class="cart_all">
        <a href="koszyk.html"><img src="img/cart.png" class="cart"> </a>
        <p class="item_number">Ilość przedmiotów w koszyku: </p>
      </div>
      <a href="logowanie.html">
        <button class="login_btn" type="button">
          Zaloguj/Zarejestruj się
        </button>
      </a>
    </div>
  </div>
  <div class="categories_bar">
    <ul>
      <li>
        <a href="item_list.html?category=bud">Budowanie</a>
      </li>
      <li>
        <a href="item_list.html?category=ogr">Ogród i wypoczynek</a>
      </li>
      <li>
        <a href="item_list.html?category=tec">Technika</a>
      </li>
      <li>
        <a href="item_list.html?category=mie">Mieszkanie</a>
      </li>
      <li>
        <a href="item_list.html?category=kuc">Kuchnia</a>
      </li>
      <li>
        <a href="item_list.html?category=laz">Łazienka</a>
      </li>
      <li>
        <a href="item_list.html?category=ele">Elektronika</a>
      </li>
    </ul>
  </div>
  <div class="container">
    <h1>Logowanie</h1>
    <p>Wypełnij poniższe dany aby się zalogować.</p>
    <hr>
    <form>
      <label for="login"><b>E-mail</b></label>
      <input class="reg_log_input" type="text" placeholder="E-mail" name="e-mail" id="e-mail" v-model="user.username" required>

      <label for="psw"><b>Hasło</b></label>
      <input class="reg_log_input" type="password" placeholder="Hasło" name="psw" id="psw" v-model="user.password" required>
      <hr>
      <p>
        Tworząc konto zgadzasz się z naszym
        <a href="regulamin.html">Regulaminem</a> i
        <a href="politykaprywatnosci.html"> Polityką Prywatności</a>.
      </p>
    </form>
    <button @click="login" class="registerbtn">Zaloguj się</button>
  </div>

  <div class="container signin">
    <p>Nie posiadasz jeszcze konta? <a href="rejestracja.html">Zarejestruj się</a>.</p>
  </div>
  <div class="footer">
    <div class="contact">
      <p class="contact_element">
        Tel: <br>
        <b>123-456-789</b>
      </p>
      <p class="contact_element">
        E-mail:<br>
        <b>tab@Mirbud.pl</b>
      </p>
      <p class="contact_element">
        Adres:<br>
        <b>Abc 12<br></b>
        <b>12-345, ABC<br></b>
        <b>Polska</b>
      </p>
    </div>
    <p class="cookies_info">
      W ramach naszej witryny stosujemy pliki cookies w celu świadczenia Państwu usług na najwyższym poziomie, w tym w
      sposób dostosowany do indywidualnych potrzeb. Korzystanie z witryny bez zmiany ustawień dotyczących cookies
      oznacza, że będą one zamieszczane w Państwa urządzeniu końcowym. Możecie Państwo dokonać w każdym czasie zmiany
      ustawień dotyczących cookies.
    </p>
  </div>
  </div>`,

    data: {
        user: {
            username: "",
            password: "",
        },
        email: {
            email: ""
        },
        userData: {
          email: "",
          role: 0,
          id: 0
        },
        completed: false,
    },

    watch: {
        completed() {
            this.user.username = "";
            this.user.password = "";
            this.completed = false;
        },
    },

    methods: {
        login() {
            axios
                .post(
                    "https://mirbud-restapi.herokuapp.com/login",
                    this.user
                )
                .then(
                    (response) => {
                        if (response.status == 200) {
                            this.$toast.open({
                              message: "Udało się zalogować!",
                              type: "success",
                              duration: 5000,
                              dismissible: true,
                            });
                        }
                        this.email.email = this.user.username
                        this.userData.email = this.user.username
                        this.createSession();
                        this.completed = true;

                    },
                    (error) => {
                        if (error.response.status == 401) {
                            this.$toast.open({
                              message: "Niepoprawne dane",
                              type: "error",
                              duration: 5000,
                              dismissible: true,
                            });
                        }
                        else {
                            console.log(error.status);
                        }
                    }
                );
        },
        createSession() {
          axios.all([
            axios
                .post(
                    "https://mirbud-restapi.herokuapp.com/api/clients/getRole",
                     this.email
                ),             
            axios
                .post(
                  "https://mirbud-restapi.herokuapp.com/api/clients/getIdByEmail",
                  this.email
                )
          ])
                .then(
                    axios.spread((data1, data2) => {
                        this.userData.role = data1.data
                        this.userData.id = data2.data
                        sessionStorage.setItem("userData", JSON.stringify(this.userData))
                        if(data1.data == 3)
                        {
                        window.location.href = 'index.html';
                        }
                        else if(data1.data == 2)
                        {
                          window.location.href = 'manager_panel.html';
                        }
                        else if(data1.data == 1)
                        {
                          window.location.href = 'admin_panel.html';
                        }
                    }
                ))
        }
    },
});
