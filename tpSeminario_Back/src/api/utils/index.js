// Logica para trabajar con archivos y rutas de proyecto

// Importacion de modulos para trabajar con rutas
import { fileURLToPath } from "url";
import { dirname, join } from "path";

// Obtener nombre del archivo actual
const __filename = fileURLToPath(import.meta.url);

// Obtener el directorio del archivo actual
const __dirname = join(dirname(__filename), "../../../"); // Retrocedemos las carpetas utils, api y src

export {
    __dirname,
    join
}