import Link from "next/link";
import React from "react";

export const Header: React.FC<{
    title: React.ReactNode;
    children?: React.ReactNode;
}> = ({ title, children }) => {
    return (
        <header className="flex justify-between items-center px-4 py-2 bg-blue-950 text-white h-[3rem] shadow-md">
            <div className="flex items-center space-x-2">{children}</div>

            {title && <h1 className="text-2xl font-semibold tracking-wide">{title}</h1>}

            <nav className="flex items-center space-x-4 text-sm">
                <Link className="hover:underline hover:text-blue-300 transition-colors" href={"/"}>
                    Inicio
                </Link>
                <Link className="hover:underline hover:text-blue-300 transition-colors" href={"/llm"}>
                    LLM Simulador
                </Link>
            </nav>
        </header>
    );
};
