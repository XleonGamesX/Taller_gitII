const contenedorCards = document.getElementById("contenedorCards");

const buscar = document.getElementById("buscar");

const cantidadFavoritos = document.getElementById("cantidadFavoritos");

const usuariosMostrados = document.getElementById("usuariosMostrados");


// Obtener favoritos

let favoritos = JSON.parse(localStorage.getItem("favoritos"));

if(favoritos === null){

    favoritos = [];

}


// Mostrar cantidades

cantidadFavoritos.textContent = favoritos.length;

usuariosMostrados.textContent = favoritos.length;


// Mostrar tarjetas

mostrarFavoritos(favoritos);


// -----------------------------------

function mostrarFavoritos(lista){

    while(contenedorCards.firstChild){

        contenedorCards.removeChild(contenedorCards.firstChild);

    }

    usuariosMostrados.textContent = lista.length;

    lista.forEach(function(usuario){

        crearCard(usuario);

    });

}


// -----------------------------------

function crearCard(usuario){

    const card = document.createElement("div");
    card.className = "card";



    const foto = document.createElement("img");
    foto.className = "foto";
    foto.src = usuario.picture.large;



    const nombre = document.createElement("h3");
    nombre.className = "nombre";
    nombre.textContent =
    usuario.name.first + " " + usuario.name.last;



    const pais = document.createElement("p");
    pais.className = "pais";
    pais.textContent = usuario.location.country;



    const genero = document.createElement("p");
    genero.className = "genero";
    genero.textContent = usuario.gender;



    const estrella = document.createElement("button");
    estrella.className = "estrella favorita";
    estrella.textContent = "★";



    // Quitar favorito

    estrella.addEventListener("click", function(event){

        event.stopPropagation();

        quitarFavorito(usuario);

    });



    // Abrir perfil

    card.addEventListener("click", function(){

        localStorage.setItem(

            "perfil",

            JSON.stringify(usuario)

        );

        window.location.href = "perfil.html";

    });



    card.appendChild(estrella);

    card.appendChild(foto);

    card.appendChild(nombre);

    card.appendChild(pais);

    card.appendChild(genero);

    contenedorCards.appendChild(card);

}


// -----------------------------------

function quitarFavorito(usuario){

    favoritos = favoritos.filter(function(persona){

        return persona.login.uuid !== usuario.login.uuid;

    });

    localStorage.setItem(

        "favoritos",

        JSON.stringify(favoritos)

    );

    cantidadFavoritos.textContent = favoritos.length;

    mostrarFavoritos(favoritos);

}


// -----------------------------------
// Buscador
// -----------------------------------

buscar.addEventListener("keyup", function(){

    const texto = buscar.value.toLowerCase();

    const lista = favoritos.filter(function(usuario){

        const nombreCompleto =

        usuario.name.first.toLowerCase()

        + " " +

        usuario.name.last.toLowerCase();

        return nombreCompleto.includes(texto);

    });

    mostrarFavoritos(lista);

});