Vue.component('item-detail', {
    data : function(){
        return{
            item_detail : {},
            item_photos_urls : [],
            materials : [],
            actual_viewed_photo_url : 'img/fullhd.jpg',
            photo_index: 0
        }
    },
    created() {
        // get item Id from the URL
		const urlParams = new URLSearchParams(window.location.search);
		const itemId = urlParams.get('itemId');

        // create a queryURL
        var queryURL = 'https://mirbud-restapi.herokuapp.com/api/item/' + itemId;
        const sendGetRequestItems = async () => {
			try{
				const resp = await axios.get(queryURL);
				this.item_detail = resp.data; 
                this.item_photos_urls = this.item_detail.zdjecia;
                this.materials = this.item_detail.materialyElektroniczne;
                this.actual_viewed_photo_url = this.item_photos_urls[this.photo_index];
                this.isFetching = false;
			}
			catch (err){
				window.location.href = 'error.html?error=503';
			}
		};
	    sendGetRequestItems();
    },
	methods : {
        next : function(){
            if (this.photo_index < this.item_photos_urls.length - 1){
                this.photo_index++;
            }
            this.updatePhoto();
        },
        previous : function(){
            if (this.photo_index > 0){
                this.photo_index--;
            }
            this.updatePhoto();
        },
        updatePhoto: function(){
            this.actual_viewed_photo_url = this.item_photos_urls[this.photo_index];
        }
	},
	template: `
        
	<div class="item_detail_body">
    <div class="left image_slider">
        <button v-on:click="previous" class="slider_button">Poprzedni</button>
        <img :src="this.actual_viewed_photo_url" class="item_photo" >
        <button v-on:click="next" class="slider_button">Następny</button>
    </div>
    <div class="left text_details">
        <h1>{{this.item_detail.nazwa}}</h1>
        <h3>Cena: {{this.item_detail.cenaSprzedazy}}</h3>
        <p>
            {{this.item_detail.opis}}
        </p>
        <h4>Ilość na magazynie : {{this.item_detail.iloscNaMagazynie}}</h4>
        <h4>Dostępne materiały elektroniczne:</h4>
        <ul>
            <materials-list 
                v-for="material in materials"
                v-bind:material_url="material"
            ></materials-list>
        </ul>
    </div>
</div>
		`
})