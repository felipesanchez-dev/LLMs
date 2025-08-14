"use client";
import { faGithub, faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import s from "./HomePage.module.scss";
import { Tooltip } from "../utils/Tooltip";

export const HomePage: React.FC = () => {
    const [emailText, setEmailText] = useState("");
    const router = useRouter();

    function showEmail(ev: React.MouseEvent) {
        const emailParts = ["jfelipe", "9.121", "@", "gmail", ".", "com"];
        const email = emailParts.join("");
        setEmailText((text) => (text ? "" : email));
        ev.stopPropagation();
        ev.preventDefault();
    }

    function externalIcon() {
        return (
            <FontAwesomeIcon
                icon={faUpRightFromSquare}
                fontSize={10}
                className="ml-3 mr-1 relative top-[-1px]"
            />
        );
    }

    return (
        <div className={s.homePage}>
            <div className={s.headerSection}>
                <div className={s.profilePic}>
                    <img src="/me.jpg" alt="Profile Picture" />
                </div>
                <div className={s.nameSection}>
                    <div className={s.name}>Felipe Reyes Sánchez</div>
                    <div className={s.subhead}>Ingeniero de Software</div>
                    <div className={s.links}>
                        <Tooltip
                            tip={
                                <>GitHub /felipesanchez-dev {externalIcon()}</>
                            }
                        >
                            <a
                                href="https://github.com/felipesanchez-dev"
                                rel="noopener noreferrer"
                                target="_blank"
                                aria-label="GitHub felipesanchez-dev"
                            >
                                <FontAwesomeIcon icon={faGithub} />
                            </a>
                        </Tooltip>

                        <Tooltip
                            tip={
                                <>
                                    Instagram /felipesanchez_dev{" "}
                                    {externalIcon()}
                                </>
                            }
                        >
                            <a
                                href="https://www.instagram.com/felipesanchez_dev"
                                rel="noopener noreferrer"
                                target="_blank"
                                aria-label="Instagram felipesanchez_dev"
                            >
                                <FontAwesomeIcon icon={faInstagram} />
                            </a>
                        </Tooltip>

                        <Tooltip tip={<>Sitio Web Personal {externalIcon()}</>}>
                            <a
                                href="https://felipesanchezdev.site/"
                                rel="noopener noreferrer"
                                target="_blank"
                                aria-label="Sitio web personal"
                            >
                                <FontAwesomeIcon icon={faUpRightFromSquare} />
                            </a>
                        </Tooltip>
                    </div>

                    <div className={s.emailText} onClick={showEmail}>
                        {emailText || "Clic para mostrar email"}
                    </div>
                </div>
            </div>

            <div className={s.projectsSection}>
                <div
                    className={s.projectCard}
                    onClick={() => router.push("/llm")}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) =>
                        e.key === "Enter" || e.key === " "
                            ? router.push("/llm")
                            : null
                    }
                >
                    <div className={s.cardImageWrapper}>
                        <div className={s.cardImage}>
                            <img
                                src="/logo.png"
                                alt="Captura de pantalla de LLM Visualization"
                            />
                        </div>
                    </div>

                    <div className={s.cardContent}>
                        <div className={s.cardTitle}>
                            <Link href="/llm">
                                LLM Visualization en Español
                            </Link>
                        </div>
                        <div className={s.cardText}>
                            Una visualización interactiva y educativa del
                            algoritmo de LLMs (Large Language Models) que
                            impulsa ChatGPT y otros modelos de IA. Explora cada
                            operación matemática, desde multiplicaciones
                            matriciales hasta mecanismos de atención, todo
                            explicado paso a paso en español para democratizar
                            el entendimiento de la inteligencia artificial.
                        </div>
                    </div>
                </div>

                <div
                    className={s.projectCard}
                    onClick={() => window.open("https://github.com/felipesanchez-dev/LLMs", "_blank")}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) =>
                        e.key === "Enter" || e.key === " "
                            ? window.open("https://github.com/felipesanchez-dev/LLMs", "_blank")
                            : null
                    }
                >
                    <div className={s.cardImageWrapper}>
                        <div className={s.cardImage}>
                            <div className={s.githubIcon}>
                                <FontAwesomeIcon icon={faGithub} size="3x" />
                            </div>
                        </div>
                    </div>

                    <div className={s.cardContent}>
                        <div className={s.cardTitle}>
                            <a 
                                href="https://github.com/felipesanchez-dev/LLMs"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Código Fuente - Open Source {externalIcon()}
                            </a>
                        </div>
                        <div className={s.cardText}>
                            Accede al código fuente completo de este proyecto en GitHub. 
                            Como un proyecto open source, puedes explorar la implementación, 
                            contribuir con mejoras, reportar issues o hacer tu propio fork. 
                            ¡La colaboración y transparencia son fundamentales para 
                            democratizar el conocimiento en IA!
                        </div>
                    </div>
                </div>
            </div>

            <div className={s.divider} />

            <div className={s.projectsSection}>
                <div className={s.sectionTitle}>Acerca del Proyecto</div>

                <div className={s.bioText}>
                    <p>
                        ¡Hola! Soy Felipe, un ingeniero de software dedicado a
                        democratizar y divulgar el conocimiento de la
                        inteligencia artificial. Este sitio web está inspirado
                        en el increíble trabajo open source de{" "}
                        <span className="font-bold">Brendan Bycroft</span> y
                        representa mi compromiso con hacer que conceptos
                        complejos de los LLM sean accesibles para la comunidad
                        hispanohablante.
                    </p>

                    <p>
                        Mi objetivo es crear un puente entre la investigación
                        avanzada en IA y desarrolladores, estudiantes y
                        entusiastas que desean comprender cómo funcionan
                        realmente los modelos de lenguaje. A través de
                        visualizaciones interactivas y explicaciones detalladas
                        en español, buscamos que cualquier persona pueda
                        explorar y entender la magia detrás de ChatGPT y
                        similares.
                    </p>
                    <span className="font-bold">
                        © Todos los creditos correspondientes
                    </span>
                    
                    </div>
                </div>
            </div>
    );
};
