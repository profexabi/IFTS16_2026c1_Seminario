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
            console.error(datos);
            mostrarError(datos.message);
            return;
        }

        mostrarProductos(datos.payload[0]);



    } catch (error) {
        console.error("Error al obtener el producto: ", error);
    }

})


function mostrarProductos(producto) {
    let htmlProducto = "<ul>";

    htmlProducto += `
        <li class="listados">
            <img src="${producto.image}" alt="${producto.name}" class="img-listados"> Nombre: <p> <strong>${producto.name}</strong></p> / <p>Id: <strong>${producto.id}</strong></p> / Precio: <p><strong>$${producto.price}</strong></p>

            <input type="button" id="deleteProduct_button" class="btn-envio btn-lista" value="Eliminar producto">
        </li>
    `;

    htmlProducto += "</ul>";

    contenedorProductos.innerHTML = htmlProducto;

    // Asignaremos un evento al boton eliminar
    const deleteProductButton = document.getElementById("deleteProduct_button");

    deleteProductButton.addEventListener("click", event => {
        event.preventDefault();

        const confirmacion = confirm("Queres eliminar este producto?");

        if(!confirmacion) {
            alert("Eliminacion cancelada");
        } else {
            eliminarProducto(producto.id);
        }
    });

}

async function eliminarProducto(id) {
    try {
        const response = await fetch(`${url}${id}`, {
            method: "DELETE"
        });

        console.log(response); // Response {type: 'cors', url: 'http://localhost:3000/api/products/55', redirected: false, status: 204, ok: true, …}

        // En 204 no content no funciona response.json
        const result = response.status !== 204 ? await response.json() : null;
        
        if (response.ok) {
            // Esto generaba un error, ya que en 204 no se parsea la respuesta!
            // alert(result.message);

            // TO DO, mensaje fondo verde indicando exito
            // Vaciamos la lista
            contenedorProductos.innerHTML = `<p class='exito'>Producto con id ${id} eliminado exitosamente</p>`;

        } else {
            console.error("Error 1 en la solicitud DELETE: ", error.message);
            alert(error.message);
        }

    

    } catch (error) {
        console.error("Error 2 en la solicitud DELETE", error);
        alert("Error al eliminar el producto", error);
    }
}

function mostrarError(mensaje) {
    contenedorProductos.innerHTML = `<p class="info error">${mensaje}</p>`
}
