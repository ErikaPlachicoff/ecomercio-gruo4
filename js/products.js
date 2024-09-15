document.addEventListener("DOMContentLoaded", function () {

  const spinner = document.getElementById('spinner-wrapper');
  const productList = document.getElementById('product-list');
  
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
      image: "img/juguetes.jpg",
      title: "Tienda de juguetes",
      subtitle: "Encontrá toda la diversión en nuestra tienda de juguetes."
    },
    "103": {
      image: "img/muebles3.jpeg",
      title: "Renueva tu hogar en un click",
      subtitle: "Variedad de muebles importados y nacionales"
    },
    /*"104": { 
      image: "",
      title: "Tienda de Herramientas",
      subtitle: "Variedad de ..... "
    },
    "105": {
      image: "",
      title: "Tienda de Computadoras",
      subtitle: "Variedad de ..... "
    },
    "106": {
      image: "",
      title: "Tienda de Ropa",
      subtitle: "Variedad de ..... "
    },
    "107": {
      image: "",
      title: "Tienda de Electrodomésticos",
      subtitle: "Variedad de ..... "
    },
    "108": {
      image: "",
      title: "Tienda de Deportes",
      subtitle: "Variedad de ..... "
    },
    "109": {
      image: "",
      title: "Tienda de Celulares",
      subtitle: "Variedad de ..... "
    },*/
  };

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
    alert('Categoría no disponible.');
    window.location.href = 'categories.html';
    return ;
  }

  // Modificar la URL para usar el catID
  const PRODUCTS_URL = `https://japceibal.github.io/emercado-api/cats_products/${catID}.json`;

  // Mostrar el spinner mientras se cargan los productos
  spinner.style.display = 'block';

  // Obtener los productos de la API

  getJSONData(PRODUCTS_URL).then(function (result) {
    if (result.status === "ok") {
      products = result.data.products;  // Guardamos los productos en la variable products
      filteredProducts = [...products]; // Inicialmente todos los productos están filtrados
      mostrarProductos(products);  // Mostrar los productos en pantalla
      spinner.style.display = 'none'; // Ocultar spinner
    }
  }).catch(error => {
    console.error('Error al obtener productos:', error);
    spinner.style.display = 'none'; // Ocultar el spinner si hay un error
  });

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
      // Añadir el evento click para guardar el producto en el localStorage
      productElement.addEventListener('click', function() {
        localStorage.setItem('IDproductSelect', product.id);
        console.log('Producto con ID ${product.id} guardado en localStorage');
        // Redirigir a la página de información del producto
        window.location.href = 'product-info.html';
      });
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
});
