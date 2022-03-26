
app = new Vue({
    el: ".main_body",
    data:{
        message: ''
    },
    mounted() {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const errorCode = urlParams.get('error');
        if (errorCode > 500){
            this.message = 'To chyba coś z naszymi serwerami... Wróć ponownie za kilka minut! (Kod błędu: ' + errorCode + ')';
        }
        else if (errorCode > 400 && errorCode < 500){
            this.message = 'To chyba błąd Twojej przeglądarki... Spróbuj odświeżyć stronę! (Kod błędu: ' + errorCode + ')';
        }
    }
})