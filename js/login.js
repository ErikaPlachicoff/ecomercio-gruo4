// Manejo del formulario de inicio de sesión
document.getElementById("login-form").addEventListener("submit", function(event) {
    event.preventDefault(); // Evita el envío del formulario por defecto

    // Guardar el estado de autenticación en localStorage
    localStorage.setItem('authenticated', 'true');

    // Redirigir a la portada
    window.location.href = "ecomercio-grupo4/index.html";
});
