"use client";
import React from "react";
import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export default function ModelComparisonChart() {
    const data = {
        labels: ["GPT-4", "LLaMA 2", "Mistral", "Claude", "Gemini"],
        datasets: [
            {
                label: "Parámetros (Billones)",
                data: [175, 70, 12, 52, 540],
                backgroundColor: "rgba(59, 130, 246, 0.7)",
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: { position: "top" as const },
            title: { display: true, text: "Comparativa de LLMs por tamaño" },
        },
    };

    return (
        <div className="bg-gray-800 p-4 rounded-xl my-4">
            <Bar data={data} options={options} />
        </div>
    );
}
