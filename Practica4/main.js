let latitud 
let longitud

if(navigator.geolocation)
{
    navigator.geolocation.getCurrentPosition(
        (coordenadas)=> {
        latitud = 21.155991878146104;
        longitud = -98.38644989025683;

        const coordenadaA = [21.156084451462416, -98.38649873767694];
        const coordenadaB = [21.156080699317428, -98.38641424809964];
        const coordenadaC = [21.15596313205957, -98.38638072048963];
        const coordenadaD = [21.155959379911504, -98.38647459779773];

       const coordenada = [latitud, longitud];
       
      // Marcador único 
      //inicializamos el mapa
       let map = L.map('map').setView(coordenada, 16);

      //agregamos el tilelayer de openstreetmap
       L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19, attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
       }).addTo(map);
       
       let latlngs = [coordenadaA ,coordenadaB,coordenadaC,coordenadaD ];

       let polygon = L.polygon(latlngs, {color: 'red'}).addTo(map);

       let marcadorPoligono;

     // Evento click sobre el polígono
     polygon.on('click', function (e) {

    // Si ya existe un marcador, lo quitamos
    if (marcadorPoligono) {
        map.removeLayer(marcadorPoligono);
    }

    // Creamos el marcador donde se dio click
    marcadorPoligono = L.marker(e.latlng).addTo(map);

    marcadorPoligono.bindPopup(
        "<b>Mi casa 🏠</b><br>" +
        "Latitud: " + e.latlng.lat.toFixed(6) + "<br>" +
        "Longitud: " + e.latlng.lng.toFixed(6)
    ).openPopup();
    });
       // zoom the map to the polygon
       map.fitBounds(polygon.getBounds());
    
    },
    (error) =>{
        alert("Error obteniendo coordenadas: " + error.message);
    });
}
else 
{
   alert("Geolocalización no soportada en este navegador");
}