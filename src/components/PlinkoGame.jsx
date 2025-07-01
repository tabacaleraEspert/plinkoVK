import { useEffect, useRef, useState } from "react";
import Matter from "matter-js";

const premioSlots = [
    { label: "Gorra", probabilidad: 0.1 },
    { label: "Remera", probabilidad: 0.2 },
    { label: "Llaveros", probabilidad: 0.4 },
    { label: "Nada", probabilidad: 0.3 },
];

function seleccionarPremioAleatorio() {
    const r = Math.random();
    let sum = 0;
    for (const slot of premioSlots) {
        sum += slot.probabilidad;
        if (r <= sum) return slot.label;
    }
    return "Nada";
}

export default function PlinkoGame() {
    const sceneRef = useRef(null);
    const engineRef = useRef(null);
    const [resultado, setResultado] = useState(null);

    useEffect(() => {
        const { Engine, Render, World, Bodies, Events, Runner } = Matter;

        const engine = Engine.create();
        engineRef.current = engine;
        engine.gravity.y = 3;
        
        const render = Render.create({
            element: sceneRef.current,
            engine: engine,
            options: {
                width: 400,
                height: 600,
                wireframes: false,
                background: '#fff',
            },
        });

        // Paredes
        const ground = Bodies.rectangle(200, 595, 400, 10, { isStatic: true });
        const leftWall = Bodies.rectangle(0, 300, 10, 600, { isStatic: true });
        const rightWall = Bodies.rectangle(400, 300, 10, 600, { isStatic: true });

        // Clavijas
        const pegs = [];
        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 9; col++) {
                const x = 50 + col * 35 + (row % 2) * 17;
                const y = 100 + row * 60;
                pegs.push(Bodies.circle(x, y, 5, { isStatic: true }));
            }
        }

        // Slots
        const slots = [];
        for (let i = 0; i < premioSlots.length; i++) {
            const x = 50 + i * 80;
            slots.push(Bodies.rectangle(x, 580, 10, 40, { isStatic: true }));
        }

        World.add(engine.world, [ground, leftWall, rightWall, ...pegs, ...slots]);

        Runner.run(engine);
        Render.run(render);

        return () => {
            Render.stop(render);
            Engine.clear(engine);
            render.canvas.remove();
            render.textures = {};
        };
    }, []);

    const lanzarBola = () => {
        const { World, Bodies, Events } = Matter;

        const bola = Bodies.circle(200, 0, 10, {
            restitution: 0.5, // Elasticidad de rebote
            friction: 0.1,    // Fricción
            density: 0.01     // Densidad
        });

        World.add(engineRef.current.world, bola);

        Events.on(engineRef.current, "afterUpdate", function listener() {
            if (bola.position.y > 560) {
                const index = Math.floor((bola.position.x - 10) / 100);
                const premio = seleccionarPremioAleatorio();
                setResultado(premio);
                Events.off(engineRef.current, "afterUpdate", listener);
            }
        });
    };

    return (
        <div className="flex flex-col items-center">
            <div ref={sceneRef} className="border shadow rounded-xl mb-4" />
            <button
                onClick={lanzarBola}
                className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow-md transition"
            >
                Jugar
            </button>
            {resultado && <p className="mt-4 text-xl font-semibold">Ganaste: {resultado}</p>}
        </div>
    );
}
