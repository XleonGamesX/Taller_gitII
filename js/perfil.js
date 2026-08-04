const perfil = document.getElementById("perfil");

const volver = document.getElementById("volver");

// Obtener usuario guardado

const usuario = JSON.parse(localStorage.getItem("perfil"));

if(usuario){

    crearPerfil(usuario);

}


// ----------------------------

function crearPerfil(usuario){

    const foto = document.createElement("img");
    foto.src = usuario.picture.large;



    const nombre = document.createElement("h2");
    nombre.textContent =
    usuario.name.first + " " + usuario.name.last;



    const usuarioNombre = document.createElement("p");
    usuarioNombre.className = "usuario";
    usuarioNombre.textContent = "@" + usuario.login.username;



    const info = document.createElement("div");
    info.className = "info";



    // Correo

    const tituloCorreo = document.createElement("h4");
    tituloCorreo.textContent = "Correo";

    const correo = document.createElement("p");
    correo.textContent = usuario.email;



    // Teléfono

    const tituloTelefono = document.createElement("h4");
    tituloTelefono.textContent = "Teléfono";

    const telefono = document.createElement("p");
    telefono.textContent = usuario.phone;



    // Edad

    const tituloEdad = document.createElement("h4");
    tituloEdad.textContent = "Edad";

    const edad = document.createElement("p");
    edad.textContent = usuario.dob.age + " años";



    // Género

    const tituloGenero = document.createElement("h4");
    tituloGenero.textContent = "Género";

    const genero = document.createElement("p");
    genero.textContent = usuario.gender;



    // Ubicación

    const tituloPais = document.createElement("h4");
    tituloPais.textContent = "Ubicación";

    const pais = document.createElement("p");
    pais.textContent =
    usuario.location.city +
    ", " +
    usuario.location.country;



    // Agregar al contenedor

    info.appendChild(tituloCorreo);
    info.appendChild(correo);

    info.appendChild(tituloTelefono);
    info.appendChild(telefono);

    info.appendChild(tituloEdad);
    info.appendChild(edad);

    info.appendChild(tituloGenero);
    info.appendChild(genero);

    info.appendChild(tituloPais);
    info.appendChild(pais);



    perfil.appendChild(foto);
    perfil.appendChild(nombre);
    perfil.appendChild(usuarioNombre);
    perfil.appendChild(info);

}


// ----------------------------
// Botón volver
// ----------------------------

volver.addEventListener("click", function(){

    history.back();

});