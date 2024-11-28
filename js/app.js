document.addEventListener("DOMContentLoaded", () => {
    const app = document.getElementById("app");
    const content = document.getElementById("content");

    // Cargar el menú dinámicamente
    fetch('/html/components/navbar.html')
        .then(response => response.text())
        .then(navbarHtml => {
            app.insertAdjacentHTML("afterbegin", navbarHtml);

            // Cargar las secciones dinámicamente
            const sections = ['home', 'about', 'about-detail', 'projects', 'contact', 'footer'];
            const sectionPromises = sections.map(section =>
                fetch(`/html/components/${section}.html`).then(response => response.text())
            );

            Promise.all(sectionPromises)
                .then(sectionsHtml => {
                    sectionsHtml.forEach((html, index) => {
                        const sectionDiv = document.createElement('div');
                        sectionDiv.id = `${sections[index]}-content`;
                        sectionDiv.innerHTML = html;
                        content.appendChild(sectionDiv);
                    });

                    // Llamar a la inicialización de los proyectos
                    initializeProjects();

                    // Inicializar la funcionalidad de scroll del menú
                    initializeMenuScroll();
                })
                .catch(error => console.error('Error al cargar las secciones:', error));
        })
        .catch(error => console.error('Error al cargar el menú:', error));
});

/**
 * Función para inicializar los proyectos dinámicamente.
 */
function initializeProjects() {
    const projectsData = [
        {
            title: "Cultivate",
            images: ["/assets/img/projects/Protecto 1.1.png", "/assets/img/projects/Proyecto 1.2.png"]
        },
        {
            title: "Entre Café Estamos",
            images: ["/assets/img/projects/Proyecto 2.1.png", "/assets/img/projects/Proyecto 2.2.png", "/assets/img/projects/Proyecto 2.3.png"]
        },
        {
            title: "Bunny Clothes",
            images: ["/assets/img/projects/Proyecto 3.1.png", "/assets/img/projects/Proyecto 3.2.png"]
        },
        {
            title: "Sketchbook Silent Hill",
            images: ["/assets/img/projects/Proyecto 4.1.png", "/assets/img/projects/Proyecto 4.2.png"]
        },
        {
            title: "Carteles",
            images: ["/assets/img/projects/Proyecto 5.1.png", "/assets/img/projects/Proyecto 5.2.png"]
        },
        {
            title: "Fanzine Cosas Que Nunca Dije",
            images: ["/assets/img/projects/Proyecto 6.1.png", "/assets/img/projects/Proyecto 6.2.png", "/assets/img/projects/Proyecto 6.3.png"]
        },
        {
            title: "Soüre",
            images: ["/assets/img/projects/Proyecto 7.1.png", "/assets/img/projects/Proyecto 7.2.png"]
        },
        {
            title: "Gatito Suertudito",
            images: ["/assets/img/projects/Proyecto 8.1.png", "/assets/img/projects/Proyecto 8.2.png"]
        },
        {
            title: "Semillas del Desierto",
            images: ["/assets/img/projects/Proyecto 9.1.png", "/assets/img/projects/Proyecto 9.2.png"]
        }
    ];

    const projectsGrid = document.getElementById("projects-grid");
    if (!projectsGrid) {
        console.error("El contenedor 'projects-grid' no se encontró.");
        return;
    }

    projectsData.forEach((project) => {
        const projectCard = createProjectCard(project);
        projectsGrid.appendChild(projectCard);
    });
}

/**
 * Crea una tarjeta de proyecto.
 * @param {Object} project - Datos del proyecto (título e imágenes).
 * @returns {HTMLElement} - Tarjeta del proyecto.
 */
function createProjectCard(project) {
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

    const imgElement = projectCard.querySelector(".project-image");
    let currentIndex = 0;

    // Cambiar imágenes automáticamente cada 2 segundos
    setInterval(() => {
        currentIndex = (currentIndex + 1) % project.images.length;
        imgElement.src = project.images[currentIndex];
    }, 2000);

    return projectCard;
}

/**
 * Función para manejar el estado del menú al hacer scroll.
 */
function initializeMenuScroll() {
    const sections = document.querySelectorAll("section");
    const menuLinks = document.querySelectorAll(".menu-link");

    // Actualizar la clase activa según el scroll
    const updateActiveLink = () => {
        let currentSection = "";

        sections.forEach((section) => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;

            if (window.scrollY >= sectionTop - sectionHeight / 3) {
                currentSection = section.getAttribute("id");
            }
        });

        menuLinks.forEach((link) => {
            link.classList.remove("active");
            if (link.getAttribute("href").slice(1) === currentSection) {
                link.classList.add("active");
            }
        });
    };

    window.addEventListener("scroll", updateActiveLink);
}
