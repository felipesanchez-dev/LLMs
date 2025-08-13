"use client";
import React from "react";
import "katex/dist/katex.min.css";
import { BlockMath } from "react-katex";

interface EquationBlockProps {
    title: string;
    latex: string;
    description?: string;
    explanation?: string;
}

export default function EquationBlock({
    title,
    latex,
    description,
    explanation,
}: EquationBlockProps) {
    return (
        <div className="bg-gray-900 text-white p-4 rounded-xl my-4 border border-gray-700">
            <BlockMath math={latex} />
            {description && (
                <p className="text-gray-400 mt-2 text-sm">{description}</p>
            )}
        </div>
    );
}
