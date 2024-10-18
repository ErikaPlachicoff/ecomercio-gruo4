(function () {
    'use strict';

    // Función que carga los datos guardados en localStorage al cargar la página
    document.addEventListener('DOMContentLoaded', function () {
        // Obtener el email guardado en localStorage bajo la clave 'currentUser'
        const email = localStorage.getItem('currentUser');

        // Si el email no está en localStorage, redirige al usuario a la página de login
        if (!email) {
            window.location.href = "login.html";
        } else {
            // Si hay un email guardado, lo cargamos en el campo correspondiente
            document.getElementById('email').value = email;
        }

        // Cargar nombre y apellido si existen en localStorage
        const name = localStorage.getItem('name');
        const lastName = localStorage.getItem('lastName');

        if (name) {
            document.getElementById('firstName').value = name;
        }
        if (lastName) {
            document.getElementById('lastName').value = lastName;
        }

        // Cargar la imagen de perfil si existe
        const profilePic = localStorage.getItem('profilePic'); 
        const avatarElement = document.getElementById('avatar');
        const previewElement = document.getElementById('profilePicPreview');
        const avatarNav = document.querySelector('#navbarDropdownMenuAvatar img'); // Avatar de la navbar

        if (profilePic) {
            if (avatarElement) avatarElement.src = profilePic;
            if (previewElement) previewElement.src = profilePic;
            previewElement.style.display = 'block'; // Mostrar la imagen guardada
            if (avatarNav) avatarNav.src = profilePic; // Actualizar avatar en la navbar
        }
        
        // Manejar la vista previa de la imagen seleccionada
        const profilePicInput = document.getElementById('profilePic');
        if (profilePicInput) {
            profilePicInput.addEventListener('change', function (event) {
                const file = event.target.files[0];
                const reader = new FileReader();

                reader.onload = function (e) {
                    const previewElement = document.getElementById('profilePicPreview');
                    if (previewElement) {
                        previewElement.src = e.target.result;
                        previewElement.style.display = 'block'; // Mostrar la imagen previsualizada
                    }

                    // Actualizar el avatar de la navbar con la nueva imagen
                    if (avatarNav) {
                        avatarNav.src = e.target.result;
                    }
                };

                reader.readAsDataURL(file); // Leer el archivo como URL de datos
            });
        }

        // Obtener todos los formularios a los que queremos aplicarles estilos de validación personalizados de Bootstrap
        const forms = document.querySelectorAll('.needs-validation');

        // Iterar sobre cada uno de ellos y evitar el envío en caso de ser inválido
        Array.prototype.forEach.call(forms, function (form) {
            form.addEventListener('submit', function (event) {
                // Verificar si el formulario es válido
                if (!form.checkValidity()) {
                    event.preventDefault();
                    event.stopPropagation();
                } else {
                    // Si es válido, prevenir el comportamiento por defecto y guardar los datos en localStorage
                    event.preventDefault();

                    // Obtener los valores de los campos
                    const name = document.getElementById('firstName').value;
                    const lastName = document.getElementById('lastName').value;
                    const email = document.getElementById('email').value;
                    const profilePic = document.getElementById('profilePicPreview').src; // Obtener imagen de perfil

                    // Guardar los datos en localStorage
                    localStorage.setItem('name', name);
                    localStorage.setItem('lastName', lastName);
                    localStorage.setItem('currentUser', email);
                    localStorage.setItem('profilePic', profilePic); // Guarda la imagen de perfil

                    // Mostrar un mensaje de éxito
                    alert('¡Sus datos han sido guardados exitosamente!');
                }

                form.classList.add('was-validated');
            }, false);
        });

        // Validación en tiempo real de los campos del formulario
        const inputs = document.querySelectorAll('input');

        inputs.forEach(input => {
            input.addEventListener('input', function () {
                if (input.checkValidity()) {
                    input.classList.add('is-valid');
                    input.classList.remove('is-invalid');
                } else {
                    input.classList.add('is-invalid');
                    input.classList.remove('is-valid');
                }
            });
        });
    });
})();
