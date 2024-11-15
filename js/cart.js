document.addEventListener('DOMContentLoaded', function () {
    const cartContainer = document.getElementById('cart-container');
    let productCart = JSON.parse(localStorage.getItem('cart')) || [];
    // Obtener los productos guardados en localStorage bajo la clave 'cart'

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
            const tableContainer = document.createElement('div');
            tableContainer.classList.add('container');
            tableContainer.innerHTML = `
                <div class="container mt-4">
        <h2 class="ms-3 ms-md-0">Carrito de Compras</h2>
        <p class="ms-3 ms-md-0">Revisa los productos agregados:</p>

        <div class="table-responsive">
        <table class="table table-hover">
            <thead>
                <tr>
                    <th>Producto</th>
                    <th>Precio</th>
                    <th>Cantidad</th>
                    <th>Total</th>
                    <th>Remover</th>
                </tr>
            </thead>
            <tbody id="cart-table-body">
            </tbody>
            </table>
            </div>
            </div>
            `;

            cartContainer.appendChild(tableContainer);
            const tableBody = document.getElementById('cart-table-body');

            

            productCart.forEach((product, index) => {
                const productRow = document.createElement('tr');
                productRow.innerHTML = `
                    <td>
                        <img src="${product.image}" alt="${product.name}" style="width: 50px; height: auto;">
                        ${product.name}
                    </td>
                    <td>${product.currency} ${product.cost}</td>
                    <td>
                        <input type="number" value="1" min="1" data-index="${index}" style="width: 60px;">
                    </td>
                    <td class="product-line-price">${product.currency} ${(product.cost).toFixed(2)}</td>
                    <td>
                        <button class="remove-product btn btn-danger btn-sm" data-index="${index}">Remover</button>
                    </td>
                `;
                tableBody.appendChild(productRow);
            });

            // Función para recalcular y actualizar el total
            function recalculateCart() {
                let subtotal = 0;
                document.querySelectorAll('.product-line-price').forEach(linePrice => {
                    subtotal += parseFloat(linePrice.textContent.replace(/[^\d.-]/g, ''));
                });

                // Obtener el valor del tipo de envío seleccionado
                const shippingMethod = document.getElementById('deliveryMethod').value;

                // Establecer tarifas de envío basadas en el método seleccionado
                let shipping = 0;
                if (shippingMethod === 'premiumvalue') {
                    shipping = subtotal * 0.15; // Precio para envío Premium
                } else if (shippingMethod === 'expressvalue') {
                    shipping = subtotal * 0.07; // Precio para envío Express
                } else if (shippingMethod === 'standardvalue') {
                    shipping = subtotal * 0.05; // Precio para envío Standard
                }

                // Si el envío es 0, verificar si el valor de shippingMethod es válido
                if (shippingMethod && shipping === 0) {
                    console.log("No se ha seleccionado un método de envío válido");
                }

                const total = subtotal + shipping;

                // Actualizar los elementos del HTML con los nuevos valores
                document.getElementById('cart-subtotal').textContent = subtotal.toFixed(2);
                document.getElementById('cart-shipping').textContent = shipping.toFixed(2);
                document.getElementById('cart-total').textContent = total.toFixed(2);
            }


            // Actualizar cantidad de producto
            tableBody.addEventListener('click', function (event) {
                if (event.target.matches('.remove-product')) {
                    const index = event.target.getAttribute('data-index');
                    productCart.splice(index, 1); // Elimina el producto del carrito
                    localStorage.setItem('cart', JSON.stringify(productCart)); // Actualiza localStorage
                    renderCart(); // Vuelve a renderizar el carrito
                    recalculateCart(); // Recalcula el total
                }
            });


            document.getElementById('deliveryMethod').addEventListener('change', function () {
                recalculateCart();
            });


            tableBody.addEventListener('input', function (event) {
                if (event.target.matches('input[type="number"]')) {
                    const quantity = parseInt(event.target.value) || 0;
                    const index = event.target.getAttribute('data-index');
                    const product = productCart[index];
                    const linePrice = (quantity * product.cost).toFixed(2);

                    event.target.closest('tr').querySelector('.product-line-price').textContent = `${product.currency} ${linePrice}`;
                    recalculateCart();
                }
            });
            updateCartBadge();

            // Eliminar producto
            tableBody.addEventListener('click', function (event) {
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
        event.preventDefault(); // Esto previene el envío del formulario por defecto

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

        Swal.fire({
            // Mostrar la alerta de éxito
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
            updateCartBadge();

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
