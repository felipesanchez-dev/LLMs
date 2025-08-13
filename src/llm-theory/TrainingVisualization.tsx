"use client";
import React, { useState, useEffect } from "react";

export default function TrainingVisualization() {
    const [epoch, setEpoch] = useState(0);
    const [isTraining, setIsTraining] = useState(false);
    const [trainingData, setTrainingData] = useState<
        Array<{ epoch: number; loss: number; accuracy: number }>
    >([]);

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isTraining) {
            interval = setInterval(() => {
                setEpoch((prev) => {
                    const newEpoch = prev + 1;
                    const loss = Math.max(
                        0.01,
                        2 * Math.exp(-0.1 * newEpoch) + Math.random() * 0.1
                    );
                    const accuracy = Math.min(
                        0.99,
                        1 - Math.exp(-0.05 * newEpoch) + Math.random() * 0.02
                    );

                    setTrainingData((data) => [
                        ...data.slice(-19),
                        { epoch: newEpoch, loss, accuracy },
                    ]);

                    if (newEpoch >= 100) {
                        setIsTraining(false);
                        return newEpoch;
                    }
                    return newEpoch;
                });
            }, 100);
        }
        return () => clearInterval(interval);
    }, [isTraining]);

    const startTraining = () => {
        setIsTraining(true);
        setEpoch(0);
        setTrainingData([]);
    };

    const stopTraining = () => {
        setIsTraining(false);
    };

    const resetTraining = () => {
        setIsTraining(false);
        setEpoch(0);
        setTrainingData([]);
    };

    return (
        <div className="bg-gray-900 text-white p-6 rounded-xl my-6">
            <h3 className="text-xl font-bold mb-4">
                Visualización de Entrenamiento
            </h3>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-gray-800 p-4 rounded-lg">
                    <h4 className="text-lg mb-3">Métricas de Entrenamiento</h4>

                    <div className="mb-4">
                        <div className="flex space-x-2 mb-4">
                            <button
                                onClick={startTraining}
                                disabled={isTraining}
                                className="bg-green-600 hover:bg-green-700 disabled:bg-gray-600 px-4 py-2 rounded transition-colors"
                            >
                                {isTraining ? "Entrenando..." : "Iniciar"}
                            </button>
                            <button
                                onClick={stopTraining}
                                disabled={!isTraining}
                                className="bg-red-600 hover:bg-red-700 disabled:bg-gray-600 px-4 py-2 rounded transition-colors"
                            >
                                Pausar
                            </button>
                            <button
                                onClick={resetTraining}
                                className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded transition-colors"
                            >
                                Reset
                            </button>
                        </div>

                        <div className="grid grid-cols-3 gap-4 mb-4">
                            <div className="bg-gray-700 p-3 rounded text-center">
                                <div className="text-2xl font-bold text-blue-400">
                                    {epoch}
                                </div>
                                <div className="text-sm text-gray-400">
                                    Época
                                </div>
                            </div>
                            <div className="bg-gray-700 p-3 rounded text-center">
                                <div className="text-2xl font-bold text-red-400">
                                    {trainingData.length > 0
                                        ? trainingData[
                                              trainingData.length - 1
                                          ].loss.toFixed(3)
                                        : "-.---"}
                                </div>
                                <div className="text-sm text-gray-400">
                                    Loss
                                </div>
                            </div>
                            <div className="bg-gray-700 p-3 rounded text-center">
                                <div className="text-2xl font-bold text-green-400">
                                    {trainingData.length > 0
                                        ? (
                                              trainingData[
                                                  trainingData.length - 1
                                              ].accuracy * 100
                                          ).toFixed(1) + "%"
                                        : "-.--%"}
                                </div>
                                <div className="text-sm text-gray-400">
                                    Precisión
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mb-4">
                        <h5 className="text-sm font-semibold mb-2">
                            Pérdida (Loss)
                        </h5>
                        <svg
                            width="100%"
                            height="120"
                            className="border border-gray-600 rounded bg-gray-900"
                        >
                            {trainingData.length > 1 && (
                                <polyline
                                    points={trainingData
                                        .map(
                                            (d, i) =>
                                                `${
                                                    (i /
                                                        Math.max(
                                                            trainingData.length -
                                                                1,
                                                            1
                                                        )) *
                                                        280 +
                                                    10
                                                },${110 - d.loss * 50}`
                                        )
                                        .join(" ")}
                                    fill="none"
                                    stroke="#ef4444"
                                    strokeWidth="2"
                                />
                            )}
                            <line
                                x1="10"
                                y1="110"
                                x2="290"
                                y2="110"
                                stroke="#374151"
                                strokeWidth="1"
                            />
                            <line
                                x1="10"
                                y1="10"
                                x2="10"
                                y2="110"
                                stroke="#374151"
                                strokeWidth="1"
                            />
                        </svg>
                    </div>

                    <div>
                        <h5 className="text-sm font-semibold mb-2">
                            Precisión (Accuracy)
                        </h5>
                        <svg
                            width="100%"
                            height="120"
                            className="border border-gray-600 rounded bg-gray-900"
                        >
                            {trainingData.length > 1 && (
                                <polyline
                                    points={trainingData
                                        .map(
                                            (d, i) =>
                                                `${
                                                    (i /
                                                        Math.max(
                                                            trainingData.length -
                                                                1,
                                                            1
                                                        )) *
                                                        280 +
                                                    10
                                                },${110 - d.accuracy * 100}`
                                        )
                                        .join(" ")}
                                    fill="none"
                                    stroke="#22c55e"
                                    strokeWidth="2"
                                />
                            )}
                            <line
                                x1="10"
                                y1="110"
                                x2="290"
                                y2="110"
                                stroke="#374151"
                                strokeWidth="1"
                            />
                            <line
                                x1="10"
                                y1="10"
                                x2="10"
                                y2="110"
                                stroke="#374151"
                                strokeWidth="1"
                            />
                        </svg>
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="bg-gray-800 p-4 rounded-lg">
                        <h4 className="text-lg mb-2">
                            Proceso de Entrenamiento
                        </h4>
                        <div className="space-y-3">
                            <div
                                className={`p-3 rounded-lg border-l-4 ${
                                    epoch >= 1
                                        ? "bg-blue-900 border-blue-400"
                                        : "bg-gray-700 border-gray-500"
                                }`}
                            >
                                <div className="font-semibold">
                                    1. Forward Pass
                                </div>
                                <div className="text-sm text-gray-300">
                                    El modelo procesa un batch de datos
                                </div>
                            </div>

                            <div
                                className={`p-3 rounded-lg border-l-4 ${
                                    epoch >= 1
                                        ? "bg-red-900 border-red-400"
                                        : "bg-gray-700 border-gray-500"
                                }`}
                            >
                                <div className="font-semibold">
                                    2. Calcular Loss
                                </div>
                                <div className="text-sm text-gray-300">
                                    Comparar predicciones con etiquetas reales
                                </div>
                            </div>

                            <div
                                className={`p-3 rounded-lg border-l-4 ${
                                    epoch >= 1
                                        ? "bg-purple-900 border-purple-400"
                                        : "bg-gray-700 border-gray-500"
                                }`}
                            >
                                <div className="font-semibold">
                                    3. Backward Pass
                                </div>
                                <div className="text-sm text-gray-300">
                                    Calcular gradientes via backpropagation
                                </div>
                            </div>

                            <div
                                className={`p-3 rounded-lg border-l-4 ${
                                    epoch >= 1
                                        ? "bg-green-900 border-green-400"
                                        : "bg-gray-700 border-gray-500"
                                }`}
                            >
                                <div className="font-semibold">
                                    4. Actualizar Pesos
                                </div>
                                <div className="text-sm text-gray-300">
                                    Optimizador ajusta parámetros
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gray-800 p-4 rounded-lg">
                        <h4 className="text-lg mb-2">Hiperparámetros</h4>
                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                                <span>Learning Rate:</span>
                                <span className="font-mono">0.001</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Batch Size:</span>
                                <span className="font-mono">32</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Optimizer:</span>
                                <span className="font-mono">Adam</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Weight Decay:</span>
                                <span className="font-mono">0.01</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gray-800 p-4 rounded-lg">
                        <h4 className="text-lg mb-2">
                            Fases del Entrenamiento
                        </h4>
                        <div className="space-y-2 text-sm">
                            <div
                                className={`p-2 rounded ${
                                    epoch < 20 ? "bg-blue-800" : "bg-gray-700"
                                }`}
                            >
                                <strong>Fase Inicial (0-20):</strong>{" "}
                                Aprendizaje rápido, loss alto
                            </div>
                            <div
                                className={`p-2 rounded ${
                                    epoch >= 20 && epoch < 50
                                        ? "bg-purple-800"
                                        : "bg-gray-700"
                                }`}
                            >
                                <strong>Convergencia (20-50):</strong> Mejora
                                gradual
                            </div>
                            <div
                                className={`p-2 rounded ${
                                    epoch >= 50 && epoch < 80
                                        ? "bg-green-800"
                                        : "bg-gray-700"
                                }`}
                            >
                                <strong>Refinamiento (50-80):</strong> Ajustes
                                finos
                            </div>
                            <div
                                className={`p-2 rounded ${
                                    epoch >= 80
                                        ? "bg-yellow-800"
                                        : "bg-gray-700"
                                }`}
                            >
                                <strong>Saturación (80+):</strong> Mejoras
                                mínimas
                            </div>
                        </div>
                    </div>

                    <div className="bg-gray-800 p-4 rounded-lg">
                        <h4 className="text-lg mb-2">Problemas Comunes</h4>
                        <ul className="text-sm text-gray-300 space-y-1">
                            <li>
                                • <strong>Overfitting:</strong> Loss de
                                entrenamiento ≪ validación
                            </li>
                            <li>
                                • <strong>Underfitting:</strong> Loss alto en
                                ambos conjuntos
                            </li>
                            <li>
                                • <strong>Exploding gradients:</strong> Loss
                                oscila violentamente
                            </li>
                            <li>
                                • <strong>Vanishing gradients:</strong>{" "}
                                Aprendizaje muy lento
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {isTraining && (
                <div className="mt-6 bg-gray-800 p-4 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-semibold">
                            Progreso del Entrenamiento
                        </span>
                        <span className="text-sm text-gray-400">
                            {epoch}/100 épocas
                        </span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-3">
                        <div
                            className="bg-gradient-to-r from-blue-500 to-green-500 h-3 rounded-full transition-all duration-100"
                            style={{ width: `${(epoch / 100) * 100}%` }}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}
