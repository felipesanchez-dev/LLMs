"use client";
import React, { useState } from "react";

export default function FeedForwardNetwork() {
    const [inputValues, setInputValues] = useState([0.5, -0.2, 0.8, 1.2]);
    const [animating, setAnimating] = useState(false);

    const hiddenSize = 8;
    const outputSize = 4;

    const weights1 = Array.from({ length: hiddenSize }, () =>
        inputValues.map(() => Math.random() * 2 - 1)
    );
    const weights2 = Array.from({ length: outputSize }, () =>
        Array.from({ length: hiddenSize }, () => Math.random() * 2 - 1)
    );

    const relu = (x: number) => Math.max(0, x);
    const gelu = (x: number) =>
        0.5 *
        x *
        (1 +
            Math.tanh(
                Math.sqrt(2 / Math.PI) * (x + 0.044715 * Math.pow(x, 3))
            ));

    const hiddenOutputs = weights1.map((neuronWeights) =>
        relu(
            neuronWeights.reduce(
                (sum, weight, i) => sum + weight * inputValues[i],
                0
            )
        )
    );

    const finalOutputs = weights2.map((neuronWeights) =>
        neuronWeights.reduce(
            (sum, weight, i) => sum + weight * hiddenOutputs[i],
            0
        )
    );

    const animate = () => {
        setAnimating(true);
        setTimeout(() => setAnimating(false), 2000);
    };

    const updateInput = (index: number, value: string) => {
        const newValues = [...inputValues];
        newValues[index] = parseFloat(value) || 0;
        setInputValues(newValues);
    };

    return (
        <div className="bg-gray-900 text-white p-6 rounded-xl my-6">
            <h3 className="text-xl font-bold mb-4">Feed-Forward Network</h3>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-gray-800 p-4 rounded-lg">
                    <h4 className="text-lg mb-3">Red Feed-Forward</h4>

                    <div className="mb-4">
                        <label className="block text-sm mb-2">
                            Valores de entrada:
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                            {inputValues.map((value, idx) => (
                                <input
                                    key={idx}
                                    type="number"
                                    step="0.1"
                                    value={value}
                                    onChange={(e) =>
                                        updateInput(idx, e.target.value)
                                    }
                                    className="bg-gray-700 text-white p-2 rounded text-sm"
                                    placeholder={`Input ${idx + 1}`}
                                />
                            ))}
                        </div>
                    </div>

                    <svg
                        width="100%"
                        height="400"
                        className="border border-gray-600 rounded"
                    >
                        {inputValues.map((value, idx) => (
                            <g key={`input-${idx}`}>
                                <circle
                                    cx="50"
                                    cy={50 + idx * 80}
                                    r="15"
                                    fill="#3b82f6"
                                    className={animating ? "animate-pulse" : ""}
                                />
                                <text
                                    x="50"
                                    y={55 + idx * 80}
                                    textAnchor="middle"
                                    fontSize="10"
                                    fill="white"
                                >
                                    {value.toFixed(1)}
                                </text>
                                <text
                                    x="15"
                                    y={55 + idx * 80}
                                    textAnchor="middle"
                                    fontSize="8"
                                    fill="white"
                                >
                                    x{idx + 1}
                                </text>
                            </g>
                        ))}

                        {hiddenOutputs.map((value, idx) => (
                            <g key={`hidden-${idx}`}>
                                <circle
                                    cx="200"
                                    cy={30 + idx * 40}
                                    r="12"
                                    fill="#8b5cf6"
                                    className={animating ? "animate-pulse" : ""}
                                />
                                <text
                                    x="200"
                                    y={35 + idx * 40}
                                    textAnchor="middle"
                                    fontSize="8"
                                    fill="white"
                                >
                                    {value.toFixed(2)}
                                </text>
                            </g>
                        ))}

                        {finalOutputs.map((value, idx) => (
                            <g key={`output-${idx}`}>
                                <circle
                                    cx="350"
                                    cy={80 + idx * 60}
                                    r="15"
                                    fill="#ef4444"
                                    className={animating ? "animate-pulse" : ""}
                                />
                                <text
                                    x="350"
                                    y={85 + idx * 60}
                                    textAnchor="middle"
                                    fontSize="10"
                                    fill="white"
                                >
                                    {value.toFixed(1)}
                                </text>
                                <text
                                    x="385"
                                    y={85 + idx * 60}
                                    textAnchor="start"
                                    fontSize="8"
                                    fill="white"
                                >
                                    o{idx + 1}
                                </text>
                            </g>
                        ))}

                        {inputValues.map((_, inputIdx) =>
                            hiddenOutputs.map((_, hiddenIdx) => {
                                const weight = weights1[hiddenIdx][inputIdx];
                                const opacity = Math.abs(weight);
                                const color =
                                    weight > 0 ? "#10b981" : "#ef4444";

                                return (
                                    <line
                                        key={`conn1-${inputIdx}-${hiddenIdx}`}
                                        x1="65"
                                        y1={50 + inputIdx * 80}
                                        x2="188"
                                        y2={30 + hiddenIdx * 40}
                                        stroke={color}
                                        strokeWidth={1 + opacity}
                                        opacity={animating ? opacity : 0.3}
                                        className={
                                            animating ? "animate-pulse" : ""
                                        }
                                    />
                                );
                            })
                        )}

                        {hiddenOutputs.map((_, hiddenIdx) =>
                            finalOutputs.map((_, outputIdx) => {
                                const weight = weights2[outputIdx][hiddenIdx];
                                const opacity = Math.abs(weight);
                                const color =
                                    weight > 0 ? "#10b981" : "#ef4444";

                                return (
                                    <line
                                        key={`conn2-${hiddenIdx}-${outputIdx}`}
                                        x1="212"
                                        y1={30 + hiddenIdx * 40}
                                        x2="335"
                                        y2={80 + outputIdx * 60}
                                        stroke={color}
                                        strokeWidth={1 + opacity}
                                        opacity={animating ? opacity : 0.3}
                                        className={
                                            animating ? "animate-pulse" : ""
                                        }
                                    />
                                );
                            })
                        )}

                        <text
                            x="50"
                            y="25"
                            textAnchor="middle"
                            fontSize="12"
                            fill="white"
                            fontWeight="bold"
                        >
                            Entrada
                        </text>
                        <text
                            x="200"
                            y="25"
                            textAnchor="middle"
                            fontSize="12"
                            fill="white"
                            fontWeight="bold"
                        >
                            FFN Oculta
                        </text>
                        <text
                            x="350"
                            y="25"
                            textAnchor="middle"
                            fontSize="12"
                            fill="white"
                            fontWeight="bold"
                        >
                            Salida
                        </text>
                    </svg>

                    <button
                        onClick={animate}
                        className="mt-4 bg-green-600 hover:bg-green-700 px-4 py-2 rounded transition-colors w-full"
                    >
                        {animating ? "Procesando..." : "Ejecutar Forward Pass"}
                    </button>
                </div>

                <div className="space-y-4">
                    <div className="bg-gray-800 p-4 rounded-lg">
                        <h4 className="text-lg mb-2">¿Qué es Feed-Forward?</h4>
                        <ul className="text-sm text-gray-300 space-y-2">
                            <li>
                                • <strong>Unidireccional:</strong> La
                                información fluye solo hacia adelante
                            </li>
                            <li>
                                • <strong>Transformación:</strong> Cada capa
                                transforma las representaciones
                            </li>
                            <li>
                                • <strong>No linealidad:</strong> Funciones de
                                activación permiten patrones complejos
                            </li>
                            <li>
                                • <strong>Composición:</strong> Múltiples
                                transformaciones simples → función compleja
                            </li>
                        </ul>
                    </div>

                    <div className="bg-gray-800 p-4 rounded-lg">
                        <h4 className="text-lg mb-2">En Transformers</h4>
                        <div className="space-y-2 text-sm text-gray-300">
                            <div className="bg-gray-700 p-2 rounded">
                                <strong>
                                    FFN(x) = max(0, xW₁ + b₁)W₂ + b₂
                                </strong>
                            </div>
                            <div>
                                • Se aplica a cada posición independientemente
                            </div>
                            <div>
                                • Dimensión interna típicamente 4x la dimensión
                                del modelo
                            </div>
                            <div>• Usa activación ReLU o GELU</div>
                            <div>• ~2/3 de los parámetros del Transformer</div>
                        </div>
                    </div>

                    <div className="bg-gray-800 p-4 rounded-lg">
                        <h4 className="text-lg mb-2">Estadísticas Actuales</h4>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <div className="bg-gray-700 p-3 rounded">
                                <div className="text-blue-400 font-semibold">
                                    Entrada
                                </div>
                                <div>
                                    Media:{" "}
                                    {(
                                        inputValues.reduce((s, v) => s + v, 0) /
                                        inputValues.length
                                    ).toFixed(2)}
                                </div>
                                <div>
                                    Rango: [
                                    {Math.min(...inputValues).toFixed(1)},{" "}
                                    {Math.max(...inputValues).toFixed(1)}]
                                </div>
                            </div>
                            <div className="bg-gray-700 p-3 rounded">
                                <div className="text-purple-400 font-semibold">
                                    Oculta
                                </div>
                                <div>
                                    Activas:{" "}
                                    {hiddenOutputs.filter((v) => v > 0).length}/
                                    {hiddenOutputs.length}
                                </div>
                                <div>
                                    Media:{" "}
                                    {(
                                        hiddenOutputs.reduce(
                                            (s, v) => s + v,
                                            0
                                        ) / hiddenOutputs.length
                                    ).toFixed(2)}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gray-800 p-4 rounded-lg">
                        <h4 className="text-lg mb-2">
                            Funciones de Activación
                        </h4>
                        <div className="space-y-3">
                            <div className="bg-gray-700 p-3 rounded">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="font-semibold text-green-400">
                                        ReLU
                                    </span>
                                    <code className="text-xs">max(0, x)</code>
                                </div>
                                <div className="text-xs text-gray-300">
                                    Simple, eficiente, pero puede "morir"
                                    (gradiente 0)
                                </div>
                            </div>

                            <div className="bg-gray-700 p-3 rounded">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="font-semibold text-orange-400">
                                        GELU
                                    </span>
                                    <code className="text-xs">x × Φ(x)</code>
                                </div>
                                <div className="text-xs text-gray-300">
                                    Más suave que ReLU, usado en modelos
                                    modernos
                                </div>
                            </div>

                            <div className="bg-gray-700 p-3 rounded">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="font-semibold text-blue-400">
                                        Swish
                                    </span>
                                    <code className="text-xs">
                                        x × sigmoid(x)
                                    </code>
                                </div>
                                <div className="text-xs text-gray-300">
                                    Auto-gated, funciona bien en redes profundas
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gray-800 p-4 rounded-lg">
                        <h4 className="text-lg mb-2">
                            Papel en el Aprendizaje
                        </h4>
                        <ul className="text-sm text-gray-300 space-y-1">
                            <li>
                                • <strong>Capacidad expresiva:</strong> Aprende
                                funciones no lineales
                            </li>
                            <li>
                                • <strong>Refinamiento:</strong> Procesa salidas
                                de atención
                            </li>
                            <li>
                                • <strong>Memoria:</strong> Almacena
                                conocimiento en los pesos
                            </li>
                            <li>
                                • <strong>Especialización:</strong> Diferentes
                                neuronas → diferentes patrones
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="mt-6 bg-gray-800 p-4 rounded-lg">
                <h4 className="text-lg mb-3">Distribución de Activaciones</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <div className="text-sm font-semibold mb-2">
                            Entrada
                        </div>
                        <div className="flex space-x-1 h-16 items-end">
                            {inputValues.map((value, idx) => (
                                <div
                                    key={idx}
                                    className="flex-1 bg-blue-500 rounded-t"
                                    style={{
                                        height: `${Math.abs(value) * 20 + 5}px`,
                                    }}
                                    title={`${value.toFixed(2)}`}
                                />
                            ))}
                        </div>
                    </div>

                    <div>
                        <div className="text-sm font-semibold mb-2">
                            Oculta (después ReLU)
                        </div>
                        <div className="flex space-x-1 h-16 items-end">
                            {hiddenOutputs.slice(0, 8).map((value, idx) => (
                                <div
                                    key={idx}
                                    className="flex-1 bg-purple-500 rounded-t"
                                    style={{ height: `${value * 10 + 2}px` }}
                                    title={`${value.toFixed(2)}`}
                                />
                            ))}
                        </div>
                    </div>

                    <div>
                        <div className="text-sm font-semibold mb-2">Salida</div>
                        <div className="flex space-x-1 h-16 items-end">
                            {finalOutputs.map((value, idx) => (
                                <div
                                    key={idx}
                                    className="flex-1 bg-red-500 rounded-t"
                                    style={{
                                        height: `${Math.abs(value) * 5 + 5}px`,
                                    }}
                                    title={`${value.toFixed(2)}`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
