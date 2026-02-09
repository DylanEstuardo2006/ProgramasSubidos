const urlApi = "https://net06usa.nethostingsac.com/~bcorpsov/ApiMantenimientoComputo/php/getLaboratorios.php";

// Esta función es llamada desde el botón (onclick)
function cargarLaboratorios() 
 {
    fetch(urlApi)
        .then(response => response.json())
        .then(data => {

            console.log("Respuesta de la API:", data);

            if (!data.success) {
                alert("Error al obtener los laboratorios");
                return;
            }

            mostrarLaboratorios(data.laboratorios);
        })
        .catch(error => {
            console.error("Error en la petición:", error);
            alert("No se pudo conectar con la API");
        });
}

// Función para mostrar las tarjetas
function mostrarLaboratorios(labs) {

    const contenedor = document.getElementById("cards");
    contenedor.innerHTML = "";

    labs.forEach(lab => {

        const card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `
            <h3>Laboratorio: ${lab.laboratorios}</h3>
            <p>ID del laboratorio: ${lab.idLaboratorio}</p>
        `;

        contenedor.appendChild(card);
    });
}