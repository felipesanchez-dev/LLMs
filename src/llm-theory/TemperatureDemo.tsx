"use client";
import React, { useState } from "react";

export default function TemperatureDemo() {
    const [temperature, setTemperature] = useState(1.0);
    const [context, setContext] = useState("El cielo es");

    const vocabulary = [
        "azul",
        "gris",
        "claro",
        "nublado",
        "hermoso",
        "oscuro",
        "brillante",
    ];
    const logits = [2.1, 0.8, 1.5, 0.3, 1.2, 0.1, 0.9];

    const softmax = (logits: number[], temp: number) => {
        const scaledLogits = logits.map((l) => l / temp);
        const maxLogit = Math.max(...scaledLogits);
        const expValues = scaledLogits.map((l) => Math.exp(l - maxLogit));
        const sumExp = expValues.reduce((sum, val) => sum + val, 0);
        return expValues.map((val) => val / sumExp);
    };

    const probabilities = softmax(logits, temperature);

    const sampleNextToken = () => {
        const rand = Math.random();
        let cumSum = 0;
        for (let i = 0; i < probabilities.length; i++) {
            cumSum += probabilities[i];
            if (rand <= cumSum) {
                return vocabulary[i];
            }
        }
        return vocabulary[vocabulary.length - 1];
    };

    const [generatedTokens, setGeneratedTokens] = useState<string[]>([]);

    const generateText = () => {
        const newTokens = [];
        for (let i = 0; i < 5; i++) {
            newTokens.push(sampleNextToken());
        }
        setGeneratedTokens(newTokens);
    };

    const getBarColor = (prob: number) => {
        if (prob > 0.3) return "#22c55e";
        if (prob > 0.15) return "#f59e0b";
        return "#ef4444";
    };

    return (
        <div className="bg-gray-900 text-white p-6 rounded-xl my-6">
            <h3 className="text-xl font-bold mb-4">Temperature y Sampling</h3>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-gray-800 p-4 rounded-lg">
                    <h4 className="text-lg mb-3">Control de Temperature</h4>

                    <div className="mb-4">
                        <label className="block text-sm mb-2">Contexto:</label>
                        <input
                            type="text"
                            value={context}
                            onChange={(e) => setContext(e.target.value)}
                            className="w-full bg-gray-700 text-white p-2 rounded"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm mb-2">
                            Temperature: {temperature.toFixed(2)}
                        </label>
                        <input
                            type="range"
                            min="0.1"
                            max="2.0"
                            step="0.1"
                            value={temperature}
                            onChange={(e) =>
                                setTemperature(parseFloat(e.target.value))
                            }
                            className="w-full"
                        />
                        <div className="flex justify-between text-xs text-gray-400 mt-1">
                            <span>Determinístico</span>
                            <span>Creativo</span>
                        </div>
                    </div>

                    <div className="mb-4">
                        <h5 className="text-sm font-semibold mb-2">
                            Distribución de Probabilidades
                        </h5>
                        <div className="space-y-2">
                            {vocabulary.map((word, idx) => (
                                <div
                                    key={word}
                                    className="flex items-center space-x-2"
                                >
                                    <div className="w-16 text-sm">{word}:</div>
                                    <div className="flex-1 bg-gray-700 rounded-full h-4 relative">
                                        <div
                                            className="rounded-full h-4 transition-all duration-300"
                                            style={{
                                                width: `${
                                                    probabilities[idx] * 100
                                                }%`,
                                                backgroundColor: getBarColor(
                                                    probabilities[idx]
                                                ),
                                            }}
                                        />
                                    </div>
                                    <div className="w-12 text-xs text-gray-400">
                                        {(probabilities[idx] * 100).toFixed(1)}%
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <button
                        onClick={generateText}
                        className="w-full bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded transition-colors"
                    >
                        Generar Texto
                    </button>

                    {generatedTokens.length > 0 && (
                        <div className="mt-4 p-3 bg-gray-700 rounded">
                            <div className="text-sm font-semibold mb-2">
                                Texto Generado:
                            </div>
                            <div className="text-lg">
                                <span className="text-gray-400">
                                    {context}{" "}
                                </span>
                                {generatedTokens.map((token, idx) => (
                                    <span key={idx} className="text-white">
                                        {token}{" "}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                <div className="space-y-4">
                    <div className="bg-gray-800 p-4 rounded-lg">
                        <h4 className="text-lg mb-2">
                            Efectos del Temperature
                        </h4>
                        <div className="space-y-3">
                            <div
                                className={`p-3 rounded-lg border-l-4 ${
                                    temperature < 0.5
                                        ? "bg-blue-900 border-blue-400"
                                        : "bg-gray-700 border-gray-500"
                                }`}
                            >
                                <div className="font-semibold">
                                    Bajo (0.1-0.5)
                                </div>
                                <div className="text-sm text-gray-300">
                                    • Muy determinístico
                                    <br />
                                    • Siempre elige la opción más probable
                                    <br />• Repetitivo pero coherente
                                </div>
                            </div>

                            <div
                                className={`p-3 rounded-lg border-l-4 ${
                                    temperature >= 0.5 && temperature <= 1.2
                                        ? "bg-green-900 border-green-400"
                                        : "bg-gray-700 border-gray-500"
                                }`}
                            >
                                <div className="font-semibold">
                                    Medio (0.5-1.2)
                                </div>
                                <div className="text-sm text-gray-300">
                                    • Balance creatividad/coherencia
                                    <br />
                                    • Buena diversidad
                                    <br />• Recomendado para la mayoría de casos
                                </div>
                            </div>

                            <div
                                className={`p-3 rounded-lg border-l-4 ${
                                    temperature > 1.2
                                        ? "bg-red-900 border-red-400"
                                        : "bg-gray-700 border-gray-500"
                                }`}
                            >
                                <div className="font-semibold">Alto (1.2+)</div>
                                <div className="text-sm text-gray-300">
                                    • Muy creativo/aleatorio
                                    <br />
                                    • Puede perder coherencia
                                    <br />• Útil para brainstorming
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gray-800 p-4 rounded-lg">
                        <h4 className="text-lg mb-2">Comparación Visual</h4>
                        <div className="grid grid-cols-3 gap-2 text-xs">
                            <div className="text-center">
                                <div className="font-semibold">T = 0.1</div>
                                <svg
                                    width="100%"
                                    height="60"
                                    className="border border-gray-600 rounded"
                                >
                                    {softmax(logits, 0.1).map((prob, idx) => (
                                        <rect
                                            key={idx}
                                            x={idx * 15 + 5}
                                            y={55 - prob * 50}
                                            width="12"
                                            height={prob * 50}
                                            fill="#3b82f6"
                                        />
                                    ))}
                                </svg>
                            </div>

                            <div className="text-center">
                                <div className="font-semibold">T = 1.0</div>
                                <svg
                                    width="100%"
                                    height="60"
                                    className="border border-gray-600 rounded"
                                >
                                    {softmax(logits, 1.0).map((prob, idx) => (
                                        <rect
                                            key={idx}
                                            x={idx * 15 + 5}
                                            y={55 - prob * 50}
                                            width="12"
                                            height={prob * 50}
                                            fill="#22c55e"
                                        />
                                    ))}
                                </svg>
                            </div>

                            <div className="text-center">
                                <div className="font-semibold">T = 2.0</div>
                                <svg
                                    width="100%"
                                    height="60"
                                    className="border border-gray-600 rounded"
                                >
                                    {softmax(logits, 2.0).map((prob, idx) => (
                                        <rect
                                            key={idx}
                                            x={idx * 15 + 5}
                                            y={55 - prob * 50}
                                            width="12"
                                            height={prob * 50}
                                            fill="#ef4444"
                                        />
                                    ))}
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gray-800 p-4 rounded-lg">
                        <h4 className="text-lg mb-2">
                            Estrategias de Sampling
                        </h4>
                        <div className="space-y-2 text-sm">
                            <div className="bg-gray-700 p-2 rounded">
                                <strong>Greedy:</strong> Siempre el token más
                                probable
                            </div>
                            <div className="bg-gray-700 p-2 rounded">
                                <strong>Temperature:</strong> Escala las
                                probabilidades
                            </div>
                            <div className="bg-gray-700 p-2 rounded">
                                <strong>Top-k:</strong> Solo considera los k
                                tokens más probables
                            </div>
                            <div className="bg-gray-700 p-2 rounded">
                                <strong>Top-p:</strong> Suma probabilidades
                                hasta p%
                            </div>
                        </div>
                    </div>

                    <div className="bg-gray-800 p-4 rounded-lg">
                        <h4 className="text-lg mb-2">Fórmula Matemática</h4>
                        <div className="bg-gray-700 p-3 rounded font-mono text-sm text-center">
                            <div className="mb-2">
                                P(token_i) = exp(logit_i / T) / Σ exp(logit_j /
                                T)
                            </div>
                            <div className="text-xs text-gray-400">
                                T → 0: P concentrada en máximo
                                <br />T → ∞: P uniforme
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-6 bg-gray-800 p-4 rounded-lg">
                <h4 className="text-lg mb-3">Simulación en Tiempo Real</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <div className="text-sm font-semibold mb-2">
                            Logits Originales
                        </div>
                        <div className="flex space-x-1">
                            {logits.map((logit, idx) => (
                                <div
                                    key={idx}
                                    className="flex-1 bg-gray-600 rounded text-center p-2"
                                    title={vocabulary[idx]}
                                >
                                    <div className="text-xs">
                                        {vocabulary[idx]}
                                    </div>
                                    <div className="text-sm font-mono">
                                        {logit.toFixed(1)}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div>
                        <div className="text-sm font-semibold mb-2">
                            Después de Temperature
                        </div>
                        <div className="flex space-x-1">
                            {logits.map((logit, idx) => (
                                <div
                                    key={idx}
                                    className="flex-1 rounded text-center p-2"
                                    style={{
                                        backgroundColor: getBarColor(
                                            probabilities[idx]
                                        ),
                                    }}
                                    title={vocabulary[idx]}
                                >
                                    <div className="text-xs">
                                        {vocabulary[idx]}
                                    </div>
                                    <div className="text-sm font-mono">
                                        {(logit / temperature).toFixed(1)}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
