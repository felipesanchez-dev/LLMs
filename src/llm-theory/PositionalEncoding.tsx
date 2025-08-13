"use client";
import React, { useState } from "react";

export default function PositionalEncoding() {
    const [dimension, setDimension] = useState(8);
    const [sequenceLength, setSequenceLength] = useState(10);
    const [animating, setAnimating] = useState(false);

    const calculatePositionalEncoding = (
        pos: number,
        i: number,
        dModel: number
    ) => {
        if (i % 2 === 0) {
            return Math.sin(pos / Math.pow(10000, (2 * (i / 2)) / dModel));
        } else {
            return Math.cos(
                pos / Math.pow(10000, (2 * ((i - 1) / 2)) / dModel)
            );
        }
    };

    const generatePositionalMatrix = () => {
        const matrix = [];
        for (let pos = 0; pos < sequenceLength; pos++) {
            const row = [];
            for (let i = 0; i < dimension; i++) {
                row.push(calculatePositionalEncoding(pos, i, dimension));
            }
            matrix.push(row);
        }
        return matrix;
    };

    const posMatrix = generatePositionalMatrix();

    const tokens = [
        "El",
        "gato",
        "está",
        "durmiendo",
        "en",
        "la",
        "cama",
        "suave",
        "y",
        "cómoda",
    ];
    const wordEmbeddings = tokens
        .slice(0, sequenceLength)
        .map(() =>
            Array.from({ length: dimension }, () => Math.random() * 2 - 1)
        );

    const [showCombined, setShowCombined] = useState(false);

    const toggleCombined = () => {
        setAnimating(true);
        setShowCombined(!showCombined);
        setTimeout(() => setAnimating(false), 1000);
    };

    const getColor = (value: number) => {
        const normalized = (value + 1) / 2;
        const red = Math.floor(255 * (1 - normalized));
        const blue = Math.floor(255 * normalized);
        return `rgb(${red}, 0, ${blue})`;
    };

    return (
        <div className="bg-gray-900 text-white p-6 rounded-xl my-6">
            <h3 className="text-xl font-bold mb-4">Codificación Posicional</h3>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                    <div className="bg-gray-800 p-4 rounded-lg">
                        <h4 className="text-lg mb-3">Matrices de Encoding</h4>
                        <div className="flex space-x-4 mb-4">
                            <div>
                                <label className="block text-sm mb-1">
                                    Dimensión:
                                </label>
                                <input
                                    type="range"
                                    min="4"
                                    max="16"
                                    value={dimension}
                                    onChange={(e) =>
                                        setDimension(parseInt(e.target.value))
                                    }
                                    className="w-full"
                                />
                                <span className="text-xs text-gray-400">
                                    {dimension}
                                </span>
                            </div>
                            <div>
                                <label className="block text-sm mb-1">
                                    Secuencia:
                                </label>
                                <input
                                    type="range"
                                    min="5"
                                    max="10"
                                    value={sequenceLength}
                                    onChange={(e) =>
                                        setSequenceLength(
                                            parseInt(e.target.value)
                                        )
                                    }
                                    className="w-full"
                                />
                                <span className="text-xs text-gray-400">
                                    {sequenceLength}
                                </span>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <div>
                                <h5 className="text-sm font-semibold mb-2">
                                    📝 Word Embeddings
                                </h5>
                                <div
                                    className="grid gap-1"
                                    style={{
                                        gridTemplateColumns: `repeat(${dimension}, 1fr)`,
                                    }}
                                >
                                    {wordEmbeddings.map((embedding, pos) =>
                                        embedding.map((value, dim) => (
                                            <div
                                                key={`word-${pos}-${dim}`}
                                                className={`
                          w-6 h-6 text-xs flex items-center justify-center rounded
                          ${animating ? "animate-pulse" : ""}
                        `}
                                                style={{
                                                    backgroundColor:
                                                        showCombined
                                                            ? "transparent"
                                                            : getColor(value),
                                                    opacity: showCombined
                                                        ? 0.3
                                                        : 1,
                                                }}
                                                title={`Token: ${
                                                    tokens[pos]
                                                }, Dim: ${dim}, Value: ${value.toFixed(
                                                    3
                                                )}`}
                                            >
                                                {Math.abs(value).toFixed(1)}
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>

                            <div>
                                <h5 className="text-sm font-semibold mb-2">
                                    📍 Positional Encoding
                                </h5>
                                <div
                                    className="grid gap-1"
                                    style={{
                                        gridTemplateColumns: `repeat(${dimension}, 1fr)`,
                                    }}
                                >
                                    {posMatrix.map((row, pos) =>
                                        row.map((value, dim) => (
                                            <div
                                                key={`pos-${pos}-${dim}`}
                                                className={`
                          w-6 h-6 text-xs flex items-center justify-center rounded
                          ${animating ? "animate-pulse" : ""}
                        `}
                                                style={{
                                                    backgroundColor:
                                                        showCombined
                                                            ? "transparent"
                                                            : getColor(value),
                                                    opacity: showCombined
                                                        ? 0.3
                                                        : 1,
                                                }}
                                                title={`Pos: ${pos}, Dim: ${dim}, Value: ${value.toFixed(
                                                    3
                                                )}`}
                                            >
                                                {Math.abs(value).toFixed(1)}
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>

                            {showCombined && (
                                <div>
                                    <h5 className="text-sm font-semibold mb-2">
                                        ➕ Embedding + Posición
                                    </h5>
                                    <div
                                        className="grid gap-1"
                                        style={{
                                            gridTemplateColumns: `repeat(${dimension}, 1fr)`,
                                        }}
                                    >
                                        {wordEmbeddings.map((embedding, pos) =>
                                            embedding.map((wordValue, dim) => {
                                                const posValue =
                                                    posMatrix[pos][dim];
                                                const combined =
                                                    wordValue + posValue;
                                                return (
                                                    <div
                                                        key={`combined-${pos}-${dim}`}
                                                        className={`
                              w-6 h-6 text-xs flex items-center justify-center rounded
                              ${animating ? "animate-bounce" : ""}
                            `}
                                                        style={{
                                                            backgroundColor:
                                                                getColor(
                                                                    combined
                                                                ),
                                                        }}
                                                        title={`Combined: ${combined.toFixed(
                                                            3
                                                        )}`}
                                                    >
                                                        {Math.abs(
                                                            combined
                                                        ).toFixed(1)}
                                                    </div>
                                                );
                                            })
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>

                        <button
                            onClick={toggleCombined}
                            className="mt-4 bg-green-600 hover:bg-green-700 px-4 py-2 rounded transition-colors w-full"
                        >
                            {showCombined
                                ? "Mostrar Separado"
                                : "Combinar Embeddings"}
                        </button>
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="bg-gray-800 p-4 rounded-lg">
                        <h4 className="text-lg mb-2">
                            ¿Por qué Codificación Posicional?
                        </h4>
                        <ul className="text-sm text-gray-300 space-y-2">
                            <li>
                                • Los Transformers procesan tokens en{" "}
                                <strong>paralelo</strong>
                            </li>
                            <li>
                                • No hay información inherente sobre el{" "}
                                <strong>orden</strong>
                            </li>
                            <li>
                                • La posición es crucial para el{" "}
                                <strong>significado</strong>
                            </li>
                            <li>
                                • Permite que el modelo aprenda{" "}
                                <strong>patrones posicionales</strong>
                            </li>
                        </ul>
                    </div>

                    <div className="bg-gray-800 p-4 rounded-lg">
                        <h4 className="text-lg mb-2">
                            📐 Fórmulas Matemáticas
                        </h4>
                        <div className="space-y-3 text-sm">
                            <div className="bg-gray-700 p-3 rounded font-mono text-xs">
                                <div>
                                    PE(pos, 2i) = sin(pos / 10000^(2i/d_model))
                                </div>
                                <div>
                                    PE(pos, 2i+1) = cos(pos /
                                    10000^(2i/d_model))
                                </div>
                            </div>
                            <div className="text-gray-300">
                                <div>
                                    <strong>pos:</strong> posición en la
                                    secuencia
                                </div>
                                <div>
                                    <strong>i:</strong> dimensión del embedding
                                </div>
                                <div>
                                    <strong>d_model:</strong> dimensión total
                                    del modelo
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gray-800 p-4 rounded-lg">
                        <h4 className="text-lg mb-2">Patrón Sinusoidal</h4>
                        <svg
                            width="100%"
                            height="120"
                            className="border border-gray-600 rounded"
                        >
                            {Array.from({ length: 3 }, (_, freqIdx) => {
                                const frequency = Math.pow(2, freqIdx);
                                const points = Array.from(
                                    { length: 100 },
                                    (_, x) => {
                                        const pos = (x / 100) * sequenceLength;
                                        const value = Math.sin(
                                            (pos / 10) * frequency
                                        );
                                        return {
                                            x: (x / 100) * 280 + 10,
                                            y: 60 + value * 20,
                                        };
                                    }
                                );

                                const pathData = points
                                    .map(
                                        (p, i) =>
                                            `${i === 0 ? "M" : "L"} ${p.x} ${
                                                p.y
                                            }`
                                    )
                                    .join(" ");

                                return (
                                    <path
                                        key={freqIdx}
                                        d={pathData}
                                        stroke={
                                            ["#3b82f6", "#8b5cf6", "#10b981"][
                                                freqIdx
                                            ]
                                        }
                                        strokeWidth="2"
                                        fill="none"
                                    />
                                );
                            })}

                            <text
                                x={150}
                                y={20}
                                textAnchor="middle"
                                fontSize="12"
                                fill="white"
                            >
                                Ondas de diferentes frecuencias
                            </text>
                        </svg>
                    </div>

                    <div className="bg-gray-800 p-4 rounded-lg">
                        <h4 className="text-lg mb-2">Ventajas del Método</h4>
                        <div className="space-y-2 text-sm text-gray-300">
                            <div>
                                <strong>Periódico:</strong> Patrones se repiten
                            </div>
                            <div>
                                <strong>Relativo:</strong> Distancia entre
                                posiciones
                            </div>
                            <div>
                                <strong>Escalable:</strong> Funciona para
                                cualquier longitud
                            </div>
                            <div>
                                <strong>Único:</strong> Cada posición tiene
                                encoding único
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-6 bg-gray-800 p-4 rounded-lg">
                <h4 className="text-lg mb-3">
                    Tokens con Información Posicional
                </h4>
                <div className="flex flex-wrap gap-2">
                    {tokens.slice(0, sequenceLength).map((token, idx) => (
                        <div
                            key={idx}
                            className="bg-gray-700 px-3 py-2 rounded-lg border-l-4"
                            style={{
                                borderLeftColor: `hsl(${
                                    (idx * 360) / sequenceLength
                                }, 60%, 50%)`,
                            }}
                        >
                            <div className="text-sm font-semibold">{token}</div>
                            <div className="text-xs text-gray-400">
                                Pos: {idx}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
