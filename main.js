const videos = [
    "/WhatsApp Video 2025-06-25 at 10.41.33.mp4",
    "/WhatsApp Video 2025-06-25 at 10.41.34.mp4",
    "/WhatsApp Video 2025-06-25 at 11.02.19.mp4",
    "/WhatsApp Video 2025-06-25 at 11.02.31.mp4",
];

const imagenes = [
    "/Sobre_VK_3D_Bardi_Blossom_PNG.png",
    "/Sobre_VK_3D_Fabio_Mellow_PNG.png",
    "/Sobre_VK_3D_Fabio_Mine_PNG.png",
    "/Sobre_VK_3D_Koon_Hazel_PNG.png",
    "/Sobre_VK_3D_PengYubo_American_PNG.png",
    "/Sobre_VK_3D_PengYubo_Native_PNG.png",
    "/Sobre_VK_3D_Pyramid_Vid_PNG.png"
];

window.addEventListener("DOMContentLoaded", () => {
    cargarVideoAleatorio();
    cargarImagenAleatoria();
});

function cargarVideoAleatorio() {
    const videoElement = document.getElementById("videoBackground");
    const randomVideo = videos[Math.floor(Math.random() * videos.length)];
    videoElement.querySelector("source").src = randomVideo;
    videoElement.load();
    videoElement.play().catch(e => console.log("No se pudo reproducir el video:", e));
}

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

function cerrarModal() {
    document.getElementById("premioModal").style.display = "none";
}

function irAlJuego() {
    const bgm = document.getElementById("bgm");
    bgm.volume = 0.5; // opcional
    bgm.play().catch(e => console.log("🔇 Error al reproducir música", e));

    mostrarPantalla("gameScreen");
    iniciarJuego();
}

function cerrarModal() {
    document.getElementById("premioModal").style.display = "none";
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
    const { Engine, Render, World, Bodies, Body, Events } = Matter;


    const prizeZones = [];
    const prizes = [
        "🎉 ¡GANASTE UN AUTO!",
        "🏖️ ¡Vacaciones gratis!",
        "📱 ¡Un smartphone!",
        "📱 ¡Un smartphone!",
        "🍬 Gracias por participar",
        "🍬 Gracias por participar",
        "🍬 Gracias por participar",
        "🍬 Gracias por participar",
        "🍬 Gracias por participar",
        "🍬 Gracias por participar",
        "🍬 Gracias por participar",
        "🍬 Gracias por participar",
        "🍬 Gracias por participar",
        "🍬 Gracias por participar",
        "🍬 Gracias por participar",
        "🍬 Gracias por participar",
        "📱 ¡Un smartphone!",
        "📱 ¡Un smartphone!",
        "🏖️ ¡Vacaciones gratis!",
        "🎉 ¡GANASTE UN AUTO!"
    ];

    const engine = Engine.create();
    engine.world.gravity.y = 0.2;

    const render = Render.create({
        element: document.getElementById("can"),
        engine: engine,
        options: {
            width: 800,
            height: 800,
            wireframes: false,
            background: "transparent"
        }
    });

    const baseWidth = 800;
    const currentWidth = window.innerWidth; // o el width de tu canvas
    console.log(currentWidth)
    const scaleFactor = currentWidth / baseWidth;

    const pegOptions = { isStatic: true, render: { fillStyle: "#ffffff" } };
    const flanges = [];
    const rows = 15;
    const spacingX = 20 * scaleFactor;
    const spacingY = 20 * scaleFactor;
    const startY = 200 * scaleFactor;
    const pegRadius = 1.2 * scaleFactor;
    const ballRadius = 6 * scaleFactor;
    const xDropBall = 450 * scaleFactor;
    const yDropBall = 100 * scaleFactor;
    const xPricesStart = 330 * scaleFactor;
    const yPricesStart = 220 * scaleFactor;
    const xPricesDividers = 315 * scaleFactor;
    const yPricesDividers = 550  * scaleFactor;

    // PALITOS
    for (let row = 0; row < rows; row++) {
        const pegsInRow = row + 3;
        const offsetX = 400 - (pegsInRow - 1) * spacingX / 2;

        for (let i = 0; i < pegsInRow; i++) {
            const x = offsetX + i * spacingX;
            const y = startY + row * spacingY;
            const peg = Bodies.circle(x, y, pegRadius, { ...pegOptions, label: "peg" });
            Body.setAngle(peg, Math.PI / 2);
            flanges.push(peg);
        }
    }
    World.add(engine.world, flanges);

    // LIMITES
    const walls = [
        Bodies.rectangle(400, 800, 800, 60, { isStatic: true, render: { fillStyle: "transparent" } }),
        Bodies.rectangle(0, 400, 10, 800, { isStatic: true, render: { fillStyle: "transparent" } }),
        Bodies.rectangle(800, 400, 10, 800, { isStatic: true, render: { fillStyle: "transparent" } }),
        Bodies.rectangle(400, 0, 800, 10, { isStatic: true, render: { fillStyle: "transparent" } })
    ];
    World.add(engine.world, walls);

    // PREMIOS
    const columns = rows + 1;
    const spacingCatch = spacingX;
    const spacingCatchPrice = spacingX;
    const startCatchX = xPricesStart - (columns - 1) * spacingCatch / 2;

    // DIVISORES DE PREMIOS
    for (let i = -1; i < columns + 1; i++) {
        const x = xPricesDividers + i * spacingCatch;
        const divider = Bodies.rectangle(x, yPricesDividers, 4, 100, {
            isStatic: true,
            // render: { fillStyle: "transparent" } // invisible
        });
        World.add(engine.world, divider);
    }


    for (let i = 0; i < columns; i++) {
        const x = xPricesStart + i * spacingCatch;
        prizeZones.push(x);
    }

    function dropBall() {
        const ball = Bodies.circle(xDropBall, yDropBall, ballRadius, {
            restitution: 0.4,
            friction: 0.0,
            render: { fillStyle: "#00ffcc" },
            label: "bola",
            frictionAir: 0.0, // 👉 Esto frena un poco la caída
        });
        World.add(engine.world, ball);
        checkPrize(ball);
    }
    window.dropBall = dropBall;

    function checkPrize(ball) {
        Events.on(engine, "afterUpdate", () => {
            if (ball.speed < 0.5 && ball.position.y > 750 && !ball.rewarded) {
                let closest = 0;
                let minDist = Infinity;
                for (let i = 0; i < prizeZones.length; i++) {
                    const dist = Math.abs(ball.position.x - prizeZones[i]);
                    if (dist < minDist) {
                        minDist = dist;
                        closest = i;
                    }
                }

                const result = prizes[closest];
                mostrarModalPremio(result);

                ball.rewarded = true;

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
    }

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

                // Dirección aleatoria y velocidad "caótica"
                const direccion = Math.random() < 0.5 ? -1 : 1;
                const velocidadX = direccion * (Math.random() * 1.5); // entre -3 y 3 aprox
                // Reemplazamos la velocidad X
                Matter.Body.setVelocity(bola, {
                    x: velocidadX,
                    y: bola.velocity.y, // mantenemos la velocidad vertical
                });

                console.log(`💥 Lateral con velocidadX: ${velocidadX.toFixed(2)}`);
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

    // Visual de premios
    const prizeValues = [
        "🎉", "💰", "📱", "🎁", "🍬", "🍬", "🍬", "🍬", "🍬", "🍬",
        "🍬", "🍬", "🍬", "🍬", "🍬", "🍬", "📱", "🎁", "💰", "🎉"
    ];
    const prizeColors = [
        "#b30000", "#e63900", "#ff6600", "#ff8533", "#ff9933", "#ffbb33", "#ffe066", "#ffff66", "#ffff66", "#ffff66",
        "#ffff66", "#ffff66", "#ffff66", "#ffe066", "#ffbb33", "#ff9933", "#ff8533", "#ff6600", "#e63900", "#b30000"
    ];

    const overlay = document.getElementById("prizeOverlay");
    overlay.innerHTML = "";


    // Premios
    for (let i = 0; i < columns + 3; i++) {
        const x = startCatchX + i * spacingCatchPrice - spacingCatchPrice / 2;
        const prize = document.createElement("div");
        prize.textContent = prizeValues[i];
        prize.style.position = "absolute";
        prize.style.left = `${x - 60}px`;
        prize.style.top = `580px`;
        prize.style.width = `${spacingCatch}px`;
        prize.style.height = `30px`;
        prize.style.lineHeight = "30px";
        prize.style.textAlign = "center";
        prize.style.fontSize = "22px";
        prize.style.fontWeight = "bold";
        prize.style.borderRadius = "6px";
        prize.style.backgroundColor = prizeColors[i];
        prize.style.color = "#000";
        overlay.appendChild(prize);
    }

    Engine.run(engine);
    Render.run(render);
}

/* ⚡ Aquí incluirías el código del juego con Matter.js tal como lo tenés separado, modularizado (por espacio no se copia todo aquí) */
