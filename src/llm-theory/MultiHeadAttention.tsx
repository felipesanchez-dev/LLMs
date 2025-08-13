"use client";
import React, { useState, useEffect } from "react";

export default function MultiHeadAttention() {
    const [selectedHead, setSelectedHead] = useState(0);
    const [animating, setAnimating] = useState(false);

    const tokens = ["El", "gato", "come", "pescado"];
    const numHeads = 4;
    const headNames = ["Sintáctico", "Semántico", "Posicional", "Contextual"];
    const headColors = ["#3b82f6", "#8b5cf6", "#10b981", "#f59e0b"];

    const attentionPatterns = [
        [
            [0.1, 0.3, 0.4, 0.2],
            [0.8, 0.1, 0.05, 0.05],
            [0.1, 0.7, 0.1, 0.1],
            [0.1, 0.1, 0.2, 0.6],
        ],
        [
            [0.2, 0.6, 0.1, 0.1],
            [0.1, 0.3, 0.4, 0.2],
            [0.05, 0.2, 0.15, 0.6],
            [0.1, 0.3, 0.4, 0.2],
        ],
        [
            [0.7, 0.2, 0.05, 0.05],
            [0.3, 0.4, 0.2, 0.1],
            [0.1, 0.3, 0.4, 0.2],
            [0.05, 0.1, 0.3, 0.55],
        ],
        [
            [0.25, 0.25, 0.25, 0.25],
            [0.2, 0.3, 0.3, 0.2],
            [0.2, 0.2, 0.3, 0.3],
            [0.25, 0.25, 0.25, 0.25],
        ],
    ];

    const runAnimation = () => {
        setAnimating(true);
        setTimeout(() => setAnimating(false), 2000);
    };

    const AttentionMatrix = ({ headIdx }: { headIdx: number }) => {
        const pattern = attentionPatterns[headIdx];

        return (
            <div className="bg-gray-700 p-3 rounded-lg">
                <div
                    className="text-sm font-semibold mb-2 text-center"
                    style={{ color: headColors[headIdx] }}
                >
                    Head {headIdx + 1}: {headNames[headIdx]}
                </div>
                <div className="grid grid-cols-4 gap-1 text-xs">
                    {pattern.map((row, i) =>
                        row.map((value, j) => (
                            <div
                                key={`${i}-${j}`}
                                className="w-8 h-8 flex items-center justify-center rounded text-white text-xs"
                                style={{
                                    backgroundColor: headColors[headIdx],
                                    opacity: value,
                                    border:
                                        selectedHead === headIdx
                                            ? "2px solid white"
                                            : "none",
                                }}
                            >
                                {value.toFixed(2)}
                            </div>
                        ))
                    )}
                </div>
            </div>
        );
    };

    const CombinedVisualization = () => {
        return (
            <div className="bg-gray-800 p-4 rounded-lg">
                <h4 className="text-lg mb-3">
                    Atención Multi-Cabeza Combinada
                </h4>
                <svg
                    width="100%"
                    height="300"
                    className="border border-gray-600 rounded"
                >
                    {tokens.map((token, idx) => (
                        <g key={`token-${idx}`}>
                            <circle
                                cx={80 + idx * 80}
                                cy={50}
                                r={20}
                                fill="#374151"
                                stroke="#9ca3af"
                                strokeWidth="2"
                            />
                            <text
                                x={80 + idx * 80}
                                y={55}
                                textAnchor="middle"
                                fontSize="12"
                                fill="white"
                                fontWeight="bold"
                            >
                                {token}
                            </text>
                        </g>
                    ))}

                    {attentionPatterns[selectedHead].map((row, fromIdx) =>
                        row.map((attention, toIdx) => {
                            if (attention < 0.1) return null;

                            return (
                                <line
                                    key={`attention-${fromIdx}-${toIdx}`}
                                    x1={80 + fromIdx * 80}
                                    y1={70}
                                    x2={80 + toIdx * 80}
                                    y2={130}
                                    stroke={headColors[selectedHead]}
                                    strokeWidth={2 + attention * 4}
                                    opacity={attention}
                                    className={animating ? "animate-pulse" : ""}
                                />
                            );
                        })
                    )}

                    {tokens.map((token, idx) => (
                        <g key={`output-${idx}`}>
                            <rect
                                x={60 + idx * 80}
                                y={140}
                                width={40}
                                height={30}
                                fill={headColors[selectedHead]}
                                opacity="0.7"
                                rx="5"
                            />
                            <text
                                x={80 + idx * 80}
                                y={160}
                                textAnchor="middle"
                                fontSize="10"
                                fill="white"
                            >
                                Out {idx + 1}
                            </text>
                        </g>
                    ))}

                    <text
                        x={200}
                        y={30}
                        textAnchor="middle"
                        fontSize="14"
                        fill="white"
                        fontWeight="bold"
                    >
                        Entrada
                    </text>
                    <text
                        x={200}
                        y={200}
                        textAnchor="middle"
                        fontSize="14"
                        fill="white"
                        fontWeight="bold"
                    >
                        Salida
                    </text>
                </svg>

                <div className="mt-4 flex justify-center space-x-2">
                    {headNames.map((name, idx) => (
                        <button
                            key={idx}
                            onClick={() => setSelectedHead(idx)}
                            className={`
                px-3 py-1 rounded text-sm transition-all
                ${selectedHead === idx ? "ring-2 ring-white" : ""}
              `}
                            style={{
                                backgroundColor: headColors[idx],
                                opacity: selectedHead === idx ? 1 : 0.7,
                            }}
                        >
                            {name}
                        </button>
                    ))}
                </div>
            </div>
        );
    };

    return (
        <div className="bg-gray-900 text-white p-6 rounded-xl my-6">
            <h3 className="text-xl font-bold mb-4">Multi-Head Attention</h3>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <CombinedVisualization />

                <div className="space-y-4">
                    <div className="bg-gray-800 p-4 rounded-lg">
                        <h4 className="text-lg mb-2">
                            ¿Por qué múltiples cabezas?
                        </h4>
                        <ul className="text-sm text-gray-300 space-y-2">
                            <li>
                                • <strong>Especialización:</strong> Cada cabeza
                                aprende diferentes tipos de relaciones
                            </li>
                            <li>
                                • <strong>Paralelismo:</strong> Múltiples
                                patrones de atención simultáneos
                            </li>
                            <li>
                                • <strong>Robustez:</strong> Redundancia que
                                mejora la representación
                            </li>
                            <li>
                                • <strong>Capacidad:</strong> Mayor expresividad
                                del modelo
                            </li>
                        </ul>
                    </div>

                    <div className="bg-gray-800 p-4 rounded-lg">
                        <h4 className="text-lg mb-2">Tipos de Atención</h4>
                        <div className="space-y-2 text-sm">
                            {headNames.map((name, idx) => (
                                <div
                                    key={idx}
                                    className="flex items-center space-x-2"
                                >
                                    <div
                                        className="w-4 h-4 rounded"
                                        style={{
                                            backgroundColor: headColors[idx],
                                        }}
                                    />
                                    <span className="font-semibold">
                                        {name}:
                                    </span>
                                    <span className="text-gray-300">
                                        {idx === 0 && "Relaciones gramaticales"}
                                        {idx === 1 && "Significado semántico"}
                                        {idx === 2 && "Orden y posición"}
                                        {idx === 3 && "Contexto global"}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-gray-800 p-4 rounded-lg">
                        <h4 className="text-lg mb-2">Proceso Técnico</h4>
                        <div className="space-y-2 text-xs text-gray-300">
                            <div>
                                1. Dividir embeddings en {numHeads} cabezas
                            </div>
                            <div>
                                2. Aplicar transformaciones lineales Q, K, V
                            </div>
                            <div>3. Calcular atención para cada cabeza</div>
                            <div>4. Concatenar resultados</div>
                            <div>5. Proyección lineal final</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-6">
                <h4 className="text-lg mb-3">
                    Matrices de Atención por Cabeza
                </h4>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {Array.from({ length: numHeads }, (_, idx) => (
                        <AttentionMatrix key={idx} headIdx={idx} />
                    ))}
                </div>
            </div>

            <button
                onClick={runAnimation}
                className="mt-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-6 py-2 rounded transition-all"
            >
                {animating ? "Procesando..." : "Ejecutar Multi-Head Attention"}
            </button>
        </div>
    );
}
