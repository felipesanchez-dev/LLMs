"use client";
import React, { useState } from "react";

export default function BackpropagationDemo() {
    const [step, setStep] = useState(0);
    const [animating, setAnimating] = useState(false);

    const network = {
        input: [0.5, 0.8],
        hiddenWeights: [
            [0.3, 0.7],
            [0.2, 0.9],
        ],
        outputWeights: [0.4, 0.6],
        hiddenBias: [0.1, -0.2],
        outputBias: 0.3,
        target: 0.9,
    };

    const sigmoid = (x: number) => 1 / (1 + Math.exp(-x));
    const sigmoidDerivative = (x: number) => x * (1 - x);

    const hiddenInputs = [
        network.input[0] * network.hiddenWeights[0][0] +
            network.input[1] * network.hiddenWeights[0][1] +
            network.hiddenBias[0],
        network.input[0] * network.hiddenWeights[1][0] +
            network.input[1] * network.hiddenWeights[1][1] +
            network.hiddenBias[1],
    ];
    const hiddenOutputs = hiddenInputs.map(sigmoid);

    const outputInput =
        hiddenOutputs[0] * network.outputWeights[0] +
        hiddenOutputs[1] * network.outputWeights[1] +
        network.outputBias;
    const output = sigmoid(outputInput);

    const error = network.target - output;
    const loss = 0.5 * error * error;

    const outputDelta = error * sigmoidDerivative(output);
    const hiddenDeltas = [
        outputDelta *
            network.outputWeights[0] *
            sigmoidDerivative(hiddenOutputs[0]),
        outputDelta *
            network.outputWeights[1] *
            sigmoidDerivative(hiddenOutputs[1]),
    ];

    const steps = [
        "Forward Pass - Entrada",
        "Forward Pass - Capa Oculta",
        "Forward Pass - Salida",
        "Calcular Error",
        "Backward Pass - Gradientes Salida",
        "Backward Pass - Gradientes Oculta",
        "Actualizar Pesos",
    ];

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
            <h3 className="text-xl font-bold mb-4">🔄 Backpropagation</h3>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-gray-800 p-4 rounded-lg">
                    <h4 className="text-lg mb-3">Red Neuronal</h4>
                    <svg
                        width="100%"
                        height="300"
                        className="border border-gray-600 rounded"
                    >
                        <circle
                            cx="50"
                            cy="80"
                            r="20"
                            fill="#3b82f6"
                            opacity={step >= 0 ? 1 : 0.3}
                        />
                        <circle
                            cx="50"
                            cy="180"
                            r="20"
                            fill="#3b82f6"
                            opacity={step >= 0 ? 1 : 0.3}
                        />
                        <text
                            x="50"
                            y="85"
                            textAnchor="middle"
                            fontSize="12"
                            fill="white"
                        >
                            0.5
                        </text>
                        <text
                            x="50"
                            y="185"
                            textAnchor="middle"
                            fontSize="12"
                            fill="white"
                        >
                            0.8
                        </text>

                        <circle
                            cx="200"
                            cy="80"
                            r="20"
                            fill="#8b5cf6"
                            opacity={step >= 1 ? 1 : 0.3}
                        />
                        <circle
                            cx="200"
                            cy="180"
                            r="20"
                            fill="#8b5cf6"
                            opacity={step >= 1 ? 1 : 0.3}
                        />
                        <text
                            x="200"
                            y="85"
                            textAnchor="middle"
                            fontSize="10"
                            fill="white"
                        >
                            {step >= 1 ? hiddenOutputs[0].toFixed(2) : "?"}
                        </text>
                        <text
                            x="200"
                            y="185"
                            textAnchor="middle"
                            fontSize="10"
                            fill="white"
                        >
                            {step >= 1 ? hiddenOutputs[1].toFixed(2) : "?"}
                        </text>

                        <circle
                            cx="350"
                            cy="130"
                            r="20"
                            fill="#ef4444"
                            opacity={step >= 2 ? 1 : 0.3}
                        />
                        <text
                            x="350"
                            y="135"
                            textAnchor="middle"
                            fontSize="10"
                            fill="white"
                        >
                            {step >= 2 ? output.toFixed(2) : "?"}
                        </text>

                        <line
                            x1="70"
                            y1="80"
                            x2="180"
                            y2="80"
                            stroke="#10b981"
                            strokeWidth="3"
                            opacity={step >= 1 && animating ? 1 : 0.5}
                        />
                        <line
                            x1="70"
                            y1="80"
                            x2="180"
                            y2="180"
                            stroke="#10b981"
                            strokeWidth="2"
                            opacity={step >= 1 && animating ? 1 : 0.5}
                        />
                        <line
                            x1="70"
                            y1="180"
                            x2="180"
                            y2="80"
                            stroke="#10b981"
                            strokeWidth="2"
                            opacity={step >= 1 && animating ? 1 : 0.5}
                        />
                        <line
                            x1="70"
                            y1="180"
                            x2="180"
                            y2="180"
                            stroke="#10b981"
                            strokeWidth="4"
                            opacity={step >= 1 && animating ? 1 : 0.5}
                        />

                        <line
                            x1="220"
                            y1="80"
                            x2="330"
                            y2="130"
                            stroke="#f59e0b"
                            strokeWidth="2"
                            opacity={step >= 2 && animating ? 1 : 0.5}
                        />
                        <line
                            x1="220"
                            y1="180"
                            x2="330"
                            y2="130"
                            stroke="#f59e0b"
                            strokeWidth="3"
                            opacity={step >= 2 && animating ? 1 : 0.5}
                        />

                        {step >= 4 && (
                            <>
                                <line
                                    x1="330"
                                    y1="130"
                                    x2="220"
                                    y2="80"
                                    stroke="#dc2626"
                                    strokeWidth="2"
                                    strokeDasharray="5,5"
                                    className={animating ? "animate-pulse" : ""}
                                />
                                <line
                                    x1="330"
                                    y1="130"
                                    x2="220"
                                    y2="180"
                                    stroke="#dc2626"
                                    strokeWidth="2"
                                    strokeDasharray="5,5"
                                    className={animating ? "animate-pulse" : ""}
                                />
                            </>
                        )}

                        {step >= 5 && (
                            <>
                                <line
                                    x1="180"
                                    y1="80"
                                    x2="70"
                                    y2="80"
                                    stroke="#dc2626"
                                    strokeWidth="2"
                                    strokeDasharray="5,5"
                                    className={animating ? "animate-pulse" : ""}
                                />
                                <line
                                    x1="180"
                                    y1="80"
                                    x2="70"
                                    y2="180"
                                    stroke="#dc2626"
                                    strokeWidth="2"
                                    strokeDasharray="5,5"
                                    className={animating ? "animate-pulse" : ""}
                                />
                                <line
                                    x1="180"
                                    y1="180"
                                    x2="70"
                                    y2="80"
                                    stroke="#dc2626"
                                    strokeWidth="2"
                                    strokeDasharray="5,5"
                                    className={animating ? "animate-pulse" : ""}
                                />
                                <line
                                    x1="180"
                                    y1="180"
                                    x2="70"
                                    y2="180"
                                    stroke="#dc2626"
                                    strokeWidth="2"
                                    strokeDasharray="5,5"
                                    className={animating ? "animate-pulse" : ""}
                                />
                            </>
                        )}

                        <text
                            x="50"
                            y="40"
                            textAnchor="middle"
                            fontSize="14"
                            fill="white"
                            fontWeight="bold"
                        >
                            Entrada
                        </text>
                        <text
                            x="200"
                            y="40"
                            textAnchor="middle"
                            fontSize="14"
                            fill="white"
                            fontWeight="bold"
                        >
                            Oculta
                        </text>
                        <text
                            x="350"
                            y="40"
                            textAnchor="middle"
                            fontSize="14"
                            fill="white"
                            fontWeight="bold"
                        >
                            Salida
                        </text>

                        {/* Target */}
                        {step >= 3 && (
                            <>
                                <circle
                                    cx="350"
                                    cy="200"
                                    r="15"
                                    fill="#22c55e"
                                    opacity="0.7"
                                />
                                <text
                                    x="350"
                                    y="205"
                                    textAnchor="middle"
                                    fontSize="10"
                                    fill="white"
                                >
                                    {network.target}
                                </text>
                                <text
                                    x="350"
                                    y="220"
                                    textAnchor="middle"
                                    fontSize="10"
                                    fill="white"
                                >
                                    Target
                                </text>
                            </>
                        )}
                    </svg>

                    <div className="mt-4 text-center">
                        <div className="text-lg font-semibold">
                            {steps[step]}
                        </div>
                        <button
                            onClick={nextStep}
                            className="mt-2 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded transition-colors"
                        >
                            {step < steps.length - 1
                                ? "Siguiente"
                                : "Reiniciar"}
                        </button>
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="bg-gray-800 p-4 rounded-lg">
                        <h4 className="text-lg mb-2">Valores Actuales</h4>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                                <div className="font-semibold text-blue-400">
                                    Entradas:
                                </div>
                                <div>x₁ = {network.input[0]}</div>
                                <div>x₂ = {network.input[1]}</div>
                            </div>
                            <div>
                                <div className="font-semibold text-purple-400">
                                    Oculta:
                                </div>
                                <div>
                                    h₁ ={" "}
                                    {step >= 1
                                        ? hiddenOutputs[0].toFixed(3)
                                        : "?"}
                                </div>
                                <div>
                                    h₂ ={" "}
                                    {step >= 1
                                        ? hiddenOutputs[1].toFixed(3)
                                        : "?"}
                                </div>
                            </div>
                            <div>
                                <div className="font-semibold text-red-400">
                                    Salida:
                                </div>
                                <div>
                                    y = {step >= 2 ? output.toFixed(3) : "?"}
                                </div>
                                <div>target = {network.target}</div>
                            </div>
                            <div>
                                <div className="font-semibold text-green-400">
                                    Error:
                                </div>
                                <div>
                                    e = {step >= 3 ? error.toFixed(3) : "?"}
                                </div>
                                <div>
                                    Loss = {step >= 3 ? loss.toFixed(3) : "?"}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gray-800 p-4 rounded-lg">
                        <h4 className="text-lg mb-2">
                            ⚡ Explicación del Paso
                        </h4>
                        <div className="text-sm text-gray-300">
                            {step === 0 && (
                                <p>
                                    Las neuronas de entrada reciben los datos:
                                    x₁=0.5, x₂=0.8
                                </p>
                            )}
                            {step === 1 && (
                                <p>
                                    Se calculan las activaciones de la capa
                                    oculta usando pesos y función sigmoid
                                </p>
                            )}
                            {step === 2 && (
                                <p>
                                    La neurona de salida procesa las
                                    activaciones ocultas para producir y=
                                    {output.toFixed(3)}
                                </p>
                            )}
                            {step === 3 && (
                                <p>
                                    Se calcula el error: e = target - output ={" "}
                                    {error.toFixed(3)}
                                </p>
                            )}
                            {step === 4 && (
                                <p>
                                    Se calcula el gradiente de la capa de
                                    salida: δ_output = {outputDelta.toFixed(3)}
                                </p>
                            )}
                            {step === 5 && (
                                <p>
                                    Se propagan los gradientes hacia la capa
                                    oculta usando la regla de la cadena
                                </p>
                            )}
                            {step === 6 && (
                                <p>
                                    Se actualizan todos los pesos usando los
                                    gradientes calculados
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="bg-gray-800 p-4 rounded-lg">
                        <h4 className="text-lg mb-2">Fórmulas</h4>
                        <div className="space-y-2 text-xs font-mono">
                            <div className="bg-gray-700 p-2 rounded">
                                Forward: h = σ(Wx + b)
                            </div>
                            <div className="bg-gray-700 p-2 rounded">
                                Error: e = target - output
                            </div>
                            <div className="bg-gray-700 p-2 rounded">
                                Gradiente: δ = e × σ'(x)
                            </div>
                            <div className="bg-gray-700 p-2 rounded">
                                Actualización: w = w + α × δ × x
                            </div>
                        </div>
                    </div>

                    <div className="bg-gray-800 p-4 rounded-lg">
                        <h4 className="text-lg mb-2">Conceptos Clave</h4>
                        <ul className="text-sm text-gray-300 space-y-1">
                            <li>
                                • <strong>Regla de la cadena:</strong> Calcula
                                gradientes capa por capa
                            </li>
                            <li>
                                • <strong>Gradiente descendente:</strong>{" "}
                                Minimiza el error
                            </li>
                            <li>
                                • <strong>Propagación hacia atrás:</strong>{" "}
                                Actualiza pesos desde salida
                            </li>
                            <li>
                                • <strong>Learning rate:</strong> Controla
                                velocidad de aprendizaje
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {step >= 4 && (
                <div className="mt-6 bg-gray-800 p-4 rounded-lg">
                    <h4 className="text-lg mb-3">Gradientes</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <div className="text-sm font-semibold mb-2">
                                Gradientes Capa de Salida
                            </div>
                            <div className="bg-gray-700 p-3 rounded">
                                <div className="text-xs">
                                    δ_output = {outputDelta.toFixed(3)}
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="text-sm font-semibold mb-2">
                                Gradientes Capa Oculta
                            </div>
                            <div className="bg-gray-700 p-3 rounded space-y-1">
                                <div className="text-xs">
                                    δ_hidden₁ = {hiddenDeltas[0].toFixed(3)}
                                </div>
                                <div className="text-xs">
                                    δ_hidden₂ = {hiddenDeltas[1].toFixed(3)}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
