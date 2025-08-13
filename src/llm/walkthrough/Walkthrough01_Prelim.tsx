import React from "react";
import { Phase } from "./Walkthrough";
import {
    commentary,
    IWalkthroughArgs,
    setInitialCamera,
} from "./WalkthroughTools";
import s from "./Walkthrough.module.scss";
import { Vec3 } from "@/src/utils/vector";

let minGptLink = "https://github.com/karpathy/minGPT";
let pytorchLink = "https://pytorch.org/";
let andrejLink = "https://karpathy.ai/";
let zeroToHeroLink = "https://karpathy.ai/zero-to-hero.html";

export function walkthrough01_Prelim(args: IWalkthroughArgs) {
    let { state, walkthrough: wt } = args;

    if (wt.phase !== Phase.Intro_Prelim) {
        return;
    }

    setInitialCamera(
        state,
        new Vec3(184.744, 0.0, -636.82),
        new Vec3(296.0, 16.0, 13.5)
    );

    let c0 = commentary(wt, null, 0)`
    Antes de adentrarnos en los detalles del algoritmo, demos un pequeño paso atrás.

    Esta guía se enfoca en la _inferencia_, no en el entrenamiento, y por lo tanto representa solo una pequeña parte de todo el proceso de aprendizaje automático.
    En nuestro caso, los pesos del modelo ya han sido preentrenados, y utilizamos el proceso de inferencia para generar la salida. Esto se ejecuta directamente en tu navegador.

    El modelo que mostramos aquí forma parte de la familia GPT (*Generative Pre-trained Transformer*), que puede describirse como un “predictor de tokens basado en contexto”.
    OpenAI presentó esta familia en 2018, con miembros destacados como GPT-2, GPT-3 y GPT-3.5 Turbo, este último siendo la base de ChatGPT, ampliamente utilizado.
    También podría estar relacionado con GPT-4, aunque los detalles específicos siguen siendo desconocidos.

    Esta guía está inspirada en el proyecto ${embedLink(
        "minGPT",
        minGptLink
    )} de GitHub, una implementación mínima de GPT en ${embedLink(
        "PyTorch",
        pytorchLink
    )},
    creada por ${embedLink("Andrej Karpathy", andrejLink)}.
    Su serie en YouTube ${embedLink(
        "Neural Networks: Zero to Hero",
        zeroToHeroLink
    )} y el proyecto minGPT han sido recursos invaluables para la creación de esta guía.
    El modelo de ejemplo que presentamos aquí está basado en uno incluido en el proyecto minGPT.

    ¡Muy bien, comencemos!
    `;
}

export function embedLink(a: React.ReactNode, href: string) {
    return embedInline(
        <a
            className={s.externalLink}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
        >
            {a}
        </a>
    );
}

export function embedInline(a: React.ReactNode) {
    return { insertInline: a };
}

// Otro modelo similar es BERT (*Bidirectional Encoder Representations from Transformers*), un “codificador de texto consciente del contexto”
// comúnmente usado para tareas como clasificación de documentos y búsqueda.
// Modelos más recientes, como LLaMA (*Large Language Model Architecture*) de Facebook, continúan utilizando
// una arquitectura *transformer* similar, aunque con algunas diferencias menores.
