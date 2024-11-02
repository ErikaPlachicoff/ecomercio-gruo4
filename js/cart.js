document.addEventListener('DOMContentLoaded', function () {
    const cartContainer = document.getElementById('cart-container');

    // Obtener los productos guardados en localStorage bajo la clave 'cart'

    let productCart = JSON.parse(localStorage.getItem('cart')) || [];

    function renderCart() {
        cartContainer.innerHTML = ''; // Limpia el contenido previo

        if (productCart.length === 0) {
            // Si el carrito está vacío, mostrar un mensaje dinámico
            const emptyCartMessage = document.createElement('div');
            emptyCartMessage.classList.add('col-12', 'text-center');
            emptyCartMessage.innerHTML = `
                <div class="alert alert-warning" role="alert">
                    <h4 class="alert-heading">Su carrito está vacío</h4>
                    <p>Elija al menos un producto de nuestra tienda</p>
                </div>
            `;
            cartContainer.appendChild(emptyCartMessage);
        } else {
            const cartBody = document.createElement('div');
            cartBody.classList.add('shopping-cart');
            cartBody.innerHTML = `
                <div class="column-labels">
                    <label class="product-image">Producto</label>
                    <label class="product-details"></label>
                    <label class="product-price">Precio</label>
                    <label class="product-quantity">Cantidad</label>
                    <label class="product-removal">Remover</label>
                    <label class="product-line-price">Total</label>
                </div>
            `;

            // Variables para tasas e impuestos
            const taxRate = 0.05;
            const shippingRate = 15.00;

            productCart.forEach((product, index) => {
                const productRow = document.createElement('div');
                productRow.classList.add('product');
                productRow.innerHTML = `
                    <div class="product-image">
                        <img src="${product.image}" alt="${product.name}">
                    </div>
                    <div class="product-details">
                        <div class="product-title">${product.name}</div>
                    </div>
                    <div class="product-price">${product.currency} ${product.cost}</div>
                    <div class="product-quantity">
                        <input type="number" value="1" min="1" data-index="${index}">
                    </div>
                    <div class="product-removal">
                        <button class="remove-product" data-index="${index}">Remover</button>
                    </div>
                    <div class="product-line-price">${product.currency} ${(product.cost).toFixed(2)}</div>
                `;
                cartBody.appendChild(productRow);
            });

            cartContainer.appendChild(cartBody);

            // Función para recalcular y actualizar el total
            function recalculateCart() {
                let subtotal = 0;
                document.querySelectorAll('.product').forEach(productRow => {
                    subtotal += parseFloat(productRow.querySelector('.product-line-price').textContent);
                });

                const tax = subtotal * taxRate;
                const shipping = subtotal > 0 ? shippingRate : 0;
                const total = subtotal + tax + shipping;

                document.getElementById('cart-subtotal').textContent = subtotal.toFixed(2);
                document.getElementById('cart-tax').textContent = tax.toFixed(2);
                document.getElementById('cart-shipping').textContent = shipping.toFixed(2);
                document.getElementById('cart-total').textContent = total.toFixed(2);
            }

            // Actualizar cantidad de producto
            cartBody.addEventListener('input', function (event) {
                if (event.target.matches('.product-quantity input')) {
                    const quantity = parseInt(event.target.value) || 0;
                    const index = event.target.getAttribute('data-index');
                    const product = productCart[index];
                    const linePrice = (quantity * product.cost).toFixed(2);
                    
                    event.target.closest('.product').querySelector('.product-line-price').textContent = `${product.currency} ${linePrice}`;
                    recalculateCart();
                }
            });

            // Eliminar producto
            cartBody.addEventListener('click', function (event) {
                if (event.target.matches('.remove-product')) {
                    const index = event.target.getAttribute('data-index');

                    // Eliminar el producto del array y de localStorage
                    productCart.splice(index, 1);
                    localStorage.setItem('cart', JSON.stringify(productCart));

                    // Vuelve a renderizar el carrito para actualizar los índices
                    renderCart();
                    recalculateCart();
                }
            });

            recalculateCart();
        }
    }

    // Renderiza el carrito al cargar la página
    renderCart();
});

// Seleccionar el botón y el contenedor del carrito
const toggleDarkModeButton = document.getElementById('toggle-dark-mode');
const cartContainer = document.querySelector('.shopping-cart');

// Manejar el clic en el botón para alternar la clase .dark-mode
toggleDarkModeButton.addEventListener('click', function () {
    cartContainer.classList.toggle('dark-mode');
    
    // Cambiar el texto del botón según el modo activo
    toggleDarkModeButton.textContent = 
        cartContainer.classList.contains('dark-mode') ? 'Modo Día' : 'Modo Noche';

});
