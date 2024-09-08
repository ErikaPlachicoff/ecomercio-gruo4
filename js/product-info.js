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

                // Insertar el nombre, descripción, precio, y cantidad vendida del producto en el DOM
                document.getElementById('product-name').textContent = product.name;
                document.getElementById('product-description').textContent = product.description;
                document.getElementById('product-cost').textContent = `${product.currency} ${product.cost}`;
                document.getElementById('product-soldCount').textContent = `Vendidos: ${product.soldCount}`;

                // Crear el contenedor del carrusel con la clase 'carousel-fade'
                const carouselContainer = document.createElement('div');
                carouselContainer.innerHTML = `
                    <div id="carouselExampleFade" class="carousel slide carousel-fade" data-bs-ride="carousel">
                        <div class="carousel-inner">
                        </div>
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
                    itemDiv.innerHTML = `<img src="${image}" class="d-block w-100" alt="Imagen del producto ${index + 1}">`;
                    carouselInner.appendChild(itemDiv);
                });
            } else {
                console.error('Error al obtener el producto:', result.error);
            }
        });
    } else {
        console.error('No se encontró ningún ID de producto en localStorage.');
    }
});
