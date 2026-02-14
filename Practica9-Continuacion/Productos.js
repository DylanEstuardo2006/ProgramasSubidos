const urlApi = 'https://dummyjson.com/products?limit=32';

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

function cargarProductosCatalogo(lista)
{
const fila = document.getElementById('tr');
  fila.innerHTML = "";

  lista.forEach(producto => {
    fila.innerHTML += `
      <tr>
        <td>${producto.id}</td>
        <td>${producto.title}</td>
        <td>${producto.price}</td>
        <td>${producto.category}</td>
        <td>${producto.description}</td>
        <td><img src="${producto.images[0]}" width="100"></td>
      </tr>
    `;
  });
}
document.addEventListener('DOMContentLoaded', () => {
  
  //Filtrador de categorias
    const selectCategoria = document.getElementById('buscador-categoria');

    selectCategoria.addEventListener('change', () => {
    aplicarFiltros();
    });
  
  cargarProductos();

  const inputBuscador = document.getElementById('buscador');

  inputBuscador.addEventListener('input', () => {

   aplicarFiltros();

  });

});

function aplicarFiltros() {
  const texto = document.getElementById('buscador').value.toLowerCase();
  const categoria = document.getElementById('buscador-categoria').value;

  let filtrados = productos.filter(producto => {
    const coincideTexto = producto.title.toLowerCase().includes(texto);
    const coincideCategoria = categoria === "0" || producto.category === categoria;

    return coincideTexto && coincideCategoria;
  });

  mostrarLista(filtrados);
}

urlApiCategory = 'https://dummyjson.com/products/category-list'; 

function cargarCategory()
{
     fetch(urlApiCategory)
     .then(res => res.json())
     .then(data => {
        const categorias = data;
         
         asignarCategorias(categorias);
     })
}

const asignarCategorias = (categorias) => {
  const select = document.getElementById('buscador-categoria');
  select.innerHTML = `<option value="0">Categorias</option>`;

  categorias.forEach(categoria => {
    const opcion = document.createElement("option");
    opcion.value = categoria;
    opcion.textContent = categoria;
    select.appendChild(opcion);
  });
};

cargarCategory();

