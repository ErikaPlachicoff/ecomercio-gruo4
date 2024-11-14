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
    // Funcionalidad del botón de compra
    checkoutButton.addEventListener('click', () => {
        if (productCart.length === 0) {
            Swal.fire("¡Estoy vacío! <br> Lléname con algo :D ");
        } else {
            const purchaseModal = new bootstrap.Modal(document.getElementById('purchaseModal'));
            purchaseModal.show();
        }
    });

    // Envío del formulario de compra
    document.getElementById('purchaseForm').addEventListener('submit', function (event) {
        event.preventDefault();// Esto previene el envío del formulario por defecto

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const department = document.getElementById('department').value;
        const locality = document.getElementById('locality').value;
        const street = document.getElementById('street').value;
        const number = document.getElementById('number').value;
        const esq = document.getElementById('esq').value;
        const paymentMethod = document.getElementById('paymentMethod').value;

        // Concatenación de la dirección completa para que aparezca en la alerta
        const address = `${department}, ${locality}, ${street}, nro. ${number}, esquina ${esq}`;
    
        // Mostrar la alerta de éxito
        Swal.fire({
            title: "Pedido completado!",
            html: `
                <ul style="list-style-type: none; padding: 0; margin: 0;">
                    <li><strong>Pedido realizado por:</strong> ${name}</li>
                    <li><strong>Correo:</strong> ${email}</li>
                    <li><strong>Dirección:</strong> ${address}</li>
                    <li><strong>Número:</strong>${number}</li>
                    <li><strong>Método de Pago:</strong> ${paymentMethod}</li>
                </ul>`,
            icon: "success"
        }).then(() => {
            // Limpia el carrito después de la compra y actualiza la página
            localStorage.removeItem('cart');
            productCart = [];
            renderCart(); // Llama a renderCart para mostrar que el carrito está vacío

            // Cierra el modal
            const purchaseModal = bootstrap.Modal.getInstance(document.getElementById('purchaseModal'));
            if (purchaseModal) {
                purchaseModal.hide();
            }
        });
    });

    // Renderiza el carrito al cargar la página
    renderCart();
});
