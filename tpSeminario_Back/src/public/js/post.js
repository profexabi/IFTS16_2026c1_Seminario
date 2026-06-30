const postProductForm = document.getElementById("postProduct-form");
const contenedorProductos = document.getElementById("contenedor-productos");
const url = "http://localhost:3000/api/products";

const postUserForm = document.getElementById("postUser-form");
const contenedorUsuarios = document.getElementById("contenedor-usuarios");
const urlUsers = "http://localhost:3000/api/users";


// Optimizacion 1: Validacion previa de datos en el cliente
function validarFormulario(data) {
    const errores = [];

    if (!data.name || data.name.trim().length < 2) {
        errores.push("El nombre debe tener al menos 2 caracteres");
    }

    if (!data.price || isNaN(data.price) || Number(data.price) < 0) {
        errores.push("El precio debe ser un numero mayor a 0");
    }

    if (!data.category) {
        errores.push("Debe seleccionar una categoria");
    }

    return errores;
}



// Optimizacion 2: Mostramos mensajes de exito o error
function mostrarMensaje(tipo, mensaje) {
    contenedorProductos.innerHTML = `<p class="info ${tipo}">${mensaje}</p>`
}

////////////////////////
// Creacion de usuarios
postUserForm.addEventListener("submit", async event => {
    event.preventDefault();

    let formData = new FormData(event.target);
    let data = Object.fromEntries(formData.entries());
    console.table(data);

    try {
        console.log("test")
        const response = await fetch(urlUsers, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });
        console.log("test 2")

        console.log(response);

        const result = await response.json();
        console.log(result);

        if(!response.ok) {
            const mensaje = result.errores?join("\n") : result.message;
            mostrarMensaje("error", mensaje);
            return;
        }
        
        console.log(result.message);
        mostrarMensaje("exito", result.message);

    } catch (error) {
        console.error(error)
    }
});


////////////////////////
// Creacion de productos
postProductForm.addEventListener("submit", async event => {

    event.preventDefault(); // Evitamos el envio por defecto del formulario

    // Obtenemos la data del formulario en un objeto FormData
    let formData = new FormData(event.target);

    // Transformamos el objeto FormData en un objeto JavaScript
    let data = Object.fromEntries(formData.entries());

    console.table(data); // {category: 'food', image: 'https://i.pinimg.com/736x/62/30/69/623069e6f22cf5a30d2a326aa5b34221.jpg', name: 'coso', price: '123'}

    // Parseamos el precio
    data.price = Number(data.price);


    // Optimizacion 4: Llamamos a la funcion para validar los datos del formulario
    const errores = validarFormulario(data);
    
    if (errores.length > 0) {
        mostrarMensaje("error", errores.join("\n"));
        return;
    }

    try {
        console.log("test")
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(data)
        });
        console.log("test 2")

        console.log(response);

        const result = await response.json();

        console.log(result);

        // Optimizacion 5: Es mas optimo contemplar un solo if con !response.ok, en lugar de anidar tanto con if...else
        if(!response.ok) {
            const mensaje = result.errores?join("\n") : result.message;
            mostrarMensaje("error", mensaje);
            return;
        }
        
        console.log(result.message);
        mostrarMensaje("exito", result.message);


    } catch (error) {
        console.error("Error al enviar los datos: ", error);
        mostrarMensaje("error", "Error al procesar la solicitud");
    }
})