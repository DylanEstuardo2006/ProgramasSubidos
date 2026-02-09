const baseDeDatosCloud = [
    { nombre: "Amazon EC2", tipo: "IaaS", estado: "Activo", costo: 35.00 },
    { nombre: "Google Drive Enterprise", tipo: "SaaS", estado: "Activo", costo: 12.50 },
    { nombre: "Heroku App Server", tipo: "PaaS", estado: "Inactivo", costo: 0.00 },
    { nombre: "Azure Virtual Machines", tipo: "IaaS", estado: "Activo", costo: 40.00}
];

const cargarServicios =() => 
{
 const contenedor = document.getElementById("contenedor-servicios");
 contenedor.innerHTML = "";
 baseDeDatosCloud.forEach((serviciosDisponibles) => {
  if(serviciosDisponibles.estado == "Activo")
  { 
   contenedor.innerHTML+= `<div class = 'card'><h2> ${serviciosDisponibles.nombre}</h2><br><h3>Tipo: ${serviciosDisponibles.tipo} </h3> <p class ="activo">${serviciosDisponibles.estado}</p><p>${serviciosDisponibles.costo} USD</p>
   </div> `; 
  }
  else if(serviciosDisponibles.estado == "Inactivo")
  {
    contenedor.innerHTML+= `<div class = 'card'><h2> ${serviciosDisponibles.nombre} </h2><br><h3>Tipo: ${serviciosDisponibles.tipo} </h3> <p class ="inactivo">${serviciosDisponibles.estado}</p><p>${serviciosDisponibles.costo} USD</p></div>`; 
  }
 });
}
