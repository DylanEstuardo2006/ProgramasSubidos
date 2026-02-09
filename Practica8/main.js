const urlApi = 'https://dummyjson.com/products?limit=12';

let productos = [];
function cargarProductos() 
{ 
   fetch(urlApi)
   .then(res => res.json())
   .then(data => {
     productos = data.products;
      console.log("Datos recibidos", productos);
    
      mostrarLista(productos);
  
    })
    .catch(error => {
      console.error('Error al cargar los productos:', error);
    });
}  
function mostrarLista(lista) {
  document.getElementById('products-container').innerHTML = "";
  lista.forEach(producto => mostrarProductos(producto));
}

function mostrarProductos(productos)    
{

 const contenedorProductos = document.createElement('div');
  contenedorProductos.classList.add('practice-card');
  contenedorProductos.innerHTML = 
  ` 
  <h3 class="practice-title"> ${productos.title} </h3>
  <img src="${productos.images[0]}" alt="${productos.title}" width="100%" style="object-fit: contain; height: 300px;" onclick="window.location.href='vista-producto.html?idProducto=${productos.id}'">
  <h4 class="practice-description"> Precio: $ ${productos.price} </h4>
  <p class="practice-description"> Categoria: ${productos.category} </p>
  <p class="practice-description"> Rating: ${productos.rating}</p>
  `;
  document.getElementById("products-container").appendChild(contenedorProductos);

}

document.addEventListener('DOMContentLoaded', () => {
  
  cargarProductos();

  const inputBuscador = document.getElementById('buscador');

  inputBuscador.addEventListener('input', () => {

     const texto = inputBuscador.value.toLowerCase();

     const filtrados = productos.filter(producto =>

     producto.title.toLowerCase().includes(texto)
    );
    
    mostrarLista(filtrados);

  });

});