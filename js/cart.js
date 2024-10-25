document.addEventListener('DOMContentLoaded', function () {
    const cartContainer = document.getElementById('cart-container');
    
    // Obtener los productos guardados en localStorage bajo la clave 'productCart'
    const productCart = JSON.parse(localStorage.getItem('productCart')) || [];

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
        // Si hay productos en el carrito, mostrarlos dinámicamente
        productCart.forEach(product => {
            const productDiv = document.createElement('div');
            productDiv.classList.add('col-12', 'col-md-6', 'col-lg-4', 'mb-4');
            productDiv.innerHTML = `
                <div class="card h-100">
                    <img src="${product.image}" class="card-img-top" alt="${product.name}">
                    <div class="card-body">
                        <h5 class="card-title">${product.name}</h5>
                        <p class="card-text">Costo: ${product.cost} ${product.currency}</p>
                        <p class="card-text">Cantidad: ${product.quantity}</p>
                        <p class="card-text">Subtotal: ${(product.cost * product.quantity).toFixed(2)} ${product.currency}</p>
                    </div>
                </div>
            `;
            cartContainer.appendChild(productDiv);
        });
    }
});
