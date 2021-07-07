//cargar pagina
window.onload= function(){
    new Vue({
        el:"#loader",
        data:{
            show:""
        }
    });
}

new Vue({
    el:"#menuDesp",
    data:{
        iconoMenu:"icon fas fa-bars",
        menuClass:"cerrarMenu",
    },
    methods:{
        desplegarMenu: function(){
            if(this.iconoMenu=="icon fas fa-bars"){
                this.iconoMenu="icon fas fa-times";
                this.menuClass="abrirMenu";
                document.body.style.overflow='hidden';
            }else{
                this.iconoMenu="icon fas fa-bars";
                this.menuClass="cerrarMenu";
                document.body.style.overflow ='auto';
            }
        },
    }
});

Vue.component('service-card',{
    props: ['title','content'],
    template:`<article class="grid-elem">
    <h4>{{ title }}</h4>
    <h5>{{ content }}</h5>
    </article>`
})

new Vue({
    el:"#services",
    data: {
        services: [
            { title: "Locaciones", content: 'Alquiler por jornada para filmaciones, videoclips, publicidades y producciones de fotografía.' },
            { title: 'Venue', content:'Multiespacio versátil, adaptable  a cualquier tipo de evento y formato: presencial, híbrido o virtual.' },
            { title: 'Streaming', content: 'Estudio equipado con cámaras, luces, música y pantalla LED, para eventos virtuales.'},
            { title: 'In-house  ', content: 'Alquiler de oficinas y estudios privados, mesas compartidas, salas de reunión y depósitos.'}
        ]
    }
})

new Vue({
    el:"#explora",
    delimiters:['{[',']}'],
    data:{
        caracteristicas:[["Dimensiones: 28,65 m x 16,9 m","Superficie: 484 m²","Altura: 9 m, hasta la pasarela técnica","Entrada de vehiculo: 4,68 m x 4,2 m","Espacio sin columnas","Tablero Trifásico con 1 toma A63 y 2 tomas A32, con disyuntores independientes","Potencia total: A127. Consultar por más capacidad","2 camarines privados","1 sala de vestuario, maquillaje y pelo","Baños","Zona comedor y descanso, con living y mesas","Espacio para catering","Baños","Estacionamiento"],
        ["Dimensiones: 41 m x 13 m","Superficie: 533 m²","Altura: 4,2 m","Entrada de vehículo: 4 m x 3,7 m","Espacio con columnas","Tablero Trifásico con 1 toma A63 y 2 tomas A32, con disyuntores independientes","Potencia total: A127. Consultar por más capacidad","2 camarines privados","1 sala de vestuario, maquillaje y pelo","Zona comedor y descanso, con livings y mesas","Espacio para catering","Baños","Estacionamiento"],
        ["Dimensiones: 15,61 m x 14,09 m","Superficie: 220 m²","Altura: 4,2 m","Espacio con columnas","Zona comedor y descanso, con livings y mesas","1 camarín privado","1 Sala de vestuario, maquillaje y pelo","Espacio para catering","Baños","Estacionamiento"],
        ["Dimensiones: 33.42 m x 13,79 m","Superficie: 460 m²","Altura: 4,2 m","Planta libre (mesas movibles): 234 m² (24 m x 9,75 m)","Camarines compartidos y privados","Baños","Sala de vestuario, maquillaje y pelo","Zona comedor y descanso, con mesas y livings","Espacio para catering","Estacionamiento"],
        ["Propuesta integral de estudio y técnica, a cargo de Darwin Studios, Repila Corporate y Streamcenter BA","Venue: Nave Niceto","Incluye estacionamiento, exteriores y Hall","Iluminación","Sonido","Video y pantalla LED","Streaming"],
        ["Dimensiones: 43m x 25 m","Superficie: 1075 m²"],
        ["Un espacio único y en continua transformación, compartido por creadores y artistas","Ideal para acciones con formato Tiny Desk"],
        ["Mucho de la arquitectura de la vieja fábrica de muebles Nordiska Companiet aún se conserva en Darwin Studios.","Entre los estudios y las naves, hay escaleras antiguas, pasillos anchos y largos, terrazas, depósitos, salas de máquinas y estructuras de hierro para dejarse sorprender y aprovechar."],
        ],
        venueName:"",
        caracteristica:"",
        popUp:"",
        tempFoto:0,
        imagenEspacio:"",
        imagenesEspacio:"",
        planoHref:"",
        plano:"",
        next:"next icon fas fa-angle-right",
        back:"back icon fas fa-angle-left",
        },
    methods:{
        loadVenue: function(venue_id){
            //pop up
            this.popUp="popUp";
            document.body.style.overflow='hidden';
            this.caracteristica=this.caracteristicas[venue_id-1];  
            fetch(`/venues/${venue_id}`)
            .then(response => response.json())
            .then(venue => {
                this.venueName = venue.name;
                this.imagenesEspacio = venue.pics;
                this.imagenEspacio=this.imagenesEspacio[0];

                if(venue.sketch)
                {
                    this.agregarPlano(venue.sketch);
                }

                if(this.imagenesEspacio.length == 1)
                {
                    this.next="disabled-icon";
                    this.back="disabled-icon";
                }
                else
                {
                    this.next="next icon fas fa-angle-right"
                    this.back="back icon fas fa-angle-left";
                }
            })
            .catch(error=>console.log(error));
        },
        cerrarCuadro: function()
        {
            this.popUp="";
            this.imagenesEspacio="";
            this.imagenEspacio="";
            document.body.style.overflow ='auto';
            this.plano="";
        },
        pasarFoto: function(){
            if(this.tempFoto<(this.imagenesEspacio.length)-1){
                this.tempFoto++;
            }
            else
            {
                this.tempFoto=0;
            }
            this.imagenEspacio=this.imagenesEspacio[this.tempFoto];
        },
        retrocederFoto: function()
        {
            if(this.tempFoto>0){
                this.tempFoto--;
            }
            else{
                this.tempFoto=this.imagenesEspacio.length-1;
            }
            this.imagenEspacio=this.imagenesEspacio[this.tempFoto];
        },
        agregarPlano: function(sketch)
        {
            if(sketch)
            {
                this.plano="plano";
                this.planoHref=sketch;
            }
        },
    },
});


new Vue({
    el:"#producciones",
    data:{
        popUp:"",
        prodPics:"",
        tempFoto:0,
        prodName:"",
        video:"",
        contenidoTrabajo:"",
        next:"disabled-icon",
        back:"disabled-icon",
    },
    methods:{
        loadMedia: function(prod_id){
            //pop up
            this.popUp="popUp";
            document.body.style.overflow='hidden';
            //set initial image or video
            fetch(`/production/${prod_id}`)
            .then(response => response.json())
            .then(prod => {
                this.prodName=prod.name;
                this.video=prod.video;
                if(prod.pics.length > 0){
                    this.prodPics=prod.pics;
                    this.loadPic(this.prodPics[0],this.prodName);
                    this.next="next icon fas fa-angle-right";
                    this.back="back icon fas fa-angle-left";
                }
                else{
                    this.loadVideo(this.video);
                    this.next="disabled-icon";
                    this.back="disabled-icon";
                }
            })
            .catch(error=>console.log(error));
        },
        closeBox: function(){
            this.popUp="";
            this.contenidoTrabajo="";
            this.tempFoto=0;
            document.body.style.overflow='auto';
        },
        nextMedia: function(){
            if(this.tempFoto<(this.prodPics.length)-1){
                this.tempFoto++;
            }
            else
            {
                this.tempFoto=0;
            }
            this.loadPic(this.prodPics[this.tempFoto],this.prodName);
        },
        previousMedia: function(){
            if(this.tempFoto!=0){
                this.tempFoto--;
            }else{
                this.tempFoto=(this.prodPics.length)-1;
            }
            this.loadPic(this.prodPics[this.tempFoto],this.prodName);
        },
        loadPic: function(foto, name){
            this.contenidoTrabajo="<img src='"+foto+"' alt ='"+name+"' title='"+name+"'>";
        },
        loadVideo: function(video){
            this.contenidoTrabajo="<iframe src='"+video+"' frameborder='0' allow='accelerometer' controls='0'; autoplay allowfullscreen></iframe>";
        },
    }
});