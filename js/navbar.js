navbar = new Vue({
    el: '#navbar',
    data: {
        user_name: 'Niezalogowany - Gość',        
        role: 4,
    },
    created(){
        var session = JSON.parse(sessionStorage.getItem('userData'));
        
        if(session.role === 1){
              this.role = 1;
        }
            else if(session.role === 2){
                this.role = 2;
            }
            else{
                this.role = 3;
        }
        
    },
    mounted(){
        // Get the user email to be displayed on the page
		var userData = JSON.parse(sessionStorage.getItem('userData'));
        
		if(userData != null){
			this.user_name = userData.email;
			document.getElementsByClassName('login_btn')[0].remove();
		}
        console.log(this.user_name)
        
    },
    methods: {
        logout(){
            sessionStorage.clear();
        }
    },

    template: `
    <div>
    <div class="nav_bar">
    <a href="index.html"><img src="img/logo_small.png" class="logo"></a>
    <form class="search_bar">
        <input type="text" id="fsearch" name="fsearch" placeholder="Wpisz szukany przedmiot...">
    </form>

    <div class="nav_bar_cart_and_user">
        <div class="user">
            <h4>Zalogowany użytkownik: {{this.user_name}}</h4>
        </div>
        <div class="cart_all">
            <a href="koszyk.html"><img src="img/cart.png" class="cart"> </a>
        </div>
        <a href="logowanie.html">
            <button class="login_btn" type="button">
                Zaloguj/Zarejestruj się
            </button>
            <button @click="logout" class="logout_btn" type="button" v-if="role != 4">
                Wyloguj się
            </button>
        </a>
    </div>
</div>
<div class="categories_bar">
    <ul>        
        <li>
            <a href="item_list.html?category=Budowanie">Budowanie</a>
        </li>
        <li>
            <a href="item_list.html?category=Ogród">Ogród i wypoczynek</a>
        </li>
        <li>
            <a href="item_list.html?category=Technika">Technika</a>
        </li>
        <li>
            <a href="item_list.html?category=Mieszkanie">Mieszkanie</a>
        </li>
        <li>
            <a href="item_list.html?category=Kuchnia">Kuchnia</a>
        </li>
        <li>
            <a href="item_list.html?category=Lazienka">Lazienka</a>
        </li>
        <li>
            <a href="item_list.html?category=Elektronika">Elektronika</a>
        </li>
        <li v-if="this.role == 1">
            <a href="admin_panel.html">Panel Administracyjny</a>
        </li>
        <li v-else-if="this.role == 2">
            <a href="manager_panel.html">Panel Menedżera</a>
        </li>
    </ul>
    
    </div>
</div>
    `
})