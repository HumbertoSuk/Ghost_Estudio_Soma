document.addEventListener("DOMContentLoaded", () => {
    // Datos de los proyectos
    const projectsData = [
        {
            title: "Cultivate",
            images: ["/assets/img/projects/Protecto 1.1.png", "/assets/img/projects/Proyecto 1.2.png"]
        },
        {
            title: "Entre Café Estamos",
            images: ["/assets/img/projects/Proyecto2.1.png", "/assets/img/projects/Proyecto2.2.png", "/assets/img/projects/Proyecto2.3.png"]
        },
        {
            title: "Bunny Clothes",
            images: ["/assets/img/projects/Proyecto3.1.png", "/assets/img/projects/Proyecto3.2.png"]
        },
        {
            title: "Sketchbook Silent Hill",
            images: ["/assets/img/projects/Proyecto4-.1.png", "/assets/img/projects/Proyecto4.2.png"]
        },
        {
            title: "Carteles",
            images: ["/assets/img/projects/Proyecto5.1.png", "/assets/img/projects/Proyecto5.2.png"]
        },
        {
            title: "Fanzine Cosas Que Nunca Dije",
            images: ["/assets/img/projects/Proyecto6.1.png", "/assets/img/projects/Proyecto6.2.png", "/assets/img/projects/Proyecto6.3.png"]
        },
        {
            title: "Soüre",
            images: ["/assets/img/projects/Proyecto7.1.png", "/assets/img/projects/Proyecto7.2.png"]
        },
        {
            title: "Gatito Suertudito",
            images: ["/assets/img/projects/Proyecto8.1.png", "/assets/img/projects/Proyecto8.2.png"]
        },
        {
            title: "Semillas del Desierto",
            images: ["/assets/img/projects/Proyecto9.1.png", "/assets/img/projects/Proyecto9.2.png"]
        }
    ];

    const projectsGrid = document.getElementById("projects-grid");

    // Verificar que el contenedor exista
    if (!projectsGrid) {
        console.error("El contenedor projects-grid no se encontró en el DOM.");
        return;
    }

    // Generar las tarjetas de los proyectos
    projectsData.forEach((project) => {
        const projectCard = document.createElement("div");
        projectCard.classList.add("col-md-4");

        projectCard.innerHTML = `
            <div class="project-card">
                <div class="project-image-container">
                    <img src="${project.images[0]}" alt="${project.title}" class="project-image">
                    <div class="project-overlay">
                        <p class="project-text">${project.title}</p>
                    </div>
                </div>
            </div>
        `;

        console.log("Añadiendo tarjeta:", project);
        projectsGrid.appendChild(projectCard);

        // Configuración de cambio automático de imágenes
        const imgElement = projectCard.querySelector(".project-image");
        let currentIndex = 0;

        setInterval(() => {
            currentIndex = (currentIndex + 1) % project.images.length;
            imgElement.src = project.images[currentIndex];
        }, 2000);
    });
});