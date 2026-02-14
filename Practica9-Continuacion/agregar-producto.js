 
const guardarproducto=()=>{
    //creamos las varioables de los elemntos con los que vamos a interactuar 
    const titulo=document.getElementById("titulo").value
    const precio=parseFloat(document.getElementById("precio").value)
    const categoria=document.getElementById("categoria").value
    const descripcion=document.getElementById("descripcion").value
    const resultado=document.getElementById("mensaje-exito")

    //validamos que los elementos no vengan vacios 
    if(!titulo || !precio || !descripcion){
        alert("Completa los campos obligatorios")
        return
    }
  
    if(categoria == "0")
    {
         alert("Escoge una opción valida")
        return
    }
    //creamos el objeto que se va por el body 
    const producto={
        title:titulo,
        price:precio,
        category:categoria,
        description:descripcion,
        thumbnail:'https://dummyjson.com/image/400x200/008080/ffffff?text='+titulo
    }

    //hacemos la peticion fetch con el metodo post
    fetch("https://dummyjson.com/products/add",{
        method:"POST",
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(producto)
    })
    .then(response=>response.json())
    .then(data=>{
        console.log("Respuesta del API", data)
        resultado.style.display="block"
        resultado.innerHTML=`
        <strong>Producto Agregado correctamente!!!</strong><br>
        Id Asignado : ${data.id}<br>
        Nombre      : ${data.title}<br>
        Precio      : $${data.price}.00  
        `
    })
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

const asignarCategorias = (categorias) =>
{
 const select = document.getElementById('categoria');

 categorias.forEach((categoria,i) => 
 {
    const opcion = document.createElement("option");
    opcion.value = categoria;
    opcion.textContent = categoria;
    select.appendChild(opcion);
 })
}

cargarCategory();