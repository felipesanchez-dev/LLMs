"use client";
import React from "react";

export default function TransformerAnimation() {
    return (
        <div className="bg-gray-800 p-4 rounded-xl text-white my-4">
            <h3 className="text-lg mb-2">Esquema de un Transformer</h3>
            <svg width="100%" height="200">
                <rect x="10" y="60" width="100" height="40" fill="#1d4ed8" />
                <text x="20" y="85" fill="white">
                    Entrada
                </text>

                <rect x="150" y="30" width="120" height="40" fill="#6d28d9" />
                <text x="160" y="55" fill="white">
                    Self-Attention
                </text>

                <rect x="150" y="100" width="120" height="40" fill="#059669" />
                <text x="160" y="125" fill="white">
                    Feed Forward
                </text>

                <rect x="300" y="60" width="100" height="40" fill="#b91c1c" />
                <text x="320" y="85" fill="white">
                    Salida
                </text>

                <line
                    x1="110"
                    y1="80"
                    x2="150"
                    y2="50"
                    stroke="white"
                    markerEnd="url(#arrow)"
                />
                <line
                    x1="110"
                    y1="80"
                    x2="150"
                    y2="120"
                    stroke="white"
                    markerEnd="url(#arrow)"
                />
                <line
                    x1="270"
                    y1="50"
                    x2="300"
                    y2="80"
                    stroke="white"
                    markerEnd="url(#arrow)"
                />
                <line
                    x1="270"
                    y1="120"
                    x2="300"
                    y2="80"
                    stroke="white"
                    markerEnd="url(#arrow)"
                />

                <defs>
                    <marker
                        id="arrow"
                        markerWidth="10"
                        markerHeight="10"
                        refX="5"
                        refY="3"
                        orient="auto"
                    >
                        <path d="M0,0 L0,6 L9,3 z" fill="white" />
                    </marker>
                </defs>
            </svg>
        </div>
    );
}
