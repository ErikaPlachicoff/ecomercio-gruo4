// Este codigo corrobora si el usuario esta autenticado o no, en caso de que no este autenticado lo redirije al login 
window.addEventListener('DOMContentLoaded', function() {
    const isAuthenticated = localStorage.getItem('authenticated');

    // Si no está autenticado, redirige al login
    if (isAuthenticated !== 'true') {
        window.location.href = "login.html"; // Redirige al login si no está autenticado
    }
});
