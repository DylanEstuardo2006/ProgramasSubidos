const urlApi = 'https://www.thecocktaildb.com/api/json/v1/1';

let cocteles = [];

//CARGAR CATEGORIAS

function cargarCocteles()
{
    fetch(`${urlApi}/search.php?f=a`)
    .then(res => res.json())
    .then(data => {
        if(!data.drinks)
        {
            return;
        }
        cocteles = data.drinks;
        mostrarLista(cocteles);
    })
}
//Cargar categorias
function cargarCategorias(){
    fetch(`${urlApi}/list.php?c=list`)
    .then(res => res.json())
    .then(data => {
        const select = document.getElementById("categoria");

        data.drinks.forEach(cat => {
            select.innerHTML += `
                <option value="${cat.strCategory}">
                    ${cat.strCategory}
                </option>
            `;
        });
    });
}

// ===== FUNCIÓN PRINCIPAL DE FILTRO =====
function aplicarFiltros() {
  const texto = document.getElementById("buscador").value.toLowerCase();
  const categoria = document.getElementById("categoria").value;

  let filtrados = cocteles.filter(coctel => {
    const coincideTexto =
      coctel.strDrink.toLowerCase().includes(texto);

    const coincideCategoria =
      categoria === "0" ||
      coctel.strCategory === categoria;

    return coincideTexto && coincideCategoria;
  });

  mostrarLista(filtrados);
}



function mostrarLista(lista) {
  
   const container = document.getElementById("cocktailContainer");
   container.innerHTML = "";

   let html = "";

   lista.forEach(coctel => {
      html += ` <div class="col-md-4 col-lg-3 mb-4">
  <div class="card h-100">
    <img src="${coctel.strDrinkThumb}" class="card-img-top">
    <div class="card-body d-flex flex-column">
      <h5 class="card-title">Nombre: ${coctel.strDrink}</h5>
      <p class="lead">Categoria: ${coctel.strCategory}</p>
      <p class="lead">  Tipo: ${coctel.strAlcoholic}</p>
      <button class="btn btn-warning me-2" onclick="window.location.href='detalle.html?idDrink=${coctel.idDrink}'">Ver detalle</button>
    </div>
  </div>
   </div> `;
   });

   container.innerHTML = html;
}

document.addEventListener("DOMContentLoaded", () => {
  cargarCocteles();
  cargarCategorias();

  document
    .getElementById("buscador")
    .addEventListener("input", aplicarFiltros);

  document
    .getElementById("categoria")
    .addEventListener("change", aplicarFiltros);
});




/* 
     
*/