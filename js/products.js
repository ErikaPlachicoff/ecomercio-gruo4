document.addEventListener("DOMContentLoaded", function() {
    
    const PRODUCTS_URL = 'https://japceibal.github.io/emercado-api/cats_products/101.json'; 

    /*Función para hacer una solicitud al API y obtener un 
    archivo JSON con la información de los productos (autos).*/

      getJSONData(PRODUCTS_URL).then(function (result) {
      if (result.status === "ok"){      
      console.log(result)
        const productList = document.getElementById('product-list');
  
        // Recorre cada producto y crea el HTML correspondiente
        result.data.products.forEach(product => {
          const productElement = document.createElement('div'); // en html dentro del id product-list creamos un nuevo contenedor 
          productElement.classList.add('col-md-4'); // damos estilo al contenedor creado. col-md-4 ayuda a organizar los productos en columnas
          productElement.innerHTML = ` 
           <div class="card mb-3" style="width: 20rem;">
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
          `; // manipulamos el html dentro de un elemento. Agregamos imagen, nombre, descripcion, etc.. 
          productList.appendChild(productElement); //Añade productElement en a la lista de productos en la página->productList.
        });
      }
      })
      .catch(error => {
        console.error('Error al obtener productos:', error); //si algo sale error, lo muestra en la consola
      });
  });