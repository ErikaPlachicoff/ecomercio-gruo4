const CATEGORIES_URL = "https://japceibal.github.io/emercado-api/cats/cat.json";
const PUBLISH_PRODUCT_URL = "https://japceibal.github.io/emercado-api/sell/publish.json";
const PRODUCTS_URL = "https://japceibal.github.io/emercado-api/cats_products/101.json"; //autos
const AUTOS_PRODUCTS_URL = "https://japceibal.github.io/emercado-api/cats_products/101.json"; //product-info p/autos
const PRODUCT_INFO_URL = "https://japceibal.github.io/emercado-api/products/";
const PRODUCT_INFO_COMMENTS_URL = "https://japceibal.github.io/emercado-api/products_comments/";
const CART_INFO_URL = "https://japceibal.github.io/emercado-api/user_cart/";
const CART_BUY_URL = "https://japceibal.github.io/emercado-api/cart/buy.json";
const EXT_TYPE = ".json";

let showSpinner = function() {
    document.getElementById("spinner-wrapper").style.display = "block";
}

let hideSpinner = function() {
    document.getElementById("spinner-wrapper").style.display = "none";
}

let getJSONData = function(url) {
    let result = {};
    showSpinner();
    return fetch(url)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw Error(response.statusText);
            }
        })
        .then(function(response) {
            result.status = 'ok';
            result.data = response;
            hideSpinner();
            return result;
        })
        .catch(function(error) {
            result.status = 'error';
            result.data = error;
            hideSpinner();
            return result;
        });
}

// Este código corrobora si el usuario está autenticado o no, en caso de que no esté autenticado lo redirige al login 
window.addEventListener('DOMContentLoaded', function() {
    const isAuthenticated = localStorage.getItem('authenticated');

    // Si no está autenticado, redirige al login
    if (!isAuthenticated || isAuthenticated !== 'true') {
        window.location.href = "login.html"; // Redirige al login si no está autenticado
    }
});

// Cargar el nombre del usuario cuando el documento esté listo
document.addEventListener("DOMContentLoaded", function() {
    console.log('DOMContentLoaded ejecutado');
    // Recupera el nombre del usuario desde localStorage
    const currentUser = localStorage.getItem('currentUser');
  
    //Elementos con id "username" y "username-small" para mostrar el mail del usuario
    const usernameElement = document.getElementById('username');
    const usernameSmallElement = document.getElementById('username-small'); // Elemento para pantallas pequeñas
  
    if (usernameElement && usernameSmallElement) {
        if (currentUser) {
            // Muestra el email del usuario en ambos elementos
            usernameElement.textContent = currentUser;
            usernameSmallElement.textContent = currentUser; //Elemento para pantallas pequeñas que se muestra en el menu hamburguesa 
        } else {
            // Si no hay usuario, muestra "Invitado" en ambos elementos
            usernameElement.textContent = 'Invitado';
            usernameSmallElement.textContent = 'Invitado';
        }
    } else {
        console.error('Elementos con id "username" o "username-small" no encontrados.');
    }
});
