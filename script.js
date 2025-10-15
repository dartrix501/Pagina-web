document.addEventListener('DOMContentLoaded', () => {
    // delay de carga de pagina
    
    const img = document.getElementById('imagen1');
    const block1 = document.querySelector('.block-1');
    const block3 = document.querySelector('.block-3');
    const separador = document.querySelector('.separador');


    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                img.classList.add('visible');
                block1.classList.add('visible');
            } else {
                img.classList.remove('visible');
                block1.classList.remove('visible');
            }
        });
    }, { threshold: 0.1 });

    const observerBlock3 = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                block3.classList.add('visible');
                separador.classList.add('visible');
            } else {
                block3.classList.remove('visible');
                separador.classList.remove('visible');
            }
        });
    }, { threshold: 0.8 });

    observer.observe(img);
    observer.observe(block1);
    observerBlock3.observe(block3);
    observerBlock3.observe(separador);


    const images = document.querySelectorAll('.curso');

    const observercurso = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // índice de la imagen para delay escalonado
                const index = Array.from(images).indexOf(entry.target);
                entry.target.style.transitionDelay = `${index * 0.1}s`; // 1s extra por cada imagen
                entry.target.classList.add('visible');
            } else {
                entry.target.classList.remove('visible');
                entry.target.style.transitionDelay = '0s'; // reset
            }
        });
    }, { threshold: 0.1 });

    images.forEach(img => observercurso.observe(img));


    // Formulario

    const form = document.getElementById("contactForm");

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const nombre = document.getElementById("nombre").value;
        const email = document.getElementById("email").value;
        const numero = document.getElementById("numero").value;

        if (!nombre || !email || !numero) {
            alert("Por favor, complete todos los campos.");
            return;
        }

        try {
            const res = await fetch("https://api-test-2hpy.onrender.com/procesar", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ nombre, email })
            });

            const data = await res.json();
            alert("¡Datos enviados correctamente!");
        } catch (err) {
            console.error("Error:", err);
            alert("Ocurrió un error al enviar los datos");
        }
    });
});
