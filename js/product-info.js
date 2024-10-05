product-info.js 
document.addEventListener('DOMContentLoaded', function() {
    // Recuperar el ID del producto seleccionado desde localStorage
    const selectedProductId = localStorage.getItem('IDproductSelect');

    // Verificar si el ID fue recuperado
    if (selectedProductId) {
        const PRODUCTS_URL = https://japceibal.github.io/emercado-api/products/${selectedProductId}.json;

        // Obtener los datos del producto usando el ID
        getJSONData(PRODUCTS_URL).then(function(result) {
            if (result.status === "ok") {
                const product = result.data;

                // Seleccionar el elemento de la portada
                const portada = document.querySelector('#portada');

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

                // Añadir el carrusel a la portada
                portada.appendChild(carouselContainer);

                // Agregar las imágenes al carrusel

                const carouselInner = carouselContainer.querySelector('.carousel-inner');
                product.images.forEach((image, index) => {
                    const itemDiv = document.createElement('div');
                    itemDiv.classList.add('carousel-item');

                    if (index === 0) itemDiv.classList.add('active'); // La primera imagen será la activa
                    itemDiv.innerHTML = <img src="${image}" alt="Imagen del producto ${index + 1}" class="d-block w-100">;
                    carouselInner.appendChild(itemDiv);
                });

                // Insertar la descripción del producto
                const productDescription = document.createElement('div');
                productDescription.innerHTML = `
                    <h1>${product.name} <span class="category">Categoría: ${product.category}</span></h1>
                    <p>${product.description}</p>
                    `;
                //Insertar información del producto
                //uso span en vez de p para que no quede con margenes predeterminados 
                const productInfo = document.createElement('div');
                productInfo.classList.add('flex');
                productInfo.innerHTML = `
                <span class="product-detail">Precio: ${product.currency} ${product.cost}</span>
                <span class="product-detail">Vendidos: ${product.soldCount} Unidades</span>
                `;

                // Se agregan dinámicamente en HTML con el id 'product-description'
                             
                document.getElementById('product-description').appendChild(productDescription);
                  document.getElementById('product-description').appendChild(productInfo);
               

                // Insertar los productos relacionados como tarjetas
                const relatedProductsContainer = document.getElementById('related-products-container');
                relatedProductsContainer.classList.add('row');

                product.relatedProducts.forEach(relatedProduct => {
                    const relatedProductElement = document.createElement('div');
                    relatedProductElement.classList.add('col-md-4', 'col-lg-3', 'mb-4');
                    relatedProductElement.innerHTML = `
                    <div class="card mb-3">
                        <div class="card related-product">
                            <img src="${relatedProduct.image}" class="card-img-top" alt="${relatedProduct.name}">
                            <div class="card-body">
                                <h5 class="card-title">${relatedProduct.name}</h5>
                            </div>
                        </div>
                    `;
                    relatedProductsContainer.appendChild(relatedProductElement);
                       // Agregar evento 'click' para cada tarjeta de producto relacionado
                       relatedProductElement.addEventListener('click', function() {
                        // Guardar el ID del producto relacionado en localStorage
                        localStorage.setItem('IDproductSelect', relatedProduct.id);

                        // Redirigir a la página product-info.html
                        window.location.href = 'product-info.html';
                    });
                });
               // Llamar a la función para obtener los comentarios del producto actual
                fetchProductComments(selectedProductId);
                
            } else {
                console.error('Error al obtener el producto:', result.error);
            }
           
           
        });
    } else {
        console.error('No se encontró ningún ID de producto en localStorage.');
    }

});


 
 
 // Función para obtener los comentarios de un producto según su ID
 function fetchProductComments(productId) {
    const url = https://japceibal.github.io/emercado-api/products_comments/${productId}.json;
 
 
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error("Error al obtener los comentarios del producto");
            }
            return response.json();
        })
        .then(data => {
            console.log(Comentarios del producto ${productId}:, data);
            displayComments(data); // Llama a una función para mostrar los comentarios
        })
        .catch(error => {
            console.error("Error en la solicitud:", error);
        });
 }
 
 
 // Función para mostrar los comentarios en el HTML
 function displayComments(comments) {
    const carouselInner = document.getElementById('carouselInner'); // Usamos el contenedor del carrusel
 
 
    // Limpiar cualquier contenido previo
    carouselInner.innerHTML = '';
 
 
    // Comprobar si hay comentarios
    if (comments && comments.length > 0) {
        comments.forEach((comment, index) => {
            const itemDiv = document.createElement('div');
            itemDiv.classList.add('carousel-item');
            if (index === 0) itemDiv.classList.add('active'); // La primera reseña será activa
 
 
            itemDiv.innerHTML = `
                <div class="card1">
                    <div class="card-body">
                    <h2 class="text-white">Reseñas de Usuarios</h2>
                        <h5 class="card-title">${comment.user}</h5>
                        <p class="card-text">${comment.description}</p>
                        <p>Puntuación: ${renderStars(comment.score)} | Fecha: ${comment.dateTime}</p>
                    </div>
                </div>
            `;
            carouselInner.appendChild(itemDiv);
        });
 
 
        // Generar los indicadores del carrusel
        const carouselIndicators = document.getElementById('carouselIndicators');
        carouselIndicators.innerHTML = ''; // Limpiar indicadores previos
 
 
        comments.forEach((_, index) => {
            const indicator = document.createElement('button');
            indicator.setAttribute('type', 'button');
            indicator.setAttribute('data-bs-target', '#reviewCarousel');
            indicator.setAttribute('data-bs-slide-to', index);
            if (index === 0) indicator.classList.add('active');
            indicator.classList.add('carousel-indicator');
            carouselIndicators.appendChild(indicator);
        });
    } else {
        carouselInner.innerHTML = '<p>No hay comentarios disponibles para este producto.</p>';
    }
 }
 
 
 // Función para renderizar estrellas basadas en la puntuación
 function renderStars(score) {
    let starsHtml = '';
    for (let i = 1; i <= 5; i++) {
        if (i <= score) {
            starsHtml += <span class="fa fa-star" style="color: yellow;"></span>;
        } else {
            starsHtml += <span class="fa fa-star-o" style="color: yellow;"></span>;
        }
    }
    return starsHtml;
 }