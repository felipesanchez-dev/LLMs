"use client";
import React, { useState } from "react";

export default function TokenizationDemo() {
    const [text, setText] = useState("Hola mundo");

    const tokenize = (input: string) => {
        return input.split(/(\s+|,|!|\.)/).filter((t) => t.trim() !== "");
    };

    return (
        <div className="bg-gray-800 p-4 rounded-xl text-white my-4">
            <label className="block text-sm mb-2">Texto a tokenizar:</label>
            <input
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="w-full bg-gray-700 p-2 rounded text-white mb-4"
            />
            <div className="flex flex-wrap gap-2">
                {tokenize(text).map((token, idx) => (
                    <span
                        key={idx}
                        className="bg-blue-600 px-3 py-1 rounded-full text-sm"
                    >
                        {token}
                    </span>
                ))}
            </div>
        </div>
    );
}
