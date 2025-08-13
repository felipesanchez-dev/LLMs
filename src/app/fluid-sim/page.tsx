import React from 'react';
import { FluidSimView } from '@/src/fluidsim/FluidSimView';
import Link from 'next/link';

export const metadata = {
  title: 'Simulación de Fluidos',
  description: 'Explorando simulación de fluidos interactiva con WebGPU - Implementación de ecuaciones de Navier-Stokes',
};

import s from './page.module.scss';

export default function Page() {

    return <>
        <div className={s.header}>
            <div className={s.back}>
                <Link href={"/"}>&lt; Volver</Link>
            </div>
            Simulación de Fluidos Interactiva
            <div>
                # Simulación de Fluidos 2D
            </div>
        </div>
        <div className={s.documentation}>
            <div className={s.section}>
                <h2 className={s.sectionTitle}>¿Qué es esto?</h2>
                <p className={s.sectionContent}>
                    Esta es una simulación interactiva de dinámicas de fluidos que implementa las <strong>ecuaciones de Navier-Stokes</strong> en 2D. 
                    Es una simulación física que modela cómo se comportan los fluidos como agua, aire, o cualquier líquido/gas en movimiento.
                </p>
            </div>

            <div className={s.section}>
                <h2 className={s.sectionTitle}>¿Cómo funciona?</h2>
                
                <div className={s.subsection}>
                    <h3 className={s.subsectionTitle}>Conceptos Físicos Fundamentales</h3>
                    <div className={s.conceptGrid}>
                        <div className={s.concept}>
                            <strong>Campo de Velocidad</strong>
                            <p>Cada punto en el espacio tiene un vector que indica la velocidad del fluido en esa ubicación</p>
                        </div>
                        <div className={s.concept}>
                            <strong>Presión</strong>
                            <p>Fuerza que el fluido ejerce en todas las direcciones</p>
                        </div>
                        <div className={s.concept}>
                            <strong>Densidad</strong>
                            <p>Cantidad de masa del fluido por unidad de volumen</p>
                        </div>
                        <div className={s.concept}>
                            <strong>Temperatura</strong>
                            <p>Energía térmica del fluido</p>
                        </div>
                    </div>
                </div>

                <div className={s.subsection}>
                    <h3 className={s.subsectionTitle}>Algoritmo de Simulación</h3>
                    <p className={s.sectionContent}>La simulación sigue estos pasos en cada frame:</p>
                    
                    <div className={s.algorithmSteps}>
                        <div className={s.step}>
                            <div className={s.stepNumber}>1</div>
                            <div className={s.stepContent}>
                                <h4>Advección</h4>
                                <ul>
                                    <li>Mueve las propiedades del fluido (velocidad, temperatura, densidad) siguiendo el campo de velocidad actual</li>
                                    <li>Es como rastrear pequeñas partículas que flotan en el fluido</li>
                                </ul>
                            </div>
                        </div>
                        
                        <div className={s.step}>
                            <div className={s.stepNumber}>2</div>
                            <div className={s.stepContent}>
                                <h4>Difusión <span className={s.optional}>(Opcional)</span></h4>
                                <ul>
                                    <li>Simula cómo las propiedades se esparcen gradualmente</li>
                                    <li>Viscosidad para velocidad, conducción térmica para temperatura</li>
                                </ul>
                            </div>
                        </div>
                        
                        <div className={s.step}>
                            <div className={s.stepNumber}>3</div>
                            <div className={s.stepContent}>
                                <h4>Proyección <span className={s.important}>(Lo más importante)</span></h4>
                                <ul>
                                    <li>Garantiza que el fluido sea <strong>incompresible</strong> (divergencia = 0)</li>
                                    <li>Resuelve la ecuación de Poisson para presión</li>
                                    <li>Corrige el campo de velocidad para que sea físicamente correcto</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className={s.section}>
                <h2 className={s.sectionTitle}>Visualizaciones Disponibles</h2>
                <div className={s.visualizationGrid}>
                    <div className={s.visualization}>
                        <h4>Campo de Velocidad Principal</h4>
                        <ul>
                            <li>Vectores blancos muestran dirección y magnitud de velocidad</li>
                            <li>Colores representan temperatura/densidad</li>
                        </ul>
                    </div>
                    <div className={s.visualization}>
                        <h4>Campo de Presión</h4>
                        <ul>
                            <li>Muestra la distribución de presión en el fluido</li>
                            <li>Importante para entender fuerzas internas</li>
                        </ul>
                    </div>
                    <div className={s.visualization}>
                        <h4>Divergencia Inicial</h4>
                        <ul>
                            <li>Muestra qué tan "compresible" es el campo de velocidad antes de corrección</li>
                            <li>Debería tener valores altos</li>
                        </ul>
                    </div>
                    <div className={s.visualization}>
                        <h4>Divergencia Final</h4>
                        <ul>
                            <li>Después de la proyección, debería ser casi cero</li>
                            <li>Valida que la simulación funciona correctamente</li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className={s.twoColumnSection}>
                <div className={s.column}>
                    <div className={s.section}>
                        <h2 className={s.sectionTitle}>Controles</h2>
                        <div className={s.controlsList}>
                            <div className={s.control}>
                                <kbd className={s.key}>Espacio</kbd>
                                <span>Reproducir/Pausar simulación</span>
                            </div>
                            <div className={s.control}>
                                <kbd className={s.key}>S</kbd>
                                <span>Ejecutar un solo paso</span>
                            </div>
                            <div className={s.control}>
                                <kbd className={s.key}>R</kbd>
                                <span>Reiniciar simulación</span>
                            </div>
                            <div className={s.control}>
                                <kbd className={s.key}>V</kbd>
                                <span>Toggle visualización de velocidad</span>
                            </div>
                            <div className={s.control}>
                                <kbd className={s.key}>T</kbd>
                                <span>Toggle visualización de temperatura</span>
                            </div>
                        </div>
                    </div>

                    <div className={s.section}>
                        <h2 className={s.sectionTitle}>Parámetros Ajustables</h2>
                        <div className={s.parametersList}>
                            <div className={s.parameter}>
                                <strong>Velocidad de Simulación</strong>
                                <p>Controla qué tan rápido avanza el tiempo</p>
                            </div>
                            <div className={s.parameter}>
                                <strong>Iteraciones de Presión</strong>
                                <p>Más iteraciones = mayor precisión (pero más lento)</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={s.column}>
                    <div className={s.section}>
                        <h2 className={s.sectionTitle}>Propiedades Físicas Monitoreadas</h2>
                        <div className={s.propertiesList}>
                            <div className={s.property}>
                                <strong>Masa Total</strong>
                                <p>Debería conservarse (ley de conservación)</p>
                            </div>
                            <div className={s.property}>
                                <strong>Energía Cinética</strong>
                                <p>Energía del movimiento del fluido</p>
                            </div>
                            <div className={s.property}>
                                <strong>Momento X/Y</strong>
                                <p>Cantidad de movimiento en cada dirección</p>
                            </div>
                            <div className={s.property}>
                                <strong>Temperatura Promedio</strong>
                                <p>Estado térmico del sistema</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className={s.section}>
                <h2 className={s.sectionTitle}>Aplicaciones Reales</h2>
                <p className={s.sectionContent}>Esta simulación es similar a la que se usa en:</p>
                <div className={s.applicationsGrid}>
                    <div className={s.application}>
                        <strong>Animación por computadora</strong>
                        <p>Efectos de agua, humo, fuego</p>
                    </div>
                    <div className={s.application}>
                        <strong>Ingeniería</strong>
                        <p>Diseño de aviones, automóviles (aerodinámica)</p>
                    </div>
                    <div className={s.application}>
                        <strong>Meteorología</strong>
                        <p>Predicción del clima</p>
                    </div>
                    <div className={s.application}>
                        <strong>Medicina</strong>
                        <p>Flujo sanguíneo, respiración</p>
                    </div>
                    <div className={s.application}>
                        <strong>Videojuegos</strong>
                        <p>Efectos realistas de fluidos</p>
                    </div>
                </div>
            </div>

            <div className={s.twoColumnSection}>
                <div className={s.column}>
                    <div className={s.section}>
                        <h2 className={s.sectionTitle}>Limitaciones</h2>
                        <ul className={s.limitationsList}>
                            <li>Simulación 2D (la realidad es 3D)</li>
                            <li>Grilla fija (no adaptativa)</li>
                            <li>Sin turbulencia avanzada</li>
                            <li>Simplificaciones numéricas para rendimiento</li>
                        </ul>
                    </div>
                </div>

                <div className={s.column}>
                    <div className={s.section}>
                        <h2 className={s.sectionTitle}>Tecnologías Utilizadas</h2>
                        <div className={s.technologiesList}>
                            <div className={s.technology}>
                                <strong>React/TypeScript</strong>
                                <p>Interfaz de usuario</p>
                            </div>
                            <div className={s.technology}>
                                <strong>Canvas 2D</strong>
                                <p>Renderizado de visualizaciones</p>
                            </div>
                            <div className={s.technology}>
                                <strong>Diferencias Finitas</strong>
                                <p>Método numérico para resolver ecuaciones</p>
                            </div>
                            <div className={s.technology}>
                                <strong>Gauss-Seidel</strong>
                                <p>Método iterativo para resolver sistemas lineales</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className={s.callToAction}>
                <p>¡Experimenta con los controles y observa cómo diferentes parámetros afectan el comportamiento del fluido!</p>
            </div>
        </div>
        <FluidSimView />
    </>;
}
