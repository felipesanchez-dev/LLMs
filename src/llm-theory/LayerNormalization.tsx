"use client";
import React, { useState } from "react";

export default function LayerNormalization() {
    const [inputValues, setInputValues] = useState([2.5, -1.2, 0.8, 1.1, -0.5]);
    const [step, setStep] = useState(0);
    const [animating, setAnimating] = useState(false);

    const steps = [
        "Entrada original",
        "Calcular media (μ)",
        "Calcular varianza (σ²)",
        "Normalizar ((x - μ) / σ)",
        "Aplicar γ y β",
    ];

    const gamma = 1.2;
    const beta = 0.3;

    const mean =
        inputValues.reduce((sum, val) => sum + val, 0) / inputValues.length;
    const variance =
        inputValues.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) /
        inputValues.length;
    const stdDev = Math.sqrt(variance);

    const normalized = inputValues.map((val) => (val - mean) / stdDev);
    const final = normalized.map((val) => gamma * val + beta);

    const nextStep = () => {
        if (step < steps.length - 1) {
            setStep(step + 1);
            setAnimating(true);
            setTimeout(() => setAnimating(false), 800);
        } else {
            setStep(0);
        }
    };

    const updateValue = (index: number, value: string) => {
        const newValues = [...inputValues];
        newValues[index] = parseFloat(value) || 0;
        setInputValues(newValues);
    };

    const getDisplayValues = () => {
        switch (step) {
            case 0:
                return inputValues;
            case 1:
                return inputValues.map(() => mean);
            case 2:
                return inputValues.map(() => variance);
            case 3:
                return normalized;
            case 4:
                return final;
            default:
                return inputValues;
        }
    };

    const getColor = (value: number, isOriginal: boolean = false) => {
        if (isOriginal) return "#6b7280";
        const normalized = Math.max(-2, Math.min(2, value));
        const intensity = Math.abs(normalized) / 2;
        if (normalized > 0) {
            return `rgba(34, 197, 94, ${0.3 + intensity * 0.7})`;
        } else {
            return `rgba(239, 68, 68, ${0.3 + intensity * 0.7})`;
        }
    };

    return (
        <div className="bg-gray-900 text-white p-6 rounded-xl my-6">
            <h3 className="text-xl font-bold mb-4">Layer Normalization</h3>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-gray-800 p-4 rounded-lg">
                    <h4 className="text-lg mb-3">Normalización Paso a Paso</h4>

                    <div className="mb-4">
                        <label className="block text-sm mb-2">
                            Valores de entrada:
                        </label>
                        <div className="flex space-x-2">
                            {inputValues.map((value, idx) => (
                                <input
                                    key={idx}
                                    type="number"
                                    step="0.1"
                                    value={value}
                                    onChange={(e) =>
                                        updateValue(idx, e.target.value)
                                    }
                                    className="w-16 bg-gray-700 text-white p-1 rounded text-center text-sm"
                                />
                            ))}
                        </div>
                    </div>

                    <div className="mb-4">
                        <div className="text-sm font-semibold mb-2">
                            {steps[step]}
                        </div>
                        <div className="flex space-x-2 justify-center">
                            {getDisplayValues().map((value, idx) => (
                                <div
                                    key={idx}
                                    className={`
                    w-16 h-16 rounded-lg flex items-center justify-center text-sm font-bold
                    transition-all duration-500 transform
                    ${animating ? "scale-110 animate-pulse" : "scale-100"}
                  `}
                                    style={{
                                        backgroundColor: getColor(
                                            value,
                                            step === 0
                                        ),
                                    }}
                                >
                                    {value.toFixed(2)}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-gray-700 p-3 rounded-lg mb-4">
                        {step === 0 && (
                            <div>
                                <div className="text-sm">
                                    Valores originales de la capa
                                </div>
                                <div className="text-xs text-gray-400 mt-1">
                                    Estos pueden tener diferentes escalas y
                                    distribuciones
                                </div>
                            </div>
                        )}
                        {step === 1 && (
                            <div>
                                <div className="text-sm">
                                    Media: μ = {mean.toFixed(3)}
                                </div>
                                <div className="text-xs text-gray-400 mt-1">
                                    μ = (Σxi) / n = (
                                    {inputValues
                                        .map((v) => v.toFixed(1))
                                        .join(" + ")}
                                    ) / {inputValues.length}
                                </div>
                            </div>
                        )}
                        {step === 2 && (
                            <div>
                                <div className="text-sm">
                                    Varianza: σ² = {variance.toFixed(3)}
                                </div>
                                <div className="text-xs text-gray-400 mt-1">
                                    σ² = Σ(xi - μ)² / n
                                </div>
                            </div>
                        )}
                        {step === 3 && (
                            <div>
                                <div className="text-sm">
                                    Normalizado: (xi - μ) / σ
                                </div>
                                <div className="text-xs text-gray-400 mt-1">
                                    Desviación estándar: σ = {stdDev.toFixed(3)}
                                </div>
                            </div>
                        )}
                        {step === 4 && (
                            <div>
                                <div className="text-sm">
                                    Final: γ × normalizado + β
                                </div>
                                <div className="text-xs text-gray-400 mt-1">
                                    γ = {gamma}, β = {beta} (parámetros
                                    aprendibles)
                                </div>
                            </div>
                        )}
                    </div>

                    <button
                        onClick={nextStep}
                        className="w-full bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded transition-colors"
                    >
                        {step < steps.length - 1
                            ? "Siguiente Paso"
                            : "Reiniciar"}
                    </button>
                </div>

                <div className="space-y-4">
                    <div className="bg-gray-800 p-4 rounded-lg">
                        <h4 className="text-lg mb-2">¿Por qué Layer Norm?</h4>
                        <ul className="text-sm text-gray-300 space-y-2">
                            <li>
                                • <strong>Estabiliza:</strong> Mantiene
                                activaciones en rangos razonables
                            </li>
                            <li>
                                • <strong>Acelera:</strong> Permite tasas de
                                aprendizaje más altas
                            </li>
                            <li>
                                • <strong>Regulariza:</strong> Actúa como
                                regularización implícita
                            </li>
                            <li>
                                • <strong>Independiente:</strong> Funciona por
                                muestra, no por batch
                            </li>
                        </ul>
                    </div>

                    <div className="bg-gray-800 p-4 rounded-lg">
                        <h4 className="text-lg mb-2">Estadísticas Actuales</h4>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <div className="bg-gray-700 p-3 rounded">
                                <div className="text-blue-400 font-semibold">
                                    Entrada
                                </div>
                                <div>Media: {mean.toFixed(3)}</div>
                                <div>Varianza: {variance.toFixed(3)}</div>
                                <div>
                                    Rango: [
                                    {Math.min(...inputValues).toFixed(1)},{" "}
                                    {Math.max(...inputValues).toFixed(1)}]
                                </div>
                            </div>
                            <div className="bg-gray-700 p-3 rounded">
                                <div className="text-green-400 font-semibold">
                                    Normalizada
                                </div>
                                <div>
                                    Media:{" "}
                                    {(
                                        normalized.reduce((s, v) => s + v, 0) /
                                        normalized.length
                                    ).toFixed(3)}
                                </div>
                                <div>Varianza: ≈ 1.000</div>
                                <div>
                                    Rango: [{Math.min(...normalized).toFixed(1)}
                                    , {Math.max(...normalized).toFixed(1)}]
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gray-800 p-4 rounded-lg">
                        <h4 className="text-lg mb-2">
                            Comparación: Batch vs Layer
                        </h4>
                        <div className="space-y-2 text-sm">
                            <div className="bg-gray-700 p-2 rounded">
                                <strong className="text-orange-400">
                                    Batch Normalization:
                                </strong>
                                <div className="text-gray-300">
                                    Normaliza sobre el batch (eje 0)
                                </div>
                            </div>
                            <div className="bg-gray-700 p-2 rounded">
                                <strong className="text-blue-400">
                                    Layer Normalization:
                                </strong>
                                <div className="text-gray-300">
                                    Normaliza sobre las features (último eje)
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gray-800 p-4 rounded-lg">
                        <h4 className="text-lg mb-2">Fórmula Matemática</h4>
                        <div className="bg-gray-700 p-3 rounded font-mono text-sm text-center">
                            <div className="mb-2">
                                LayerNorm(x) = γ × (x - μ) / σ + β
                            </div>
                            <div className="text-xs text-gray-400">
                                μ = E[x], σ = √(Var[x] + ε)
                            </div>
                        </div>
                    </div>

                    <div className="bg-gray-800 p-4 rounded-lg">
                        <h4 className="text-lg mb-2">En Transformers</h4>
                        <div className="text-sm text-gray-300 space-y-1">
                            <div>
                                • Aplicada <strong>antes</strong> de cada
                                sub-capa
                            </div>
                            <div>• Dos por bloque: antes de atención y FFN</div>
                            <div>• Permite conexiones residuales estables</div>
                            <div>• Esencial para el entrenamiento profundo</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-6 bg-gray-800 p-4 rounded-lg">
                <h4 className="text-lg mb-3">Distribución de Valores</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <div className="text-sm font-semibold mb-2 text-red-400">
                            Antes de Layer Norm
                        </div>
                        <svg
                            width="100%"
                            height="100"
                            className="border border-gray-600 rounded"
                        >
                            {inputValues.map((value, idx) => {
                                const x =
                                    (idx + 0.5) * (280 / inputValues.length) +
                                    10;
                                const height = Math.abs(value) * 15 + 5;
                                const y = 80 - height;

                                return (
                                    <rect
                                        key={idx}
                                        x={x - 8}
                                        y={y}
                                        width="16"
                                        height={height}
                                        fill={value > 0 ? "#ef4444" : "#3b82f6"}
                                        opacity="0.7"
                                    />
                                );
                            })}
                            <line
                                x1="10"
                                y1="80"
                                x2="290"
                                y2="80"
                                stroke="#6b7280"
                                strokeWidth="1"
                            />
                        </svg>
                    </div>
                    <div>
                        <div className="text-sm font-semibold mb-2 text-green-400">
                            Después de Layer Norm
                        </div>
                        <svg
                            width="100%"
                            height="100"
                            className="border border-gray-600 rounded"
                        >
                            {final.map((value, idx) => {
                                const x =
                                    (idx + 0.5) * (280 / final.length) + 10;
                                const height = Math.abs(value - beta) * 15 + 5;
                                const y = 80 - height;

                                return (
                                    <rect
                                        key={idx}
                                        x={x - 8}
                                        y={y}
                                        width="16"
                                        height={height}
                                        fill={
                                            value > beta ? "#22c55e" : "#8b5cf6"
                                        }
                                        opacity="0.7"
                                    />
                                );
                            })}
                            <line
                                x1="10"
                                y1="80"
                                x2="290"
                                y2="80"
                                stroke="#6b7280"
                                strokeWidth="1"
                            />
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    );
}
