"use client";

import React from "react";
import { InfoButton } from "@/src/llm/WelcomePopup";
import "./llm-theory.scss";
import { Header } from "@/src/homepage/Header";

export default function LLMTheoryContent() {
    return (
        <>
            <Header title="LLM Teoría - La Guía Definitiva">
                <InfoButton />
            </Header>

            <main className="llm-theory-container">
                <nav className="floating-nav">
                    <a href="#introduccion" className="nav-item">
                        Introducción
                    </a>
                    <a href="#fundamentos" className="nav-item">
                        Fundamentos
                    </a>
                    <a href="#matematicas" className="nav-item">
                        Matemáticas
                    </a>
                    <a href="#arquitectura" className="nav-item">
                        Arquitectura
                    </a>
                    <a href="#atencion" className="nav-item">
                        Atención
                    </a>
                    <a href="#entrenamiento" className="nav-item">
                        Entrenamiento
                    </a>
                    <a href="#aplicaciones" className="nav-item">
                        Aplicaciones
                    </a>
                </nav>

                <section
                    id="introduccion"
                    className="theory-section hero-section"
                >
                    <div className="section-content">
                        <h1 className="main-title">LLM Teoría</h1>

                        <div className="intro-grid">
                            <div className="intro-card">
                                <h3>¿Qué vas a aprender?</h3>
                                <ul>
                                    <li>
                                        Los fundamentos matemáticos detrás de
                                        los LLMs
                                    </li>
                                    <li>
                                        Cómo funciona la arquitectura
                                        Transformer
                                    </li>
                                    <li>
                                        Mecanismos de atención y su importancia
                                    </li>
                                    <li>
                                        Técnicas de entrenamiento y optimización
                                    </li>
                                    <li>
                                        Aplicaciones prácticas y casos de uso
                                    </li>
                                </ul>
                            </div>

                            <div className="intro-card">
                                <h3>Enfoque Científico</h3>
                                <p>
                                    Esta guía combina rigor académico con
                                    explicaciones accesibles. Cada concepto se
                                    explica desde múltiples perspectivas:
                                    matemática, visual e intuitiva.
                                </p>
                                <p>
                                    <strong>
                                        Incluye demos interactivas, ecuaciones
                                        paso a paso y visualizaciones 3D.
                                    </strong>
                                </p>
                            </div>

                            <div className="intro-card">
                                <h3>Impacto Global</h3>
                                <p>
                                    Los LLMs están transformando la sociedad.
                                    Desde ChatGPT hasta GPT-4, estos modelos
                                    están redefiniendo:
                                </p>
                                <ul>
                                    <li>
                                        Cómo interactuamos con la información
                                    </li>
                                    <li>
                                        El futuro del trabajo y la creatividad
                                    </li>
                                    <li>
                                        Las fronteras de la inteligencia
                                        artificial
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="timeline-preview">
                            <h3>Evolución de los LLMs</h3>
                            <div className="timeline">
                                <div className="timeline-item">
                                    <div className="year">2017</div>
                                    <div className="event">
                                        Paper "Attention Is All You Need"
                                    </div>
                                </div>
                                <div className="timeline-item">
                                    <div className="year">2018</div>
                                    <div className="event">
                                        BERT - Pre-training
                                    </div>
                                </div>
                                <div className="timeline-item">
                                    <div className="year">2019</div>
                                    <div className="event">
                                        GPT-2 - 1.5B parámetros
                                    </div>
                                </div>
                                <div className="timeline-item">
                                    <div className="year">2020</div>
                                    <div className="event">
                                        GPT-3 - 175B parámetros
                                    </div>
                                </div>
                                <div className="timeline-item">
                                    <div className="year">2022</div>
                                    <div className="event">
                                        ChatGPT - Revolución
                                    </div>
                                </div>
                                <div className="timeline-item">
                                    <div className="year">2023</div>
                                    <div className="event">
                                        GPT-4 - Multimodal
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section id="fundamentos" className="theory-section">
                    <div className="section-content">
                        <h2 className="section-title">
                            Fundamentos de Redes Neuronales
                        </h2>

                        <div className="content-grid">
                            <div className="text-content">
                                <h3>¿Qué es una Red Neuronal?</h3>
                                <p>
                                    Una red neuronal es un modelo computacional
                                    inspirado en el funcionamiento del cerebro
                                    humano. Consiste en capas de{" "}
                                    <strong>neuronas artificiales</strong>{" "}
                                    interconectadas que procesan información de
                                    manera paralela.
                                </p>

                                <h4>Componentes Básicos:</h4>
                                <ul>
                                    <li>
                                        <strong>Neuronas</strong>: Unidades de
                                        procesamiento básicas
                                    </li>
                                    <li>
                                        <strong>Pesos (Weights)</strong>:
                                        Conexiones entre neuronas
                                    </li>
                                    <li>
                                        <strong>Bias</strong>: Término
                                        independiente para ajustar la salida
                                    </li>
                                    <li>
                                        <strong>Función de Activación</strong>:
                                        Introduce no-linealidad
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="equation-section">
                            <h3>La Ecuación Fundamental</h3>
                            <p>
                                La operación básica de una neurona se puede
                                expresar matemáticamente como:
                            </p>
                            <div className="equation-block">
                                <div className="equation">
                                    y = f(∑(w<sub>i</sub> × x<sub>i</sub>) + b)
                                </div>
                                <p className="explanation">
                                    Donde: y = salida, f = función de
                                    activación, w<sub>i</sub> = pesos, x
                                    <sub>i</sub> = entradas, b = bias
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                <section id="matematicas" className="theory-section">
                    <div className="section-content">
                        <h2 className="section-title">
                            Fundamentos Matemáticos
                        </h2>

                        <div className="math-grid">
                            <div className="math-card">
                                <h3>Álgebra Lineal</h3>
                                <p>
                                    Los LLMs operan principalmente con matrices
                                    y vectores. Las operaciones fundamentales
                                    incluyen:
                                </p>
                                <div className="equation-block">
                                    <div className="equation">C = AB</div>
                                    <p className="explanation">
                                        Operación central en todas las capas de
                                        la red
                                    </p>
                                </div>
                            </div>

                            <div className="math-card">
                                <h3>Probabilidad</h3>
                                <p>
                                    Los LLMs son modelos probabilísticos que
                                    predicen la probabilidad de secuencias de
                                    texto:
                                </p>
                                <div className="equation-block">
                                    <div className="equation">
                                        P(w<sub>1</sub>, w<sub>2</sub>, ..., w
                                        <sub>n</sub>) = ∏P(w<sub>i</sub> | w
                                        <sub>1</sub>, ..., w<sub>i-1</sub>)
                                    </div>
                                    <p className="explanation">
                                        Probabilidad conjunta de una secuencia
                                        de palabras
                                    </p>
                                </div>
                            </div>

                            <div className="math-card">
                                <h3>Cálculo</h3>
                                <p>
                                    El entrenamiento utiliza cálculo diferencial
                                    para optimizar los parámetros:
                                </p>
                                <div className="equation-block">
                                    <div className="equation">
                                        θ<sub>t+1</sub> = θ<sub>t</sub> - α∇
                                        <sub>θ</sub>L(θ)
                                    </div>
                                    <p className="explanation">
                                        Actualización de parámetros usando
                                        gradientes
                                    </p>
                                </div>
                            </div>

                            <div className="math-card">
                                <h3>Teoría de la Información</h3>
                                <p>
                                    Los conceptos de entropía y información
                                    mutua son centrales:
                                </p>
                                <div className="equation-block">
                                    <div className="equation">
                                        H(p, q) = -∑p<sub>i</sub> log q
                                        <sub>i</sub>
                                    </div>
                                    <p className="explanation">
                                        Función de pérdida común en
                                        clasificación
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section id="arquitectura" className="theory-section">
                    <div className="section-content">
                        <h2 className="section-title">
                            Arquitectura Transformer
                        </h2>

                        <div className="content-grid">
                            <div className="text-content">
                                <h3>Revolución Transformer</h3>
                                <p>
                                    La arquitectura Transformer, introducida en
                                    el paper "Attention Is All You Need" (2017),
                                    revolucionó el procesamiento de lenguaje
                                    natural al eliminar la recurrencia y basarse
                                    completamente en mecanismos de atención.
                                </p>

                                <h4>Ventajas Clave:</h4>
                                <ul>
                                    <li>
                                        <strong>Paralelización</strong>: No hay
                                        dependencias secuenciales
                                    </li>
                                    <li>
                                        <strong>Atención Global</strong>: Cada
                                        token puede atender a todos los demás
                                    </li>
                                    <li>
                                        <strong>Escalabilidad</strong>: Funciona
                                        bien con modelos muy grandes
                                    </li>
                                    <li>
                                        <strong>Transfer Learning</strong>:
                                        Excelente para fine-tuning
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="equation-section">
                            <h3>Ecuación del Transformer</h3>
                            <p>
                                La operación fundamental de una capa
                                Transformer:
                            </p>
                            <div className="equation-block">
                                <div className="equation">
                                    Attention(Q,K,V) = softmax(QK<sup>T</sup>/√d
                                    <sub>k</sub>)V
                                </div>
                                <p className="explanation">
                                    Q=Query, K=Key, V=Value, d<sub>k</sub>
                                    =dimensión de las keys
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                <section id="atencion" className="theory-section">
                    <div className="section-content">
                        <h2 className="section-title">Mecanismo de Atención</h2>

                        <div className="content-grid">
                            <div className="text-content">
                                <h3>¿Qué es la Atención?</h3>
                                <p>
                                    El mecanismo de atención permite al modelo
                                    enfocarse en diferentes partes de la entrada
                                    cuando procesa cada elemento. Es análogo a
                                    cómo los humanos prestamos atención a
                                    diferentes palabras cuando leemos una
                                    oración.
                                </p>

                                <h4>Conceptos Clave:</h4>
                                <ul>
                                    <li>
                                        <strong>Query (Q)</strong>: "¿Qué estoy
                                        buscando?"
                                    </li>
                                    <li>
                                        <strong>Key (K)</strong>: "¿Qué
                                        información tengo?"
                                    </li>
                                    <li>
                                        <strong>Value (V)</strong>: "¿Cuál es
                                        esa información?"
                                    </li>
                                    <li>
                                        <strong>Attention Weights</strong>:
                                        "¿Qué tan relevante es cada parte?"
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="equation-section">
                            <h3>Matemáticas de la Atención</h3>
                            <div className="equation-block">
                                <div className="equation">
                                    Attention(Q,K,V) = softmax(QK<sup>T</sup>/√d
                                    <sub>k</sub>)V
                                </div>
                                <p className="explanation">
                                    La ecuación fundamental del mecanismo de
                                    atención
                                </p>
                            </div>

                            <div className="step-by-step">
                                <h4>Paso a Paso:</h4>
                                <ol>
                                    <li>
                                        <strong>Similitud</strong>: Calcula QK
                                        <sup>T</sup> para medir similitudes
                                    </li>
                                    <li>
                                        <strong>Escalado</strong>: Divide por √d
                                        <sub>k</sub> para estabilizar gradientes
                                    </li>
                                    <li>
                                        <strong>Normalización</strong>: Aplica
                                        softmax para obtener probabilidades
                                    </li>
                                    <li>
                                        <strong>Combinación</strong>: Multiplica
                                        por V para obtener la salida
                                    </li>
                                </ol>
                            </div>
                        </div>

                        <div className="multihead-section">
                            <h3>Multi-Head Attention</h3>
                            <p>
                                En lugar de usar una sola función de atención,
                                el modelo usa múltiples "cabezas" que pueden
                                aprender diferentes tipos de relaciones:
                            </p>

                            <div className="equation-block">
                                <div className="equation">
                                    MultiHead(Q,K,V) = Concat(head<sub>1</sub>,
                                    ..., head<sub>h</sub>)W<sup>O</sup>
                                </div>
                                <p className="explanation">
                                    Cada cabeza aprende diferentes patrones de
                                    atención
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                <section id="entrenamiento" className="theory-section">
                    <div className="section-content">
                        <h2 className="section-title">Entrenamiento de LLMs</h2>

                        <div className="training-overview">
                            <h3>Fases del Entrenamiento</h3>
                            <div className="phase-grid">
                                <div className="phase-card">
                                    <h4>1. Pre-entrenamiento</h4>
                                    <p>
                                        El modelo aprende patrones del lenguaje
                                        prediciendo la siguiente palabra en
                                        enormes cantidades de texto.
                                    </p>
                                    <ul>
                                        <li>Datos: Terabytes de texto</li>
                                        <li>Objetivo: Modelado de lenguaje</li>
                                        <li>Duración: Semanas/meses</li>
                                    </ul>
                                </div>

                                <div className="phase-card">
                                    <h4>2. Fine-tuning</h4>
                                    <p>
                                        Ajuste fino en tareas específicas o para
                                        seguir instrucciones humanas.
                                    </p>
                                    <ul>
                                        <li>Datos: Datasets específicos</li>
                                        <li>Objetivo: Tarea específica</li>
                                        <li>Duración: Horas/días</li>
                                    </ul>
                                </div>

                                <div className="phase-card">
                                    <h4>3. RLHF</h4>
                                    <p>
                                        Reinforcement Learning from Human
                                        Feedback para alinear con preferencias
                                        humanas.
                                    </p>
                                    <ul>
                                        <li>Datos: Comparaciones humanas</li>
                                        <li>Objetivo: Alineación</li>
                                        <li>Duración: Días/semanas</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section id="aplicaciones" className="theory-section">
                    <div className="section-content">
                        <h2 className="section-title">
                            Aplicaciones y Técnicas Avanzadas
                        </h2>

                        <div className="applications-grid">
                            <div className="app-category">
                                <h3>Generación de Texto</h3>
                                <p>
                                    Los LLMs pueden generar texto coherente y
                                    contextualmente relevante para una amplia
                                    variedad de aplicaciones.
                                </p>
                            </div>

                            <div className="app-category">
                                <h3>Búsqueda y Decodificación</h3>
                                <p>
                                    Técnicas como beam search y sampling
                                    permiten controlar la calidad y diversidad
                                    del texto generado.
                                </p>
                            </div>

                            <div className="app-category">
                                <h3>Análisis y Comprensión</h3>
                                <p>
                                    Los modelos pueden analizar, resumir y
                                    extraer información clave de textos largos y
                                    complejos.
                                </p>
                            </div>
                        </div>

                        <div className="real-world-applications">
                            <h3>Aplicaciones del Mundo Real</h3>
                            <div className="application-showcase">
                                <div className="app-card">
                                    <h4>Programación</h4>
                                    <ul>
                                        <li>GitHub Copilot</li>
                                        <li>Generación de código</li>
                                        <li>Debug automático</li>
                                        <li>Documentación</li>
                                    </ul>
                                </div>

                                <div className="app-card">
                                    <h4>Creatividad</h4>
                                    <ul>
                                        <li>Escritura creativa</li>
                                        <li>Generación de ideas</li>
                                        <li>Traducción literaria</li>
                                        <li>Guiones y diálogos</li>
                                    </ul>
                                </div>

                                <div className="app-card">
                                    <h4>Investigación</h4>
                                    <ul>
                                        <li>Análisis de literatura</li>
                                        <li>Hipótesis científicas</li>
                                        <li>Resúmenes automáticos</li>
                                        <li>Peer review asistido</li>
                                    </ul>
                                </div>

                                <div className="app-card">
                                    <h4>Educación</h4>
                                    <ul>
                                        <li>Tutorías personalizadas</li>
                                        <li>Generación de ejercicios</li>
                                        <li>Explicaciones adaptativas</li>
                                        <li>Corrección automática</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="future-directions">
                            <h3>Direcciones Futuras</h3>
                            <div className="future-grid">
                                <div className="future-card">
                                    <h4>
                                        AGI (Artificial General Intelligence)
                                    </h4>
                                    <p>
                                        Los LLMs están siendo considerados como
                                        un paso hacia la inteligencia artificial
                                        general, sistemas que pueden realizar
                                        cualquier tarea intelectual humana.
                                    </p>
                                </div>

                                <div className="future-card">
                                    <h4>Multimodalidad</h4>
                                    <p>
                                        Integración de texto, imagen, audio y
                                        video en modelos unificados como GPT-4V
                                        y DALL-E.
                                    </p>
                                </div>

                                <div className="future-card">
                                    <h4>Eficiencia</h4>
                                    <p>
                                        Desarrollo de modelos más eficientes
                                        mediante técnicas como quantización,
                                        pruning y destilación.
                                    </p>
                                </div>

                                <div className="future-card">
                                    <h4>Seguridad y Alineación</h4>
                                    <p>
                                        Investigación en seguridad de IA para
                                        asegurar que los modelos actúen de
                                        acuerdo con valores humanos.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="conclusion-section">
                            <h3>Conclusiones</h3>
                            <div className="conclusion-content">
                                <p>
                                    Los Modelos de Lenguaje Grandes representan
                                    uno de los avances más significativos en la
                                    historia de la inteligencia artificial. Su
                                    capacidad para comprender y generar lenguaje
                                    natural con una calidad casi humana ha
                                    abierto posibilidades antes inimaginables.
                                </p>

                                <div className="key-insights">
                                    <h4>Insights Clave:</h4>
                                    <ul>
                                        <li>
                                            <strong>Escalado es clave</strong>:
                                            Más datos, más parámetros, más
                                            cómputo = mejor rendimiento
                                        </li>
                                        <li>
                                            <strong>
                                                Arquitectura Transformer
                                            </strong>
                                            : La atención lo cambió todo
                                        </li>
                                        <li>
                                            <strong>
                                                Capacidades emergentes
                                            </strong>
                                            : Habilidades que surgen con el
                                            tamaño
                                        </li>
                                        <li>
                                            <strong>Transfer Learning</strong>:
                                            Un modelo, múltiples tareas
                                        </li>
                                    </ul>
                                </div>

                                <div className="final-thoughts">
                                    <p>
                                        <strong>
                                            El futuro de la IA es increíblemente
                                            prometedor.
                                        </strong>{" "}
                                        Estamos presenciando el amanecer de una
                                        nueva era donde las máquinas pueden
                                        entender, razonar y crear con un nivel
                                        de sofisticación previamente reservado
                                        para la inteligencia humana.
                                    </p>
                                    <p>
                                        Sin embargo, con gran poder viene gran
                                        responsabilidad. Es crucial que
                                        desarrollemos estos sistemas de manera
                                        ética, segura y beneficial para toda la
                                        humanidad.
                                    </p>
                                    <p>
                                        <strong>
                                            Mantente curioso. El futuro
                                            pertenece a quienes entienden estas
                                            máquinas extraordinarias.
                                        </strong>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}
