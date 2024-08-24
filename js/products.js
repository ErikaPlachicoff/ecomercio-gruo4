document.addEventListener("DOMContentLoaded", function() {
  const spinner = document.getElementById('spinner-wrapper');
  const productList = document.getElementById('product-list');  // Cambia este ID si es necesario
  const PRODUCTS_URL = 'https://japceibal.github.io/emercado-api/cats_products/101.json'; 

  // Función para hacer una solicitud al API y obtener un archivo JSON con la información de los productos (autos).
  getJSONData(PRODUCTS_URL).then(function (result) {
    if (result.status === "ok") {      
      console.log(result);

      // Recorre cada producto y crea el HTML correspondiente
      result.data.products.forEach(product => {
        const productElement = document.createElement('div'); 
        productElement.classList.add('col-12', 'col-md-6', 'col-lg-4'); 
        productElement.innerHTML = `
          <div class="card mb-3">
            <img src="${product.image}" class="card-img-top" alt="${product.name}">
            <div class="card-body">
              <h5 class="card-title"><strong>${product.name}</strong></h5>
              <p class="card-text">${product.description}</p>
            </div>
            <ul class="list-group list-group-flush">
              <li class="list-group-item"><strong>Precio:</strong> ${product.currency} ${product.cost}</li>
              <li class="list-group-item"><strong>Vendidos:</strong> ${product.soldCount}</li>
            </ul>
          </div>
        `; 
        productList.appendChild(productElement); 
      });
    }
  })
  .catch(error => {
    console.error('Error al obtener productos:', error); 
  });
});
