"use client";
import React from "react";

export default function AttentionHeatmap() {
    const matrix = [
        [1, 0.8, 0.2],
        [0.4, 1, 0.5],
        [0.3, 0.6, 1],
    ];
    const labels = ["Token 1", "Token 2", "Token 3"];

    return (
        <div className="bg-gray-800 p-4 rounded-xl text-white my-4 overflow-x-auto">
            <table className="border-collapse">
                <thead>
                    <tr>
                        <th></th>
                        {labels.map((l, i) => (
                            <th key={i} className="px-3 py-1">
                                {l}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {matrix.map((row, i) => (
                        <tr key={i}>
                            <td className="px-3 py-1">{labels[i]}</td>
                            {row.map((value, j) => {
                                const color = `rgba(59, 130, 246, ${value})`;
                                return (
                                    <td
                                        key={j}
                                        style={{ backgroundColor: color }}
                                        className="w-16 h-8 text-center"
                                    >
                                        {value.toFixed(2)}
                                    </td>
                                );
                            })}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
