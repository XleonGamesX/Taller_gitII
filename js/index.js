// Contenedor donde se agregan las tarjetas
const contenedorCards = document.getElementById("contenedorCards");

// Input de búsqueda
const buscar = document.getElementById("buscar");

// Contadores
const cantidadUsuarios = document.getElementById("cantidadUsuarios");
const usuariosMostrados = document.getElementById("usuariosMostrados");
const cantidadFavoritos = document.getElementById("cantidadFavoritos");

// Arreglo de usuarios
let usuarios = [];

// ---------------------------
// Cargar favoritos
// ---------------------------

let favoritos = JSON.parse(localStorage.getItem("favoritos"));

if (favoritos === null) {
    favoritos = [];
}

// Mostrar cantidad de favoritos
cantidadFavoritos.textContent = favoritos.length;

// ---------------------------
// Obtener usuarios
// ---------------------------

axios.get("https://randomuser.me/api/?results=100")

.then(function(respuesta){

    usuarios = respuesta.data.results;

    cantidadUsuarios.textContent = usuarios.length;

    usuariosMostrados.textContent = usuarios.length;

    mostrarUsuarios(usuarios);

})

.catch(function(error){

    console.log(error);

});


// ---------------------------
// Mostrar usuarios
// ---------------------------

function mostrarUsuarios(listaUsuarios){

    // Vaciar contenedor

    while(contenedorCards.firstChild){

        contenedorCards.removeChild(contenedorCards.firstChild);

    }

    usuariosMostrados.textContent = listaUsuarios.length;

    listaUsuarios.forEach(function(usuario){

        crearCard(usuario);

    });

}


// ---------------------------
// Crear tarjeta
// ---------------------------

function crearCard(usuario){

    const card = document.createElement("div");
    card.className = "card";

    // FOTO

    const foto = document.createElement("img");
    foto.className = "foto";
    foto.src = usuario.picture.large;

    // NOMBRE

    const nombre = document.createElement("h3");
    nombre.className = "nombre";
    nombre.textContent =
    usuario.name.first + " " + usuario.name.last;

    // PAIS

    const pais = document.createElement("p");
    pais.className = "pais";
    pais.textContent = usuario.location.country;

    // GENERO

    const genero = document.createElement("p");
    genero.className = "genero";
    genero.textContent = usuario.gender;

    // ESTRELLA

    const estrella = document.createElement("button");
    estrella.className = "estrella";
    estrella.textContent = "☆";


    // Revisar si ya es favorito

    const existe = favoritos.some(function(persona){

        return persona.login.uuid === usuario.login.uuid;

    });

    if(existe){

        estrella.textContent = "★";
        estrella.classList.add("favorita");

    }


    // Evento estrella

    estrella.addEventListener("click", function(evento){

        // Evita abrir el perfil
        evento.stopPropagation();

        cambiarFavorito(usuario, estrella);

    });


    // Abrir perfil

    card.addEventListener("click", function(){

        localStorage.setItem(
            "perfil",
            JSON.stringify(usuario)
        );

        window.location.href = "perfil.html";

    });


    // Agregar elementos

    card.appendChild(estrella);
    card.appendChild(foto);
    card.appendChild(nombre);
    card.appendChild(pais);
    card.appendChild(genero);

    contenedorCards.appendChild(card);

}


// ---------------------------
// Agregar o quitar favoritos
// ---------------------------

function cambiarFavorito(usuario, estrella){

    const posicion = favoritos.findIndex(function(persona){

        return persona.login.uuid === usuario.login.uuid;

    });


    // Si no existe lo agrega

    if(posicion === -1){

        favoritos.push(usuario);

        estrella.textContent = "★";
        estrella.classList.add("favorita");

    }

    // Si existe lo elimina

    else{

        favoritos.splice(posicion,1);

        estrella.textContent = "☆";
        estrella.classList.remove("favorita");

    }


    localStorage.setItem(
        "favoritos",
        JSON.stringify(favoritos)
    );

    cantidadFavoritos.textContent = favoritos.length;

}



// ---------------------------
// Buscar usuarios
// ---------------------------

buscar.addEventListener("keyup", function(){

    const texto = buscar.value.toLowerCase();

    const filtrados = usuarios.filter(function(usuario){

        const nombreCompleto =
        usuario.name.first.toLowerCase() +
        " " +
        usuario.name.last.toLowerCase();

        return nombreCompleto.includes(texto);

    });

    mostrarUsuarios(filtrados);

});