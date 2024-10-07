// Manejo del formulario de inicio de sesión
document.getElementById("login-form")?.addEventListener("submit", function(event) {
    event.preventDefault(); // Evita el envío del formulario por defecto
    
    // Toma los valores del formulario
    const email = document.getElementById('form2Example11').value;
   
    // Inicializa el array de usuarios si no existe
    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    
    // Añade el nuevo usuario (esto no es seguro para contraseñas)
    usuarios.push({email: email});
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    
    // Guardar el estado de autenticación en localStorage
    localStorage.setItem('authenticated', 'true');
    localStorage.setItem('currentUser', email);

    // Redirigir a la portada
    window.location.href = "index.html";
});

// Cargar el nombre del usuario cuando el documento esté listo
document.addEventListener("DOMContentLoaded", function() {
    console.log('DOMContentLoaded ejecutado');
    // Recupera el nombre del usuario desde localStorage
    const currentUser = localStorage.getItem('currentUser');
    
    // Asegúrate de que el elemento con id "username" esté presente
    const usernameElement = document.getElementById('username');
    if (usernameElement) {
        if (currentUser) {
            usernameElement.textContent = currentUser; // Muestra el email
        } else {
            usernameElement.textContent = 'Invitado'; // Muestra "Invitado" si no hay usuario
        }
    } else {
        console.error('Elemento con id "username" no encontrado.');
    }
});