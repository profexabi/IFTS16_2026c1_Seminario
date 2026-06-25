/*=======================
    Controladores
=======================*/

export const loginView = (req, res) => {
    res.render("login", {
        title: "Login",
        about: "Introduzca sus credenciales"
    });
}