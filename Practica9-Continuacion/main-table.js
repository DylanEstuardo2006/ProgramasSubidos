
//URL de la API para obtener los productos y las categorías
const urlApi = 'https://dummyjson.com/products?limit=32';
urlApiCategory = 'https://dummyjson.com/products/category-list'; 


let productos = [];
let categoriaActual = "0";

// Guarda qué producto se va a eliminar
  let idProductoEliminar = null; 

// Guarda el nombre del producto a eliminar para mostrarlo en la alerta
  let nombreProductoEliminar = "";

function cargarProductosAdministrador() 
{ 
  // Obtener referenciua al tbody de la tabla donde se mostrarán los productos
  // Si no se encuentra el elemento, salir de la función  
   const tabla = document.getElementById('table-container');
   if(!tabla) return;
 
   // Limpiar la tabla antes de cargar los productos
   tabla.innerHTML = "";
  
   // Hacer la petición a la API para obtener los productos
   fetch(urlApi)
   .then(res => res.json())
   .then(data => {

    // Metemsos los productos en una variable para poder filtrarlos por categoría

    productos = data.products;
    renderizarTabla(productos, categoriaActual);

   })
}

function renderizarTabla(lista, categoria = "0") {

   const tabla = document.getElementById('table-container');
   tabla.innerHTML = "";

   let filtrados = lista;

   if(categoria !== "0"){
      filtrados = lista.filter(p => p.category === categoria);
   }

   filtrados.forEach(item => {
      const fila = document.createElement('tr');
      fila.innerHTML = `
         <td>${item.title}</td>
         <td>${item.price}</td>
         <td>${item.category}</td>
         <td class="descripcion-admin">${item.description}</td>
         <td><img src="${item.images[0]}" width="100"></td>
         <td>
            <button class="btn btn-primary"
            onclick="window.location.href='editar.html?id=${item.id}'">
            Editar</button>

            <button class="btn btn-danger btn-eliminar">
            Eliminar</button>
         </td>
      `;

      fila.querySelector(".btn-eliminar").addEventListener("click", () => {
         idProductoEliminar = item.id;
         nombreProductoEliminar = item.title;

         const modal = new bootstrap.Modal(
            document.getElementById("modalEliminar")
         );

         modal.show();
      });

      tabla.appendChild(fila);
   });
}


function eliminarProducto(id)
{
    productos = productos.filter(p => p.id !== id);

   renderizarTabla(productos,categoriaActual);

} 


function cargarCategorias()
{ 
  fetch(urlApiCategory)
  .then(res => res.json())
  .then(data => {
    const selectCategoria = document.getElementById('buscador-categorias');  

    data.forEach(categoria => {
      const option = document.createElement('option');
      option.value = categoria;
      option.textContent = categoria;
      selectCategoria.appendChild(option);
    });
  })
}


// Código para el filtrado de productos por categoría y por texto cuando hace un cambio el Select


document.getElementById("buscador-categorias")
.addEventListener("change", (e)=>{

 categoriaActual = e.target.value;
  
 renderizarTabla(productos, categoriaActual);

});



document.addEventListener("DOMContentLoaded", () => {

  cargarCategorias();
  cargarProductosAdministrador();

  document.getElementById("confirmarEliminar").addEventListener("click", () => {

  if(idProductoEliminar){
    eliminarProducto(idProductoEliminar);
      alert(`El elemento "${nombreProductoEliminar}" ha sido eliminado`);
  }

  const modal = bootstrap.Modal.getInstance(
    document.getElementById("modalEliminar")
  );

  modal.hide();

});

});

