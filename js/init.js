const CATEGORIES_URL = "https://japceibal.github.io/emercado-api/cats/cat.json";
const PUBLISH_PRODUCT_URL = "https://japceibal.github.io/emercado-api/sell/publish.json";
const PRODUCTS_URL = "https://japceibal.github.io/emercado-api/cats_products/101.json"; //autos
const AUTOS_PRODUCTS_URL = "https://japceibal.github.io/emercado-api/cats_products/101.json"; //product-info p/autos
const PRODUCT_INFO_URL = "https://japceibal.github.io/emercado-api/products/";
const PRODUCT_INFO_COMMENTS_URL = "https://japceibal.github.io/emercado-api/products_comments/";
const CART_INFO_URL = "https://japceibal.github.io/emercado-api/user_cart/";
const CART_BUY_URL = "https://japceibal.github.io/emercado-api/cart/buy.json";
const EXT_TYPE = ".json";

let showSpinner = function () {
  document.getElementById("spinner-wrapper").style.display = "block";
}

let hideSpinner = function () {
  document.getElementById("spinner-wrapper").style.display = "none";
}

let getJSONData = function (url) {
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
    .then(function (response) {
      result.status = 'ok';
      result.data = response;
      hideSpinner();
      return result;
    })
    .catch(function (error) {
      result.status = 'error';
      result.data = error;
      hideSpinner();
      return result;
    });
}

// Este código corrobora si el usuario está autenticado o no, en caso de que no esté autenticado lo redirige al login 
window.addEventListener('DOMContentLoaded', function () {
  const isAuthenticated = localStorage.getItem('authenticated');

  // Si no está autenticado, redirige al login
  if (!isAuthenticated || isAuthenticated !== 'true') {
    window.location.href = "login.html"; // Redirige al login si no está autenticado
  }
});

// Carga el nombre del usuario cuando el documento esté listo
document.addEventListener("DOMContentLoaded", function () {
  console.log('DOMContentLoaded ejecutado');
    // Esto es para la navbar en todas las páginas

    const navbar = `
    <!-- INICIO DE NAVBAR -->
<nav class="navbar navbar-expand-lg navbar-light">
<div class="container-fluid">
 <!-- Botón del menú hamburguesa -->
 <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
   aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
   <span class="navbar-toggler-icon"></span>
 </button>

 <!-- Logo (se mantendrá fuera del collapse) -->
 <a class="navbar-brand mt-2 mt-lg-0" href="index.html">
   <img src="img/logo-e-commerce.png" height="75" alt="Logo e-commerce" loading="lazy" />
 </a>

 <!-- Íconos de carrito, notificaciones y menú desplegable de usuario fuera del contenedor colapsable -->
 <div class="d-flex align-items-center order-lg-3">
   <a class="text-reset me-3" href="cart.html">
     <i class="fas fa-shopping-cart"></i>
   </a>
   <div class="dropdown">
     <a class="text-reset me-3 dropdown-toggle hidden-arrow" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
       <i class="fas fa-bell"></i>
     </a>
     <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdownMenuLink">
       <li><a class="dropdown-item" href="#">Some news</a></li>
       <li><a class="dropdown-item" href="#">Another news</a></li>
       <li><a class="dropdown-item" href="#">Something else here</a></li>
     </ul>
   </div>

   <div class="dropdown">
     <a class="dropdown-toggle d-flex align-items-center hidden-arrow" href="my-profile.html"
       id="navbarDropdownMenuAvatar" role="button" data-bs-toggle="dropdown" aria-expanded="false">
       <img src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp" class="rounded-circle" height="25" alt="Avatar"
         loading="lazy" />
     </a>
     <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdownMenuAvatar">
       <li><a class="dropdown-item" href="my-profile.html">Mi perfil</a></li>
       <li><a class="dropdown-item" href="#">Configuración</a></li>
       <li><a class="dropdown-item" href="login.html" id="logoutLink">Cerrar sesión</a></li>
     </ul>
   </div>
 </div>

 <!-- Contenedor del menú hamburguesa (menu collapse) -->
 <div class="collapse navbar-collapse order-lg-2" id="navbarSupportedContent">
   <!-- Menú de navegación -->
   <ul class="navbar-nav me-auto mb-2 mb-lg-0">
     <li class="nav-item">
       <a class="nav-link" href="index.html">Home</a>
     </li>
     <li class="nav-item">
       <a class="nav-link" href="categories.html">Categorías</a>
     </li>
     <li class="nav-item">
       <a class="nav-link" href="sell.html">Vender</a>
     </li>
   </ul>

   <!-- Nombre de usuario en pantallas grandes -->
   <span class="d-none d-lg-inline" id="username"></span>

   <!-- Nombre de usuario en pantallas pequeñas dentro del menú hamburguesa -->
   <span class="d-lg-none my-2" id="username-small"></span>
 </div>
</div>
</nav>
<!-- FIN DE NAVBAR -->
`;
  document.body.insertAdjacentHTML('afterbegin', navbar);
  
  //A partir de aquí, está el localStorage con  el nombre del usuario
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

/* Esto es para que aparezca la imagen actualizada en todas las navbar */
document.addEventListener('DOMContentLoaded', function () {
  const avatarNav = document.querySelector('#navbarDropdownMenuAvatar img'); 

  // Carga la imagen de perfil desde el localStorage
  const profilePic = localStorage.getItem('profilePic');

  if (profilePic && avatarNav) {
      avatarNav.src = profilePic; /* Y así se actualiza la imagen en todas las navbars */
  }
});

/* A partir de aquí está el modo oscuro/claro */
/* Esto tuve que modificarlo por unos problemas de una clase de bootstrap, para que la agregue o la quite cuando estemos en my profile y no se pierda el estilo alrededor del form*/
document.addEventListener("DOMContentLoaded", function () {
  const toggleModeButton = document.getElementById("toggle-mode");
  const myProfileElement = document.getElementById("myProfile");

  // Verificar el modo al cargar la página
  const currentMode = localStorage.getItem("mode");
  if (currentMode === "dark") {
    document.body.classList.add("dark-mode");
    toggleModeButton.textContent = "Modo Día";
    removeProfileClasses(); // Quita clases en modo oscuro
  } else {
    document.body.classList.remove("dark-mode");
    toggleModeButton.textContent = "Modo Noche";
    addProfileClasses(); // Agrega clases en modo claro
  }

  // Esto es para que el botón funcione
  toggleModeButton.addEventListener("click", function () {
    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {
      toggleModeButton.textContent = "Modo Día";
      localStorage.setItem("mode", "dark");
      removeProfileClasses(); // Esto quita las clases para el modo oscuro
    } else {
      toggleModeButton.textContent = "Modo Noche";
      localStorage.setItem("mode", "light");
      addProfileClasses(); // Agrega las clases para el modo claro
    }
  });
/*Estas son las funciones para que funcione lo de arriba*/
  function removeProfileClasses() {
    if (myProfileElement) {
      myProfileElement.classList.remove("shadow-lg", "bg-body", "rounded"); 
    }
  }

  function addProfileClasses() {
    if (myProfileElement) {
      myProfileElement.classList.add("shadow-lg", "bg-body", "rounded");
    }
  }
});
/* Fin del modo oscuro/claro */

document.addEventListener('DOMContentLoaded', function() {
  // Cerrar sesión - borra el usuario autenticado
  document.getElementById('logoutLink').addEventListener('click', function(event) {
      
      // Borrar información del usuario de localStorage
      localStorage.removeItem('name');
      localStorage.removeItem('lastName');
      localStorage.removeItem('currentUser');
      localStorage.removeItem('profilePic');
  });
});

document.addEventListener('DOMContentLoaded', function () {
  // Cargar nombre y apellido si existen en localStorage
  const name = localStorage.getItem('name');
  const lastName = localStorage.getItem('lastName');

  // Elementos con id "username" y "username-small" para mostrar el nombre completo del usuario
  const usernameElement = document.getElementById('username');
  const usernameSmallElement = document.getElementById('username-small'); // Elemento para pantallas pequeñas

  // Función para actualizar los elementos con el nombre completo o "Invitado"
  function updateUsernameDisplay() {
      if (usernameElement && usernameSmallElement) {
          if (name && lastName) {
              const fullName = `${name} ${lastName}`; // Concatenar nombre y apellido
              // Muestra el nombre completo del usuario en ambos elementos
              usernameElement.textContent = fullName;
              usernameSmallElement.textContent = fullName; // Para el menú en pantallas pequeñas
          } else {
              // Si no hay nombre y apellido, muestra "Invitado" en ambos elementos
              usernameElement.textContent = 'Invitado';
              usernameSmallElement.textContent = 'Invitado';
          }
      } else {
          console.error('Elementos con id "username" o "username-small" no encontrados.');
      }
  }

  // Llamar a la función para actualizar los elementos
  updateUsernameDisplay();
});



