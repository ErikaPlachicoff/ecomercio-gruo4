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
/*CArrousel*/
$(document).ready(function () {
    var silder = $(".owl-carousel");
    silder.owlCarousel({
        autoPlay: false,
        items: 1,
        center: false,
        nav: true,
        margin: 40,
        dots: false,
        loop: true,
        navText: ["<i class='fa fa-arrow-left' aria-hidden='true'></i>", "<i class='fa fa-arrow-right' aria-hidden='true'></i>"],
        responsive: {
            0: {
                items: 1,
            },
            575: { items: 1 },
            768: { items: 2 },
            991: { items: 3 },
            1200: { items: 4 }
        }
    });
});
/*FIN carrousel*/