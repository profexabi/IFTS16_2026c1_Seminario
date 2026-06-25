let contenedorProductos = document.getElementById("contenedor-productos");
let getProductForm = document.getElementById("getProduct-form");
const url = "http://localhost:3000/api/products/";


getProductForm.addEventListener("submit", async event => {

    // Prevenimos el envio por defecto del formulario
    event.preventDefault();

    // Agarramos el valor del campo de idProd
    const idProd = event.target.idProd.value.trim();

    // Optimizacion 1: Nos aseguramos de que se haya enviado un id valido y mandamos mensaje de error
    if(!idProd) {
        contenedorProductos.innerHTML = `<p class="info error">Ingresa un id valido</p>`
    }

    // Vamos a hacer el fetch a la url personalizada
    try {

        // Solicitud HTTP GET
        const response = await fetch(`${url}${idProd}`);

        // Parseo de datos JSON recibidos
        const datos = await response.json();

        // Evaluamos si el servidor respondio correctamete
        if(!response.ok) { // Respuesta no positiva
            console.error(datos.message);
            mostrarError(datos.message);
            return;
        }

        mostrarProductos(datos.payload[0]);



    } catch (error) {
        console.error("Error al obtener el producto: ", error.message);
        mostrarError(error);
    }

})


function mostrarProductos(datos) {
    let htmlProducto = "<ul>";

    htmlProducto += `
        <li class="listados">
            <img src="${datos.image}" alt="${datos.name}" class="img-listados"> Nombre: <p><strong>${datos.name}</strong></p> / <p>Id: <strong>${datos.id}</strong></p> / Precio: <p><strong>$${datos.price}</strong></p>
        </li>
    `;

    htmlProducto += "</ul>";

    contenedorProductos.innerHTML = htmlProducto;
}

function mostrarError(mensaje) {
    contenedorProductos.innerHTML = `<p class="info error">${mensaje}</p>`
}
