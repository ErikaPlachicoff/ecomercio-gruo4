document.addEventListener('DOMContentLoaded', function() {
    // Recuperar el ID del producto seleccionado desde localStorage
    const selectedProductId = localStorage.getItem('IDproductSelect');

    // Verificar si el ID fue recuperado
    if (selectedProductId) {
        const PRODUCTS_URL = `https://japceibal.github.io/emercado-api/products/${selectedProductId}.json`;

        // Obtener los datos del producto usando el ID
        getJSONData(PRODUCTS_URL).then(function(result) {
            if (result.status === "ok") {
                const product = result.data;

                // Seleccionar el elemento de la portada
                const portada = document.querySelector('#portada');
                if (product.images.length > 0) {
                    // Crear el elemento <img> para la primera imagen
                    const imgElement = document.createElement('img');
                    imgElement.src = product.images[0];
                    imgElement.alt = "Imagen del producto portada";
                    imgElement.classList.add('img-fluid'); // Clase de Bootstrap

                    // Crear el contenedor para el título
                    const tituloContainer = document.createElement('div');
                    tituloContainer.classList.add('portada-titulo');
                    const tituloElement = document.createElement('h1');
                    tituloElement.textContent = product.name;
                    tituloContainer.appendChild(tituloElement);

                    // Añadir la imagen y el título a la portada
                    portada.appendChild(imgElement);
                    portada.appendChild(tituloContainer);

                    // Crear el botón con la flecha
                    const conocerMasButton = document.createElement('a');
                    conocerMasButton.href = "#product-list"; // Enlace a otra sección o página
                    conocerMasButton.classList.add('conocer-mas');
                    conocerMasButton.innerHTML = 'Conocer más <i class="fas fa-arrow-down"></i>'; // Icono de flecha

                    // Añadir el botón a la portada
                    portada.appendChild(conocerMasButton);
                }

                // Crear el contenedor del carrusel
                const carouselContainer = document.createElement('div');
                carouselContainer.classList.add('carousel-container');
                carouselContainer.innerHTML = `
                    <div id="carouselExampleFade" class="carousel slide carousel-fade" data-bs-ride="carousel">
                        <div class="carousel-inner"></div>
                        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
                            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span class="visually-hidden">Previous</span>
                        </button>
                        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
                            <span class="carousel-control-next-icon" aria-hidden="true"></span>
                            <span class="visually-hidden">Next</span>
                        </button>
                    </div>
                `;

                // Insertar el carrusel en el DOM
                document.getElementById('product-list').appendChild(carouselContainer);

                // Agregar las imágenes al carrusel
                const carouselInner = carouselContainer.querySelector('.carousel-inner');
                product.images.forEach((image, index) => {
                    const itemDiv = document.createElement('div');
                    itemDiv.classList.add('carousel-item');
                    if (index === 0) itemDiv.classList.add('active'); // La primera imagen será la activa
                    itemDiv.innerHTML = `<img src="${image}" alt="Imagen del producto ${index + 1}" class="d-block w-100">`;
                    carouselInner.appendChild(itemDiv);
                });

                // Insertar la descripción del producto
                const productDescription = document.createElement('div');
                productDescription.innerHTML = `
                    <h3>${product.name}</h3>
                    <p>${product.description}</p>
                    <p><strong>Precio:</strong> ${product.currency} ${product.cost}</p>
                `;
                document.getElementById('product-description').appendChild(productDescription);

                // Insertar los productos relacionados como tarjetas
                const relatedProductsContainer = document.getElementById('related-products-container');

                // Asegúrate de que el contenedor tenga la clase 'row' para Bootstrap
                relatedProductsContainer.classList.add('row');

                product.relatedProducts.forEach(relatedProduct => {
                    const relatedProductElement = document.createElement('div');
                    // Añadir la clase de columna para que las cards se alineen una al lado de la otra
                    relatedProductElement.classList.add('col-md-4', 'col-lg-3', 'mb-4');
                    relatedProductElement.innerHTML = `
                        <div class="card related-product">
                            <img src="${relatedProduct.image}" class="card-img-top" alt="${relatedProduct.name}">
                            <div class="card-body">
                                <h5 class="card-title">${relatedProduct.name}</h5>
                            </div>
                        </div>
                    `;
                    relatedProductsContainer.appendChild(relatedProductElement);
                });

            } else {
                console.error('Error al obtener el producto:', result.error);
            }
        });
    } else {
        console.error('No se encontró ningún ID de producto en localStorage.');
    }
});
