"use client";
import React, { useState } from "react";

interface Neuron {
    id: string;
    x: number;
    y: number;
    activation: number;
    bias: number;
}

interface Connection {
    from: string;
    to: string;
    weight: number;
}

export default function NeuralNetworkBasics() {
    const [animating, setAnimating] = useState(false);

    const layers = [
        { name: "Entrada", neurons: 3, color: "#3b82f6" },
        { name: "Oculta", neurons: 4, color: "#8b5cf6" },
        { name: "Salida", neurons: 2, color: "#ef4444" },
    ];

    const neurons: Neuron[] = [];
    const connections: Connection[] = [];

    layers.forEach((layer, layerIdx) => {
        for (let i = 0; i < layer.neurons; i++) {
            neurons.push({
                id: `${layerIdx}-${i}`,
                x: 100 + layerIdx * 150,
                y: 50 + i * 40 + (layerIdx === 1 ? -20 : 0),
                activation: Math.random(),
                bias: Math.random() * 2 - 1,
            });
        }
    });

    for (let layerIdx = 0; layerIdx < layers.length - 1; layerIdx++) {
        const currentLayer = neurons.filter((n) =>
            n.id.startsWith(`${layerIdx}-`)
        );
        const nextLayer = neurons.filter((n) =>
            n.id.startsWith(`${layerIdx + 1}-`)
        );

        currentLayer.forEach((from) => {
            nextLayer.forEach((to) => {
                connections.push({
                    from: from.id,
                    to: to.id,
                    weight: Math.random() * 2 - 1,
                });
            });
        });
    }

    const forwardPropagation = () => {
        setAnimating(true);
        setTimeout(() => setAnimating(false), 2000);
    };

    return (
        <div className="bg-gray-900 text-white p-6 rounded-xl my-6">
            <h3 className="text-xl font-bold mb-4">
                🧠 Fundamentos de Redes Neuronales
            </h3>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-gray-800 p-4 rounded-lg">
                    <h4 className="text-lg mb-3">Red Neuronal Simple</h4>
                    <svg
                        width="400"
                        height="200"
                        className="border border-gray-600 rounded"
                    >
                        {connections.map((conn, idx) => {
                            const fromNeuron = neurons.find(
                                (n) => n.id === conn.from
                            );
                            const toNeuron = neurons.find(
                                (n) => n.id === conn.to
                            );
                            if (!fromNeuron || !toNeuron) return null;

                            const opacity = Math.abs(conn.weight);
                            const color =
                                conn.weight > 0 ? "#10b981" : "#ef4444";

                            return (
                                <line
                                    key={idx}
                                    x1={fromNeuron.x + 15}
                                    y1={fromNeuron.y + 15}
                                    x2={toNeuron.x}
                                    y2={toNeuron.y + 15}
                                    stroke={color}
                                    strokeWidth={2}
                                    opacity={animating ? opacity : 0.3}
                                    className={animating ? "animate-pulse" : ""}
                                />
                            );
                        })}

                        {neurons.map((neuron, idx) => {
                            const layerIdx = parseInt(neuron.id.split("-")[0]);
                            const color = layers[layerIdx].color;

                            return (
                                <g key={neuron.id}>
                                    <circle
                                        cx={neuron.x + 15}
                                        cy={neuron.y + 15}
                                        r={15}
                                        fill={color}
                                        opacity={0.8}
                                        className={
                                            animating ? "animate-pulse" : ""
                                        }
                                    />
                                    <text
                                        x={neuron.x + 15}
                                        y={neuron.y + 20}
                                        textAnchor="middle"
                                        fontSize="10"
                                        fill="white"
                                    >
                                        {neuron.activation.toFixed(2)}
                                    </text>
                                </g>
                            );
                        })}

                        {layers.map((layer, idx) => (
                            <text
                                key={idx}
                                x={100 + idx * 150}
                                y={30}
                                textAnchor="middle"
                                fontSize="12"
                                fill="white"
                                fontWeight="bold"
                            >
                                {layer.name}
                            </text>
                        ))}
                    </svg>

                    <button
                        onClick={forwardPropagation}
                        className="mt-4 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded transition-colors"
                    >
                        {animating ? "Propagando..." : "Ejecutar Propagación"}
                    </button>
                </div>

                <div className="space-y-4">
                    <div className="bg-gray-800 p-4 rounded-lg">
                        <h4 className="text-lg mb-2">
                            ¿Qué es una Neurona Artificial?
                        </h4>
                        <p className="text-sm text-gray-300 mb-3">
                            Una neurona artificial recibe entradas, las pondera,
                            suma un sesgo y aplica una función de activación:
                        </p>
                        <div className="bg-gray-700 p-3 rounded text-center font-mono text-sm">
                            y = f(Σ(wi × xi) + b)
                        </div>
                    </div>

                    <div className="bg-gray-800 p-4 rounded-lg">
                        <h4 className="text-lg mb-2">
                            Funciones de Activación
                        </h4>
                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between items-center">
                                <span>Sigmoid:</span>
                                <code className="bg-gray-700 px-2 py-1 rounded">
                                    1/(1+e^(-x))
                                </code>
                            </div>
                            <div className="flex justify-between items-center">
                                <span>ReLU:</span>
                                <code className="bg-gray-700 px-2 py-1 rounded">
                                    max(0, x)
                                </code>
                            </div>
                            <div className="flex justify-between items-center">
                                <span>Tanh:</span>
                                <code className="bg-gray-700 px-2 py-1 rounded">
                                    (e^x - e^(-x))/(e^x + e^(-x))
                                </code>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gray-800 p-4 rounded-lg">
                        <h4 className="text-lg mb-2">Propagación</h4>
                        <ul className="text-sm text-gray-300 space-y-1">
                            <li>
                                • <strong>Forward:</strong> Los datos fluyen de
                                entrada a salida
                            </li>
                            <li>
                                • <strong>Backward:</strong> Los errores se
                                propagan hacia atrás
                            </li>
                            <li>
                                • <strong>Pesos:</strong> Se ajustan para
                                minimizar el error
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gray-800 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-blue-400">
                        {neurons.length}
                    </div>
                    <div className="text-sm text-gray-400">Neuronas</div>
                </div>
                <div className="bg-gray-800 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-purple-400">
                        {connections.length}
                    </div>
                    <div className="text-sm text-gray-400">Conexiones</div>
                </div>
                <div className="bg-gray-800 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-green-400">
                        {layers.length}
                    </div>
                    <div className="text-sm text-gray-400">Capas</div>
                </div>
            </div>
        </div>
    );
}
