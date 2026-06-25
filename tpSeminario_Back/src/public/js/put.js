let contenedorProductos = document.getElementById("contenedor-productos");
let getProductForm = document.getElementById("getProduct-form");
const updateProductsContainer = document.getElementById("updateProducts-container");

const url = "http://localhost:3000/api/products";


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
        const response = await fetch(`${url}/${idProd}`);

        // Parseo de datos JSON recibidos
        const datos = await response.json();

        // Evaluamos si el servidor respondio correctamete
        if(!response.ok) { // Respuesta no positiva
            console.error(datos);
            mostrarMensaje("error", datos.message);
            return;
        }

        mostrarProductos(datos.payload[0]);

    } catch (error) {
        console.error("Error al obtener el producto: ", error);
        mostrarMensaje("error", "Error de conexion con el servidor")
    }

})


function mostrarProductos(producto) {
    let htmlProducto = "<ul>";

    htmlProducto += `
        <li class="listados">
            <img src="${producto.image}" alt="${producto.name}" class="img-listados"> Nombre: <p> <strong>${producto.name}</strong></p> / <p>Id: <strong>${producto.id}</strong></p> / Precio: <p><strong>$${producto.price}</strong></p>

            <input type="button" id="updateProduct_button" class="btn-envio btn-lista" value="Actualizar producto">
        </li>
    `;

    htmlProducto += "</ul>";

    contenedorProductos.innerHTML = htmlProducto;

    const updateProductButton = document.getElementById("updateProduct_button");
    updateProductButton.addEventListener("click", event => {
        crearFormularioPut(event, producto);
    });
}

function crearFormularioPut(event, producto) {
    event.stopPropagation();

    console.log(producto); // {id: 1, name: 'hamburguesa cuatricampeona', image: 'https://www.mostazaweb.com.ar/wp-content/uploads/2026/03/MAY0-3-copia.png', category: 'food', price: '1000.00', …}

    let htmlFormulario = `

        <hr>

        <h2>Actualizar producto</h2>

        <form id="updateProducts-form" class="formAltaProducto">

            <input type="hidden" name="id" id="idProd" value="${producto.id}">

            <!-- Categoria -->
            <label for="category" id="categoryProd">Categoria</label>
            <select name="category" id="categoryProd">
                <option value="food">food</option>
                <option value="drink">drink</option>
            </select>

            <!-- Imagen -->
            <label for="imageProd">Imagen</label>
            <input type="text" name="image" id="imageProd" value="${producto.image}" required>

            <!-- Nombre -->
            <label for="nameProd">Nombre</label>
            <input type="text" name="name" id="nameProd" value="${producto.name}" required>

            <!-- Precio -->
            <label for="priceProd">Precio</label>
            <input type="number" name="price" id="priceProd" value="${producto.price}" required>


            <input type="submit" class="btn-envio" value="Actualizar producto">

        </form>
    `;

    updateProductsContainer.innerHTML = htmlFormulario;

    const updateProductsForm = document.getElementById("updateProducts-form");

    updateProductsForm.addEventListener("submit", event => {
        actualizarProducto(event);
    });
}


// Enviamos los datos del formulario al servidor
async function actualizarProducto(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());

    console.log(data); // {id: '1', category: 'food', image: 'https://www.mostazaweb.com.ar/wp-content/uploads/2026/03/MAY0-3-copia.png', name: 'hamburguesa cuatricampeona', price: '1000.00'}

    // Optimizacion 2: Validacion de datos en el cliente
    if (!data.name || !data.image || !data.category || !data.price) {
        mostrarMensaje("error", "Todos los campos son obligatorios");
        return;
    }

    try {
        const response = await fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        if (!response.ok) {
            console.error(result.message);
            updateProductsContainer.innerHTML = "";
            mostrarMensaje("error", result.message);
            return;
        }

        console.log(result.message);
        mostrarMensaje("exito", result.message);

        // Limpiamos el formulario al actualizar el producto
        updateProductsContainer.innerHTML = "";

    } catch (error) {
        console.error("Error al enviar los datos", error.message);
        mostrarMensaje("error", "Error al procesar la solicitud");
    }
}

function mostrarMensaje(tipo, mensaje) {
    contenedorProductos.innerHTML = `<p class="info ${tipo}">${mensaje}</p>`
}
