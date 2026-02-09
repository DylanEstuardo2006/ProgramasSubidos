const urlIdProducto= new URLSearchParams(window.location.search);
let id = urlIdProducto.get('idProducto');
let precioProducto = 0;
const urlApi = 'https://dummyjson.com/products/' + id;  

function cargarProducto()
{
  fetch(urlApi)
  .then(res => res.json())
  .then(data =>{

    mostrarProducto(data);
        
    })
    .catch(error =>{
         console.error('Error al cargar los productos:', error);
    })
}
  function mostrarProducto(productos)    
{
 
 precioProducto = productos.price - (productos.discountPercentage * productos.price / 100);
 

  const comentariosHTML = productos.reviews?.map(r => `
    <p class="practice-description">
      ⭐ Rating: ${r.rating} <br>
      💬 Comentario: ${r.comment}
    </p>
  `).join("") || "<p>No hay comentarios</p>";

const contenedorProductos = document.createElement('div');
  contenedorProductos.classList.add('practice-card');
  contenedorProductos.innerHTML = 
  ` 
 <div class="information-image">
    <img src="${productos.images[0]}" alt="${productos.title}">
  </div>

  <div class="information-container">
    <h2 class="practice-title">${productos.title}</h2>

    <p class="practice-description">
      ${productos.description}
    </p>

    <p class="practice-category">
      Categoría: ${productos.category}
    </p>

    <p class="practice-rating">
      Rating: ⭐ ${productos.rating}
    </p>

    <s class="practice-price">
      $${productos.price}
    </s>
  
     <p class="practice-price">
      Precio descuento:  $${precioProducto.toFixed(2)}
    </p>
      <p class="practice-description">
        Commentarios: 
     </p> 
          ${comentariosHTML}
     <br>
     <p class="practice-description">
       Rating: ${productos.reviews?.[0]?.rating ?? "Sin rating"}
  Comentario: ${productos.reviews?.[0]?.comment ?? "Sin comentario"}
     </p> 
    <button class="btn-buy" onclick="realizarPago()">Comprar ahora</button>
       
  </div>
  


  `;
  
  document.getElementById("products-container").appendChild(contenedorProductos);
    
}
 cargarProducto();

function realizarPago()
{
   let pago;
    do 
    {
      pago = prompt("Ingresa el Pago de: " + precioProducto.toFixed(2) + " Porfavor")
      
        // Si presiona cancelar
        if (pago === null) {
            alert("Pago cancelado");
            return;
        }

        // Convertimos a número
        pago = parseFloat(pago);

        if (isNaN(pago) || pago <= 0) {
            alert("Ingresa un monto válido");
            continue;
        }

        // Validación de monto
        if (pago < precioProducto) {
            alert("Pago insuficiente");
        }
    }
    while(pago < precioProducto);
 
   // 🔹 BONUS: cálculo del cambio
    const cambio = pago - precioProducto;

    alert(
        `Pago realizado correctamente ✅\n` +
        `Total: $${precioProducto}\n` +
        `Pago: $${pago}\n` +
        `Cambio: $${cambio.toFixed(2)}`
    );
}