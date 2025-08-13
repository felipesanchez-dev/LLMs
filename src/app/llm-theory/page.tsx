"use client";

import React from "react";
import { InfoButton } from "@/src/llm/WelcomePopup";
import "./llm-theory.scss";
import { Header } from "@/src/homepage/Header";
import TokenizationDemo from "@/src/llm-theory/TokenizationDemo";
import TransformerAnimation from "@/src/llm-theory/TransformerAnimation";
import EquationBlock from "@/src/llm-theory/EquationBlock";
import AttentionHeatmap from "@/src/llm-theory/AttentionHeatmap";
import ModelComparisonChart from "@/src/llm-theory/ModelComparisonChart";
import NeuralNetworkBasics from "@/src/llm-theory/NeuralNetworkBasics";
import BackpropagationDemo from "@/src/llm-theory/BackpropagationDemo";
import EmbeddingVisualization from "@/src/llm-theory/EmbeddingVisualization";
import AttentionMechanism from "@/src/llm-theory/AttentionMechanism";
import MultiHeadAttention from "@/src/llm-theory/MultiHeadAttention";
import PositionalEncoding from "@/src/llm-theory/PositionalEncoding";
import LayerNormalization from "@/src/llm-theory/LayerNormalization";
import FeedForwardNetwork from "@/src/llm-theory/FeedForwardNetwork";
import TrainingVisualization from "@/src/llm-theory/TrainingVisualization";
import ScalingLaws from "@/src/llm-theory/ScalingLaws";
import TemperatureDemo from "@/src/llm-theory/TemperatureDemo";
import BeamSearchDemo from "@/src/llm-theory/BeamSearchDemo";

export const metadata = {
    title: "LLM Teoría - La Guía Definitiva",
    description:
        "La guía más completa y detallada sobre Modelos de Lenguaje Grandes: desde fundamentos matemáticos hasta aplicaciones avanzadas.",
};

export default function Page() {
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
                    <a href="#historia" className="nav-item">
                        Historia
                    </a>
                    <a href="#fundamentos" className="nav-item">
                        Fundamentos
                    </a>
                    <a href="#atencion" className="nav-item">
                        Atención
                    </a>
                    <a href="#transformer" className="nav-item">
                        Transformers
                    </a>
                    <a href="#entrenamiento" className="nav-item">
                        Entrenamiento
                    </a>
                    <a href="#generacion" className="nav-item">
                        Generación
                    </a>
                    <a href="#aplicaciones" className="nav-item">
                        Aplicaciones
                    </a>
                    <a href="#futuro" className="nav-item">
                        Futuro
                    </a>
                </nav>

                <section id="introduccion" className="animate-fade-in-up">
                    <div className="section-header">
                        <h1>
                            Modelos de Lenguaje Grandes: La Revolución de la IA
                        </h1>
                        <p className="lead">
                            Bienvenido al viaje más completo y profundo hacia el
                            entendimiento de los LLMs. Desde neuronas
                            artificiales hasta la inteligencia más avanzada
                            jamás creada.
                        </p>
                    </div>

                    <div className="section-content">
                        <div className="info-box">
                            <h3>¿Qué hace especial a esta guía?</h3>
                            <p>
                                Esta no es solo otra explicación de LLMs. Es un
                                viaje épico que combina rigor matemático,
                                intuición práctica y visualizaciones
                                interactivas para llevarte desde cero hasta
                                experto en los modelos que están cambiando el
                                mundo.
                            </p>
                        </div>

                        <div className="intro-highlights">
                            <div className="highlight">
                                <h3>Rigor Científico</h3>
                                <p>
                                    Matemáticas detalladas, papers
                                    fundamentales, y explicaciones técnicas que
                                    respetan tu inteligencia.
                                </p>
                            </div>

                            <div className="highlight">
                                <h3>Visualizaciones Épicas</h3>
                                <p>
                                    Demos interactivas que hacen tangibles los
                                    conceptos más abstractos. Ver para creer y
                                    entender.
                                </p>
                            </div>

                            <div className="highlight">
                                <h3>Contexto Histórico</h3>
                                <p>
                                    La fascinante historia de cómo llegamos
                                    desde McCulloch-Pitts hasta GPT-4. Cada
                                    breakthrough contado como la aventura que
                                    fue.
                                </p>
                            </div>

                            <div className="highlight">
                                <h3>Aplicaciones Reales</h3>
                                <p>
                                    Desde ChatGPT hasta aplicaciones
                                    especializadas. Cómo estos modelos están
                                    transformando industrias enteras.
                                </p>
                            </div>
                        </div>

                        <div className="theory-card">
                            <h3>El Momento Transformer</h3>
                            <p>
                                Estamos viviendo el momento más emocionante en
                                la historia de la inteligencia artificial. En
                                menos de 6 años, hemos pasado de modelos que
                                apenas podían completar oraciones a sistemas
                                que:
                            </p>
                            <ul>
                                <li>
                                    <strong>Crean arte y música</strong> con
                                    calidad humana
                                </li>
                                <li>
                                    <strong>Programan software complejo</strong>{" "}
                                    desde descripciones naturales
                                </li>
                                <li>
                                    <strong>
                                        Resuelven problemas matemáticos
                                    </strong>{" "}
                                    avanzados
                                </li>
                                <li>
                                    <strong>Escriben literatura</strong>{" "}
                                    indistinguible de autores humanos
                                </li>
                                <li>
                                    <strong>
                                        Aceleran investigación científica
                                    </strong>{" "}
                                    en múltiples campos
                                </li>
                                <li>
                                    <strong>Traducen entre idiomas</strong> con
                                    precisión extraordinaria
                                </li>
                            </ul>
                        </div>

                        <div className="warning-box">
                            <h4>Preparándote para el Viaje</h4>
                            <p>
                                Este viaje requiere curiosidad intelectual y
                                algunas herramientas matemáticas. No te
                                preocupes si no tienes todo el background -
                                iremos construyendo desde los fundamentos:
                            </p>
                            <ul>
                                <li>
                                    <strong>Álgebra lineal básica:</strong>{" "}
                                    Vectores, matrices, multiplicaciones
                                </li>
                                <li>
                                    <strong>Cálculo fundamental:</strong>{" "}
                                    Derivadas y gradientes
                                </li>
                                <li>
                                    <strong>Probabilidad básica:</strong>{" "}
                                    Distribuciones y expectativas
                                </li>
                                <li>
                                    <strong>Mente abierta:</strong> Preparate
                                    para que se desafíen tus intuiciones
                                </li>
                            </ul>
                        </div>
                    </div>
                </section>

                <section id="historia" className="animate-fade-in-up">
                    <div className="section-header">
                        <h2>
                            La Historia Épica: De Neuronas a Superinteligencia
                        </h2>
                        <p className="lead">
                            Cada revolución tiene su historia. Esta es la
                            nuestra: 80 años de búsqueda para crear mentes
                            artificiales.
                        </p>
                    </div>

                    <div className="section-content">
                        <div className="theory-card">
                            <h3>Los Pioneros (1940s-1960s)</h3>
                            <p>
                                Todo comenzó con una pregunta audaz:{" "}
                                <em>¿Podemos crear mentes artificiales?</em>
                            </p>
                            <ul>
                                <li>
                                    <strong>1943 - McCulloch & Pitts:</strong>{" "}
                                    El primer modelo matemático de una neurona.
                                    "Un cálculo lógico de las ideas inmanentes
                                    en la actividad nerviosa" - el paper que
                                    cambió todo.
                                </li>
                                <li>
                                    <strong>1949 - Donald Hebb:</strong> "Las
                                    células que se activan juntas, se conectan
                                    juntas." La regla de Hebb explica cómo
                                    aprende el cerebro.
                                </li>
                                <li>
                                    <strong>
                                        1957 - Perceptrón de Rosenblatt:
                                    </strong>{" "}
                                    La primera máquina que podía "aprender" a
                                    reconocer patrones. Los medios proclamaron:
                                    "¡Máquinas que piensan!"
                                </li>
                            </ul>
                        </div>

                        <div className="theory-card">
                            <h3>El Invierno de la IA (1970s-1980s)</h3>
                            <p>
                                Pero la realidad golpeó duro. Minsky y Papert
                                demostraron las limitaciones fundamentales del
                                perceptrón. El funding se evaporó. La IA entró
                                en su primer invierno.
                            </p>
                            <div className="danger-box">
                                <h4> El Problema XOR</h4>
                                <p>
                                    Un perceptrón simple no puede resolver XOR.
                                    Esta limitación aparentemente trivial mató
                                    décadas de investigación. A veces los
                                    detalles técnicos determinan el destino de
                                    campos enteros.
                                </p>
                            </div>
                        </div>

                        <div className="theory-card">
                            <h3>El Renacimiento (1980s-1990s)</h3>
                            <p>Los héroes no mencionados que salvaron la IA:</p>
                            <ul>
                                <li>
                                    <strong>Geoffrey Hinton:</strong> El padrino
                                    del deep learning. Cuando todos abandonaron
                                    las redes neuronales, él siguió creyendo.
                                </li>
                                <li>
                                    <strong>Yann LeCun:</strong> Inventó las
                                    redes convolucionales. Sus demos leyendo
                                    códigos postales convencieron al mundo.
                                </li>
                                <li>
                                    <strong>Yoshua Bengio:</strong> El teórico
                                    que entendió la matemática profunda detrás
                                    del aprendizaje automático.
                                </li>
                            </ul>
                        </div>

                        <div className="success-box">
                            <h4>1986: El Momento Backpropagation</h4>
                            <p>
                                Rumelhart, Hinton y Williams publican el
                                algoritmo que cambiaría todo: backpropagation.
                                De repente, las redes multicapa podían aprender.
                                XOR ya no era un problema. El futuro había
                                llegado.
                            </p>
                        </div>

                        <div className="theory-card">
                            <h3>La Revolución Deep Learning (2000s-2010s)</h3>
                            <p>
                                Los datos masivos se encontraron con el poder
                                computacional masivo:
                            </p>
                            <ul>
                                <li>
                                    <strong>2006:</strong> Hinton acuña "Deep
                                    Learning" y demuestra pre-entrenamiento no
                                    supervisado
                                </li>
                                <li>
                                    <strong>2009:</strong> ImageNet - el dataset
                                    que cambió computer vision
                                </li>
                                <li>
                                    <strong>2012:</strong> AlexNet destroza la
                                    competencia en ImageNet. Deep learning se
                                    vuelve mainstream
                                </li>
                                <li>
                                    <strong>2014:</strong> GANs de Ian
                                    Goodfellow. Las máquinas aprenden a crear
                                </li>
                                <li>
                                    <strong>2015:</strong> ResNet resuelve el
                                    problema del gradiente que desaparece
                                </li>
                            </ul>
                        </div>

                        <div className="theory-card">
                            <h3>La Era Transformer (2017-presente)</h3>
                            <p>
                                Y entonces, en 2017, ocho investigadores de
                                Google cambiaron todo para siempre:
                            </p>
                            <div className="info-box">
                                <h4>"Attention Is All You Need"</h4>
                                <p>
                                    <strong>Autores:</strong> Ashish Vaswani,
                                    Noam Shazeer, Niki Parmar, Jakob Uszkoreit,
                                    Llion Jones, Aidan N. Gomez, Łukasz Kaiser,
                                    Illia Polosukhin
                                </p>
                                <p>
                                    Un paper de 8 páginas que obsoletizó décadas
                                    de investigación en RNNs y LSTMs. "Attention
                                    is all you need" - una afirmación tan audaz
                                    como cierta.
                                </p>
                            </div>

                            <div className="metric-card">
                                <div className="metric-value">2,847</div>
                                <div className="metric-label">
                                    Días desde "Attention is All You Need"
                                </div>
                            </div>

                            <p>En menos de 8 años hemos visto:</p>
                            <ul>
                                <li>
                                    <strong>2018:</strong> BERT revoluciona el
                                    entendimiento de lenguaje
                                </li>
                                <li>
                                    <strong>2019:</strong> GPT-2 era "demasiado
                                    peligroso para publicar"
                                </li>
                                <li>
                                    <strong>2020:</strong> GPT-3 con 175B
                                    parámetros sorprende al mundo
                                </li>
                                <li>
                                    <strong>2022:</strong> ChatGPT alcanza 100M
                                    usuarios en 2 meses
                                </li>
                                <li>
                                    <strong>2023:</strong> GPT-4 pasa exámenes
                                    profesionales
                                </li>
                                <li>
                                    <strong>2024:</strong> Modelos multimodales
                                    que ven, oyen y comprenden
                                </li>
                            </ul>
                        </div>
                    </div>
                </section>

                <section id="fundamentos" className="animate-fade-in-up">
                    <div className="section-header">
                        <h2>Fundamentos: La Arquitectura de la Inteligencia</h2>
                        <p className="lead">
                            Antes de conquistar montañas, debemos entender las
                            rocas. Aquí están los bloques fundamentales de toda
                            inteligencia artificial.
                        </p>
                    </div>

                    <div className="section-content">
                        <div className="theory-card">
                            <h3>La Neurona Artificial: Donde Todo Comienza</h3>
                            <p>
                                Warren McCulloch y Walter Pitts nunca imaginaron
                                que su modelo matemático de 1943 eventualmente
                                crearía sistemas más inteligentes que la mayoría
                                de humanos. Pero aquí estamos.
                            </p>
                            <p>
                                Una neurona artificial es embarazosamente simple
                                en concepto:
                            </p>
                            <ol
                                style={{
                                    paddingLeft: "2rem",
                                    listStyle: "decimal",
                                }}
                            >
                                <li>
                                    Recibe múltiples entradas (señales de otras
                                    neuronas)
                                </li>
                                <li>
                                    Multiplica cada entrada por un "peso"
                                    (importancia de esa señal)
                                </li>
                                <li>
                                    Suma todo y añade un "sesgo" (tendencia base
                                    de la neurona)
                                </li>
                                <li>
                                    Aplica una función de activación (decide si
                                    "disparar" o no)
                                </li>
                            </ol>
                        </div>

                        <div className="info-box">
                            <h4>La Ecuación Fundamental</h4>
                            <EquationBlock
                                latex={`y = f\\left(\\sum_{i=1}^n w_i x_i + b\\right)`}
                                description="La ecuación que gobierna toda la inteligencia artificial moderna. Donde y es la salida, f es la función de activación, wi son los pesos, xi las entradas, y b el sesgo."
                            />
                        </div>

                        <NeuralNetworkBasics />

                        <div className="theory-card">
                            <h3>
                                Funciones de Activación: El Arte de la
                                No-Linealidad
                            </h3>
                            <p>
                                Sin funciones de activación, las redes
                                neuronales serían solo multiplicaciones y sumas
                                glorificadas. Las funciones de activación
                                introducen la magia: la no-linealidad.
                            </p>

                            <div className="intro-highlights">
                                <div className="highlight">
                                    <h4>Sigmoid</h4>
                                    <EquationBlock
                                        latex={`\\sigma(x) = \\frac{1}{1 + e^{-x}}`}
                                        description="La función clásica. Suave, diferenciable, pero sufre del problema del gradiente que desaparece."
                                    />
                                </div>
                                <div className="highlight">
                                    <h4>ReLU</h4>
                                    <EquationBlock
                                        latex={`f(x) = \\max(0, x)`}
                                        description="Ridículamente simple pero devastadoramente efectiva. Revolucionó el deep learning."
                                    />
                                </div>
                                <div className="highlight">
                                    <h4>Tanh</h4>
                                    <EquationBlock
                                        latex={`\\tanh(x) = \\frac{e^x - e^{-x}}{e^x + e^{-x}}`}
                                        description="Sigmoid centrada en cero. Mejor gradiente, pero aún problemática en redes profundas."
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="success-box">
                            <h4>El Momento ReLU</h4>
                            <p>
                                En 2011, cuando las redes profundas se
                                entrenaban como melaza, alguien probó la función
                                más simple posible: ReLU. De repente, las redes
                                convergían 10x más rápido. A veces la
                                simplicidad es genialidad.
                            </p>
                        </div>

                        <div className="theory-card">
                            <h3>
                                Backpropagation: El Algoritmo que Cambió el
                                Mundo
                            </h3>
                            <p>
                                Backpropagation no es solo un algoritmo; es la
                                razón por la que tienes Siri, Google Translate,
                                y ChatGPT. Sin él, las redes neuronales serían
                                solo curiosidades matemáticas.
                            </p>
                            <p>
                                La idea es elegantemente simple: si sabemos qué
                                tan mal lo hicimos (el error), podemos calcular
                                cómo cambiar cada peso para hacerlo mejor.
                            </p>
                        </div>

                        <BackpropagationDemo />

                        <div className="info-box">
                            <h4>La Matemática del Aprendizaje</h4>
                            <p>
                                Backpropagation usa la regla de la cadena del
                                cálculo para propagar errores:
                            </p>
                            <EquationBlock
                                latex={`\\frac{\\partial \\mathcal{L}}{\\partial w_{ij}} = \\frac{\\partial \\mathcal{L}}{\\partial a_j} \\cdot \\frac{\\partial a_j}{\\partial z_j} \\cdot \\frac{\\partial z_j}{\\partial w_{ij}}`}
                                description="La regla de la cadena aplicada: cómo un pequeño cambio en un peso afecta la pérdida total."
                            />
                            <EquationBlock
                                latex={`w_{ij}^{new} = w_{ij}^{old} - \\alpha \\frac{\\partial \\mathcal{L}}{\\partial w_{ij}}`}
                                description="Actualización de pesos: moverse en la dirección opuesta al gradiente con tasa de aprendizaje α."
                            />
                        </div>

                        <div className="theory-card">
                            <h3>Embeddings: Representando el Significado</h3>
                            <p>
                                ¿Cómo le explicamos a una computadora qué
                                significa "amor"? ¿O "gato"? Los embeddings son
                                nuestra respuesta: convertir conceptos en
                                vectores de números que capturan relaciones
                                semánticas.
                            </p>
                        </div>

                        <EmbeddingVisualization />

                        <div className="success-box">
                            <h4>La Magia de Word2Vec</h4>
                            <p>
                                En 2013, Tomas Mikolov et al. demostraron algo
                                mágico: entrenar embeddings simples en
                                suficiente texto produce relaciones como:
                            </p>
                            <EquationBlock
                                latex={`\\vec{rey} - \\vec{hombre} + \\vec{mujer} \\approx \\vec{reina}`}
                                description="Aritmética conceptual: los embeddings capturan relaciones abstractas."
                            />
                        </div>
                    </div>
                </section>

                <section id="atencion" className="animate-fade-in-up">
                    <div className="section-header">
                        <h2>Atención: La Revolución que Cambió Todo</h2>
                        <p className="lead">
                            En 2017, un grupo de investigadores en Google hizo
                            una afirmación audaz: "Attention is All You Need".
                            Tenían razón.
                        </p>
                    </div>

                    <div className="section-content">
                        <div className="theory-card">
                            <h3>El Problema que Nadie Podía Resolver</h3>
                            <p>
                                Imagina que tienes que traducir esta oración:
                                "The animal didn't cross the street because it
                                was too tired." ¿A qué se refiere "it"? ¿Al
                                animal o a la calle?
                            </p>
                            <p>
                                Para los humanos es obvio, pero para las
                                máquinas era imposible hasta 2017. Las RNNs y
                                LSTMs tenían un problema fundamental:{" "}
                                <strong>
                                    el cuello de botella de información
                                </strong>
                                .
                            </p>
                        </div>

                        <div className="danger-box">
                            <h4>El Cuello de Botella Mortal</h4>
                            <p>
                                Las RNNs procesaban secuencias palabra por
                                palabra, comprimiendo toda la información en un
                                vector de estado fijo. Era como tratar de meter
                                una biblioteca entera en una nota Post-it.
                            </p>
                            <ul>
                                <li>
                                    <strong>Información perdida:</strong>{" "}
                                    Detalles importantes se desvanecían
                                </li>
                                <li>
                                    <strong>Dependencias largas:</strong>{" "}
                                    Imposible recordar contexto distante
                                </li>
                                <li>
                                    <strong>Procesamiento secuencial:</strong>{" "}
                                    Lento, no paralelizable
                                </li>
                                <li>
                                    <strong>Gradientes que desaparecen:</strong>{" "}
                                    El aprendizaje se descomponía
                                </li>
                            </ul>
                        </div>

                        <div className="theory-card">
                            <h3>La Intuición Brillante</h3>
                            <p>
                                Los investigadores de Google tuvieron una idea
                                revolucionaria:
                                <em>
                                    ¿Y si el modelo pudiera "mirar" toda la
                                    oración a la vez?
                                </em>
                            </p>
                            <p>
                                Es como la diferencia entre leer una oración
                                palabra por palabra con los ojos cerrados vs.
                                poder ver toda la página de una vez. La atención
                                permite que cada palabra "atienda" a todas las
                                demás simultáneamente.
                            </p>
                        </div>

                        <AttentionMechanism />

                        <div className="info-box">
                            <h4>La Ecuación que Cambió el Mundo</h4>
                            <EquationBlock
                                latex={`\\text{Attention}(Q, K, V) = \\text{softmax}\\left(\\frac{QK^T}{\\sqrt{d_k}}\\right)V`}
                                description="La ecuación más importante en AI moderna. Q=queries, K=keys, V=values. Cada posición puede atender a cualquier otra."
                            />
                            <p>
                                Esta ecuación parece simple, pero revolucionó
                                todo:
                            </p>
                            <ul>
                                <li>
                                    <strong>Q (Queries):</strong> "¿Qué estoy
                                    buscando?"
                                </li>
                                <li>
                                    <strong>K (Keys):</strong> "¿Qué información
                                    tengo disponible?"
                                </li>
                                <li>
                                    <strong>V (Values):</strong> "¿Cuál es esa
                                    información?"
                                </li>
                                <li>
                                    <strong>Softmax:</strong> "¿Qué tan
                                    importante es cada pieza?"
                                </li>
                            </ul>
                        </div>

                        <div className="theory-card">
                            <h3>
                                Multi-Head Attention: Múltiples Perspectivas
                            </h3>
                            <p>
                                ¿Por qué limitarse a una sola forma de atención?
                                Multi-head attention permite que el modelo
                                atienda a diferentes tipos de relaciones
                                simultáneamente:
                            </p>
                            <ul>
                                <li>
                                    <strong>Cabeza 1:</strong> Relaciones
                                    sintácticas (sujeto-verbo)
                                </li>
                                <li>
                                    <strong>Cabeza 2:</strong> Relaciones
                                    semánticas (sinónimos)
                                </li>
                                <li>
                                    <strong>Cabeza 3:</strong> Dependencias
                                    largas (anáforas)
                                </li>
                                <li>
                                    <strong>Cabeza 4:</strong> Estructuras
                                    locales (frases)
                                </li>
                            </ul>
                        </div>

                        <MultiHeadAttention />

                        <div className="success-box">
                            <h4>El Momento "Eureka"</h4>
                            <p>
                                Cuando los investigadores entrenaron los
                                primeros Transformers, algo mágico sucedió. Las
                                cabezas de atención emergentemente aprendieron
                                gramática sin supervisión explícita. Una cabeza
                                se especializó en dependencias sintácticas, otra
                                en correferenciales, otra en semánticas.
                            </p>
                            <p>
                                <strong>
                                    El modelo había descubierto la gramática por
                                    sí mismo.
                                </strong>
                            </p>
                        </div>

                        <div className="warning-box">
                            <h4>El Precio de la Perfección</h4>
                            <p>
                                La atención resolvió los problemas de las RNNs,
                                pero introdujo uno nuevo:
                                <strong>complejidad cuadrática</strong>. Para
                                una secuencia de longitud n, necesitas n²
                                comparaciones. Esto significa que duplicar la
                                longitud cuadriplica el cómputo.
                            </p>
                            <p>
                                Es por eso que GPT-4 tiene límites de contexto,
                                y por qué hay investigación frenética en
                                atención eficiente.
                            </p>
                        </div>
                    </div>
                </section>

                <section id="transformer" className="animate-fade-in-up">
                    <div className="section-header">
                        <h2>Transformer: La Arquitectura que Cambió Todo</h2>
                        <p className="lead">
                            Cómo combinar atención, normalización, y
                            feed-forward networks para crear la arquitectura más
                            influyente en la historia de la IA.
                        </p>
                    </div>

                    <div className="section-content">
                        <div className="theory-card">
                            <h3>Anatomía de un Transformer</h3>
                            <p>
                                Un Transformer es como una orquesta sinfónica:
                                cada componente tiene un papel específico, pero
                                la magia emerge de cómo trabajan juntos en
                                armonía.
                            </p>
                        </div>

                        <TransformerAnimation />

                        <div className="theory-card">
                            <h3>
                                Positional Encoding: Enseñando Orden sin
                                Secuencia
                            </h3>
                            <p>
                                La atención no tiene noción inherente del orden.
                                "Gato come pescado" y "Pescado come gato" se
                                verían idénticos sin encoding posicional. Los
                                Transformers usan funciones sinusoidales para
                                inyectar información de posición.
                            </p>
                        </div>

                        <PositionalEncoding />

                        <div className="info-box">
                            <h4>Las Matemáticas del Orden</h4>
                            <EquationBlock
                                latex={`PE_{(pos,2i)} = \\sin\\left(\\frac{pos}{10000^{2i/d_{model}}}\\right)`}
                                description="Codificación sinusoidal para posiciones pares"
                            />
                            <EquationBlock
                                latex={`PE_{(pos,2i+1)} = \\cos\\left(\\frac{pos}{10000^{2i/d_{model}}}\\right)`}
                                description="Codificación cosinusoidal para posiciones impares"
                            />
                        </div>

                        <div className="theory-card">
                            <h3>Layer Normalization: Estabilizando el Caos</h3>
                            <p>
                                Entrenar redes profundas es como hacer malabares
                                con dinamita. Layer normalization es lo que
                                evita que todo explote, estabilizando las
                                activaciones y acelerando el entrenamiento.
                            </p>
                        </div>

                        <LayerNormalization />

                        <div className="theory-card">
                            <h3>
                                Feed-Forward Networks: El Poder de Procesamiento
                            </h3>
                            <p>
                                Después de cada capa de atención viene una red
                                feed-forward. Es donde el modelo realmente
                                "piensa": combina la información atendida en
                                representaciones más ricas y complejas.
                            </p>
                        </div>

                        <FeedForwardNetwork />

                        <div className="success-box">
                            <h4>Residual Connections: El Truco Secreto</h4>
                            <p>
                                Las conexiones residuales permiten que la
                                información "salte" capas. Esto resuelve el
                                problema del gradiente que desaparece y permite
                                entrenar redes extremadamente profundas. GPT-4
                                tiene más de 100 capas.
                            </p>
                            <EquationBlock
                                latex={`\\text{Output} = \\text{LayerNorm}(x + \\text{Sublayer}(x))`}
                                description="Cada sublayer agrega a su entrada en lugar de reemplazarla."
                            />
                        </div>
                    </div>
                </section>

                <section id="entrenamiento" className="animate-fade-in-up">
                    <div className="section-header">
                        <h2>Entrenamiento: El Arte de Escalar Inteligencia</h2>
                        <p className="lead">
                            Entrenar un LLM moderno requiere más poder
                            computacional que el usado para poner humanos en la
                            luna. Aquí está cómo se hace.
                        </p>
                    </div>

                    <div className="section-content">
                        <div className="theory-card">
                            <h3>Las Tres Fases del Entrenamiento</h3>
                            <p>
                                Los LLMs modernos se entrenan en tres fases
                                distintas, cada una con sus propios objetivos y
                                desafíos:
                            </p>
                            <ul>
                                <li>
                                    <strong>Pre-entrenamiento:</strong> Aprender
                                    el lenguaje desde internet
                                </li>
                                <li>
                                    <strong>Supervised Fine-tuning:</strong>{" "}
                                    Aprender a seguir instrucciones
                                </li>
                                <li>
                                    <strong>RLHF:</strong> Aprender valores y
                                    preferencias humanas
                                </li>
                            </ul>
                        </div>

                        <TrainingVisualization />

                        <div className="info-box">
                            <h4>La Función de Pérdida Fundamental</h4>
                            <EquationBlock
                                latex={`\\mathcal{L} = -\\sum_{i=1}^N \\log P(w_i | w_{<i})`}
                                description="El objetivo simple pero poderoso: predecir la siguiente palabra dado todo el contexto anterior."
                            />
                            <p>
                                Esta función aparentemente simple es lo que
                                permite que los modelos aprendan gramática,
                                hechos, razonamiento, y más.
                            </p>
                        </div>

                        <div className="theory-card">
                            <h3>Leyes de Escalado: Más Grande es Mejor</h3>
                            <p>
                                Una de las lecciones más importantes del deep
                                learning moderno: el rendimiento escala
                                predeciblemente con compute, datos y parámetros.
                            </p>
                        </div>

                        <ScalingLaws />

                        <div className="warning-box">
                            <h4>El Costo de la Inteligencia</h4>
                            <p>
                                Entrenar GPT-3 costó aproximadamente $4.6
                                millones en compute. GPT-4 probablemente costó
                                más de $100 millones. Los próximos modelos
                                podrían costar miles de millones.
                            </p>
                            <div className="metric-card">
                                <div className="metric-value">$100M+</div>
                                <div className="metric-label">
                                    Costo estimado de entrenar GPT-4
                                </div>
                            </div>
                        </div>

                        <div className="success-box">
                            <h4>RLHF: Enseñando Valores Humanos</h4>
                            <p>
                                RLHF (Reinforcement Learning from Human
                                Feedback) es lo que convierte modelos raw en
                                asistentes útiles. Humanos califican salidas, se
                                entrena un modelo de recompensa, y PPO optimiza
                                hacia esas preferencias.
                            </p>
                        </div>
                    </div>
                </section>

                <section id="generacion" className="animate-fade-in-up">
                    <div className="section-header">
                        <h2>Generación: De Modelos a Magia</h2>
                        <p className="lead">
                            Cómo los LLMs transforman probabilidades en prosa,
                            código, y creatividad. La alquimia moderna de
                            convertir matemáticas en lenguaje.
                        </p>
                    </div>

                    <div className="section-content">
                        <div className="theory-card">
                            <h3>Tokenización: El Primer Paso</h3>
                            <p>
                                Antes de que un modelo pueda procesar texto,
                                debe convertirlo en tokens. Este proceso
                                aparentemente simple determina cómo "ve" el
                                modelo el lenguaje.
                            </p>
                        </div>

                        <TokenizationDemo />

                        <div className="theory-card">
                            <h3>Temperature: Controlando la Creatividad</h3>
                            <p>
                                Temperature controla qué tan "creativo" vs.
                                "conservador" es el modelo. Temperature baja
                                produce texto predecible. Temperature alta
                                produce caos creativo.
                            </p>
                        </div>

                        <TemperatureDemo />

                        <div className="info-box">
                            <h4>La Matemática de la Creatividad</h4>
                            <EquationBlock
                                latex={`P_i = \\frac{\\exp(z_i / T)}{\\sum_{j} \\exp(z_j / T)}`}
                                description="Softmax con temperature: T=1 es normal, T→0 es determinista, T→∞ es aleatorio."
                            />
                        </div>

                        <div className="theory-card">
                            <h3>Beam Search: Buscando el Mejor Camino</h3>
                            <p>
                                En lugar de elegir la palabra más probable en
                                cada paso, beam search mantiene múltiples
                                hipótesis y encuentra la secuencia globalmente
                                más probable.
                            </p>
                        </div>

                        <BeamSearchDemo />

                        <div className="theory-card">
                            <h3>Visualizando la Atención</h3>
                            <p>
                                Una de las partes más fascinantes de los
                                Transformers es que podemos "ver" a qué presta
                                atención el modelo. Esto nos da una ventana
                                hacia su proceso de pensamiento.
                            </p>
                        </div>

                        <AttentionHeatmap />
                    </div>
                </section>

                <section id="aplicaciones" className="animate-fade-in-up">
                    <div className="section-header">
                        <h2>Aplicaciones: Transformando el Mundo</h2>
                        <p className="lead">
                            Desde ChatGPT hasta aplicaciones especializadas, los
                            LLMs están revolucionando cada industria imaginable.
                        </p>
                    </div>

                    <div className="section-content">
                        <div className="theory-card">
                            <h3>Comparativa de Modelos Modernos</h3>
                            <p>
                                El ecosistema de LLMs evoluciona a velocidad
                                vertiginosa. Aquí está el estado del arte
                                actual:
                            </p>
                        </div>

                        <ModelComparisonChart />

                        <div className="intro-highlights">
                            <div className="highlight">
                                <h3>Programación</h3>
                                <p>
                                    GitHub Copilot, Cursor, y otros están
                                    transformando cómo escribimos código. Los
                                    LLMs pueden programar en docenas de
                                    lenguajes.
                                </p>
                            </div>

                            <div className="highlight">
                                <h3>Escritura</h3>
                                <p>
                                    Desde copy marketing hasta literatura, los
                                    LLMs están democratizando la escritura de
                                    alta calidad.
                                </p>
                            </div>

                            <div className="highlight">
                                <h3>Investigación</h3>
                                <p>
                                    Acelerando descubrimiento científico en
                                    medicina, materiales, y física teórica.
                                </p>
                            </div>

                            <div className="highlight">
                                <h3>Creatividad</h3>
                                <p>
                                    Generando arte, música, y contenido creativo
                                    que rivalizan con creadores humanos.
                                </p>
                            </div>
                        </div>

                        <div className="success-box">
                            <h4>Métricas de Adopción</h4>
                            <div className="intro-highlights">
                                <div className="metric-card">
                                    <div className="metric-value">100M</div>
                                    <div className="metric-label">
                                        Usuarios de ChatGPT en 2 meses
                                    </div>
                                </div>
                                <div className="metric-card">
                                    <div className="metric-value">46%</div>
                                    <div className="metric-label">
                                        Código en GitHub escrito por IA
                                    </div>
                                </div>
                                <div className="metric-card">
                                    <div className="metric-value">$13B</div>
                                    <div className="metric-label">
                                        Inversión en IA generativa (2023)
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section id="futuro" className="animate-fade-in-up">
                    <div className="section-header">
                        <h2>El Futuro: AGI y Más Allá</h2>
                        <p className="lead">
                            Estamos en el umbral de la Inteligencia General
                            Artificial. ¿Qué viene después?
                        </p>
                    </div>

                    <div className="section-content">
                        <div className="theory-card">
                            <h3>Tendencias Emergentes</h3>
                            <ul>
                                <li>
                                    <strong>Modelos Multimodales:</strong>{" "}
                                    Visión, audio, y texto unificados
                                </li>
                                <li>
                                    <strong>Agentes Autónomos:</strong> IA que
                                    puede actuar en el mundo real
                                </li>
                                <li>
                                    <strong>Reasoning Chains:</strong> Modelos
                                    que "piensan" paso a paso
                                </li>
                                <li>
                                    <strong>Infinite Context:</strong> Modelos
                                    sin límites de longitud
                                </li>
                                <li>
                                    <strong>Embodied AI:</strong> IA en robots
                                    físicos
                                </li>
                            </ul>
                        </div>

                        <div className="warning-box">
                            <h4>Desafíos y Riesgos</h4>
                            <p>
                                Con gran poder viene gran responsabilidad. Los
                                LLMs plantean desafíos significativos:
                            </p>
                            <ul>
                                <li>
                                    <strong>Alignment:</strong> ¿Cómo aseguramos
                                    que la IA avanzada mantenga valores humanos?
                                </li>
                                <li>
                                    <strong>Control:</strong> ¿Qué pasa cuando
                                    los modelos superan la inteligencia humana?
                                </li>
                                <li>
                                    <strong>Distribución:</strong> ¿Cómo
                                    evitamos que la IA concentre poder?
                                </li>
                                <li>
                                    <strong>Trabajo:</strong> ¿Cómo manejamos la
                                    automatización masiva?
                                </li>
                            </ul>
                        </div>

                        <div className="success-box">
                            <h4>Un Futuro Brillante</h4>
                            <p>
                                Si navegamos los desafíos sabiamente, los LLMs
                                prometen un futuro de abundancia intelectual:
                            </p>
                            <ul>
                                <li>
                                    <strong>Tutores personalizados</strong> para
                                    cada estudiante
                                </li>
                                <li>
                                    <strong>Asistentes médicos</strong> que
                                    diagnostican con precisión sobrehumana
                                </li>
                                <li>
                                    <strong>Investigadores IA</strong> que
                                    aceleran el descubrimiento científico
                                </li>
                                <li>
                                    <strong>Creativos digitales</strong> que
                                    expanden los límites del arte
                                </li>
                                <li>
                                    <strong>Compañeros IA</strong> que
                                    enriquecen nuestras vidas
                                </li>
                            </ul>
                        </div>

                        <div className="info-box">
                            <h4>Conclusión: Tu Viaje Continúa</h4>
                            <p>
                                Has completado un viaje épico desde neuronas
                                artificiales hasta los modelos más avanzados
                                jamás creados. Pero esto es solo el comienzo.
                            </p>
                            <p>
                                El campo de los LLMs evoluciona tan rápido que
                                este conocimiento será obsoleto en años, quizás
                                meses. Lo importante no son los detalles
                                específicos, sino las intuiciones fundamentales:
                                cómo funciona la atención, por qué el escalado
                                es importante, cómo emergen capacidades
                                complejas de objetivos simples.
                            </p>
                            <p>
                                <strong>
                                    Mantente curioso. El futuro pertenece a
                                    quienes entienden estas máquinas
                                    extraordinarias.
                                </strong>
                            </p>
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}
