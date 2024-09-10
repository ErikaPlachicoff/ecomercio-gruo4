
document.addEventListener("DOMContentLoaded", function () {

  const spinner = document.getElementById('spinner-wrapper');
  const productList = document.getElementById('product-list');


  let products = []; // Productos originales
  let filteredProducts = []; // Productos filtrados

  // Función para mostrar productos en el DOM
  function mostrarProductos(productosAMostrar) {
    productList.innerHTML = '';  // Limpiar productos actuales
    productosAMostrar.forEach(product => {
      const productElement = document.createElement('div');
      productElement.classList.add('col-12', 'col-md-6', 'col-lg-4');
      productElement.innerHTML = `
        <div class="separacion-cards">

  // Para que cambie dinámicamente el contenido de la portada según la categoría
  const imgPrincipal = document.getElementById('img_princ');
  const tituloPrincipal = document.querySelector('main.container h2');
  const subtituloPrincipal = document.querySelector('main.container h4');

  // Mapeo de catID a imágenes y textos
  const categoryDetails = {
    "101": {
      image: "img/imagen_principal_auto.jpg",
      title: "Descubre nuestros autos",
      subtitle: "Autos de alta gama preparados para tus largos viajes."
    },
    "102": {
      image: "img/juguetes.jpeg",
      title: "Explora nuestros juguetes",
      subtitle: "Encontrá toda la diversión en nuestra tienda de juguetes."
    },
    "103": { 
      image: "img/muebles.jpg", 
      title: "Renueva tu hogar en un click", 
      subtitle: "Explora todos nuestros muebles" 
      
    },

  };
  imgPrincipal.style.height = '32em'; 

  // Obtener el ID de la categoría del localStorage
  const catID = localStorage.getItem('catID'); 

  // Verificar si hay un catID guardado
  if (!catID) {
    alert('No se ha seleccionado ninguna categoría.');
    return;
  }

  // Obtener los detalles de la categoría
  const currentCategory = categoryDetails[catID];

  // Verificar si la categoría existe en el mapeo
  if (currentCategory) {
    // Actualizar la imagen principal
    imgPrincipal.src = currentCategory.image;
    imgPrincipal.alt = `Wallpaper ${currentCategory.title.split(' ')[1]}`;
    
    // Actualizar el título y subtítulo
    tituloPrincipal.textContent = currentCategory.title;
    subtituloPrincipal.textContent = currentCategory.subtitle;
  } else {
    alert('Categoría no encontrada.');
    return;
  }

  // Modificar la URL para usar el catID
  const PRODUCTS_URL = `https://japceibal.github.io/emercado-api/cats_products/${catID}.json`;

  // Mostrar el spinner mientras se cargan los productos
  spinner.style.display = 'block';

  // Función para hacer la solicitud al API
  getJSONData(PRODUCTS_URL).then(function(result) {
    if (result.status === "ok") {
      // Ocultar el spinner cuando los productos se hayan cargado
      spinner.style.display = 'none';
      
      // Recorre cada producto y crea el HTML correspondiente
      result.data.products.forEach(product => {
        const productElement = document.createElement('div');
        productElement.classList.add('col-12', 'col-md-6', 'col-lg-4');
        productElement.innerHTML = `

          <div class="card mb-3">
            <div class="image-container position-relative">
              <img src="${product.image}" class="card-img-top" alt="${product.name}">
              <div class="overlay position-absolute bottom-0 start-0 end-0 text-white d-flex flex-column justify-content-center align-items-center">

                <ul class="list-group list-group-flush ">
                  <li class="list-group-item bg-transparent border-0 "><strong>Precio:</strong> ${product.currency} ${product.cost}</li>
                  <li class="list-group-item bg-transparent border-0 "><strong>Vendidos:</strong> ${product.soldCount}</li>

                </ul>
              </div>
            </div>
            <div class="card-body text-center">
              <h5 class="card-title"><strong>${product.name}</strong></h5>

              <p class="card-text flex-grow-1">${product.description}</p>
            </div>
          </div>
        </div>
      `;
      productList.appendChild(productElement);
    });
  }

  // Función para filtrar productos por rango de precio
  function filtrarPrecio(productosFiltrar) {
    const minPrecio = document.getElementById('min-precio').value;
    const maxPrecio = document.getElementById('max-precio').value;

    return productosFiltrar.filter(product => {
      const precio = product.cost;
      return (!minPrecio || precio >= minPrecio) && (!maxPrecio || precio <= maxPrecio);
    });
  }

  // Función para ordenar productos
  function sortProducts(productstoSort) {
    const sortOpcion = document.getElementById('sort-options').value;

    if (sortOpcion === 'relevante') {
      return productstoSort.sort((a, b) => b.soldCount - a.soldCount);
    } else if (sortOpcion === 'precio-desc') {
      return productstoSort.sort((a, b) => b.cost - a.cost);
    } else if (sortOpcion === 'precio-asc') {
      return productstoSort.sort((a, b) => a.cost - b.cost);
    }
    return productstoSort;
  }

  // Función para buscar productos
  function buscarProductos(productosABuscar) {
    const busqueda = document.getElementById('search-box').value.toLowerCase();
    return productosABuscar.filter(product => {
      return product.name.toLowerCase().includes(busqueda);
    });
  }

  // Función para aplicar todos los filtros
  function applyFilters() {
    let tempProducts = [...products];
    tempProducts = filtrarPrecio(tempProducts);
    tempProducts = buscarProductos(tempProducts);
    tempProducts = sortProducts(tempProducts);
    mostrarProductos(tempProducts);
  }

  // Event listeners para los filtros y el buscador
  document.getElementById('min-precio').addEventListener('input', applyFilters);
  document.getElementById('max-precio').addEventListener('input', applyFilters);
  document.getElementById('sort-options').addEventListener('change', applyFilters);
  document.getElementById('search-box').addEventListener('input', applyFilters);

  // Obtener los productos de la API
  getJSONData(PRODUCTS_URL).then(function (result) {
    if (result.status === "ok") {
      products = result.data.products;  // Guardamos los productos en la variable products
      filteredProducts = [...products]; // Inicialmente todos los productos están filtrados
      mostrarProductos(products);  // Mostrar los productos en pantalla
    }
  }).catch(error => {
    console.error('Error al obtener productos:', error);
  });

});

