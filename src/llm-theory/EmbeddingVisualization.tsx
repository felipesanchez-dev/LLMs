"use client";
import React, { useState } from "react";

export default function EmbeddingVisualization() {
    const [selectedWord, setSelectedWord] = useState("gato");
    const [animating, setAnimating] = useState(false);

    const vocabulary = {
        gato: {
            vector: [0.8, 0.2, -0.1, 0.6, -0.3],
            category: "animal",
            color: "#3b82f6",
        },
        perro: {
            vector: [0.7, 0.3, -0.2, 0.5, -0.2],
            category: "animal",
            color: "#3b82f6",
        },
        león: {
            vector: [0.6, 0.1, 0.3, 0.7, 0.1],
            category: "animal",
            color: "#3b82f6",
        },
        coche: {
            vector: [-0.2, 0.8, 0.4, -0.1, 0.6],
            category: "vehículo",
            color: "#ef4444",
        },
        avión: {
            vector: [-0.1, 0.9, 0.6, 0.2, 0.5],
            category: "vehículo",
            color: "#ef4444",
        },
        bicicleta: {
            vector: [-0.3, 0.7, 0.3, -0.2, 0.4],
            category: "vehículo",
            color: "#ef4444",
        },
        manzana: {
            vector: [0.1, -0.3, 0.8, 0.4, -0.1],
            category: "comida",
            color: "#22c55e",
        },
        banana: {
            vector: [0.2, -0.2, 0.7, 0.3, 0.1],
            category: "comida",
            color: "#22c55e",
        },
        pizza: {
            vector: [0.0, -0.1, 0.9, 0.6, 0.2],
            category: "comida",
            color: "#22c55e",
        },
    };

    const cosineSimilarity = (a: number[], b: number[]) => {
        const dotProduct = a.reduce((sum, val, i) => sum + val * b[i], 0);
        const magnitudeA = Math.sqrt(
            a.reduce((sum, val) => sum + val * val, 0)
        );
        const magnitudeB = Math.sqrt(
            b.reduce((sum, val) => sum + val * val, 0)
        );
        return dotProduct / (magnitudeA * magnitudeB);
    };

    const getSimilarWords = (word: string) => {
        if (!vocabulary[word as keyof typeof vocabulary]) return [];

        const wordVector = vocabulary[word as keyof typeof vocabulary].vector;
        const similarities = Object.entries(vocabulary)
            .filter(([w]) => w !== word)
            .map(([w, data]) => ({
                word: w,
                similarity: cosineSimilarity(wordVector, data.vector),
                ...data,
            }))
            .sort((a, b) => b.similarity - a.similarity);

        return similarities;
    };

    const similarWords = getSimilarWords(selectedWord);

    const project2D = () => {
        return Object.entries(vocabulary).map(([word, data]) => {
            const x = data.vector[0] * 100 + 150;
            const y = data.vector[1] * 100 + 150;
            return { word, x, y, ...data };
        });
    };

    const projectedPoints = project2D();

    const animateEmbedding = () => {
        setAnimating(true);
        setTimeout(() => setAnimating(false), 2000);
    };

    return (
        <div className="bg-gray-900 text-white p-6 rounded-xl my-6">
            <h3 className="text-xl font-bold mb-4">
                Visualización de Embeddings
            </h3>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-gray-800 p-4 rounded-lg">
                    <h4 className="text-lg mb-3">Espacio de Embeddings</h4>
                    <div className="mb-4">
                        <label className="block text-sm mb-2">
                            Palabra seleccionada:
                        </label>
                        <select
                            value={selectedWord}
                            onChange={(e) => setSelectedWord(e.target.value)}
                            className="bg-gray-700 text-white p-2 rounded w-full"
                        >
                            {Object.keys(vocabulary).map((word) => (
                                <option key={word} value={word}>
                                    {word}
                                </option>
                            ))}
                        </select>
                    </div>

                    <svg
                        width="100%"
                        height="300"
                        className="border border-gray-600 rounded bg-gray-900"
                    >
                        {projectedPoints
                            .filter((p) => p.word === selectedWord)
                            .map((selectedPoint) =>
                                similarWords.slice(0, 3).map((similar) => {
                                    const otherPoint = projectedPoints.find(
                                        (p) => p.word === similar.word
                                    );
                                    if (!otherPoint) return null;

                                    return (
                                        <line
                                            key={`${selectedPoint.word}-${otherPoint.word}`}
                                            x1={selectedPoint.x}
                                            y1={selectedPoint.y}
                                            x2={otherPoint.x}
                                            y2={otherPoint.y}
                                            stroke="#fbbf24"
                                            strokeWidth={similar.similarity * 3}
                                            opacity={similar.similarity}
                                            className={
                                                animating ? "animate-pulse" : ""
                                            }
                                        />
                                    );
                                })
                            )}

                        {projectedPoints.map((point) => {
                            const isSelected = point.word === selectedWord;
                            const radius = isSelected ? 12 : 8;

                            return (
                                <g key={point.word}>
                                    <circle
                                        cx={point.x}
                                        cy={point.y}
                                        r={radius}
                                        fill={point.color}
                                        opacity={isSelected ? 1 : 0.7}
                                        stroke={isSelected ? "#fbbf24" : "none"}
                                        strokeWidth={isSelected ? 3 : 0}
                                        className={`
                      cursor-pointer transition-all duration-300
                      ${animating ? "animate-bounce" : ""}
                      ${isSelected ? "scale-110" : "scale-100"}
                    `}
                                        onClick={() =>
                                            setSelectedWord(point.word)
                                        }
                                    />
                                    <text
                                        x={point.x}
                                        y={point.y - 18}
                                        textAnchor="middle"
                                        fontSize="12"
                                        fill="white"
                                        fontWeight={
                                            isSelected ? "bold" : "normal"
                                        }
                                        className="pointer-events-none"
                                    >
                                        {point.word}
                                    </text>
                                </g>
                            );
                        })}

                        <g transform="translate(10, 10)">
                            <rect
                                x="0"
                                y="0"
                                width="120"
                                height="80"
                                fill="rgba(0,0,0,0.7)"
                                rx="5"
                            />
                            <text
                                x="10"
                                y="20"
                                fontSize="12"
                                fill="white"
                                fontWeight="bold"
                            >
                                Categorías:
                            </text>
                            <circle cx="20" cy="35" r="6" fill="#3b82f6" />
                            <text x="32" y="40" fontSize="10" fill="white">
                                Animales
                            </text>
                            <circle cx="20" cy="50" r="6" fill="#ef4444" />
                            <text x="32" y="55" fontSize="10" fill="white">
                                Vehículos
                            </text>
                            <circle cx="20" cy="65" r="6" fill="#22c55e" />
                            <text x="32" y="70" fontSize="10" fill="white">
                                Comida
                            </text>
                        </g>
                    </svg>

                    <button
                        onClick={animateEmbedding}
                        className="mt-4 bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded transition-colors w-full"
                    >
                        {animating ? "Animando..." : "Animar Relaciones"}
                    </button>
                </div>

                <div className="space-y-4">
                    <div className="bg-gray-800 p-4 rounded-lg">
                        <h4 className="text-lg mb-2">
                            Palabra: "{selectedWord}"
                        </h4>
                        <div className="space-y-2">
                            <div className="flex items-center space-x-2">
                                <div
                                    className="w-4 h-4 rounded"
                                    style={{
                                        backgroundColor:
                                            vocabulary[
                                                selectedWord as keyof typeof vocabulary
                                            ]?.color,
                                    }}
                                />
                                <span className="text-sm">
                                    Categoría:{" "}
                                    {
                                        vocabulary[
                                            selectedWord as keyof typeof vocabulary
                                        ]?.category
                                    }
                                </span>
                            </div>

                            <div className="bg-gray-700 p-3 rounded">
                                <div className="text-sm font-semibold mb-2">
                                    Vector de Embedding:
                                </div>
                                <div className="flex space-x-1">
                                    {vocabulary[
                                        selectedWord as keyof typeof vocabulary
                                    ]?.vector.map((val, idx) => (
                                        <div
                                            key={idx}
                                            className="bg-gray-600 px-2 py-1 rounded text-xs font-mono"
                                            title={`Dimensión ${idx}: ${val}`}
                                        >
                                            {val.toFixed(2)}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gray-800 p-4 rounded-lg">
                        <h4 className="text-lg mb-2">Palabras Similares</h4>
                        <div className="space-y-2">
                            {similarWords.slice(0, 5).map((item, idx) => (
                                <div
                                    key={item.word}
                                    className="flex items-center justify-between bg-gray-700 p-2 rounded cursor-pointer hover:bg-gray-600 transition-colors"
                                    onClick={() => setSelectedWord(item.word)}
                                >
                                    <div className="flex items-center space-x-2">
                                        <div
                                            className="w-3 h-3 rounded"
                                            style={{
                                                backgroundColor: item.color,
                                            }}
                                        />
                                        <span className="text-sm">
                                            {item.word}
                                        </span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <div className="text-xs text-gray-400">
                                            {item.similarity.toFixed(3)}
                                        </div>
                                        <div className="w-16 bg-gray-600 rounded-full h-2">
                                            <div
                                                className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                                                style={{
                                                    width: `${
                                                        item.similarity * 100
                                                    }%`,
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-gray-800 p-4 rounded-lg">
                        <h4 className="text-lg mb-2">
                            ¿Qué son los Embeddings?
                        </h4>
                        <ul className="text-sm text-gray-300 space-y-1">
                            <li>
                                • <strong>Representación densa:</strong>{" "}
                                Vectores de números reales
                            </li>
                            <li>
                                • <strong>Significado capturado:</strong>{" "}
                                Semántica en el espacio vectorial
                            </li>
                            <li>
                                • <strong>Aprendidos:</strong> Se optimizan
                                durante el entrenamiento
                            </li>
                            <li>
                                • <strong>Proximidad:</strong> Palabras
                                similares están cerca
                            </li>
                        </ul>
                    </div>

                    <div className="bg-gray-800 p-4 rounded-lg">
                        <h4 className="text-lg mb-2">Propiedades</h4>
                        <div className="text-sm text-gray-300 space-y-2">
                            <div className="bg-gray-700 p-2 rounded">
                                <strong>Analogías:</strong> Rey - Hombre + Mujer
                                ≈ Reina
                            </div>
                            <div className="bg-gray-700 p-2 rounded">
                                <strong>Clustering:</strong> Palabras similares
                                se agrupan
                            </div>
                            <div className="bg-gray-700 p-2 rounded">
                                <strong>Aritmética:</strong> Operaciones
                                vectoriales tienen significado
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-6 bg-gray-800 p-4 rounded-lg">
                <h4 className="text-lg mb-3">Matriz de Similaridad</h4>
                <div className="overflow-x-auto">
                    <table className="min-w-full text-xs">
                        <thead>
                            <tr>
                                <th className="p-1"></th>
                                {Object.keys(vocabulary).map((word) => (
                                    <th
                                        key={word}
                                        className="p-1 rotate-45 min-w-[40px]"
                                    >
                                        <div className="transform rotate-45 origin-bottom-left w-8">
                                            {word}
                                        </div>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {Object.entries(vocabulary).map(
                                ([word1, data1]) => (
                                    <tr key={word1}>
                                        <td className="p-1 font-semibold text-right min-w-[60px]">
                                            {word1}
                                        </td>
                                        {Object.entries(vocabulary).map(
                                            ([word2, data2]) => {
                                                const similarity =
                                                    word1 === word2
                                                        ? 1
                                                        : cosineSimilarity(
                                                              data1.vector,
                                                              data2.vector
                                                          );
                                                const isSelected =
                                                    word1 === selectedWord ||
                                                    word2 === selectedWord;

                                                return (
                                                    <td
                                                        key={word2}
                                                        className={`
                          p-1 text-center transition-all duration-300
                          ${isSelected ? "ring-1 ring-yellow-400" : ""}
                        `}
                                                        style={{
                                                            backgroundColor: `rgba(59, 130, 246, ${similarity})`,
                                                            color:
                                                                similarity > 0.5
                                                                    ? "white"
                                                                    : "black",
                                                        }}
                                                    >
                                                        {similarity.toFixed(2)}
                                                    </td>
                                                );
                                            }
                                        )}
                                    </tr>
                                )
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
