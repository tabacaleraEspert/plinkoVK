const url = "https://script.google.com/macros/s/AKfycbwhNxXnohfBpcYPh9MHWdbhOujHfSHQ-yyGmoxGwCCSM_ejJD8JaTrDfyAUP8_WMrPo/exec"

document.getElementById("btnInstagram").addEventListener("click", async () => {
    try {
        // 🔥 Llamada al App Script
        const res = await fetch("https://script.google.com/macros/s/AKfycbwhNxXnohfBpcYPh9MHWdbhOujHfSHQ-yyGmoxGwCCSM_ejJD8JaTrDfyAUP8_WMrPo/exec");
        const data = await res.json();

        if (data.error) {
            alert("No hay premios disponibles");
            return;
        }

        // Guardás el emoji y nombre
        const premioNombre = data.Premio;


        console.log("Premio elegido:", premioNombre);

        // ✅ Guardar en variable global (si querés mostrarlo luego)
        window.premioElegido = premioNombre;


        // Ahora sí: soltar la bola
        // dropBall();

    } catch (error) {
        console.error("Error al obtener premio:", error);
        alert("Error al conectar con la base de premios");
    }
});

const videos = [
    "/whatsapp-video-2025-06-25-at-104134_4IYotq9I.webm"
];

const backgroundImages = [
    "/WhatsApp-Image-2025-07-10-at-16.38.42-_1_.webp",

    // Agregá las que quieras
];

const imagenes = [
    "/Sobre_VK_3D_Bardi_Blossom_PNG.webp",
    "/Sobre_VK_3D_Fabio_Mellow_PNG.webp",
    "/Sobre_VK_3D_Fabio_Mine_PNG.webp",
    "/Sobre_VK_3D_Koon_Hazel_PNG.webp",
    "/Sobre_VK_3D_PengYubo_American_PNG.webp",
    "/Sobre_VK_3D_PengYubo_Native_PNG.webp",
    "/Sobre_VK_3D_Pyramid_Vid_PNG.webp"
];

document.getElementById("btnInstagram").addEventListener("click", irAlJuego);
// document.getElementById("btnCerrarModal").addEventListener("click", cerrarModal);
window.addEventListener("DOMContentLoaded", () => {
    // cargarVideoAleatorio();
    cargarImagenAleatoria();
});

window.addEventListener("DOMContentLoaded", () => {
    cargarFondoAleatorio();
    cargarImagenAleatoria(); // tu función actual para la otra imagen
});


function cargarFondoAleatorio() {
    const randomImg = backgroundImages[Math.floor(Math.random() * backgroundImages.length)];
    document.body.style.backgroundImage = `url('${randomImg}')`;
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundPosition = "center";
    document.body.style.backgroundRepeat = "no-repeat";
}

// function cargarVideoAleatorio() {
//     const videoElement = document.getElementById("videoBackground");
//     const randomVideo = videos[Math.floor(Math.random() * videos.length)];
//     videoElement.querySelector("source").src = randomVideo;
//     videoElement.load();
//     videoElement.play().catch(e => console.log("No se pudo reproducir el video:", e));
// }

function cargarImagenAleatoria() {
    const randomImg = imagenes[Math.floor(Math.random() * imagenes.length)];
    document.getElementById("imagenRandom").src = randomImg;
}

document.getElementById("registerForm").addEventListener("submit", (e) => {
    e.preventDefault();

    handleSubmit();
});

function handleSubmit() {
    const data = {
        nombre: document.getElementById("nombreCompleto").value,
        edad: document.getElementById("edad").value,
        email: document.getElementById("email").value,
        telefono: document.getElementById("telefono").value,
        cp: document.getElementById("cp").value,
        ciudad: document.getElementById("ciudad").value,
        marca: document.getElementById("marca").value
    };

    if (!data.edad) return alert("Debes seleccionar un rango de edad.");
    if (localStorage.getItem("jugador_" + data.email)) return alert("Ya participaste.");

    const formData = new FormData();
    for (const key in data) formData.append(key, data[key]);

    fetch("https://script.google.com/macros/s/AKfycbw0bogi10YevW79h0CC9-JL4QuYoqIRuVpVx76uQS0c_QSBd3xB0ZXvkkKhM7OGkOB_/exec", {
        method: "POST",
        body: formData,
        mode: "no-cors"
    })
        .then(() => {
            localStorage.setItem("jugador_" + data.email, "true");
            localStorage.setItem("lastEmail", data.email);
            mostrarPantalla("instagramScreen");
        })
        .catch(() => alert("Error de red."));
}

function mostrarPantalla(id) {
    document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
    document.getElementById(id).classList.add("active");
    document.getElementById("imagenRandomContainer").style.display = (id === "gameScreen") ? "none" : "flex";
}

function mostrarModalPremio(premio) {
    const modal = document.getElementById("premioModal");
    document.getElementById("textoPremio").textContent = `Tu premio es: ${premio}`;
    modal.style.display = "flex";
    confetti({ particleCount: 150, spread: 100, origin: { y: 0.6 } });
}

// function cerrarModal() {
//     document.getElementById("premioModal").style.display = "none";
// }

document.getElementById("btnCerrarModal").addEventListener("click", () => {
    // Oculta modal de premio
    document.getElementById("premioModal").style.display = "none";

    // Muestra contenedor de video
    document.getElementById("videoReclamoContainer").style.display = "flex";

    const btnFinalizar = document.getElementById("btnFinalizar");
    btnFinalizar.disabled = true;
    btnFinalizar.textContent = "Esperá 20s...";

    let segundos = 20;
    const interval = setInterval(() => {
        segundos--;
        btnFinalizar.textContent = `Esperá ${segundos}s...`;
        if (segundos <= 0) {
            clearInterval(interval);
            btnFinalizar.disabled = false;
            btnFinalizar.textContent = "Finalizar";
        }
    }, 1000);

    // (Opcional) Empieza automáticamente el video
    const video = document.getElementById("videoReclamo");
    video.play().catch(e => console.log("No se pudo reproducir el video automáticamente:", e));
});

document.getElementById("btnFinalizar").addEventListener("click", () => {
    // Oculta el contenedor de video
    document.getElementById("videoReclamoContainer").style.display = "none";

    // ✅ Acá podrías mostrar un mensaje final o redirigir
    alert("¡Gracias! Ahora podés reclamar tu premio 🎉");
});

function irAlJuego() {
    document.body.classList.add("no-scroll");
    const bgm = document.getElementById("bgm");
    bgm.volume = 0.5; // opcional
    bgm.play().catch(e => console.log("🔇 Error al reproducir música", e));

    mostrarPantalla("gameScreen");
    iniciarJuego();
}

function lanzarConfetti() {
    const canvas = document.getElementById('confettiCanvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const pieces = [];
    for (let i = 0; i < 150; i++) {
        pieces.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height - canvas.height,
            radius: Math.random() * 6 + 4,
            color: `hsl(${Math.random() * 360}, 100%, 50%)`,
            speed: Math.random() * 3 + 2
        });
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        pieces.forEach(p => {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.fill();
            p.y += p.speed;
        });
        requestAnimationFrame(draw);
    }

    draw();
}

function iniciarJuego() {
    document.getElementById("btnJugar").addEventListener("click", function handleClick() {
        // Llamar tu función
        dropBall();

        // Desactivar el botón
        this.disabled = true;

        // Opcional: cambiar estilo para mostrar que quedó desactivado
        this.style.opacity = "0.5";
        this.style.cursor = "not-allowed";

        // Si querés también eliminar el event listener para evitar futuros clics:
        // this.removeEventListener("click", handleClick);
    });

    const { Engine, Render, World, Bodies, Body, Events } = Matter;


    const prizeZones = [];

    const engine = Engine.create();
    engine.world.gravity.y = 0.2;
    const currentWidth = window.innerWidth;
    const currentHeight = window.innerHeight;

    const render = Render.create({
        element: document.getElementById("can"),
        engine: engine,
        options: {
            width: currentWidth,
            height: currentHeight,
            wireframes: false,
            background: "transparent"
        }
    });

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////// X ESCALAR SEGUN WIDTH
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    console.log("current width: ", currentWidth)
    console.log("current height: ", currentHeight)

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////// PALITOS DE LA PIRAMIEDE
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    const pegOptions = { isStatic: true, render: { fillStyle: "#ffffff" } };
    const flanges = [];
    const rows = 14;
    const spacingX = 20
    const spacingY = 20
    const startY = currentHeight * .3
    const pegRadius = 3

    for (let row = 0; row < rows; row++) {
        const pegsInRow = row + 3;
        const offsetX = (currentWidth / 2) - (pegsInRow - 1) * spacingX / 2;

        for (let i = 0; i < pegsInRow; i++) {
            const x = offsetX + i * spacingX;
            const y = startY + row * spacingY; //50 por el price height + margen
            const peg = Bodies.circle(x, y, pegRadius, { ...pegOptions, label: "peg" });
            Body.setAngle(peg, Math.PI / 2);
            flanges.push(peg);
        }
    }
    World.add(engine.world, flanges);
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////// LIMITES
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    const margenEntrePirámideYPremios = spacingY * 1.5;
    let yUltimaFila = startY + (rows + 1) * spacingY;
    const overlayTop = yUltimaFila + margenEntrePirámideYPremios;
    const overlay = document.getElementById("prizeOverlay");

    const xInferiorWall = currentWidth / 2;
    const widthInferiorWall = currentWidth;
    const heightInferiorWall = 10;

    const topOverlay = 580;
    const alturaPremio = 30;
    const margenExtra = 10;
    const yInferiorWall = overlayTop;

    const xLeftWall = 0 ///Mitad de pantalla deberia ser
    const yLeftWall = currentHeight / 2   ///PENSAR COMO PINGO HACER
    const widthLeftWall = 10
    const heightLeftWall = currentHeight

    const widthRightWall = 10
    const xRightWall = currentWidth - (widthRightWall / 2); ///Mitad de pantalla deberia ser
    const yRightWall = currentHeight / 2     ///PENSAR COMO PINGO HACER
    const heightRightWall = currentHeight


    const walls = [
        Bodies.rectangle(
            xInferiorWall,
            yInferiorWall,
            widthInferiorWall,
            heightInferiorWall,
            {
                isStatic: true,
                label: "inferiorWall",
                render: { fillStyle: "#FF0000" }
            }
        ),
        Bodies.rectangle(
            xLeftWall,
            yLeftWall,
            widthLeftWall,
            heightLeftWall,
            {
                isStatic: true,
                render: { fillStyle: "#00FF00" } // 🟢 Verde
            }
        ),
        Bodies.rectangle(
            xRightWall,
            yRightWall,
            widthRightWall,
            heightRightWall,
            {
                isStatic: true,
                render: { fillStyle: "#0000FF" } // 🔵 Azul
            }
        ),

    ];

    World.add(engine.world, walls);
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////// PREMIOS
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    const prizeValues = [
        "4", "3",
        "2", "1", "1",
        "2", "3", "4"
    ];

    const prizeColors = [
        "#b30000", // oscuro (extremo izquierdo)
        "#e63900", // intermedio
        "#ff8533", // claro medio
        "#ffe066", // muy claro centro
        "#ffe066", // muy claro centro
        "#ff8533", // claro medio
        "#e63900", // intermedio
        "#b30000"  // oscuro (extremo derecho)
    ];

    const columns = rows + 1;
    const spacingPremio = currentWidth / prizeValues.length;  // Cada premio ocupa el mismo ancho proporcional

    // 💥 Calcular ancho total y posición inicial
    const anchoTotalPremios = prizeValues.length * spacingPremio;
    const startPremioX = 0
    const heightDiv = 30

    const yStartDivs = yUltimaFila + margenEntrePirámideYPremios + spacingY / 2;

    overlay.innerHTML = "";

    // 🟢 Estilos de overlay
    overlay.style.display = "flex";
    overlay.style.justifyContent = "center";
    overlay.style.position = "absolute";
    overlay.style.left = `${startPremioX}px`;
    overlay.style.top = `${yStartDivs}px`;
    overlay.style.width = `${anchoTotalPremios}px`;
    // PREV a GPT
    // overlay.style.left = `${startX}px`;
    // overlay.style.top = `${overlayTop}px`;
    // overlay.style.width = `${anchoTotalPremios}px`;

    // 🟠 Vaciar prizeZones
    prizeZones.length = 0;

    // 🔥 Agregar premios al overlay y calcular prizeZones
    for (let i = 0; i < prizeValues.length; i++) {
        const prize = document.createElement("div");
        prize.textContent = prizeValues[i % prizeValues.length];
        prize.style.width = `${spacingPremio}px`;
        prize.style.height = `${heightDiv}px`;
        prize.style.lineHeight = "30px";
        prize.style.textAlign = "center";
        prize.style.fontSize = "18px";
        prize.style.fontWeight = "bold";
        prize.style.borderRadius = "6px";
        prize.style.backgroundColor = prizeColors[i % prizeColors.length];
        prize.style.color = "#000";
        prize.style.margin = "0px";
        overlay.appendChild(prize);

        const centerX = startPremioX + i * spacingPremio + spacingPremio / 2;
        prizeZones.push(centerX);
    }



    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////// DIVS DE PREMIOS
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    const startOfDivisores = startY + rows * spacingY + heightDiv / 2
    for (let i = 0; i <= prizeValues.length; i++) {
        // const xDiv = startPremioX+30 + i * (spacingPremio+30);
        const xDiv = startPremioX + i * (spacingPremio);
        const divider = Bodies.rectangle(xDiv, startOfDivisores, 2, 20, {
            isStatic: true,
            render: { fillStyle: "white" }
        });
        World.add(engine.world, divider);
    }
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////





    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////// PELOTA
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    const ballRadius = 6
    const xDropBall = currentWidth / 2
    const yDropBall = startY * 0.85

    function dropBall() {
        reboteIndex = 0
        const ball = Bodies.circle(xDropBall, yDropBall, ballRadius, {
            restitution: 0.4,
            friction: 0.0,
            render: { fillStyle: "#00ffcc" },
            label: "bola",
            frictionAir: 0.0, // 👉 Esto frena un poco la caída
        });
        World.add(engine.world, ball);
        // checkPrize(ball);
    }
    window.dropBall = dropBall;






    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////// COLISIONES
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    Events.on(engine, "collisionStart", (event) => {
        const { pairs } = event;

        pairs.forEach(({ bodyA, bodyB }) => {
            const bola = bodyA.label === "bola" ? bodyA : bodyB.label === "bola" ? bodyB : null;
            const paredInferior = bodyA.label === "inferiorWall" ? bodyA : bodyB.label === "inferiorWall" ? bodyB : null;

            if (bola && paredInferior && !bola.rewarded) {
                bola.rewarded = true; // Para evitar repetir

                // Buscar el casillero más cercano
                let closest = 0;
                let minDist = Infinity;
                for (let i = 0; i < prizeZones.length; i++) {
                    const dist = Math.abs(bola.position.x - prizeZones[i]);
                    if (dist < minDist) {
                        minDist = dist;
                        closest = i;
                    }
                }

                const result = prizeValues[closest];
                console.log("Premio elegido desde back", window.premioElegido)
                mostrarModalPremio(window.premioElegido);

                // Registrar en backend
                const email = localStorage.getItem("lastEmail") || "sin_email";
                const premioData = new FormData();
                premioData.append("tipo", "resultado");
                premioData.append("email", email);
                premioData.append("premio", result);
                premioData.append("casillero", closest);

                fetch("https://script.google.com/macros/s/AKfycbw0bogi10YevW79h0CC9-JL4QuYoqIRuVpVx76uQS0c_QSBd3xB0ZXvkkKhM7OGkOB_/exec", {
                    method: "POST",
                    body: premioData,
                    mode: "no-cors"
                }).then(() => console.log("🎯 Premio registrado"));
            }
        });
    });
    const listaVelocidades = [
        { x: -0.9884, y: 1.8889 },
        { x: -0.8705, y: 0.7742 },
        { x: 1.4959, y: 1.3131 },
        { x: -0.8421, y: 0.6060 },
        { x: -0.5608, y: 0.8838 },
        { x: -0.2574, y: 1.4466 },
        { x: 0.0618, y: 0.1894 }, +
        { x: 0.6238, y: 1.5000 },
        { x: 0.6544, y: 1.1551 },
        { x: -0.0970, y: 1.4568 },
        { x: -0.3388, y: 0.8822 },
        { x: -0.0726, y: 1.4865 },
        { x: -0.3131, y: 0.9677 },
        { x: -0.8029, y: 1.4354 },
        { x: -1.0257, y: 0.7112 },
        { x: 1.2915, y: 1.3522 },
        { x: 0.5433, y: 0.7560 },
        { x: -0.9382, y: 1.3802 },
        { x: 1.1953, y: 1.0772 },
        { x: 1.3582, y: 1.2438 },
        { x: -0.5207, y: 1.8116 },
        { x: -0.4647, y: 1.4407 },
        { x: 0.9663, y: 0.9815 },
        { x: 0.4743, y: 1.6098 },
        { x: -0.8656, y: 1.0972 },
        { x: -0.7635, y: 1.2638 },
        { x: 1.3128, y: 1.6397 },
        { x: -1.0844, y: 1.1374 },
        { x: 0.9596, y: 1.5808 },
        { x: -0.5778, y: 0.4005 },
        { x: -1.4195, y: 0.5672 },
        { x: -0.4604, y: 0.8449 }
    ];
    let reboteIndex = 0;

    Events.on(engine, "collisionStart", (event) => {
        const { pairs } = event;
        // Reproduce sonido
        const bounce = document.getElementById("bounce");
        bounce.playbackRate = 1.5; // 1.0 = normal, 2.0 = el doble de rápido
        bounce.currentTime = 0;
        bounce.play().catch(e => { });


        pairs.forEach(({ bodyA, bodyB }) => {
            const peg = bodyA.label === "peg" ? bodyA : bodyB.label === "peg" ? bodyB : null;
            const bola = bodyA.label === "bola" ? bodyA : bodyB.label === "bola" ? bodyB : null;

            if (peg && bola) {
                crearOndaExpansiva(peg.position.x, peg.position.y);

                // // Dirección aleatoria y velocidad "caótica"
                const direccion = Math.random() < 0.5 ? -1 : 1;
                const velocidadX = direccion * (Math.random() * 1.5); // entre -3 y 3 aprox
                // Reemplazamos la velocidad X
                Matter.Body.setVelocity(bola, {
                    x: velocidadX,
                    y: bola.velocity.y, // mantenemos la velocidad vertical
                });
                console.log(`💥 velocidadX: ${velocidadX.toFixed(4)}`);
                console.log(`💥 velocidadY: ${bola.velocity.y}`);

                // if (reboteIndex > 1 && reboteIndex < listaVelocidades.length) {
                //     const velocidad = listaVelocidades[reboteIndex];

                //     // Asignar la velocidad definida
                //     Matter.Body.setVelocity(bola, {
                //       x: velocidad.x,
                //       y: bola.velocity.y + velocidad.y // opcional: sumar al Y
                //     });

                //     reboteIndex++; // Pasar al siguiente rebote
                //   }

            }
        });
    });

    function crearOndaExpansiva(x, y) {
        const canvas = document.querySelector("#can canvas");
        const rect = canvas.getBoundingClientRect();

        const div = document.createElement("div");
        div.style.position = "fixed";
        div.style.left = `${rect.left + x - 7}px`; // -5 para centrar  (ms grande mas a la izqueirda)
        div.style.top = `${rect.top + y - 8}px`;  // mas grande ams arriba
        div.style.width = "10px";
        div.style.height = "10px";
        div.style.borderRadius = "80%";
        div.style.border = "3px solid red";
        div.style.opacity = 1;
        div.style.pointerEvents = "none";
        div.style.transition = "transform 0.5s ease-out, opacity 0.5s ease-out";
        document.body.appendChild(div);

        requestAnimationFrame(() => {
            div.style.transform = "scale(1.5)";
            div.style.opacity = "0";
        });

        setTimeout(() => {
            document.body.removeChild(div);
        }, 300);
    }



    Engine.run(engine);
    Render.run(render);
}

