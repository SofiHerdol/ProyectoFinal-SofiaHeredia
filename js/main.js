data.sort((a, b) => {
    if (a.name > b.name) return 1;
    if (a.name < b.name) return -1;
    return 0;
});
nodeCharacter(data, document.getElementById("characterContainer"))

mostrarPrimerPersonajeZa(data);


function obtenerDatosDeAPI() {
    const API_URL = 'https://rickandmortyapi.com/api/character/';

    return fetch(API_URL)
        .then(response => {
            if (!response.ok) {
                throw new Error('No se pudo obtener los datos');
            }
            return response.json();
        })
        .then(data => data.results)
        .catch(error => {
            console.error('Error al obtener datos de la API:', error);
            return [];
        });
}

function ordenarPorNombre(array) {
    return new Promise((resolve, reject) => {
        try {
            array.sort((a, b) => {
                if (a.name > b.name) return 1;
                if (a.name < b.name) return -1;
                return 0;
            });
            resolve(array);
        } catch (error) {
            reject(error);
        }
    });
}

obtenerDatosDeAPI()
    .then(characters => {
        return ordenarPorNombre(characters);
    })
    .then(sortedData => {
        const characterContainer = document.getElementById("characterContainer");
        characterContainer.innerHTML = '';
        nodeCharacter(sortedData, characterContainer);
        mostrarPrimerPersonajeZa(sortedData);
    })
    .catch(error => {
        console.error('Error:', error);
    });

ordenarPorNombre(data)
    .then((sortedData) => {
        nodeCharacter(sortedData, document.getElementById("characterContainer"));
        mostrarPrimerPersonajeZa(sortedData);
    })
    .catch((error) => {
        console.error('Error al ordenar los datos:', error);
    });


function nodeCharacter(array, container) {
    for (let i = 0; i < array.length; i++) {
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
            <h3 class="characterName">
                ${array[i].name}
            </h3>
            <div class="description">
                <p>Status: ${array[i].status}</p>
                <p>Species: ${array[i].species}</p>
                <p>Gender: ${array[i].gender}</p>
                <p>Origin: ${array[i].origin.name}</p>
                <p>Location: ${array[i].location.name}</p>
            </div>
            <div class="imageContainer">
                <img src="${array[i].image}" alt=${array[i].name}>
            </div>
            <button class="favoritoButton">Agregar a Favoritos</button>
        `;
        container.appendChild(card);
        const favoritoButton = card.querySelector('.favoritoButton');
        favoritoButton.addEventListener('click', function () {
            animarBoton(favoritoButton);
            const personajeFavorito = array[i];
            localStorage.setItem('personajeFavorito', JSON.stringify(personajeFavorito));
        });
    }
}

let personajeFavorito = JSON.parse(localStorage.getItem('personajeFavorito')) || {};
let favoritoButton;

function mostrarTarjetaPersonajeFavorito() {
    const favoriteCharacterContainer = document.getElementById('favoriteCharacterContainer');
    favoriteCharacterContainer.innerHTML = '';

    if (personajeFavorito && Object.keys(personajeFavorito).length > 0) {
        const card = document.createElement("div");
        card.className = "cardFav";
        card.innerHTML = `
            <h3>
                Personaje favorito actual:
            </h3>
            <h3 class="characterName">
                ${personajeFavorito.name}
            </h3>
            <div class="description">
                <p>Species: ${personajeFavorito.species}</p>
                <p>Gender: ${personajeFavorito.gender}</p>
            </div>
        `;

        favoriteCharacterContainer.appendChild(card);
    } else {
        const message = document.createElement("p");
        message.innerText = "Para seleccionar un personaje como favorito, ¡clickea el botón en el que más te guste!";
        favoriteCharacterContainer.appendChild(message);
    }
}

mostrarTarjetaPersonajeFavorito();


function mostrarPersonajeAleatorio(data) {
    const randomCharacterContainer = document.getElementById('randomCharacter');
    const tarjetaAleatoria = randomCharacterContainer.querySelector('.card');
    
    if (tarjetaAleatoria) {
        const indiceAleatorio = Math.floor(Math.random() * data.length);
        const personajeAleatorio = data[indiceAleatorio];

        tarjetaAleatoria.innerHTML = `
            <h3>
                Personaje aleatorio:
            </h3>
            <h3 class="characterName">
                ${personajeAleatorio.name}
            </h3>
            <div class="description">
                <p>Status: ${personajeAleatorio.status}</p>
                <p>Species: ${personajeAleatorio.species}</p>
                <p>Gender: ${personajeAleatorio.gender}</p>
                <p>Origin: ${personajeAleatorio.origin.name}</p>
                <p>Location: ${personajeAleatorio.location.name}</p>
            </div>
            <div class="imageContainer">
                <img src="${personajeAleatorio.image}" alt="${personajeAleatorio.name}">
            </div>
        `;

    } else {
        const indiceAleatorio = Math.floor(Math.random() * data.length);
        const personajeAleatorio = data[indiceAleatorio];
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
            <h3>
                Personaje aleatorio:
            </h3>
            <h3 class="characterName">
                ${personajeAleatorio.name}
            </h3>
            <div class="description">
                <p>Status: ${personajeAleatorio.status}</p>
                <p>Species: ${personajeAleatorio.species}</p>
                <p>Gender: ${personajeAleatorio.gender}</p>
                <p>Origin: ${personajeAleatorio.origin.name}</p>
                <p>Location: ${personajeAleatorio.location.name}</p>
            </div>
            <div class="imageContainer">
                <img src="${personajeAleatorio.image}" alt="${personajeAleatorio.name}">
            </div>
        `;
        randomCharacterContainer.appendChild(card);
    }
}

document.getElementById("randomButton").addEventListener("click", function () {
    mostrarPersonajeAleatorio(data);
});
mostrarPersonajeAleatorio(data);

function mostrarPrimerPersonajeZa(data) {
    const primerPersonaje = data[data.length - 1];
    const container = document.getElementById('firstCharacter');
    container.innerHTML = '';
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
        <h3>
            Personaje más cerca de la Z:
        </h3>
        <h3 class="characterName">
            ${primerPersonaje.name}
        </h3>
        <div class="description">
            <p>Status: ${primerPersonaje.status}</p>
            <p>Species: ${primerPersonaje.species}</p>
            <p>Gender: ${primerPersonaje.gender}</p>
            <p>Origin: ${primerPersonaje.origin.name}</p>
            <p>Location: ${primerPersonaje.location.name}</p>
        </div>
        <div class="imageContainer">
            <img src="${primerPersonaje.image}" alt="${primerPersonaje.name}">
        </div>
    `;
    container.appendChild(card);
}

function buscarPersonajePorNombre(data) {
    const inputElement = document.getElementById('searchInput');
    const errorMessage = document.getElementById('error-message');
    const searchResultContainer = document.getElementById('searchResultContainer');
    const nombreBuscado = inputElement.value;

    obtenerDatosDeAPI()
        .then(characters => {
            const personajeEncontrado = characters.find(personaje => personaje.name === nombreBuscado);

            if (personajeEncontrado) {
                searchResultContainer.innerHTML = '';

                const card = document.createElement("div");
                card.className = "card";

                card.innerHTML = `
                    <h3 class="characterName">
                        ${personajeEncontrado.name}
                    </h3>
                    <div class="description">
                        <p>Status: ${personajeEncontrado.status}</p>
                        <p>Species: ${personajeEncontrado.species}</p>
                        <p>Gender: ${personajeEncontrado.gender}</p>
                        <p>Origin: ${personajeEncontrado.origin.name}</p>
                        <p>Location: ${personajeEncontrado.location.name}</p>
                    </div>
                    <div class="imageContainer">
                        <img src="${personajeEncontrado.image}" alt="${personajeEncontrado.name}">
                    </div>
                `;
                searchResultContainer.appendChild(card);
                errorMessage.style.display = 'none';
            } else {
                errorMessage.innerText = 'No se encontró ningún personaje con ese nombre. Intente de nuevo.';
                errorMessage.style.display = 'block';
            }
        })
        .catch(error => {
            console.error('Error al buscar personaje por nombre:', error);
        });
}

document.getElementById("searchButton").addEventListener("click", function () {
    animarBoton(this);
    buscarPersonajePorNombre();
});

document.getElementById("searchCharacterContainer").addEventListener("click", buscarPersonajePorNombre);
function mostrarInformacionPersonaje(personaje, container) {
    container.innerHTML = `
        <h3 class="characterName">${personaje.name}</h3>
        <div class="description">
            <p>Status: ${personaje.status}</p>
            <p>Species: ${personaje.species}</p>
            <p>Gender: ${personaje.gender}</p>
            <p>Origin: ${personaje.origin.name}</p>
            <p>Location: ${personaje.location.name}</p>
        </div>
        <div class="imageContainer">
            <img src="${personaje.image}" alt="${personaje.name}">
        </div>
    `;
}

document.getElementById("randomButton").addEventListener("click", function () {
    mostrarPersonajeAleatorio(data, false);
});

function animarBoton(boton) {
    const originalColor = window.getComputedStyle(boton).backgroundColor;

    anime({
        targets: boton,
        backgroundColor: '#8a2be2',
        duration: 500,
        easing: 'easeInOutQuad',
        complete: function() {
            anime({
                targets: boton,
                backgroundColor: originalColor,
                duration: 500,
                easing: 'easeInOutQuad'
            });
        }
    });
}


const randomButton = document.getElementById('randomButton');
randomButton.addEventListener('click', function() {
    animarBoton(randomButton);
    mostrarPersonajeAleatorio(data);
});


const searchButton = document.getElementById('searchButton');
searchButton.addEventListener('click', function() {
    animarBoton(searchButton);
    buscarPersonajePorNombre();
});