document.addEventListener("DOMContentLoaded", () => {
    const app = document.getElementById("app");
    const content = document.getElementById("content");

    fetch('/html/components/navbar.html')
        .then(response => response.text())
        .then(navbarHtml => {
            app.insertAdjacentHTML("afterbegin", navbarHtml);

            const sections = ['home', 'about', 'about-detail', 'projects', 'contact'];
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

                    initializeProjects(); // Llamar a la inicialización de projects.js
                })
                .catch(error => console.error('Error al cargar las secciones:', error));
        })
        .catch(error => console.error('Error al cargar el menú:', error));
});


function initializeProjects() {
    // Datos de los proyectos
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
        console.error("El contenedor projects-grid no se encontró.");
        return;
    }

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

        projectsGrid.appendChild(projectCard);

        const imgElement = projectCard.querySelector(".project-image");
        let currentIndex = 0;

        setInterval(() => {
            currentIndex = (currentIndex + 1) % project.images.length;
            imgElement.src = project.images[currentIndex];
        }, 2000);
    });
}