(function () {
    'use strict';

    // Función para cargar los datos almacenados en localStorage al cargar la página
    document.addEventListener('DOMContentLoaded', function () {
        // Cargar datos de perfil
        const name = localStorage.getItem('name');
        const lastName = localStorage.getItem('lastName');
        const email = localStorage.getItem('email');
        const phone = localStorage.getItem('phone');
        const profilePic = localStorage.getItem('profilePic');

        // Si los elementos existen en el DOM, actualizar con los valores almacenados
        if (name) document.getElementById('firstName').value = name;
        if (lastName) document.getElementById('lastName').value = lastName;
        if (email) document.getElementById('email').value = email;
        if (phone) document.getElementById('phone').value = phone;

        // Actualizar la imagen de perfil en la navbar si existe
        const avatarElement = document.getElementById('avatar');
        const previewElement = document.getElementById('profilePicPreview');
        if (profilePic) {
            if (avatarElement) avatarElement.src = profilePic;
            if (previewElement) previewElement.src = profilePic;
            previewElement.style.display = 'block'; // Mostrar la imagen guardada
        }

        // Mostrar nombre en la navbar
        const usernameElement = document.getElementById('username');
        const usernameSmallElement = document.getElementById('username-small');
        if (name) {
            if (usernameElement) usernameElement.textContent = name;
            if (usernameSmallElement) usernameSmallElement.textContent = name;
        }
    });

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
            };

            if (file) {
                reader.readAsDataURL(file);
            }
        });
    }

    // Guardar los cambios al enviar el formulario
    const form = document.querySelector('form');
    if (form) {
        form.addEventListener('submit', function (event) {
            event.preventDefault(); // Evitar el comportamiento por defecto del formulario

            // Obtener los valores de los campos del formulario
            const name = document.getElementById('firstName').value;
            const lastName = document.getElementById('lastName').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const profilePic = document.getElementById('profilePicPreview').src;

            // Guardar los datos en localStorage
            localStorage.setItem('name', name);
            localStorage.setItem('lastName', lastName);
            localStorage.setItem('email', email);
            localStorage.setItem('phone', phone);
            localStorage.setItem('profilePic', profilePic);

            // Puedes agregar una alerta o algún mensaje de éxito aquí si lo deseas
            alert('Perfil guardado exitosamente.');
        });
    }
})();
