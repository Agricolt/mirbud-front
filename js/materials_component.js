Vue.component('materials-list', {
    data : function(){
        return{
        }
    },
    props : ['material_url'],
	template: `
        <li>
            <a class="download" :href="material_url" download="Manual" >Pobierz</a>
        </li>
		`
})