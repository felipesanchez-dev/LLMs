"use client";
import React, { useState } from "react";

export default function ScalingLaws() {
    const [selectedLaw, setSelectedLaw] = useState("compute");

    const computeData = [
        { compute: 1e15, performance: 0.3 },
        { compute: 1e16, performance: 0.4 },
        { compute: 1e17, performance: 0.52 },
        { compute: 1e18, performance: 0.63 },
        { compute: 1e19, performance: 0.72 },
        { compute: 1e20, performance: 0.79 },
        { compute: 1e21, performance: 0.85 },
    ];

    const parametersData = [
        { params: 1e6, performance: 0.15 },
        { params: 1e7, performance: 0.25 },
        { params: 1e8, performance: 0.38 },
        { params: 1e9, performance: 0.52 },
        { params: 1e10, performance: 0.65 },
        { params: 1e11, performance: 0.75 },
        { params: 1e12, performance: 0.83 },
    ];

    const datasetData = [
        { tokens: 1e9, performance: 0.2 },
        { tokens: 1e10, performance: 0.32 },
        { tokens: 1e11, performance: 0.45 },
        { tokens: 1e12, performance: 0.58 },
        { tokens: 1e13, performance: 0.68 },
        { tokens: 1e14, performance: 0.76 },
        { tokens: 1e15, performance: 0.82 },
    ];

    const modelComparison = [
        { name: "GPT-1", params: 0.12, tokens: 5, compute: 1e15, year: 2018 },
        { name: "GPT-2", params: 1.5, tokens: 40, compute: 1e16, year: 2019 },
        { name: "GPT-3", params: 175, tokens: 300, compute: 1e17, year: 2020 },
        {
            name: "GPT-4",
            params: 1800,
            tokens: 13000,
            compute: 1e18,
            year: 2023,
        },
        {
            name: "Futuro?",
            params: 10000,
            tokens: 50000,
            compute: 1e19,
            year: 2025,
        },
    ];

    const formatNumber = (num: number) => {
        if (num >= 1e12) return `${(num / 1e12).toFixed(1)}T`;
        if (num >= 1e9) return `${(num / 1e9).toFixed(1)}B`;
        if (num >= 1e6) return `${(num / 1e6).toFixed(1)}M`;
        return num.toString();
    };

    const getScalingData = () => {
        switch (selectedLaw) {
            case "compute":
                return computeData;
            case "parameters":
                return parametersData;
            case "data":
                return datasetData;
            default:
                return computeData;
        }
    };

    const getXLabel = () => {
        switch (selectedLaw) {
            case "compute":
                return "Compute (FLOPs)";
            case "parameters":
                return "Parámetros";
            case "data":
                return "Tokens de entrenamiento";
            default:
                return "Compute";
        }
    };

    const currentData = getScalingData();

    return (
        <div className="bg-gray-900 text-white p-6 rounded-xl my-6">
            <h3 className="text-xl font-bold mb-4">Leyes de Escalado</h3>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-gray-800 p-4 rounded-lg">
                    <h4 className="text-lg mb-3">Relaciones de Escalado</h4>

                    <div className="mb-4">
                        <label className="block text-sm mb-2">
                            Ley de escalado:
                        </label>
                        <div className="flex space-x-2">
                            <button
                                onClick={() => setSelectedLaw("compute")}
                                className={`px-3 py-1 rounded text-sm transition-colors ${
                                    selectedLaw === "compute"
                                        ? "bg-blue-600"
                                        : "bg-gray-600 hover:bg-gray-500"
                                }`}
                            >
                                Compute
                            </button>
                            <button
                                onClick={() => setSelectedLaw("parameters")}
                                className={`px-3 py-1 rounded text-sm transition-colors ${
                                    selectedLaw === "parameters"
                                        ? "bg-purple-600"
                                        : "bg-gray-600 hover:bg-gray-500"
                                }`}
                            >
                                Parámetros
                            </button>
                            <button
                                onClick={() => setSelectedLaw("data")}
                                className={`px-3 py-1 rounded text-sm transition-colors ${
                                    selectedLaw === "data"
                                        ? "bg-green-600"
                                        : "bg-gray-600 hover:bg-gray-500"
                                }`}
                            >
                                Datos
                            </button>
                        </div>
                    </div>

                    <div className="mb-4">
                        <h5 className="text-sm font-semibold mb-2">
                            Rendimiento vs {getXLabel()}
                        </h5>
                        <svg
                            width="100%"
                            height="250"
                            className="border border-gray-600 rounded bg-gray-900"
                        >
                            <line
                                x1="40"
                                y1="210"
                                x2="350"
                                y2="210"
                                stroke="#6b7280"
                                strokeWidth="2"
                            />
                            <line
                                x1="40"
                                y1="210"
                                x2="40"
                                y2="30"
                                stroke="#6b7280"
                                strokeWidth="2"
                            />

                            <text
                                x="200"
                                y="240"
                                textAnchor="middle"
                                fontSize="12"
                                fill="white"
                            >
                                {getXLabel()}
                            </text>
                            <text
                                x="20"
                                y="120"
                                textAnchor="middle"
                                fontSize="12"
                                fill="white"
                                transform="rotate(-90 20 120)"
                            >
                                Rendimiento
                            </text>

                            <polyline
                                points={currentData
                                    .map(
                                        (d, i) =>
                                            `${
                                                50 +
                                                (i / (currentData.length - 1)) *
                                                    280
                                            },${210 - d.performance * 160}`
                                    )
                                    .join(" ")}
                                fill="none"
                                stroke="#3b82f6"
                                strokeWidth="3"
                            />

                            {currentData.map((d, i) => (
                                <circle
                                    key={i}
                                    cx={
                                        50 +
                                        (i / (currentData.length - 1)) * 280
                                    }
                                    cy={210 - d.performance * 160}
                                    r="5"
                                    fill="#3b82f6"
                                    stroke="white"
                                    strokeWidth="2"
                                />
                            ))}

                            <path
                                d="M 50 190 Q 200 120 330 60"
                                fill="none"
                                stroke="#ef4444"
                                strokeWidth="2"
                                strokeDasharray="5,5"
                                opacity="0.7"
                            />

                            <text x="250" y="80" fontSize="10" fill="#ef4444">
                                Ley logarítmica
                            </text>
                        </svg>
                    </div>

                    <div className="bg-gray-700 p-3 rounded">
                        <div className="text-sm font-semibold mb-1">
                            Fórmula de Escalado
                        </div>
                        <div className="font-mono text-sm">
                            {selectedLaw === "compute" &&
                                "Performance ∝ Compute^α (α ≈ 0.05-0.1)"}
                            {selectedLaw === "parameters" &&
                                "Performance ∝ Parameters^β (β ≈ 0.07)"}
                            {selectedLaw === "data" &&
                                "Performance ∝ Data^γ (γ ≈ 0.04)"}
                        </div>
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="bg-gray-800 p-4 rounded-lg">
                        <h4 className="text-lg mb-2">Principios de Escalado</h4>
                        <ul className="text-sm text-gray-300 space-y-2">
                            <li>
                                • <strong>Rendimientos decrecientes:</strong>{" "}
                                Cada 10x mejora es menor
                            </li>
                            <li>
                                • <strong>Predictibilidad:</strong> Las leyes
                                son sorprendentemente consistentes
                            </li>
                            <li>
                                • <strong>Emergencia:</strong> Nuevas
                                capacidades aparecen súbitamente
                            </li>
                            <li>
                                • <strong>Transferencia:</strong> Las leyes se
                                generalizan entre dominios
                            </li>
                        </ul>
                    </div>

                    <div className="bg-gray-800 p-4 rounded-lg">
                        <h4 className="text-lg mb-2">Factores Clave</h4>
                        <div className="space-y-3">
                            <div
                                className={`p-3 rounded-lg border-l-4 ${
                                    selectedLaw === "compute"
                                        ? "bg-blue-900 border-blue-400"
                                        : "bg-gray-700 border-gray-500"
                                }`}
                            >
                                <div className="font-semibold">Compute (C)</div>
                                <div className="text-sm text-gray-300">
                                    FLOPs utilizados durante el entrenamiento.
                                    Factor más predecible.
                                </div>
                            </div>

                            <div
                                className={`p-3 rounded-lg border-l-4 ${
                                    selectedLaw === "parameters"
                                        ? "bg-purple-900 border-purple-400"
                                        : "bg-gray-700 border-gray-500"
                                }`}
                            >
                                <div className="font-semibold">
                                    Parámetros (N)
                                </div>
                                <div className="text-sm text-gray-300">
                                    Número de pesos en el modelo. Determina la
                                    capacidad.
                                </div>
                            </div>

                            <div
                                className={`p-3 rounded-lg border-l-4 ${
                                    selectedLaw === "data"
                                        ? "bg-green-900 border-green-400"
                                        : "bg-gray-700 border-gray-500"
                                }`}
                            >
                                <div className="font-semibold">Datos (D)</div>
                                <div className="text-sm text-gray-300">
                                    Tokens de entrenamiento. Calidad importa más
                                    que cantidad.
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gray-800 p-4 rounded-lg">
                        <h4 className="text-lg mb-2">Implicaciones</h4>
                        <div className="space-y-2 text-sm text-gray-300">
                            <div className="bg-gray-700 p-2 rounded">
                                <strong>Costo exponencial:</strong> Cada mejora
                                cuesta ~10x más
                            </div>
                            <div className="bg-gray-700 p-2 rounded">
                                <strong>Planificación:</strong> Permite predecir
                                recursos necesarios
                            </div>
                            <div className="bg-gray-700 p-2 rounded">
                                <strong>Límites físicos:</strong> Eventualmente
                                encontraremos límites
                            </div>
                            <div className="bg-gray-700 p-2 rounded">
                                <strong>Eficiencia:</strong> Importancia de
                                optimizaciones
                            </div>
                        </div>
                    </div>

                    <div className="bg-gray-800 p-4 rounded-lg">
                        <h4 className="text-lg mb-2">
                            Ley Óptima de Chinchilla
                        </h4>
                        <div className="text-sm text-gray-300 space-y-2">
                            <div>Para un presupuesto fijo de compute:</div>
                            <div className="bg-gray-700 p-2 rounded font-mono text-center">
                                N ∝ C^(1/3), D ∝ C^(2/3)
                            </div>
                            <div>
                                Los datos deben escalar más rápido que los
                                parámetros.
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-6 bg-gray-800 p-4 rounded-lg">
                <h4 className="text-lg mb-3">Evolución de los LLMs</h4>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-gray-600">
                                <th className="text-left p-2">Modelo</th>
                                <th className="text-left p-2">Año</th>
                                <th className="text-left p-2">Parámetros</th>
                                <th className="text-left p-2">Tokens</th>
                                <th className="text-left p-2">Compute</th>
                                <th className="text-left p-2">Escala</th>
                            </tr>
                        </thead>
                        <tbody>
                            {modelComparison.map((model, idx) => (
                                <tr
                                    key={model.name}
                                    className="border-b border-gray-700"
                                >
                                    <td className="p-2 font-semibold">
                                        {model.name}
                                    </td>
                                    <td className="p-2">{model.year}</td>
                                    <td className="p-2">
                                        {formatNumber(model.params * 1e9)}
                                    </td>
                                    <td className="p-2">
                                        {formatNumber(model.tokens * 1e9)}
                                    </td>
                                    <td className="p-2">
                                        {formatNumber(model.compute)}
                                    </td>
                                    <td className="p-2">
                                        <div className="flex space-x-1">
                                            <div
                                                className="h-4 bg-blue-500 rounded"
                                                style={{
                                                    width: `${
                                                        Math.log10(
                                                            model.params
                                                        ) * 8
                                                    }px`,
                                                }}
                                                title="Parámetros"
                                            />
                                            <div
                                                className="h-4 bg-green-500 rounded"
                                                style={{
                                                    width: `${
                                                        Math.log10(
                                                            model.tokens
                                                        ) * 4
                                                    }px`,
                                                }}
                                                title="Datos"
                                            />
                                            <div
                                                className="h-4 bg-purple-500 rounded"
                                                style={{
                                                    width: `${
                                                        (Math.log10(
                                                            model.compute
                                                        ) -
                                                            15) *
                                                        2
                                                    }px`,
                                                }}
                                                title="Compute"
                                            />
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="mt-3 flex space-x-4 text-xs">
                    <div className="flex items-center space-x-1">
                        <div className="w-3 h-3 bg-blue-500 rounded"></div>
                        <span>Parámetros</span>
                    </div>
                    <div className="flex items-center space-x-1">
                        <div className="w-3 h-3 bg-green-500 rounded"></div>
                        <span>Datos</span>
                    </div>
                    <div className="flex items-center space-x-1">
                        <div className="w-3 h-3 bg-purple-500 rounded"></div>
                        <span>Compute</span>
                    </div>
                </div>
            </div>

            <div className="mt-6 bg-gray-800 p-4 rounded-lg">
                <h4 className="text-lg mb-3">Predicciones y Límites</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-gray-700 p-3 rounded">
                        <div className="text-yellow-400 font-semibold mb-2">
                            Desafíos Técnicos
                        </div>
                        <ul className="text-xs text-gray-300 space-y-1">
                            <li>• Memoria y ancho de banda</li>
                            <li>• Comunicación entre GPUs</li>
                            <li>• Estabilidad numérica</li>
                            <li>• Consumo energético</li>
                        </ul>
                    </div>

                    <div className="bg-gray-700 p-3 rounded">
                        <div className="text-red-400 font-semibold mb-2">
                            Límites Físicos
                        </div>
                        <ul className="text-xs text-gray-300 space-y-1">
                            <li>• Disponibilidad de datos</li>
                            <li>• Costos económicos</li>
                            <li>• Límites cuánticos</li>
                            <li>• Velocidad de la luz</li>
                        </ul>
                    </div>

                    <div className="bg-gray-700 p-3 rounded">
                        <div className="text-green-400 font-semibold mb-2">
                            Optimizaciones
                        </div>
                        <ul className="text-xs text-gray-300 space-y-1">
                            <li>• Arquitecturas sparse</li>
                            <li>• Mixture of Experts</li>
                            <li>• Mejor hardware</li>
                            <li>• Algoritmos eficientes</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
