"use client";
import React, { useState } from "react";

export default function BeamSearchDemo() {
    const [beamWidth, setBeamWidth] = useState(3);
    const [step, setStep] = useState(0);

    const vocabulary = [
        "el",
        "gato",
        "perro",
        "está",
        "come",
        "duerme",
        "en",
        "la",
        "casa",
        "parque",
    ];

    const stepProbabilities = [
        { gato: 0.4, perro: 0.3, niño: 0.2, hombre: 0.1 },
        {
            "gato está": 0.3,
            "gato come": 0.4,
            "gato duerme": 0.3,
            "perro está": 0.2,
            "perro come": 0.3,
            "perro duerme": 0.5,
            "niño está": 0.6,
            "niño come": 0.3,
            "niño duerme": 0.1,
        },
        {
            "gato está feliz": 0.5,
            "gato está triste": 0.3,
            "gato está dormido": 0.2,
            "gato come pescado": 0.6,
            "gato come carne": 0.4,
            "perro duerme mucho": 0.7,
            "perro duerme poco": 0.3,
            "niño está jugando": 0.8,
            "niño está estudiando": 0.2,
        },
    ];

    const [beams, setBeams] = useState([
        { sequence: "El", score: 0.0, probability: 1.0 },
    ]);

    const nextStep = () => {
        if (step < stepProbabilities.length) {
            const newCandidates: Array<{
                sequence: string;
                score: number;
                probability: number;
            }> = [];

            beams.forEach((beam) => {
                const relevantProbs = Object.entries(
                    stepProbabilities[step]
                ).filter(([seq]) =>
                    seq.startsWith(beam.sequence.split(" ").slice(1).join(" "))
                );

                relevantProbs.slice(0, 5).forEach(([continuation, prob]) => {
                    const newSequence =
                        beam.sequence +
                        " " +
                        continuation.split(" ").slice(-1)[0];
                    const newScore = beam.score + Math.log(prob);
                    newCandidates.push({
                        sequence: newSequence,
                        score: newScore,
                        probability: prob,
                    });
                });
            });

            const sortedCandidates = newCandidates
                .sort((a, b) => b.score - a.score)
                .slice(0, beamWidth);

            setBeams(sortedCandidates);
            setStep(step + 1);
        }
    };

    const resetDemo = () => {
        setStep(0);
        setBeams([{ sequence: "El", score: 0.0, probability: 1.0 }]);
    };

    const getBeamColor = (index: number) => {
        const colors = ["#3b82f6", "#8b5cf6", "#10b981", "#f59e0b", "#ef4444"];
        return colors[index % colors.length];
    };

    return (
        <div className="bg-gray-900 text-white p-6 rounded-xl my-6">
            <h3 className="text-xl font-bold mb-4">🔍 Beam Search</h3>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-gray-800 p-4 rounded-lg">
                    <h4 className="text-lg mb-3">Búsqueda por Haces</h4>

                    <div className="mb-4">
                        <label className="block text-sm mb-2">
                            Ancho del Haz (Beam Width): {beamWidth}
                        </label>
                        <input
                            type="range"
                            min="1"
                            max="5"
                            value={beamWidth}
                            onChange={(e) =>
                                setBeamWidth(parseInt(e.target.value))
                            }
                            className="w-full"
                        />
                    </div>

                    <div className="flex space-x-2 mb-4">
                        <button
                            onClick={nextStep}
                            disabled={step >= stepProbabilities.length}
                            className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 px-4 py-2 rounded transition-colors"
                        >
                            Siguiente Paso
                        </button>
                        <button
                            onClick={resetDemo}
                            className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded transition-colors"
                        >
                            Reiniciar
                        </button>
                    </div>

                    <div className="space-y-3">
                        <h5 className="text-sm font-semibold">
                            Paso {step}: Candidatos Actuales
                        </h5>
                        {beams.map((beam, index) => (
                            <div
                                key={index}
                                className="p-3 rounded-lg border-l-4"
                                style={{
                                    backgroundColor: "rgba(55, 65, 81, 0.8)",
                                    borderLeftColor: getBeamColor(index),
                                }}
                            >
                                <div className="flex justify-between items-center">
                                    <div className="text-lg font-mono">
                                        {beam.sequence}
                                    </div>
                                    <div className="text-sm text-gray-400">
                                        Score: {beam.score.toFixed(3)}
                                    </div>
                                </div>
                                <div className="mt-1">
                                    <div className="flex items-center space-x-2">
                                        <div className="text-xs text-gray-400">
                                            Probabilidad:
                                        </div>
                                        <div className="flex-1 bg-gray-700 rounded-full h-2">
                                            <div
                                                className="h-2 rounded-full transition-all duration-300"
                                                style={{
                                                    width: `${Math.min(
                                                        beam.probability * 100,
                                                        100
                                                    )}%`,
                                                    backgroundColor:
                                                        getBeamColor(index),
                                                }}
                                            />
                                        </div>
                                        <div className="text-xs text-gray-400">
                                            {(beam.probability * 100).toFixed(
                                                1
                                            )}
                                            %
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-6">
                        <h5 className="text-sm font-semibold mb-2">
                            Árbol de Búsqueda
                        </h5>
                        <svg
                            width="100%"
                            height="200"
                            className="border border-gray-600 rounded bg-gray-900"
                        >
                            <circle cx="150" cy="30" r="15" fill="#3b82f6" />
                            <text
                                x="150"
                                y="35"
                                textAnchor="middle"
                                fontSize="10"
                                fill="white"
                            >
                                El
                            </text>

                            {step >= 1 &&
                                beams.slice(0, 3).map((beam, idx) => {
                                    const x = 50 + idx * 100;
                                    const y = 80;
                                    return (
                                        <g key={idx}>
                                            <line
                                                x1="150"
                                                y1="45"
                                                x2={x}
                                                y2={y - 15}
                                                stroke={getBeamColor(idx)}
                                                strokeWidth="2"
                                            />
                                            <circle
                                                cx={x}
                                                cy={y}
                                                r="12"
                                                fill={getBeamColor(idx)}
                                            />
                                            <text
                                                x={x}
                                                y={y + 4}
                                                textAnchor="middle"
                                                fontSize="8"
                                                fill="white"
                                            >
                                                {
                                                    beam.sequence
                                                        .split(" ")
                                                        .slice(-1)[0]
                                                }
                                            </text>
                                        </g>
                                    );
                                })}

                            {step >= 2 &&
                                beams.slice(0, beamWidth).map((beam, idx) => {
                                    const x = 30 + idx * 80;
                                    const y = 130;
                                    const parentX = 50 + (idx % 3) * 100;
                                    return (
                                        <g key={idx}>
                                            <line
                                                x1={parentX}
                                                y1="92"
                                                x2={x}
                                                y2={y - 12}
                                                stroke={getBeamColor(idx)}
                                                strokeWidth="1"
                                                strokeDasharray="3,3"
                                            />
                                            <circle
                                                cx={x}
                                                cy={y}
                                                r="10"
                                                fill={getBeamColor(idx)}
                                            />
                                            <text
                                                x={x}
                                                y={y + 3}
                                                textAnchor="middle"
                                                fontSize="7"
                                                fill="white"
                                            >
                                                {
                                                    beam.sequence
                                                        .split(" ")
                                                        .slice(-1)[0]
                                                }
                                            </text>
                                        </g>
                                    );
                                })}
                        </svg>
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="bg-gray-800 p-4 rounded-lg">
                        <h4 className="text-lg mb-2">¿Qué es Beam Search?</h4>
                        <ul className="text-sm text-gray-300 space-y-2">
                            <li>
                                • <strong>Búsqueda heurística:</strong> Explora
                                múltiples caminos simultáneamente
                            </li>
                            <li>
                                • <strong>Beam width:</strong> Número de
                                candidatos que mantiene
                            </li>
                            <li>
                                • <strong>Compromiso:</strong> Entre búsqueda
                                exhaustiva y greedy
                            </li>
                            <li>
                                • <strong>Pruning:</strong> Descarta candidatos
                                menos prometedores
                            </li>
                        </ul>
                    </div>

                    <div className="bg-gray-800 p-4 rounded-lg">
                        <h4 className="text-lg mb-2">
                            Ventajas vs Desventajas
                        </h4>
                        <div className="grid grid-cols-2 gap-3 text-sm">
                            <div>
                                <div className="font-semibold text-green-400 mb-1">
                                    Ventajas
                                </div>
                                <ul className="text-gray-300 space-y-1">
                                    <li>• Mejor que greedy</li>
                                    <li>• Más eficiente que exhaustivo</li>
                                    <li>• Controla diversidad</li>
                                    <li>• Determinístico</li>
                                </ul>
                            </div>
                            <div>
                                <div className="font-semibold text-red-400 mb-1">
                                    ❌ Desventajas
                                </div>
                                <ul className="text-gray-300 space-y-1">
                                    <li>• No garantiza óptimo global</li>
                                    <li>• Puede repetir patrones</li>
                                    <li>• Consume más memoria</li>
                                    <li>• Sesgado hacia longitud</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gray-800 p-4 rounded-lg">
                        <h4 className="text-lg mb-2">Comparación de Métodos</h4>
                        <div className="space-y-3">
                            <div className="grid grid-cols-3 gap-2 text-xs">
                                <div className="bg-gray-700 p-2 rounded text-center">
                                    <div className="font-semibold">Greedy</div>
                                    <div>Beam = 1</div>
                                    <div className="text-green-400">Rápido</div>
                                    <div className="text-red-400">Limitado</div>
                                </div>
                                <div className="bg-gray-700 p-2 rounded text-center">
                                    <div className="font-semibold">
                                        Beam Search
                                    </div>
                                    <div>Beam = {beamWidth}</div>
                                    <div className="text-yellow-400">
                                        Balanceado
                                    </div>
                                    <div className="text-blue-400">
                                        Versátil
                                    </div>
                                </div>
                                <div className="bg-gray-700 p-2 rounded text-center">
                                    <div className="font-semibold">
                                        Exhaustivo
                                    </div>
                                    <div>Beam = ∞</div>
                                    <div className="text-green-400">Óptimo</div>
                                    <div className="text-red-400">Lento</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gray-800 p-4 rounded-lg">
                        <h4 className="text-lg mb-2">Configuración Típica</h4>
                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                                <span>Traducción:</span>
                                <span className="font-mono">beam = 4-8</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Resumir:</span>
                                <span className="font-mono">beam = 3-5</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Diálogo:</span>
                                <span className="font-mono">beam = 1-3</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Código:</span>
                                <span className="font-mono">beam = 1-2</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gray-800 p-4 rounded-lg">
                        <h4 className="text-lg mb-2">Optimizaciones</h4>
                        <ul className="text-sm text-gray-300 space-y-1">
                            <li>
                                • <strong>Length normalization:</strong>{" "}
                                Compensa sesgo de longitud
                            </li>
                            <li>
                                • <strong>Coverage penalty:</strong> Evita
                                repeticiones
                            </li>
                            <li>
                                • <strong>Diverse beam search:</strong> Fomenta
                                diversidad
                            </li>
                            <li>
                                • <strong>Early stopping:</strong> Termina
                                cuando encuentra EOS
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Estadísticas del proceso */}
            <div className="mt-6 bg-gray-800 p-4 rounded-lg">
                <h4 className="text-lg mb-3">Estadísticas del Proceso</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-gray-700 p-3 rounded text-center">
                        <div className="text-2xl font-bold text-blue-400">
                            {step}
                        </div>
                        <div className="text-sm text-gray-400">Pasos</div>
                    </div>
                    <div className="bg-gray-700 p-3 rounded text-center">
                        <div className="text-2xl font-bold text-purple-400">
                            {beams.length}
                        </div>
                        <div className="text-sm text-gray-400">Candidatos</div>
                    </div>
                    <div className="bg-gray-700 p-3 rounded text-center">
                        <div className="text-2xl font-bold text-green-400">
                            {beams.length > 0
                                ? Math.max(
                                      ...beams.map(
                                          (b) => b.sequence.split(" ").length
                                      )
                                  )
                                : 0}
                        </div>
                        <div className="text-sm text-gray-400">
                            Max Longitud
                        </div>
                    </div>
                    <div className="bg-gray-700 p-3 rounded text-center">
                        <div className="text-2xl font-bold text-yellow-400">
                            {beams.length > 0
                                ? Math.max(
                                      ...beams.map((b) => b.score)
                                  ).toFixed(2)
                                : "0.00"}
                        </div>
                        <div className="text-sm text-gray-400">Mejor Score</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
