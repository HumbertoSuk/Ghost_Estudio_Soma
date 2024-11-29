// Configuración de colores y cantidad de partículas
var colour = "red"; // Color principal
var sparkles = 800; // Número de partículas visibles

// Variables internas
var x = ox = 400, y = oy = 300;
var swide = 800, shigh = 600;
var sleft = sdown = 0;
var tiny = [], star = [], starv = [], starx = [], stary = [];
var tinyx = [], tinyy = [], tinyv = [];

// Inicialización al cargar la página
window.onload = function () {
    if (document.getElementById) {
        for (let i = 0; i < sparkles; i++) {
            const size = randomRange(15, 20); // Tamaño aleatorio para cada partícula
            tiny[i] = createDiv(size, size, "rgba(139, 0, 0, 0.8)");
            star[i] = createStarDiv(randomRange(3, 6));
            document.body.appendChild(tiny[i]);
            document.body.appendChild(star[i]);
        }
        set_width();
        sparkle();
    }
};

// Función principal de animación
function sparkle() {
    if (x != ox || y != oy) {
        ox = x;
        oy = y;
        for (let i = 0; i < sparkles; i++) {
            if (!starv[i]) {
                // Configuración inicial de la estrella
                star[i].style.left = (starx[i] = x + randomRange(-15, 15)) + "px"; // Variación horizontal
                star[i].style.top = (stary[i] = y + randomRange(-15, 15)) + "px"; // Variación vertical
                star[i].style.visibility = "visible";
                starv[i] = randomRange(60, 230); // Duración aleatoria
                break;
            }
        }
    }

    for (let i = 0; i < sparkles; i++) {
        if (starv[i]) updateStar(i);
        if (tinyv[i]) updateTiny(i);
    }

    requestAnimationFrame(sparkle); // Animación más eficiente
}

// Actualización de las estrellas
function updateStar(i) {
    if (--starv[i] === Math.floor(starv[i] / 2)) star[i].style.opacity = "0.5"; // Desvanecimiento
    if (starv[i] > 0) {
        stary[i] += randomRange(4, 8); // Movimiento hacia abajo más rápido
        starx[i] += randomRange(-2, 2); // Movimiento horizontal más aleatorio
        if (stary[i] < shigh + sdown && starx[i] > 0) {
            star[i].style.top = stary[i] + "px";
            star[i].style.left = starx[i] + "px";
        } else {
            star[i].style.visibility = "hidden";
            starv[i] = 0;
        }
    } else {
        tinyv[i] = randomRange(30, 60); // Duración aleatoria para partículas pequeñas
        tiny[i].style.top = (tinyy[i] = stary[i]) + "px";
        tiny[i].style.left = (tinyx[i] = starx[i]) + "px";
        tiny[i].style.visibility = "visible";
        star[i].style.visibility = "hidden";
    }
}

// Actualización de las partículas pequeñas
function updateTiny(i) {
    if (--tinyv[i] === Math.floor(tinyv[i] / 2)) {
        tiny[i].style.width = "1px";
        tiny[i].style.height = "1px";
    }
    if (tinyv[i] > 0) {
        tinyy[i] += randomRange(5, 10); // Movimiento más rápido
        tinyx[i] += randomRange(-3, 3); // Variación horizontal
        if (tinyy[i] < shigh + sdown && tinyx[i] > 0) {
            tiny[i].style.top = tinyy[i] + "px";
            tiny[i].style.left = tinyx[i] + "px";
        } else {
            tiny[i].style.visibility = "hidden";
            tinyv[i] = 0;
        }
    } else {
        tiny[i].style.visibility = "hidden";
    }
}

// Manejo del ratón
document.onmousemove = function (e) {
    set_scroll();
    y = e.pageY || e.clientY + sdown;
    x = e.pageX || e.clientX + sleft;
};

// Actualización del scroll
function set_scroll() {
    sdown = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
    sleft = window.scrollX || document.documentElement.scrollLeft || document.body.scrollLeft || 0;
}

// Ajuste del tamaño de la ventana
window.onresize = set_width;
function set_width() {
    swide = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    shigh = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
}

// Creación de una partícula (div)
function createDiv(height, width, bgColor) {
    const div = document.createElement("div");
    div.style.position = "absolute";
    div.style.height = height + "px";
    div.style.width = width + "px";
    div.style.backgroundColor = bgColor || "rgba(139, 0, 0, 0.8)";
    div.style.borderRadius = "50%"; // Forma redonda
    div.style.pointerEvents = "none";
    div.style.visibility = "hidden";
    return div;
}

// Creación de una estrella con diseño cruzado
function createStarDiv(size) {
    const div = document.createElement("div");
    div.style.position = "absolute";
    div.style.width = size + "px";
    div.style.height = size + "px";
    div.style.borderRadius = "50%";
    div.style.background = "radial-gradient(circle, rgba(255, 0, 0, 1) 0%, rgba(139, 0, 0, 1) 80%, rgba(139, 0, 0, 0) 100%)"; // Degradado circular
    div.style.pointerEvents = "none";
    div.style.visibility = "hidden";
    return div;
}

// Generar un número aleatorio entre un rango
function randomRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
