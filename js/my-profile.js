(function () {
    'use strict';

    // Función que carga los datos guardados en localStorage al cargar la página
    window.onload = function () {
        // Obtener el email guardado en localStorage
        const email = localStorage.getItem('email');
        
        // Si el email no está en localStorage, redirige al usuario a la página de login
        if (!email) {
            window.location.href = "login.html";
        } else {
            // Si hay un email guardado, lo cargamos en el campo correspondiente
            document.getElementById('email').value = email;
        }

        // Cargar otros nombre y apellido si existen en localStorage
        const name = localStorage.getItem('name');
        const lastName = localStorage.getItem('lastName');

        if (name) {
            document.getElementById('firstName').value = name;
        }
        if (lastName) {
            document.getElementById('lastName').value = lastName;
        }
    };

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

                // Guardar los datos en localStorage
                localStorage.setItem('name', name);
                localStorage.setItem('lastName', lastName);
                localStorage.setItem('email', email);

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
})();
