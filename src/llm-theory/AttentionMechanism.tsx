"use client";
import React, { useState } from "react";

export default function AttentionMechanism() {
    const [step, setStep] = useState(0);
    const [animating, setAnimating] = useState(false);

    const sentence = ["El", "gato", "está", "durmiendo"];
    const queryWord = "gato";

    const embeddings = {
        El: [0.1, 0.8, 0.3, 0.2],
        gato: [0.9, 0.2, 0.7, 0.1],
        está: [0.3, 0.6, 0.1, 0.9],
        durmiendo: [0.2, 0.4, 0.8, 0.5],
    };

    const steps = [
        "1. Convertir tokens en embeddings",
        "2. Generar matrices Q, K, V",
        "3. Calcular scores QK^T",
        "4. Aplicar softmax",
        "5. Multiplicar por V",
    ];

    const calculateAttention = (query: string, keys: string[]) => {
        const queryEmb = embeddings[query as keyof typeof embeddings];
        return keys.map((key) => {
            const keyEmb = embeddings[key as keyof typeof embeddings];
            return queryEmb.reduce(
                (sum, val, idx) => sum + val * keyEmb[idx],
                0
            );
        });
    };

    const attentionScores = calculateAttention(queryWord, sentence);
    const maxScore = Math.max(...attentionScores);
    const normalizedScores = attentionScores.map((score) => score / maxScore);

    const nextStep = () => {
        if (step < steps.length - 1) {
            setStep(step + 1);
            setAnimating(true);
            setTimeout(() => setAnimating(false), 1000);
        } else {
            setStep(0);
        }
    };

    return (
        <div className="bg-gray-900 text-white p-6 rounded-xl my-6">
            <h3 className="text-xl font-bold mb-4">Mecanismo de Atención</h3>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-gray-800 p-4 rounded-lg">
                    <h4 className="text-lg mb-3">Atención Visual</h4>
                    <div className="space-y-4">
                        <div className="flex justify-center space-x-4">
                            {sentence.map((token, idx) => {
                                const isQuery = token === queryWord;
                                const attention = normalizedScores[idx];
                                const opacity =
                                    step >= 4 ? attention : isQuery ? 1 : 0.5;

                                return (
                                    <div
                                        key={idx}
                                        className={`
                      px-4 py-2 rounded-lg border-2 transition-all duration-500
                      ${
                          isQuery
                              ? "border-yellow-400 bg-yellow-900"
                              : "border-blue-400 bg-blue-900"
                      }
                      ${animating ? "scale-110" : "scale-100"}
                    `}
                                        style={{ opacity }}
                                    >
                                        <div className="text-center">
                                            <div className="font-semibold">
                                                {token}
                                            </div>
                                            {step >= 3 && (
                                                <div className="text-xs mt-1">
                                                    {(attention * 100).toFixed(
                                                        1
                                                    )}
                                                    %
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {step >= 2 && (
                            <div className="bg-gray-700 p-4 rounded-lg">
                                <h5 className="text-sm font-semibold mb-2">
                                    Scores de Atención
                                </h5>
                                <div className="grid grid-cols-4 gap-2 text-center text-xs">
                                    {sentence.map((token, idx) => (
                                        <div
                                            key={idx}
                                            className="bg-gray-600 p-2 rounded"
                                        >
                                            <div>{token}</div>
                                            <div className="text-blue-300 mt-1">
                                                {attentionScores[idx].toFixed(
                                                    2
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {step >= 4 && (
                            <svg
                                width="100%"
                                height="100"
                                className="border border-gray-600 rounded"
                            >
                                {sentence.map((token, idx) => {
                                    const queryIdx =
                                        sentence.indexOf(queryWord);
                                    const x1 = 50 + queryIdx * 80;
                                    const x2 = 50 + idx * 80;
                                    const attention = normalizedScores[idx];

                                    return (
                                        <line
                                            key={idx}
                                            x1={x1}
                                            y1={30}
                                            x2={x2}
                                            y2={70}
                                            stroke="#10b981"
                                            strokeWidth={2 + attention * 3}
                                            opacity={attention}
                                            className={
                                                animating ? "animate-pulse" : ""
                                            }
                                        />
                                    );
                                })}

                                {sentence.map((token, idx) => (
                                    <g key={idx}>
                                        <circle
                                            cx={50 + idx * 80}
                                            cy={30}
                                            r={15}
                                            fill="#3b82f6"
                                        />
                                        <circle
                                            cx={50 + idx * 80}
                                            cy={70}
                                            r={15}
                                            fill="#10b981"
                                        />
                                        <text
                                            x={50 + idx * 80}
                                            y={35}
                                            textAnchor="middle"
                                            fontSize="8"
                                            fill="white"
                                        >
                                            Q
                                        </text>
                                        <text
                                            x={50 + idx * 80}
                                            y={75}
                                            textAnchor="middle"
                                            fontSize="8"
                                            fill="white"
                                        >
                                            K,V
                                        </text>
                                    </g>
                                ))}
                            </svg>
                        )}
                    </div>

                    <button
                        onClick={nextStep}
                        className="mt-4 bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded transition-colors w-full"
                    >
                        {step < steps.length - 1
                            ? "Siguiente Paso"
                            : "Reiniciar"}
                    </button>
                </div>

                <div className="space-y-4">
                    <div className="bg-gray-800 p-4 rounded-lg">
                        <h4 className="text-lg mb-2">Proceso Paso a Paso</h4>
                        <div className="space-y-2">
                            {steps.map((stepText, idx) => (
                                <div
                                    key={idx}
                                    className={`
                    p-2 rounded transition-all duration-300
                    ${
                        idx <= step
                            ? "bg-green-800 text-green-100"
                            : "bg-gray-700 text-gray-400"
                    }
                    ${idx === step ? "ring-2 ring-green-400" : ""}
                  `}
                                >
                                    {stepText}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-gray-800 p-4 rounded-lg">
                        <h4 className="text-lg mb-2">¿Qué está pasando?</h4>
                        {step === 0 && (
                            <p className="text-sm text-gray-300">
                                Cada palabra se convierte en un vector de
                                números (embedding) que captura su significado
                                semántico.
                            </p>
                        )}
                        {step === 1 && (
                            <p className="text-sm text-gray-300">
                                Generamos tres matrices: Query (Q), Key (K) y
                                Value (V) multiplicando los embeddings por
                                matrices aprendidas.
                            </p>
                        )}
                        {step === 2 && (
                            <p className="text-sm text-gray-300">
                                Calculamos la similitud entre cada Query y todas
                                las Keys usando el producto punto (QK^T).
                            </p>
                        )}
                        {step === 3 && (
                            <p className="text-sm text-gray-300">
                                Aplicamos softmax para convertir los scores en
                                probabilidades que suman 1. Esto determina
                                cuánta atención prestar a cada token.
                            </p>
                        )}
                        {step === 4 && (
                            <p className="text-sm text-gray-300">
                                Multiplicamos los pesos de atención por los
                                Values para obtener la representación final que
                                combina información relevante.
                            </p>
                        )}
                    </div>

                    <div className="bg-gray-800 p-4 rounded-lg">
                        <h4 className="text-lg mb-2">Pesos de Atención</h4>
                        <div className="space-y-2">
                            {sentence.map((token, idx) => (
                                <div
                                    key={idx}
                                    className="flex items-center space-x-2"
                                >
                                    <span className="w-16 text-sm">
                                        {token}:
                                    </span>
                                    <div className="flex-1 bg-gray-700 rounded-full h-2">
                                        <div
                                            className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full transition-all duration-500"
                                            style={{
                                                width: `${
                                                    normalizedScores[idx] * 100
                                                }%`,
                                            }}
                                        />
                                    </div>
                                    <span className="text-xs text-gray-400 w-12">
                                        {(normalizedScores[idx] * 100).toFixed(
                                            1
                                        )}
                                        %
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
